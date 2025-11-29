# Agent KAI — Frontend demo

This folder contains a simple single-page HTML demo for an AI assistant called **Agent KAI**.

Files added

- `index.html` — the chat UI
- `styles.css` — CSS styling for the UI
- `app.js` — frontend chat logic; attempts to POST to `/chat` and falls back to a local demo reply when no backend is present

How to run

1. Open the `index.html` file directly in your browser (works for simple testing). Some browsers restrict fetch to local files, so for full functionality it's better to serve the folder over HTTP.

2. To serve locally with Python (recommended):

```powershell
# from this folder (Agent_KAI_backend)
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

3. To integrate with a backend AI service, implement a POST endpoint at `/chat` that accepts JSON like:

```json
{ "message": "user text" }
```

and returns a JSON response like:

```json
{ "reply": "AI reply text" }
```

Notes

- The frontend includes a graceful fallback: if `/chat` is not available it simulates a reply so you can test the UI.
- If you want, I can add a tiny Flask example server in `main.py` that proxies to OpenAI (or another provider) — tell me which provider and whether you have an API key and I'll wire it up.
