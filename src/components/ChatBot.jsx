
import { useState, useEffect } from 'react'


const ChatBot = () => {
    const [isChatReady, setIsChatReady] = useState(false);

    useEffect(() => {
      const initializeChat = () => {
        if (window.botpressWebChat) {
          window.botpressWebChat.init({
            // Your botId should match the one in your config.js file
            botId: 'a737cfbd-5c28-4c28-9662-b981ffab6562',
            hostUrl: 'https://cdn.botpress.cloud/webchat/v2.1',
            messagingUrl: 'https://messaging.botpress.cloud',
            clientId: 'a737cfbd-5c28-4c28-9662-b981ffab6562',
            // Uncomment this to show the chatbot icon immediately
            showConversationsButton: true,
          });
          setIsChatReady(true);
        } else {
          setTimeout(initializeChat, 500);
        }
      };
  
      initializeChat();
    }, []);
    

  return (
    <div> {isChatReady ? (
        <p>Chatbot is ready! Click the icon to start chatting.</p>
      ) : (
        <p>Loading chatbot...</p>
      )}</div>
  )
}

export default ChatBot