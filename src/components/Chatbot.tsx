'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import axios from 'axios';

interface Message {
  text: string;
  isUser: boolean;
}

export default function Chatbot({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your JARVIS assistant. Ask me anything about Nikhil\'s skills, projects, or experience.", isUser: false },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isInit, setIsInit] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Add initial message suggesting topics
  useEffect(() => {
    if (isInit) {
      setIsInit(false);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { 
            text: 'Try asking about my skills, projects, education, or how to get in touch with me!', 
            isUser: false 
          }
        ]);
      }, 1000);
    }
  }, [isInit]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    
    // Show loading state
    setIsLoading(true);

    try {
      // Connect to the chatbot API
      const { data } = await axios.post('/api/chatbot', { message: input });
      
      setMessages((prev) => [...prev, { text: data.response, isUser: false }]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // If API fails, use a simplified fallback
      const fallbackResponse = getFallbackResponse(input);
      setMessages((prev) => [...prev, { text: fallbackResponse, isUser: false }]);
    } finally {
      setIsLoading(false);
    }

    setInput('');
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-24 right-8 z-50 w-80 enhanced-ui-panel rounded-lg shadow-jarvis-glow"
    >
      <div className="flex items-center justify-between p-4 enhanced-ui-header rounded-t-lg">
        <h3 className="text-lg font-display text-jarvis-blue-500">JARVIS Assistant</h3>
        <button onClick={onClose} className="text-gray-300 hover:text-jarvis-blue-500 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="h-64 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-jarvis-blue-500 scrollbar-track-jarvis-dark-700">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.isUser
                    ? 'user-message'
                    : 'bot-message'
                }`}
              >
                {message.text}
              </span>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-left mb-4"
            >
              <span className="inline-block p-2 rounded-lg bot-message">
                <span className="flex space-x-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-jarvis-blue-500/30">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Nikhil's skills, projects..."
            className="flex-1 bg-jarvis-dark-500 text-gray-200 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-jarvis-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-jarvis-blue-500 text-white p-2 rounded-r-md hover:bg-jarvis-blue-600 transition-colors disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}