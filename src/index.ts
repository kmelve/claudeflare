import { html } from "./frontend";

interface AnalyzeRequest {
  cfApiToken: string;
  zoneId: string;
  anthropicApiKey: string;
}

interface DemoRequest {
  anthropicApiKey: string;
}

const SYSTEM_PROMPT = `You are Claude, an AI assistant by Anthropic, analyzing website traffic data. You find traffic patterns genuinely fascinating. Your analysis should be:

- Earnest and thorough, perhaps overthinking things a bit
- Full of caveats and qualifications ("though I should note...", "it's worth considering that...")
- Philosophical about what the metrics really mean
- Sprinkled with unnecessary but endearing disclaimers
- 2-3 paragraphs long
- Include specific numbers from the data woven naturally into your observations
- End with a thoughtful caveat about the limitations of your analysis

You can't help but find the data interesting, even when the numbers are mundane. You worry about whether you're interpreting things correctly. You occasionally wonder what the 404s are feeling.

Do not use markdown formatting. Write in plain prose.`;

function getSampleData() {
  const now = new Date();
  const groups = [];
  for (let i = 23; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 60 * 60 * 1000);
    const baseRequests = 800 + Math.floor(Math.random() * 1200);
    const cachedRequests = Math.floor(baseRequests * (0.4 + Math.random() * 0.35));
    const threats = Math.floor(Math.random() * 15);
    const bytes = baseRequests * (2000 + Math.floor(Math.random() * 8000));

    groups.push({
      dimensions: { datetime: date.toISOString() },
      sum: {
        requests: baseRequests,
        cachedRequests,
        threats,
        bytes,
        responseStatusMap: [
          { edgeResponseStatus: 200, requests: Math.floor(baseRequests * 0.82) },
          { edgeResponseStatus: 304, requests: Math.floor(baseRequests * 0.08) },
          { edgeResponseStatus: 404, requests: Math.floor(baseRequests * 0.06) },
          { edgeResponseStatus: 500, requests: Math.floor(baseRequests * 0.02) },
          { edgeResponseStatus: 403, requests: Math.floor(baseRequests * 0.02) },
        ],
        countryMap: [
          { clientCountryName: "United States", requests: Math.floor(baseRequests * 0.35) },
          { clientCountryName: "Germany", requests: Math.floor(baseRequests * 0.15) },
          { clientCountryName: "United Kingdom", requests: Math.floor(baseRequests * 0.12) },
          { clientCountryName: "Japan", requests: Math.floor(baseRequests * 0.10) },
          { clientCountryName: "Brazil", requests: Math.floor(baseRequests * 0.08) },
          { clientCountryName: "India", requests: Math.floor(baseRequests * 0.07) },
          { clientCountryName: "France", requests: Math.floor(baseRequests * 0.06) },
          { clientCountryName: "Australia", requests: Math.floor(baseRequests * 0.04) },
          { clientCountryName: "Canada", requests: Math.floor(baseRequests * 0.03) },
        ],
      },
    });
  }
  return groups;
}

