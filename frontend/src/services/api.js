const getBaseUrl = () => {
  const envUrl = (import.meta.env?.VITE_API_URL || '').trim();
  if (envUrl) return envUrl.replace(/\/$/, '');
  // Default to relative path; vite dev proxy will forward to the backend
  return '/api';
};

const API_BASE_URL = getBaseUrl();

/**
 * Send a message to the AI and get a response
 * @param {string} message - The user's message
 * @returns {Promise<string>} The AI's response
 */
export const sendChatMessage = async (message) => {
  // Timeout to avoid hanging requests in dev
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  // Minimal local fallback so the UI remains usable when the API isn't reachable
  const mockReply = (msg) => {
    const trimmed = (msg || '').trim();
    if (!trimmed) return "Hi! I'm running in demo mode because the AI server isn't reachable right now.";
    return `I couldn't reach the AI server, so this is a local demo response. You said: "${trimmed}".`;
  };

  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    if (!data || typeof data.reply !== 'string') {
      throw new Error('Invalid API response shape');
    }

    return data.reply;
  } catch (error) {
    console.warn('Falling back to mock reply. Check VITE_API_URL and that the backend is running.', error);
    return mockReply(message);
  } finally {
    clearTimeout(timeoutId);
  }
};

/**
 * Fetch conversation history
 * @returns {Promise<Array>} Array of message objects
 */
export const fetchHistory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/history`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
};
