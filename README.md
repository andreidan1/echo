# Echo - Open Source AI Companion

Echo is a free, open-source alternative to Friend.com, bringing AI companionship to everyone regardless of their ability to pay. This project democratizes access to conversational AI by providing a minimalist, privacy-focused companion that runs entirely on your own hardware.

## Why Echo Exists

Friend.com offers an AI companion experience but is only avaiable as a demo on their website with proprietary models and hardware. Also, their main source of income is the AI necklace , which is expensive and has the same proprietary/privacy issues as the website Friend. Echo was created to make this technology accessible to everyone by:

- Running completely locally on your machine
- Using open-source language models (Gemma, Llama, etc.)
- Requiring no subscription fees or cloud services
- Giving you full control over your data and conversations
- Providing the same minimalist, focused experience without the cost barrier

## Philosophy

Echo embodies the principle that meaningful AI companionship should be a right, not a privilege. By leveraging local LLMs through Ollama and a clean, distraction-free interface, Echo delivers the core Friend.com experience while maintaining:

- **Complete Privacy**: Your conversations never leave your machine
- **Zero Cost**: No subscriptions, no API fees, no hidden charges
- **Full Control**: Choose your model, customize behavior, own your data
- **Open Source**: Transparent, auditable, and community-driven

## Technical Architecture

Echo is built as a modern web application with a clear separation between frontend and backend:

### Frontend
- **Framework**: React 19 with Vite for fast development and optimized builds
- **Styling**: Tailwind CSS 4 for a minimalist, responsive design
- **State Management**: React Context API for lightweight conversation state
- **Design**: Inspired by Friend.com's serene aesthetic with off-white backgrounds, subtle glows, and centered conversation flow

### Backend
- **Runtime**: Node.js with Express.js for a lightweight API server
- **LLM Integration**: Direct integration with Ollama's local API
- **Storage**: In-memory conversation history (easily extensible to persistent storage)
- **CORS**: Configured for local development with localhost and 127.0.0.1 support

#### Memory System
- **Persistent Store**: Conversations are saved to `server/memory.json` via `memory.js`
- **Warm Start**: The backend loads prior messages at startup so Echo remembers past sessions
- **API Access**: `POST /api/memory/clear` clears saved memory for a fresh start
- **Customization**: Adjust memory window or storage strategy within `server/index.js`

### LLM Layer
- **Engine**: Ollama for running quantized models locally
- **Default Model**: Gemma 3:1b (configurable to any Ollama-supported model)
- **Inference**: Runs entirely on your CPU/GPU with no external API calls
- **Context**: Maintains conversation history with the last 8 messages for coherent dialogue

## Features

### Core Functionality
- **Conversational AI**: Natural dialogue with context-aware responses
- **Conversation History**: View and manage your chat history
- **Persistent Memory**: Echo remembers past conversations across restarts using on-disk storage
- **Real-time Responses**: Fast inference with local models
- **Minimalist UI**: Clean, distraction-free interface focused on the conversation

### Privacy & Control
- **Local Processing**: All AI inference happens on your machine
- **No Telemetry**: Zero data collection or external tracking
- **Customizable Prompts**: Modify system prompts to change AI personality
- **Model Flexibility**: Switch between different Ollama models based on your hardware

### Design Elements
- **Serene Aesthetic**: Off-white backgrounds with dark gray text
- **Subtle Animations**: Gentle fade-ins and pulsing glow effects
- **Responsive Layout**: Works seamlessly on desktop and mobile
- **Centered Focus**: Conversation is vertically centered for optimal reading

## Getting Started

### Prerequisites

