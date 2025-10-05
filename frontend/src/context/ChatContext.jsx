import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I\'m Echo, your AI companion. How can I help you today?',
      timestamp: new Date().toISOString(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);


  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    // Clear screen while loading
    setMessages([]);
    setIsLoading(true);

    try {
      const { sendChatMessage } = await import('../services/api');
      const response = await sendChatMessage(text);
      
      setIsLoading(false);
      setIsTyping(true);
      
      // Typing animation: reveal characters quickly
      const chars = response.split('');
      let displayedText = '';
      
      for (let i = 0; i < chars.length; i++) {
        displayedText += chars[i];
        setMessages([{
          id: Date.now(),
          sender: 'ai',
          text: displayedText,
          timestamp: new Date().toISOString(),
        }]);
        // Fast typing: 15ms per character
        await new Promise(resolve => setTimeout(resolve, 15));
      }
      
      setIsTyping(false);
      setIsNewMessage(true);
      setTimeout(() => setIsNewMessage(false), 2000);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
      setMessages([{
        id: Date.now(),
        sender: 'ai',
        text: 'Sorry, I encountered an error talking to the AI. Please try again.',
        timestamp: new Date().toISOString(),
      }]);
    }
  }, []);

  const clearHistory = useCallback(() => {
    setMessages([{
      id: Date.now(),
      sender: 'ai',
      text: 'Conversation cleared. How can I help you today?',
      timestamp: new Date().toISOString(),
    }]);
  }, []);


  return (
    <ChatContext.Provider value={{ 
      messages, 
      isLoading,
      isTyping,
      isNewMessage,
      sendMessage, 
      clearHistory 
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
