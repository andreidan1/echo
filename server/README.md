# Echo Backend (Express + Ollama)

Local proxy server that forwards chat requests to a local Ollama instance running the Gemma3:1b model.

## Prerequisites
- Node.js 18+
- Ollama installed and running (default at http://127.0.0.1:11434)
- Gemma3:1b model pulled: `ollama pull gemma3:1b` // or whichever model you choose to use, but i've found gemma to be the best one for this specific purpose

## Setup

```
npm install
npm start
```

Server starts on http://localhost:3000

### Environment variables (optional)
- `PORT` (default: 3000)
- `OLLAMA_URL` (default: http://127.0.0.1:11434)
- `OLLAMA_MODEL` (default: gemma3:1b)

## API
- `POST /api/chat` { "message": "..." } -> { "reply": "..." }
- `GET /api/history` -> array of { sender, text, timestamp }
- `GET /api/health` -> { ok: true, model }