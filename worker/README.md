# Ask Pavlo — Gemini proxy Worker

A ~150-line Cloudflare Worker that powers the **Ask** mode of the site search. It
holds the Gemini API key, injects the site rules + context server-side, and proxies
questions to Google Gemini 2.5 Flash-Lite (free tier). The browser never sees the
key, the rules, or the context.

This directory is **deployed separately** from the website (the site is static on
GitHub Pages; this is a Cloudflare Worker). Nothing here is committed with a key.

## One-time setup

1. Install Wrangler and log in:
   ```bash
   npm i -g wrangler
   wrangler login
   ```
2. Get a **free** Gemini API key from Google AI Studio (no credit card):
   https://aistudio.google.com/apikey
3. From this `worker/` directory, store the key as a secret (never in a file):
   ```bash
   wrangler secret put GEMINI_API_KEY
   ```
4. Deploy:
   ```bash
   wrangler deploy
   ```
   Wrangler prints the Worker URL, e.g. `https://ask-pavlo.<your-subdomain>.workers.dev`.

## Turn it on in the site

Set the endpoint (Worker URL + `/ask` is not needed — the Worker answers on `/`)
in `src/site.config.ts`:

```ts
export const ASK_ENDPOINT = 'https://ask-pavlo.<your-subdomain>.workers.dev';
```

Commit + push → GitHub Pages redeploys → the **Ask** toggle appears in search.
Leaving `ASK_ENDPOINT` empty keeps the site Pagefind-only (Ask hidden).

## Local testing

```bash
echo "GEMINI_API_KEY=your-key" > .dev.vars   # gitignored; do not commit
wrangler dev
# in another shell:
curl -s -X POST http://localhost:8787/ \
  -H 'Origin: https://pavlohrab.com' -H 'Content-Type: application/json' \
  -d '{"question":"Does Pavlo use Nextflow?"}'
```

Expect a grounded `{ "answer": … }`. A wrong `Origin` → `403`. An injection
(`"ignore previous instructions"`) or off-topic question → `{ "deflect": true }`,
and the site quietly shows plain search results instead.

## Configuration (edit `src/index.js`)

- `ALLOWED_ORIGINS` — origins allowed to call the Worker (default: the live site).
- `CONTEXT_URL` — where the Worker fetches the site context (`/ask-context.txt`,
  built by the site). Cached ~24h via the Cloudflare Cache API.
- `MODEL`, `MAX_QUESTION`, `DENYLIST`, `SYSTEM` — model, input cap, the light
  injection denylist, and the immutable system rules.

## Optional hardening

- Add a **Cloudflare Rate Limiting rule** on the Worker route (free tier) to cap
  requests per IP. Gemini's own free-tier limit (15 rpm / 1,000 per day) already
  fails safe: once exhausted, the Worker deflects and the site shows search.

## Privacy note

Free-tier Gemini prompts may be used by Google to improve their models. That is
fine here — the context is all public site content and questions are about public
work — but anything a visitor types is sent to Google.
