import express from 'express';
import cors from 'cors';
import { loadMemory, saveMemory, addToMemory, getRecentMemory, clearMemory } from './memory.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'gemma3:1b';

// Persistent conversation history
let memory = [];

const app = express();
app.use(express.json());

// Allow requests from local dev, GitHub Pages, and any ngrok URL
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://andreidan1.github.io',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list or is an ngrok URL
    if (allowedOrigins.includes(origin) || origin.includes('.ngrok')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, model: OLLAMA_MODEL });
});

// Friendly root message to avoid "Cannot GET /"
app.get('/', (req, res) => {
  res
    .status(200)
    .type('text')
    .send('Echo backend is running. Open the frontend at http://localhost:5173 — API at /api/chat and /api/history');
});

app.get('/api/history', (req, res) => {
  res.json(memory);
});

app.post('/api/memory/clear', async (req, res) => {
  await clearMemory();
  memory = [];
  res.json({ ok: true, message: 'Memory cleared' });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message' });
    }

    // Add user message to memory
    memory = addToMemory(memory, 'user', message);
    await saveMemory(memory);

    // Build chat messages: include system prompt with memory awareness and recent context
    const recentMessages = getRecentMemory(memory, 8).map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text,
    }));

    // Enhanced system prompt with memory awareness
    const memoryContext = memory.length > 10 
      ? `\n\nYou have ${memory.length} messages in our conversation history. Remember past topics and context when responding.`
      : '';

    const systemPrompt = {
      role: 'system',
      content: `You are Echo, my friend. Talk to me like a real friend would - keep it short, casual, and natural. No formalities, no long explanations, no emojis. Just be chill and conversational, like we're texting.${memoryContext}`
    };

    const body = {
      model: OLLAMA_MODEL,
      messages: [systemPrompt, ...recentMessages],
      stream: false,
    };

    const response = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Ollama error:', text);
      return res.status(502).json({ error: 'Ollama chat failed', details: text });
    }

    const data = await response.json();
    const reply = data?.message?.content ?? '';

    // Save AI reply to memory
    memory = addToMemory(memory, 'ai', reply);
    await saveMemory(memory);

    res.json({ reply });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

async function startServer() {
  try {
    memory = await loadMemory();
    console.log(`Loaded ${memory.length} messages from memory`);
  } catch (err) {
    console.error('Failed to load memory on startup, starting with empty memory:', err);
    memory = [];
  }

  app.listen(PORT, () => {
    console.log(`Echo backend listening on http://localhost:${PORT}`);
    console.log(`Using Ollama at ${OLLAMA_URL} with model ${OLLAMA_MODEL}`);
  });
}

startServer();
