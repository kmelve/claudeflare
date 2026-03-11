# Claudeflare

**Earnest Traffic Analysis** — Claude analyzes your Cloudflare analytics with genuine fascination, unnecessary caveats, and philosophical concern for your 404s.

> *I find your traffic patterns genuinely fascinating, though I should caveat that with a few observations...*

## What is this?

Claudeflare is a Cloudflare Worker that pulls your site's analytics from the Cloudflare GraphQL API and hands them to Claude, who earnestly overthinks every metric. You get back a narrated analysis alongside charts for hourly traffic, geographic distribution, and status codes.

It's a joke. But it works.

**Try the demo at [claudeflare.app](https://claudeflare.app)**

## How it works

1. You provide your Anthropic API key, Cloudflare API token, and Zone ID
2. The Worker fetches 24 hours of analytics from Cloudflare's GraphQL API
3. Claude (Sonnet) analyzes the data with earnest thoroughness
4. You get a narrated analysis with traffic charts

Your API keys are sent directly to the respective APIs through the Worker and are never stored.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/)
- A [Cloudflare account](https://dash.cloudflare.com/) (for deploying)
- An [Anthropic API key](https://console.anthropic.com/) (for using the app)

### Local development

```bash
npm install
npm run dev
```

Open [localhost:8787](http://localhost:8787).

### Deploy

```bash
npm run deploy
```

### Getting your Cloudflare credentials

**API Token:**
1. Go to [Cloudflare Dashboard → API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Create a Custom Token with permission: **Zone → Analytics → Read**
3. Scope it to the zone(s) you want to analyze

**Zone ID:**
Find it on the **Overview** page of your site in the Cloudflare dashboard (right sidebar).

## Stack

- [Cloudflare Workers](https://workers.cloudflare.com/) — runtime
- [Anthropic API](https://docs.anthropic.com/) — Claude Sonnet for analysis
- [Cloudflare GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/) — traffic data
- Vanilla HTML/CSS/JS — no build step for the frontend

## License

MIT

---

A joke by [@knut.fyi](https://bsky.app/profile/knut.fyi). Not affiliated with Cloudflare or Anthropic.
