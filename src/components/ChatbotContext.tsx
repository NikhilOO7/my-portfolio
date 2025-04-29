'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatbotContextType {
  messages: Message[];
  sendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  navigateTo: (path: string) => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Send message to chatbot and get response
  const sendMessage = async (text: string) => {
    // Add user message to list
    setMessages((prev) => [...prev, { text, isUser: true }]);
    
    setIsLoading(true);
    try {
      // Send to API
      const { data } = await axios.post('/api/chatbot', { message: text });
      
      // Add bot response
      setMessages((prev) => [...prev, { text: data.response, isUser: false }]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback response
      const fallbackResponse = getFallbackResponse(text);
      setMessages((prev) => [...prev, { text: fallbackResponse, isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate to a path
  const navigateTo = (path: string) => {
    router.push(path);
  };

  // Simple fallback in case the API fails
  const getFallbackResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes('skill')) {
      return 'Nikhil is proficient in React, Next.js, Node.js, Python, and AI technologies like LLMs and NLP.';
    } else if (lowercaseInput.includes('project')) {
      return 'Nikhil has built several projects including AI-Powered Blog Generator, Nexus AI Chatbot, and Financial Risk Analyzer.';
    } else if (lowercaseInput.includes('contact') || lowercaseInput.includes('hire')) {
      return 'You can contact Nikhil at nikhil.bindal@outlook.com or visit the Contact page.';
    } else {
      return 'I can tell you about Nikhil\'s skills, projects, work experience, education, or how to contact him. What would you like to know?';
    }
  };

  return (
    <ChatbotContext.Provider value={{ messages, sendMessage, isLoading, navigateTo }}>
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