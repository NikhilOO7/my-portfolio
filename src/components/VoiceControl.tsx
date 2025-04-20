'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react'; // Importing the X icon
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useChatbot } from './ChatbotContext';

// Declare global types for Web Speech API
declare global {
  // Extend Window to include SpeechRecognition
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }

  // Define SpeechRecognition interface
  interface SpeechRecognition {
    lang: string;
    interimResults: boolean;
    maxAlternatives: number;
    onresult: (event: SpeechRecognitionEvent) => void;
    onend: () => void;
    start: () => void;
    stop: () => void;
  }

  // Define SpeechRecognitionEvent interface
  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
  }

  // Define SpeechRecognitionResultList interface
  interface SpeechRecognitionResultList {
    readonly length: number;
    [index: number]: SpeechRecognitionResult;
  }

  // Define SpeechRecognitionResult interface
  interface SpeechRecognitionResult {
    readonly length: number;
    readonly isFinal: boolean;
    [index: number]: SpeechRecognitionAlternative;
  }

  // Define SpeechRecognitionAlternative interface
  interface SpeechRecognitionAlternative {
    readonly transcript: string;
  }
}

interface VoiceControlProps {
  onClose: () => void;
}

export default function VoiceControl({ onClose }: VoiceControlProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const router = useRouter();
  const { sendMessage } = useChatbot();
  const recognition = typeof window !== 'undefined' ? new (window.SpeechRecognition || window.webkitSpeechRecognition)() : null;

  useEffect(() => {
    if (!recognition) return;

    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript;
      setTranscript(text);
      if (event.results[last].isFinal) {
        processCommand(text.toLowerCase());
        setIsListening(false);
        recognition.stop();
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      recognition.stop();
    };
  }, [recognition]);

  const processCommand = (command: string) => {
    if (command.includes('skills')) {
      sendMessage('Show me your skills');
    } else if (command.includes('projects')) {
      router.push('/projects');
    } else if (command.includes('about')) {
      router.push('/about');
    } else if (command.includes('services')) {
      router.push('/services');
    } else if (command.includes('contact')) {
      router.push('/contact');
    } else {
      sendMessage(command); // Default: send to chatbot
    }
    onClose();
  };

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      recognition?.start();
      setIsListening(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-24 right-8 z-50 w-80 bg-jarvis-dark-600 rounded-lg shadow-jarvis-glow border border-jarvis-blue-500/30 p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display text-jarvis-blue-500">Voice Command</h3>
        <button onClick={onClose} className="text-gray-300 hover:text-jarvis-blue-500">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="text-center">
        <button
          onClick={toggleListening}
          className={`p-2 rounded-full ${isListening ? 'bg-red-500' : 'bg-jarvis-blue-500'} text-white hover:opacity-80`}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
        <p className="mt-4 text-sm text-gray-300">{transcript || 'Say something...'}</p>
      </div>
    </motion.div>
  );
}