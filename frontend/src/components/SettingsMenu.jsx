import { useState } from 'react';
import { useChat } from '../context/ChatContext';

const SettingsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const { clearHistory } = useChat();

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear the conversation history?')) {
      clearHistory();
      setIsOpen(false);
    }
  };

  const handleAboutClick = () => {
    setIsOpen(false);
    setShowAbout(true);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-2xl mx-auto px-6 py-4 flex justify-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
className="
            p-2 
            text-echo-text/60 
            hover:text-echo-text 
            transition-colors
            focus:outline-none
            cursor-pointer
          "
          aria-label="Settings"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="5" r="1.5" fill="currentColor" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            <circle cx="12" cy="19" r="1.5" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* Settings Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/10 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden origin-top transform-gpu animate-[menuDropdown_0.18s_cubic-bezier(0.16,1,0.3,1)_forwards]">
            <div className="py-2 min-w-[220px]">
              <button
                onClick={handleClearHistory}
                className="
                  w-full 
                  px-6 py-3 
                  text-left 
                  text-base 
                  text-echo-text 
                  hover:bg-gray-50 
                  transition-colors
                "
              >
                Clear History
              </button>
              <button
                onClick={handleAboutClick}
                className="
                  w-full 
                  px-6 py-3 
                  text-left 
                  text-base 
                  text-echo-text 
                  hover:bg-gray-50 
                  transition-colors
                "
              >
                About Echo
              </button>
            </div>
          </div>
        </>
      )}

      {/* About Dialog */}
      {showAbout && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 animate-[backdropFadeIn_0.3s_ease-out]"
            onClick={() => setShowAbout(false)}
          />
          
          {/* Dialog */}
          <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-lg w-full p-10 transform-gpu animate-[modalFadeIn_0.35s_ease-out]">
              <h2 className="text-3xl font-semibold text-echo-text mb-6">About Echo</h2>
              <div className="space-y-4 text-echo-text/80 text-lg leading-relaxed">
                <p>
                  Echo is a minimalist AI companion designed to provide thoughtful, 
                  focused conversations in a beautiful, distraction-free interface.
                </p>
                <p>
                  Built with simplicity and elegance in mind, Echo helps you think 
                  through ideas, get answers, and explore topics without overwhelming complexity.
                </p>
              </div>
              <button
                onClick={() => setShowAbout(false)}
                className="
                  mt-8 
                  w-full 
                  px-5 py-3 
                  text-lg
                  bg-echo-accent 
                  hover:bg-echo-accent/90 
                  text-echo-text 
                  rounded-xl 
                  transition-all
                  hover:shadow-lg
                  font-medium
                "
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SettingsMenu;
