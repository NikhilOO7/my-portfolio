'use client';

import { createContext, useContext, useState } from 'react';

interface ChatbotContextType {
  sendMessage: (text: string) => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);

  const sendMessage = (text: string) => {
    setMessages((prev) => [...prev, { text, isUser: true }]);
    // Placeholder for actual response logic (to be integrated with Chatbot)
  };

  return (
    <ChatbotContext.Provider value={{ sendMessage }}>
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
}