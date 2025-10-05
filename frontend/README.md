# Echo - Minimalist AI Companion (Frontend)

A beautiful, minimalist chat interface for conversing with an AI companion powered by Gemma 3:1b.

## Features

- 🎨 **Minimalist Design** - Clean, uncluttered interface with a serene aesthetic
- ✨ **Smooth Animations** - Gentle fade-ins and glowing effects
- 💬 **Real-time Chat** - Responsive conversation interface
- 📱 **Responsive** - Works beautifully on all screen sizes
- ⚙️ **Settings Menu** - Access to conversation history management

## Tech Stack

- **React** - UI framework
- **Vite** - Fast development build tool
- **Tailwind CSS** - Utility-first styling
- **Context API** - State management

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Design Specifications

### Color Palette
- Background: Off-white (#FCFCFC)
- Text: Dark Gray (#333333)
- Accent/Glow: Soft, warm yellow (#FFD700)

### Typography
- Font: Inter (with system font fallbacks)
- Conversation Text: 16px
- Input Placeholder: 14px

### Key Features
- Vertically centered conversation
- Subtle glow effect behind AI messages
- Fixed input field at bottom
- Settings icon (three dots) at top center

## Project Structure

```
src/
├── components/
│   ├── ChatView.jsx      # Main orchestrating component
│   ├── Message.jsx        # Individual message display
│   ├── InputField.jsx     # User input component
│   └── SettingsMenu.jsx   # Settings dropdown
├── context/
│   └── ChatContext.jsx    # Global chat state management
├── services/
│   └── api.js            # Backend API integration
├── App.jsx               # Root component
└── index.css             # Global styles & Tailwind imports
```

## API Integration

The frontend expects a backend API with the following endpoints:

- `POST /api/chat` - Send a message and receive AI response
  - Request: `{ "message": "User's message" }`
  - Response: `{ "reply": "AI's response" }`

- `GET /api/history` - Fetch conversation history
  - Response: `[{ "sender": "user" | "ai", "text": "Message text" }]`

Configure the API URL in the `.env` file using `VITE_API_URL`.

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to static hosting services like Vercel, Netlify, or AWS S3.

## Development Notes

- Currently uses mock AI responses for development
- API integration is ready but requires backend implementation
- Settings menu includes conversation history clearing
- Responsive design optimized for mobile and desktop

## License

The Unlicense
