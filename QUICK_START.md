# Quick Start Guide

## Local Development Setup

### 1. Backend (Terminal 1)
```bash
cd server
npm install
npm start
# Server runs on http://localhost:3000
```

### 2. Frontend (Terminal 2)
```bash
cd frontend

# IMPORTANT: Create .env file for local development
cp .env.example .env

# Install and run
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

Your `.env` file should contain:
```
VITE_API_URL=http://localhost:3000/api
```

## ⚠️ Important Notes

### For Local Development:
- Use `.env` file (you must create this)
- Points to `http://localhost:3000/api`
- **Do NOT use `.env.production`** - it's for the deployed version!

### For Deployed Version (GitHub Pages):
- Uses `.env.production` file (already in repo)
- Points to public ngrok URL
- Automatically used when building for production

## Common Mistakes

❌ **Wrong:** Using `.env.production` for local development
✅ **Right:** Create your own `.env` file with `VITE_API_URL=http://localhost:3000/api`

❌ **Wrong:** Trying to run without creating `.env` file
✅ **Right:** Copy `.env.example` to `.env` before starting

❌ **Wrong:** Expecting `.env.production` to work locally
✅ **Right:** `.env.production` is ONLY for the deployed GitHub Pages version

## Deployment (GitHub Pages + ngrok)

See `NGROK_SETUP.md` for full instructions on hosting the backend publicly.

Quick version:
1. Start server with ngrok: `./start-server-ngrok.sh`
2. Update `frontend/.env.production` with your ngrok URL
3. Commit and push - GitHub Actions will deploy automatically
