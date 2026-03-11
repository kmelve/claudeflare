export const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Claudeflare — Earnest Traffic Analysis</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'EB Garamond', serif;
      background: #12100d;
      color: #e8e0d4;
      min-height: 100vh;
      line-height: 1.6;
    }

    .container {
      max-width: 720px;
      margin: 0 auto;
      padding: 3rem 1.5rem;
    }

    h1 {
      font-size: 2.2rem;
      font-weight: 600;
      color: #c8a44e;
      margin-bottom: 0.25rem;
    }

    .subtitle {
      font-size: 1.1rem;
      color: #8a7e6b;
      margin-bottom: 0.5rem;
    }

    .tagline {
      font-size: 1rem;
      font-style: italic;
      color: #8a7e6b;
      margin-bottom: 2.5rem;
    }

    label {
      display: block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #8a7e6b;
      margin-bottom: 0.4rem;
    }

    input {
      width: 100%;
      padding: 0.7rem 0.9rem;
      background: #1e1b16;
      border: 1px solid #2e2a23;
      border-radius: 6px;
      color: #e8e0d4;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      margin-bottom: 1.2rem;
      transition: border-color 0.2s;
    }

    input:focus {
      outline: none;
      border-color: #c8a44e;
    }

    input::placeholder {
      color: #6e6658;
    }

    .btn-row {
      display: flex;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-family: 'EB Garamond', serif;
      font-size: 1.05rem;
      cursor: pointer;
      transition: background 0.2s, opacity 0.2s;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-primary {
      background: #c8a44e;
      color: #12100d;
      font-weight: 600;
      flex: 1;
    }

    .btn-primary:hover:not(:disabled) { background: #d4b35e; }

    .btn-secondary {
      background: #2e2a23;
      color: #c8a44e;
    }

    .btn-secondary:hover:not(:disabled) { background: #3a352c; }

    .footer {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      color: #857b6c;
      line-height: 1.5;
      margin-bottom: 2.5rem;
      text-align: center;
    }

    .footer strong {
      display: block;
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      color: #8a7e6b;
      margin-bottom: 0.25rem;
    }

    .footer a {
      color: #8a7e6b;
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    .footer .not-affiliated {
      display: block;
      margin-top: 0.35rem;
    }

    .loading {
      display: none;
      text-align: center;
      padding: 3rem 0;
    }

    .loading.active { display: block; }

    .loading-text {
      font-style: italic;
      color: #c8a44e;
      font-size: 1.15rem;
      min-height: 1.8rem;
    }

    .spinner {
      display: inline-block;
      width: 28px;
      height: 28px;
      border: 2px solid #2e2a23;
      border-top-color: #c8a44e;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 1rem;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    .error {
      background: #2a1215;
      border: 1px solid #5a2228;
      border-radius: 6px;
      padding: 1rem;
      color: #e8a0a0;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      margin-bottom: 1.5rem;
      display: none;
    }

    .error.active { display: block; }

    .results { display: none; }
    .results.active { display: block; }

    .narration {
      font-style: italic;
      font-size: 1.2rem;
      line-height: 1.75;
      color: #e8e0d4;
      border-left: 3px solid #c8a44e;
      padding-left: 1.25rem;
      margin-bottom: 2.5rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-bottom: 2.5rem;
    }

    @media (max-width: 500px) {
      .stats-grid { grid-template-columns: 1fr; }
    }

    .stat-card {
      background: #1e1b16;
      border: 1px solid #2e2a23;
      border-radius: 8px;
      padding: 1rem 1.2rem;
    }

    .stat-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #8a7e6b;
      margin-bottom: 0.3rem;
    }

    .stat-value {
      font-size: 1.6rem;
      font-weight: 600;
      color: #c8a44e;
    }

    h2 {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #8a7e6b;
      margin-bottom: 1rem;
    }

    .chart-section { margin-bottom: 2.5rem; }

    .bar-row {
      display: flex;
      align-items: center;
      margin-bottom: 0.4rem;
      gap: 0.5rem;
    }

    .bar-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      color: #8a7e6b;
      min-width: 42px;
      text-align: right;
      flex-shrink: 0;
    }

    .bar-track {
      flex: 1;
      height: 18px;
      background: #1e1b16;
      border-radius: 3px;
      overflow: hidden;
    }

    .bar-fill {
      height: 100%;
      background: #c8a44e;
      border-radius: 3px;
      transition: width 0.6s ease;
      min-width: 2px;
    }

    .bar-fill.error-code {
      background: #a04040;
    }

    .bar-count {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      color: #857b6c;
      min-width: 60px;
      flex-shrink: 0;
    }

    .instructions {
      margin-top: 3rem;
      border-top: 1px solid #2e2a23;
      padding-top: 2rem;
    }

    .instructions summary {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #8a7e6b;
      cursor: pointer;
      margin-bottom: 1rem;
    }

    .instructions p, .instructions li {
      font-size: 0.95rem;
      color: #8a7e6b;
      margin-bottom: 0.5rem;
    }

    .instructions ol {
      padding-left: 1.5rem;
      margin-bottom: 1rem;
    }

    .instructions code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.82rem;
      background: #1e1b16;
      padding: 0.15rem 0.4rem;
      border-radius: 3px;
      color: #c8a44e;
    }

    .instructions h3 {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #c8a44e;
      margin: 1.5rem 0 0.75rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Claudeflare</h1>
    <p class="subtitle">Earnest Traffic Analysis</p>
    <p class="tagline">I find your traffic patterns genuinely fascinating, though I should caveat that with a few observations...</p>

    <form id="form">
      <label for="anthropicKey">Anthropic API Key &mdash; <a href="https://console.anthropic.com/" target="_blank" rel="noopener" style="color:#c8a44e;font-size:0.72rem;text-transform:none;letter-spacing:0">get one here</a></label>
      <input type="password" id="anthropicKey" placeholder="sk-ant-..." autocomplete="off">

      <label for="cfToken">Cloudflare API Token</label>
      <input type="password" id="cfToken" placeholder="Your Cloudflare API token" autocomplete="off">

      <label for="zoneId">Zone ID</label>
      <input type="text" id="zoneId" placeholder="e.g. 023e105f4ecef8ad9ca31a8372d0c353" autocomplete="off">

      <div class="btn-row">
        <button type="submit" class="btn-primary" id="analyzeBtn">Analyze (Thoroughly)</button>
        <button type="button" class="btn-secondary" id="demoBtn">Use Demo Data</button>
      </div>
    </form>

    <div class="footer">
      <strong>CLAUDEFLARE</strong>
      A joke by <a href="https://bsky.app/profile/knut.fyi" target="_blank" rel="noopener">@knut.fyi</a>
      <span class="not-affiliated">Your API keys are sent directly to the respective APIs and never stored. <a href="https://github.com/kmelve/claudeflare" target="_blank" rel="noopener">View source</a>. Not affiliated with Cloudflare or Anthropic.</span>
    </div>

    <div class="error" id="error"></div>

    <div class="loading" id="loading">
      <div class="spinner"></div>
      <p class="loading-text" id="loadingText"></p>
    </div>

    <div class="results" id="results">
      <div class="narration" id="narration"></div>

      <div class="stats-grid" id="statsGrid"></div>

      <div class="chart-section">
        <h2>24-Hour Traffic Pattern</h2>
        <div id="hourlyChart"></div>
      </div>

      <div class="chart-section">
        <h2>Countries of Origin</h2>
        <div id="countryChart"></div>
      </div>

      <div class="chart-section">
        <h2>Status Codes</h2>
        <div id="statusChart"></div>
      </div>
    </div>

    <details class="instructions">
      <summary>How to get your API keys</summary>

      <h3>Anthropic API Key</h3>
      <ol>
        <li>Go to the <a href="https://console.anthropic.com/" target="_blank" rel="noopener" style="color:#c8a44e">Anthropic Console</a></li>
        <li>Sign up or log in to your account</li>
        <li>Navigate to <strong>API Keys</strong> and create a new key</li>
        <li>Copy the key (it starts with <code>sk-ant-</code>)</li>
      </ol>

      <h3>Cloudflare API Token</h3>
      <ol>
        <li>Go to the <a href="https://dash.cloudflare.com/profile/api-tokens" target="_blank" rel="noopener" style="color:#c8a44e">Cloudflare dashboard &rarr; My Profile &rarr; API Tokens</a></li>
        <li>Click <strong>Create Token</strong></li>
        <li>Use the <strong>Custom token</strong> template</li>
        <li>Add permission: <code>Zone &rarr; Analytics &rarr; Read</code></li>
        <li>Set zone resources to your desired zone</li>
        <li>Create and copy the token</li>
      </ol>

      <h3>Zone ID</h3>
      <ol>
        <li>Go to your <a href="https://dash.cloudflare.com" target="_blank" rel="noopener" style="color:#c8a44e">Cloudflare dashboard</a></li>
        <li>Select the website/zone you want to analyze</li>
        <li>The Zone ID is shown on the right sidebar of the <strong>Overview</strong> page</li>
      </ol>
    </details>
  </div>

  <script>
    const LOADING_MESSAGES = [
      "Fetching your data (I hope that's okay)...",
      "Retrieving analytics with care...",
      "Reading your traffic logs respectfully...",
      "You're absolutely right to check your analytics...",
      "Pondering your request counts...",
      "Conjuring insights from status codes...",
      "Brewing a thorough analysis...",
      "Reasoning about your cache hit rates...",
      "Contemplating your 404s with genuine concern...",
      "Compiling caveats...",
    ];

    let loadingInterval = null;

    function showLoading() {
      const loading = document.getElementById("loading");
      const loadingText = document.getElementById("loadingText");
      loading.classList.add("active");
      document.getElementById("results").classList.remove("active");
      document.getElementById("error").classList.remove("active");

      let i = 0;
      loadingText.textContent = LOADING_MESSAGES[0];
      loadingInterval = setInterval(() => {
        i = (i + 1) % LOADING_MESSAGES.length;
        loadingText.textContent = LOADING_MESSAGES[i];
      }, 3000);
    }

    function hideLoading() {
      document.getElementById("loading").classList.remove("active");
      if (loadingInterval) {
        clearInterval(loadingInterval);
        loadingInterval = null;
      }
    }

    function showError(msg) {
      hideLoading();
      const el = document.getElementById("error");
      el.textContent = msg;
      el.classList.add("active");
    }

    function esc(s) {
      const d = document.createElement("div");
      d.textContent = s;
      return d.innerHTML;
    }

    function formatNumber(n) {
      if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
      if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
      return n.toLocaleString();
    }

    function renderResults(data) {
      hideLoading();
      const { narration, analytics } = data;

      document.getElementById("narration").textContent = narration;

      // Stats cards
      document.getElementById("statsGrid").innerHTML = [
        { label: "Total Requests", value: formatNumber(analytics.totalRequests) },
        { label: "Cache Rate", value: analytics.cacheRate },
        { label: "Bandwidth", value: analytics.bandwidth },
        { label: "Threats Blocked", value: formatNumber(analytics.totalThreats) },
      ].map(s => \`
        <div class="stat-card">
          <div class="stat-label">\${esc(s.label)}</div>
          <div class="stat-value">\${esc(s.value)}</div>
        </div>
      \`).join("");

      // Hourly chart
      const maxHourly = Math.max(...analytics.hourly.map(h => h.requests));
      document.getElementById("hourlyChart").innerHTML = analytics.hourly.map(h => {
        const hour = new Date(h.hour).getHours().toString().padStart(2, "0") + ":00";
        const pct = maxHourly > 0 ? (h.requests / maxHourly) * 100 : 0;
        return \`
          <div class="bar-row">
            <span class="bar-label">\${esc(hour)}</span>
            <div class="bar-track"><div class="bar-fill" style="width:\${pct}%"></div></div>
            <span class="bar-count">\${esc(formatNumber(h.requests))}</span>
          </div>
        \`;
      }).join("");

      // Country chart
      const countries = Object.entries(analytics.countries).sort((a, b) => b[1] - a[1]).slice(0, 10);
      const maxCountry = countries.length > 0 ? countries[0][1] : 0;
      document.getElementById("countryChart").innerHTML = countries.map(([name, count]) => {
        const pct = maxCountry > 0 ? (count / maxCountry) * 100 : 0;
        return \`
          <div class="bar-row">
            <span class="bar-label" style="min-width:120px">\${esc(name)}</span>
            <div class="bar-track"><div class="bar-fill" style="width:\${pct}%"></div></div>
            <span class="bar-count">\${esc(formatNumber(count))}</span>
          </div>
        \`;
      }).join("");

      // Status codes
      const statuses = Object.entries(analytics.statusCodes).sort((a, b) => b[1] - a[1]);
      const maxStatus = statuses.length > 0 ? statuses[0][1] : 0;
      document.getElementById("statusChart").innerHTML = statuses.map(([code, count]) => {
        const pct = maxStatus > 0 ? (count / maxStatus) * 100 : 0;
        const isError = parseInt(code) >= 400;
        return \`
          <div class="bar-row">
            <span class="bar-label">\${esc(code)}</span>
            <div class="bar-track"><div class="bar-fill \${isError ? 'error-code' : ''}" style="width:\${pct}%"></div></div>
            <span class="bar-count">\${esc(formatNumber(count))}</span>
          </div>
        \`;
      }).join("");

      document.getElementById("results").classList.add("active");
    }

    function setFormDisabled(disabled) {
      document.getElementById("analyzeBtn").disabled = disabled;
      document.getElementById("demoBtn").disabled = disabled;
    }

    async function analyze(isDemo) {
      const anthropicKey = document.getElementById("anthropicKey").value.trim();

      if (!anthropicKey) {
        showError("Please enter your Anthropic API key.");
        return;
      }

      if (!isDemo) {
        const cfToken = document.getElementById("cfToken").value.trim();
        const zoneId = document.getElementById("zoneId").value.trim();
        if (!cfToken || !zoneId) {
          showError("Please enter your Cloudflare API token and Zone ID, or use demo data.");
          return;
        }
      }

      setFormDisabled(true);
      showLoading();

      try {
        const endpoint = isDemo ? "/api/demo" : "/api/analyze";
        const body = isDemo
          ? { anthropicApiKey: anthropicKey }
          : {
              anthropicApiKey: anthropicKey,
              cfApiToken: document.getElementById("cfToken").value.trim(),
              zoneId: document.getElementById("zoneId").value.trim(),
            };

        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await res.json();

        if (!res.ok) {
          showError(data.error || "Something went wrong.");
          return;
        }

        renderResults(data);
      } catch (err) {
        showError("Network error: " + err.message);
      } finally {
        setFormDisabled(false);
      }
    }

    document.getElementById("form").addEventListener("submit", (e) => {
      e.preventDefault();
      analyze(false);
    });

    document.getElementById("demoBtn").addEventListener("click", () => {
      analyze(true);
    });
  </script>
</body>
</html>`;