1. **Node.js 18+**: Required for both frontend and backend
2. **Ollama**: Install from [ollama.ai](https://ollama.ai)
3. **Gemma 3:1b Model**: Pull the model after installing Ollama

```bash
# Install Ollama (Linux)
curl -fsSL https://ollama.ai/install.sh | sh

# Pull the Gemma 3:1b model
ollama pull gemma3:1b

# Verify Ollama is running
ollama list
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/echo.git
cd echo
```

2. **Start the backend**
```bash
cd server
npm install
npm start
```

The backend will start on `http://localhost:3000`

3. **Start the frontend** (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

4. **Open your browser** and navigate to `http://localhost:5173`

### Configuration

#### Backend Environment Variables
Create a `.env` file in the `server/` directory:

```env
PORT=3000
OLLAMA_URL=http://127.0.0.1:11434
OLLAMA_MODEL=gemma3:1b
```

#### Frontend Environment Variables
Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:3000/api
```

## API Reference

### Backend Endpoints

#### POST /api/chat
Send a message to the AI and receive a response.

**Request:**
```json
{
  "message": "How are you doing?"
}
```

**Response:**
```json
{
  "reply": "I'm doing well, thanks for asking!"
}
```

#### GET /api/history
Retrieve the conversation history.

**Response:**
```json
[
  {
    "sender": "user",
    "text": "Hello",
    "timestamp": "2025-10-05T10:22:35.000Z"
  },
  {
    "sender": "ai",
    "text": "Hi there!",
    "timestamp": "2025-10-05T10:22:36.000Z"
  }
]
```

#### GET /api/health
Check backend and model status.

**Response:**
```json
{
  "ok": true,
  "model": "gemma3:1b"
}
```

## Customization

### Changing the AI Personality

Edit the system prompt in `server/index.js` (line 50-53):

```javascript
const systemPrompt = {
  role: 'system',
  content: 'You are Echo, my friend. Talk to me like a real friend would - keep it short, casual, and natural. No formalities, no long explanations. Just be chill and conversational, like we\'re texting.'
};
```

### Using Different Models

Echo supports any model available through Ollama. Popular alternatives:

- **Llama 3.2 (3B)**: `ollama pull llama3.2:3b` - More capable, requires more RAM
- **Phi 3 Mini**: `ollama pull phi3:mini` - Efficient and fast
- **Mistral 7B**: `ollama pull mistral:7b` - High quality responses

Update the `OLLAMA_MODEL` environment variable or change the default in `server/index.js`.

### Adjusting Context Window

Modify the number of messages included in context (line 45 in `server/index.js`):

```javascript
const recentMessages = history.slice(-8).map(m => ({
  role: m.sender === 'user' ? 'user' : 'assistant',
  content: m.text,
}));
```

Change `-8` to include more or fewer messages.

## Project Structure

```
echo/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # UI components (ChatView, Message, InputField, etc.)
│   │   ├── context/       # React Context for state management
│   │   ├── services/      # API integration layer
│   │   ├── App.jsx        # Root component
│   │   └── index.css      # Global styles and Tailwind imports
│   ├── package.json
│   └── vite.config.js
├── server/                # Express backend API
│   ├── index.js           # Main server file with Ollama integration
│   ├── memory.js          # Conversation memory management
│   ├── package.json
│   └── README.md
├── dev.md                 # Original development specification
└── README.md              # This file
```

## Comparison: Echo vs Friend.com

| Feature | Echo | Friend.com |
|---------|------|------------|
| **Cost** | Free, open source | $99 hardware + subscription |
| **Privacy** | 100% local, no data leaves your machine | Cloud-based, data sent to servers |
| **Models** | Any Ollama model (Gemma, Llama, Mistral, etc.) | Proprietary model |
| **Customization** | Full control over prompts, models, UI | Limited customization |
| **Hardware** | Runs on any computer with Ollama | Requires proprietary pendant device |
| **Internet** | Optional (only for model downloads) | Required for operation |
| **Data Ownership** | You own all conversations | Stored on Friend.com servers |
| **Source Code** | Fully open and auditable | Closed source |

## Performance Considerations

### Hardware Requirements

- **Minimum**: 8GB RAM, modern CPU (for Gemma 1B-3B models)
- **Recommended**: 16GB RAM, GPU with 6GB+ VRAM (for larger models)
- **Optimal**: 32GB RAM, GPU with 12GB+ VRAM (for Llama 70B and similar)

### Model Selection Guide

- **Gemma 3:1b**: Fast, lightweight, good for basic conversations (2GB RAM)
- **Gemma 2:2b**: Better quality, still fast (4GB RAM)
- **Llama 3.2:3b**: Excellent balance of speed and quality (6GB RAM)
- **Mistral 7B**: High-quality responses, slower (12GB RAM)

### Optimization Tips

1. Use quantized models (Q4_K_M or Q5_K_M) for faster inference
2. Reduce context window size for lower memory usage
3. Enable GPU acceleration in Ollama for 3-10x speedup
4. Close other applications to free up RAM during inference

## Deployment

### Production Deployment

#### Frontend (Static Hosting)
Deploy to Vercel, Netlify, or any static host:

```bash
cd frontend
npm run build
# Upload dist/ folder to your hosting service
```

#### Backend (Server Deployment)
Deploy to any Node.js hosting platform:

```bash
cd server
# Ensure Ollama is installed on the server
# Set environment variables
npm start
```

Note: For production use, consider adding persistent storage (PostgreSQL, MongoDB) for conversation history.

### Docker Deployment (Coming Soon)

A Docker Compose setup for easy deployment is planned for future releases.

## Roadmap

- [ ] Docker Compose setup for one-command deployment
- [ ] Persistent conversation storage (PostgreSQL/MongoDB)
- [ ] Multi-user support with authentication
- [ ] Voice input/output integration
- [ ] Mobile app (React Native)
- [ ] Streaming responses for real-time feedback
- [ ] Conversation export/import
- [ ] Plugin system for extensibility

## Contributing

Echo is open source and welcomes contributions. Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and test thoroughly
4. Commit with clear messages: `git commit -m "Add feature X"`
5. Push to your fork: `git push origin feature/your-feature`
6. Open a pull request

### Code Style

- Frontend: Follow React best practices, use functional components and hooks
- Backend: Use async/await, handle errors gracefully
- Both: Write clear comments for complex logic

## License

The unlicense - see LICENSE file for details.

Echo is free software. You can use, modify, and distribute it freely.

## Acknowledgments

- **Friend.com**: Inspiration for the minimalist companion experience
- **Ollama**: Making local LLM inference accessible and easy
- **Google**: Gemma open-source language models
- **Meta**: Llama open-source language models
- **React & Vite**: Modern web development tools
- **Tailwind CSS**: Utility-first styling framework

## Support

- **Issues**: Report bugs or request features on GitHub Issues
- **Discussions**: Join conversations on GitHub Discussions
- **Documentation**: Check the wiki for detailed guides

## Final Note

Echo exists because everyone deserves access to AI companionship without financial barriers or privacy compromises. By running locally and using open-source models, Echo ensures that meaningful conversations with AI remain accessible, private, and free.

If Friend.com represents the premium, hardware-integrated approach, Echo represents the democratic, software-first alternative. Both have their place, but Echo ensures that cost is never a barrier to connection.
