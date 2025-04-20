'use client';

import { useState } from 'react';
import { Mic, MessageSquare, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import Chatbot from './Chatbot';
import VoiceControl from './VoiceControl';
import MusicPlayer from './MusicPlayer';

export default function ControlPanel() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isMusicOpen, setIsMusicOpen] = useState(false);

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
        onClick={() => setIsVoiceOpen(!isVoiceOpen)}
      >
        <Mic className="w-6 h-6" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: '0 0 10px rgba(25, 118, 255, 0.5)' }}
        transition={{ duration: 0.3 }}
        className="text-gray-300 hover:text-jarvis-blue-500 transition-colors duration-200 bg-jarvis-dark-600 rounded-full w-12 h-12 flex items-center justify-center relative"
        title="Chatbot"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-jarvis-dark-600 bg-jarvis-blue-500 animate-pulse" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: '0 0 10px rgba(25, 118, 255, 0.5)' }}
        transition={{ duration: 0.3 }}
        className="text-gray-300 hover:text-jarvis-blue-500 transition-colors duration-200 bg-jarvis-dark-600 rounded-full w-12 h-12 flex items-center justify-center"
        title="Music Player"
        onClick={() => setIsMusicOpen(!isMusicOpen)}
      >
        <Music className="w-6 h-6" />
      </motion.button>
      {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}
      {isVoiceOpen && <VoiceControl onClose={() => setIsVoiceOpen(false)} />}
      {isMusicOpen && <MusicPlayer onClose={() => setIsMusicOpen(false)} />}
    </motion.div>
  );
}