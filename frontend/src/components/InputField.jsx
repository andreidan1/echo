import { useState, useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';

const InputField = () => {
  const [input, setInput] = useState('');
  const { sendMessage, isLoading } = useChat();
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
      // Keep focus on input after submit
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  // Auto-focus input when loading completes
  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-echo-bg/95 backdrop-blur-sm border-t border-gray-200/50">
      <div className="max-w-2xl mx-auto px-6 py-4">
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isLoading ? "Echo is thinking..." : "Type your message..."}
            disabled={isLoading}
            autoFocus
            className="
              w-full 
              px-6 py-4 
              text-lg 
              text-echo-text
              placeholder:text-echo-text/50
              bg-echo-bg/90
              border border-yellow-200/70
              rounded-full
              outline-none
              focus:border-echo-accent/70
              focus:ring-2
              focus:ring-echo-accent/30
              shadow-[0_1px_8px_rgba(255,210,77,0.15)]
              transition-all
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          />
        </form>
      </div>
    </div>
  );
};

export default InputField;
