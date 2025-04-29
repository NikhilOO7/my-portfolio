'use client';

import { useState, useEffect } from 'react';
import { X, Mic, MicOff, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useChatbot } from './ChatbotContext';

// Declare Web Speech API types
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }

  interface SpeechRecognition {
    lang: string;
    interimResults: boolean;
    continuous: boolean;
    maxAlternatives: number;
    onresult: (event: SpeechRecognitionEvent) => void;
    onend: () => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    start: () => void;
    stop: () => void;
    abort: () => void;
  }

  interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
  }

  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
  }

  interface SpeechRecognitionResultList {
    readonly length: number;
    [index: number]: SpeechRecognitionResult;
  }

  interface SpeechRecognitionResult {
    readonly length: number;
    readonly isFinal: boolean;
    [index: number]: SpeechRecognitionAlternative;
  }

  interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
  }
}

interface VoiceControlProps {
  onClose: () => void;
}

export default function VoiceControl({ onClose }: VoiceControlProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [status, setStatus] = useState<'idle' | 'listening' | 'processing' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [recognitionInstance, setRecognitionInstance] = useState<SpeechRecognition | null>(null);
  const router = useRouter();
  const { sendMessage, navigateTo } = useChatbot();

  // Check for browser support and initialize recognition
  useEffect(() => {
    // Define recognition outside to avoid recreation on every render
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setStatus('error');
      setErrorMessage('Your browser does not support speech recognition. Try Chrome or Edge.');
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;
    
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const resultIndex = event.resultIndex;
      const transcript = event.results[resultIndex][0].transcript;
      
      if (event.results[resultIndex].isFinal) {
        setTranscript(transcript);
        setInterimTranscript('');
        setStatus('processing');
        
        // Process the voice command
        setTimeout(() => {
          processCommand(transcript.trim().toLowerCase());
        }, 500); // Small delay for visual feedback
      } else {
        setInterimTranscript(transcript);
      }
    };
    
    recognition.onend = () => {
      setIsListening(false);
      if (status === 'listening') {
        setStatus('idle');
      }
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event);
      setIsListening(false);
      setStatus('error');
      
      if (event.error === 'no-speech') {
        setErrorMessage('No speech detected. Please try again.');
      } else if (event.error === 'not-allowed' || event.error === 'permission-denied') {
        setErrorMessage('Microphone access denied. Please allow microphone access.');
      } else {
        setErrorMessage(`Error: ${event.error}`);
      }
    };
    
    setRecognitionInstance(recognition);
    
    // Cleanup
    return () => {
      if (recognition) {
        try {
          recognition.stop();
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
    };
  }, []);

  // Start/stop listening when isListening changes
  useEffect(() => {
    if (!recognitionInstance) return;
    
    if (isListening) {
      try {
        recognitionInstance.start();
        setStatus('listening');
        setErrorMessage('');
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        setIsListening(false);
        setStatus('error');
        setErrorMessage('Failed to start speech recognition. Please try again.');
      }
    } else if (recognitionInstance) {
      try {
        recognitionInstance.stop();
      } catch (error) {
        // Ignore errors when stopping
      }
    }
  }, [isListening, recognitionInstance]);

  const processCommand = (command: string) => {
    console.log('Processing command:', command);
    
    // Navigation commands with various phrasings
    if (command.includes('go to home') || command.includes('go home') || command.includes('homepage')) {
      navigateTo('/');
      setStatus('idle');
      setTimeout(onClose, 1000);
      return;
    } 
    
    if (command.includes('about') || command.includes('about page') || command.includes('who is nikhil')) {
      navigateTo('/about');
      setStatus('idle');
      setTimeout(onClose, 1000);
      return;
    } 
    
    if (command.includes('projects') || command.includes('project page') || command.includes('portfolio')) {
      navigateTo('/projects');
      setStatus('idle');
      setTimeout(onClose, 1000);
      return;
    } 
    
    if (command.includes('skills') || command.includes('skill page') || command.includes('what can you do')) {
      navigateTo('/skills');
      setStatus('idle');
      setTimeout(onClose, 1000);
      return;
    } 
    
    if (command.includes('contact') || command.includes('contact page') || command.includes('hire')) {
      navigateTo('/contact');
      setStatus('idle');
      setTimeout(onClose, 1000);
      return;
    } 
    
    if (command.includes('writings') || command.includes('writing page') || command.includes('blog')) {
      navigateTo('/writings');
      setStatus('idle');
      setTimeout(onClose, 1000);
      return;
    } 
    
    // Action commands
    if (command.includes('hire me') || command.includes('buy me a coffee') || command.includes('support')) {
      window.open('https://www.buymeacoffee.com/nikhil007', '_blank');
      setStatus('idle');
      setTimeout(onClose, 1000);
      return;
    } 
    
    // Default - send to chatbot
    sendMessage(command);
    setStatus('idle');
    setTimeout(onClose, 1000);
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      // Reset before starting to listen
      setTranscript('');
      setInterimTranscript('');
      setIsListening(true);
    }
  };

  // Command examples to show to the user
  const commandExamples = [
    "Go to projects",
    "Tell me about your skills",
    "Open contact page",
    "Buy me a coffee"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-24 right-8 z-50 w-80 enhanced-ui-panel rounded-lg shadow-jarvis-glow"
    >
      <div className="flex items-center justify-between p-4 enhanced-ui-header rounded-t-lg">
        <h3 className="text-lg font-display text-jarvis-blue-500">Voice Command</h3>
        <button onClick={onClose} className="text-gray-300 hover:text-jarvis-blue-500 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-6 text-center">
        {status === 'error' ? (
          <div className="text-red-400 mb-4">
            <p>{errorMessage}</p>
            {errorMessage.includes('access denied') && (
              <button 
                className="mt-2 px-3 py-1 bg-jarvis-blue-500 hover:bg-jarvis-blue-600 rounded text-sm text-white"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-center">
              <button
                onClick={toggleListening}
                disabled={status === 'processing'}
                className={`p-4 rounded-full ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-jarvis-blue-500 hover:bg-jarvis-blue-600'
                } text-white transition-colors relative disabled:opacity-50`}
              >
                {status === 'processing' ? (
                  <Loader2 className="w-8 h-8 animate-spin" />
                ) : isListening ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
                
                {isListening && (
                  <span className="voice-pulse"></span>
                )}
              </button>
            </div>
            
            <div className="mt-4 text-sm min-h-[60px]">
              {status === 'idle' && !transcript && !interimTranscript && (
                <p className="text-gray-400">
                  Click the microphone and speak a command
                </p>
              )}
              
              {status === 'listening' && !interimTranscript && (
                <p className="text-jarvis-blue-400 animate-pulse">
                  Listening...
                </p>
              )}
              
              {status === 'processing' && (
                <p className="text-jarvis-accent-500">
                  Processing: "{transcript}"
                </p>
              )}
              
              {interimTranscript && (
                <p className="text-gray-300 italic">
                  "{interimTranscript}"
                </p>
              )}
              
              {transcript && status !== 'processing' && status !== 'listening' && (
                <p className="text-white font-medium">
                  "{transcript}"
                </p>
              )}
            </div>
            
            <div className="mt-6 pt-4 border-t border-jarvis-blue-500/20 text-xs text-gray-400">
              <h4 className="font-medium mb-2">Try saying:</h4>
              <div className="space-y-1">
                {commandExamples.map((example, index) => (
                  <p key={index} className="hover:text-jarvis-blue-300">"{example}"</p>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}