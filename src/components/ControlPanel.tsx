'use client';

import { Mic, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ControlPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-24 right-8 z-40 flex flex-col space-y-4"
    >
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: '0 0 10px rgba(25, 118, 255, 0.5)' }}
        transition={{ duration: 0.3 }}
        className="text-gray-300 hover:text-jarvis-blue-500 transition-colors duration-200 bg-jarvis-dark-600 rounded-full w-12 h-12 flex items-center justify-center"
        title="Voice Control"
      >
        <Mic className="w-6 h-6" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: '0 0 10px rgba(25, 118, 255, 0.5)' }}
        transition={{ duration: 0.3 }}
        className="text-gray-300 hover:text-jarvis-blue-500 transition-colors duration-200 bg-jarvis-dark-600 rounded-full w-12 h-12 flex items-center justify-center relative"
        title="Chatbot"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-jarvis-dark-600 bg-jarvis-blue-500 animate-pulse" />
      </motion.button>
    </motion.div>
  );
}