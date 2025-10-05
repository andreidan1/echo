const Message = ({ message, isLatest, showGlow }) => {
  const { sender, text } = message;
  const isAI = sender === 'ai';

  return (
    <div 
      className={`
        animate-fade-in
        text-center 
        ${isAI ? 'text-echo-text' : 'text-echo-text/70'}
        ${isLatest && isAI ? 'relative glow-effect' : ''}
        ${isLatest && isAI && showGlow ? 'pulse' : ''}
      `}
    >
      <p className={`
        ${isAI ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}
        max-w-3xl mx-auto px-6
        leading-relaxed
      `}>
        {text}
      </p>
    </div>
  );
};

export default Message;