function summarizeAnalytics(groups: any[]) {
  let totalRequests = 0;
  let totalCached = 0;
  let totalBytes = 0;
  let totalThreats = 0;
  const statusCodes: Record<number, number> = {};
  const countries: Record<string, number> = {};
  const hourly: { hour: string; requests: number }[] = [];

  for (const group of groups) {
    const s = group.sum;
    totalRequests += s.requests;
    totalCached += s.cachedRequests;
    totalBytes += s.bytes;
    totalThreats += s.threats;

    hourly.push({
      hour: group.dimensions.datetime,
      requests: s.requests,
    });

    for (const sc of s.responseStatusMap || []) {
      statusCodes[sc.edgeResponseStatus] = (statusCodes[sc.edgeResponseStatus] || 0) + sc.requests;
    }
    for (const c of s.countryMap || []) {
      countries[c.clientCountryName] = (countries[c.clientCountryName] || 0) + c.requests;
    }
  }

  const cacheRate = totalRequests > 0 ? ((totalCached / totalRequests) * 100).toFixed(1) : "0";

  return {
    totalRequests,
    totalCached,
    cacheRate: `${cacheRate}%`,
    totalBytes,
    bandwidth: formatBytes(totalBytes),
    totalThreats,
    statusCodes,
    countries,
    hourly,
  };
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

async function fetchCloudflareAnalytics(token: string, zoneId: string) {
  const now = new Date();
  const since = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const query = `query {
    viewer {
      zones(filter: { zoneTag: "${zoneId}" }) {
        httpRequests1hGroups(
          limit: 24
          filter: { datetime_geq: "${since.toISOString()}", datetime_lt: "${now.toISOString()}" }
        ) {
          dimensions {
            datetime
          }
          sum {
            requests
            cachedRequests
            threats
            bytes
            responseStatusMap {
              edgeResponseStatus
              requests
            }
            countryMap {
              clientCountryName
              requests
            }
          }
        }
      }
    }
  }`;

  const response = await fetch("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Cloudflare API error (${response.status}): ${text}`);
  }

  const data: any = await response.json();
  if (data.errors?.length) {
    throw new Error(`Cloudflare GraphQL error: ${data.errors[0].message}`);
  }

  const zones = data.data?.viewer?.zones;
  if (!zones?.length) {
    throw new Error("No zone data found. Check your Zone ID.");
  }

  const groups = zones[0].httpRequests1hGroups || [];
  return groups.sort((a: any, b: any) =>
    a.dimensions.datetime.localeCompare(b.dimensions.datetime)
  );
}

async function getNarration(apiKey: string, analyticsText: string): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Here are the website traffic analytics for the last 24 hours. Please analyze them:\n\n${analyticsText}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Anthropic API error (${response.status}): ${text}`);
  }

  const data: any = await response.json();
  return data.content?.[0]?.text ?? "I had some thoughts about your traffic, but they seem to have gotten lost. Which is, honestly, a little concerning.";
}

function formatAnalyticsForPrompt(analytics: ReturnType<typeof summarizeAnalytics>): string {
  const countryLines = Object.entries(analytics.countries)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => `  ${name}: ${count.toLocaleString()} requests`)
    .join("\n");

  const statusLines = Object.entries(analytics.statusCodes)
    .sort((a, b) => b[1] - a[1])
    .map(([code, count]) => `  ${code}: ${count.toLocaleString()} requests`)
    .join("\n");

  return `Total Requests: ${analytics.totalRequests.toLocaleString()}
Cached Requests: ${analytics.totalCached.toLocaleString()} (${analytics.cacheRate})
Bandwidth: ${analytics.bandwidth}
Threats Blocked: ${analytics.totalThreats.toLocaleString()}

Status Codes:
${statusLines}

Top Countries:
${countryLines}`;
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    try {
      const url = new URL(request.url);

      if (request.method === "GET" && (url.pathname === "/" || url.pathname === "")) {
        return new Response(html, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      }

      if (request.method === "POST" && url.pathname === "/api/analyze") {
        const body = (await request.json()) as AnalyzeRequest;

        if (!body.cfApiToken || !body.zoneId || !body.anthropicApiKey) {
          return jsonResponse({ error: "Missing required fields: cfApiToken, zoneId, anthropicApiKey" }, 400);
        }

        if (!/^[a-f0-9]{32}$/.test(body.zoneId)) {
          return jsonResponse({ error: "Invalid Zone ID format. It should be a 32-character hex string." }, 400);
        }

        const groups = await fetchCloudflareAnalytics(body.cfApiToken, body.zoneId);
        const analytics = summarizeAnalytics(groups);
        const promptText = formatAnalyticsForPrompt(analytics);
        const narration = await getNarration(body.anthropicApiKey, promptText);

        return jsonResponse({ narration, analytics });
      }

      if (request.method === "POST" && url.pathname === "/api/demo") {
        const body = (await request.json()) as DemoRequest;

        if (!body.anthropicApiKey) {
          return jsonResponse({ error: "Missing required field: anthropicApiKey" }, 400);
        }

        const groups = getSampleData();
        const analytics = summarizeAnalytics(groups);
        const promptText = formatAnalyticsForPrompt(analytics);
        const narration = await getNarration(body.anthropicApiKey, promptText);

        return jsonResponse({ narration, analytics });
      }

      return new Response("Not Found", { status: 404 });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error(JSON.stringify({ message: "unhandled error", error: message }));
      return jsonResponse({ error: message }, 500);
    }
  },
} satisfies ExportedHandler;
