'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
}

export default function Chatbot({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello! I’m your JARVIS assistant. Try asking me about my skills or projects.', isUser: false },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: input, isUser: true }]);

    // Generate bot response
    const response = generateResponse(input.toLowerCase());
    setMessages((prev) => [...prev, { text: response, isUser: false }]);

    setInput('');
  };

  const generateResponse = (input: string): string => {
    if (input.includes('skills')) {
      return 'I’m proficient in React, Next.js, Node.js, Python, and AI technologies like LLMs and NLP. Want to know more about a specific skill?';
    } else if (input.includes('projects')) {
      return 'I’ve built cool stuff like CollabHub, Nexus AI Chatbot, and Quantum Content Generator. Check them out on my Projects page or ask me for details!';
    } else if (input.includes('hi') || input.includes('hello')) {
      return 'Hey there! What’s on your mind today?';
    } else {
      return 'Hmm, I’m not sure about that one. Try asking about my skills, projects, or just say hi!';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-24 right-8 z-50 w-80 bg-jarvis-dark-600 rounded-lg shadow-jarvis-glow border border-jarvis-blue-500/30"
    >
      <div className="flex items-center justify-between p-4 border-b border-jarvis-blue-500/30">
        <h3 className="text-lg font-display text-jarvis-blue-500">JARVIS Assistant</h3>
        <button onClick={onClose} className="text-gray-300 hover:text-jarvis-blue-500">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="h-64 overflow-y-auto p-4">
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
                    ? 'bg-jarvis-blue-500 text-white'
                    : 'bg-jarvis-dark-400 text-gray-200'
                }`}
              >
                {message.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="p-4 border-t border-jarvis-blue-500/30">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-jarvis-dark-500 text-gray-200 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-jarvis-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-jarvis-blue-500 text-white p-2 rounded-r-md hover:bg-jarvis-blue-600"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}