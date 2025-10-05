import { ChatProvider } from './context/ChatContext';
import ChatView from './components/ChatView';

function App() {
  return (
    <ChatProvider>
      <ChatView />
    </ChatProvider>
  );
}

export default App;
