# Running Echo Server with ngrok

This guide explains how to expose your Echo server to the internet using ngrok.

## Quick Start

1. **Start the server with ngrok:**
   ```bash
   ./start-server-ngrok.sh
   ```

2. **Copy the ngrok URL** from the terminal output (looks like `https://abc123.ngrok-free.app`)

3. **Update the frontend environment file:**
   ```bash
   # Edit frontend/.env.production
   nano frontend/.env.production
   
   # Replace with your actual ngrok URL:
   VITE_API_URL=https://YOUR-NGROK-URL.ngrok-free.app/api
   ```

4. **Rebuild and deploy the frontend:**
   ```bash
   cd frontend
   npm run build
   cd ..
   git add frontend/.env.production
   git commit -m "Update backend URL to ngrok"
   git push origin main
   ```

## Manual Setup (Alternative)

If you prefer to run things separately:

### Terminal 1 - Start the server:
```bash
cd server
node index.js
```

### Terminal 2 - Start ngrok:
```bash
ngrok http 3000
```

## Important Notes

- **Free ngrok URLs change** every time you restart ngrok. You'll need to update `.env.production` and redeploy whenever you restart.
- **ngrok limits:** Free tier has connection limits. Consider upgrading for production use.
- **CORS is configured** to accept requests from GitHub Pages and any ngrok domain.
- **Keep the terminal open** - closing it will stop both the server and ngrok tunnel.

## Verifying It Works

1. Check server health:
   ```bash
   curl https://YOUR-NGROK-URL.ngrok-free.app/api/health
   ```

2. Visit your deployed frontend:
   ```
   https://andreidan1.github.io/echo/
   ```

## Stopping the Server

Press `Ctrl+C` in the terminal where the script is running. This will stop both the server and ngrok.

## Troubleshooting

### "The site can't be reached" or 404 errors

This usually means the ngrok URL has changed. With the free tier, ngrok generates a new URL every time you restart it.

**Solution:**
1. Check the current ngrok URL: `curl -s http://localhost:4040/api/tunnels | grep -o 'https://[^"]*\.ngrok[^"]*'`
2. Update `frontend/.env.production` with the new URL
3. Rebuild and push: `cd frontend && npm run build && cd .. && git add . && git commit -m "Update ngrok URL" && git push`

### Local development not working

If you're trying to run the project locally and getting connection errors:

1. Make sure you have a `.env` file in the `frontend/` directory (NOT `.env.production`)
2. The `.env` file should contain: `VITE_API_URL=http://localhost:3000/api`
3. The `.env.production` file is ONLY for the deployed GitHub Pages version

### Getting a static ngrok URL

To avoid URL changes, you can upgrade to ngrok Pro which provides static domains. This eliminates the need to update and redeploy every time.
