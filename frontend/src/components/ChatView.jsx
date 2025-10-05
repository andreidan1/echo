import { useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import Message from './Message';
import InputField from './InputField';
import SettingsMenu from './SettingsMenu';

const ChatView = () => {
  const { messages, isNewMessage } = useChat();
  const containerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  // Get the latest AI message
  const latestAIMessage = [...messages].reverse().find(msg => msg.sender === 'ai');

  return (
<div className="h-screen w-screen bg-echo-bg/20 flex flex-col overflow-hidden">
      <SettingsMenu />

      {/* Main chat area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto px-6 py-20 flex flex-col justify-center"
      >
        <div className="flex-1 flex flex-col justify-center space-y-8 py-8">
          {messages.map((message, index) => (
            <Message
              key={message.id}
              message={message}
              isLatest={latestAIMessage?.id === message.id}
              showGlow={isNewMessage && latestAIMessage?.id === message.id}
            />
          ))}
        </div>
      </div>

      <InputField />
    </div>
  );
};

export default ChatView;
