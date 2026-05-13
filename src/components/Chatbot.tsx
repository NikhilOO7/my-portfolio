'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, X, Mic, Volume2, VolumeX, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useJarvisVoice } from '@/components/JarvisVoiceContext';
import HUDFrame from '@/components/ui/HUDFrame';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: number;
}

const formatTime = (ts: number) => {
  try {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date(ts));
  } catch {
    return '--:--:--';
  }
};

export default function Chatbot({ onClose }: { onClose: () => void }) {
  const {
    speak,
    enabled: voiceEnabled,
    toggleEnabled,
    available: voiceAvailable,
    listening,
    recognitionAvailable,
    startListening,
    stopListening,
  } = useJarvisVoice();

  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Good day. I am J.A.R.V.I.S — Nikhil's archival assistant. Ask me anything about his projects, skills, experience, or how to reach him.",
      isUser: false,
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [interim, setInterim] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const send = useCallback(async (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || isLoading) return;

    setMessages(prev => [...prev, { text, isUser: true, timestamp: Date.now() }]);
    setInput('');
    setIsLoading(true);

    try {
      // Send last 6 turns as history so the model has context.
      const history = messages.slice(-6).map(m => ({
        role: (m.isUser ? 'user' : 'assistant') as 'user' | 'assistant',
        content: m.text,
      }));

      const { data } = await axios.post('/api/chatbot', { message: text, history });
      const reply = (data.response as string) ?? 'No response.';
      setMessages(prev => [...prev, { text: reply, isUser: false, timestamp: Date.now() }]);
      speak(reply);
    } catch (err) {
      console.error('chat error', err);
      const errReply = 'Apologies — I lost contact with the knowledge base. Please try again.';
      setMessages(prev => [...prev, { text: errReply, isUser: false, timestamp: Date.now() }]);
      speak(errReply);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, speak]);

  const onMic = () => {
    if (!recognitionAvailable) return;
    if (listening) {
      stopListening();
      return;
    }
    setInterim('');
    startListening({
      onInterim: t => setInterim(t),
      onFinal: t => {
        setInterim('');
        // Auto-send the captured query
        send(t);
      },
      onError: () => setInterim(''),
      onEnd: () => setInterim(''),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.97 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[420px] max-h-[78vh] flex flex-col"
    >
      <HUDFrame accent="#00d4ff" cornerSize={14} showScan className="bg-jarvis-dark-700/95 backdrop-blur-md flex flex-col overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.06) 0%, rgba(0, 8, 20, 0.55) 100%)' }}
        />

        {/* Header */}
        <div className="relative px-4 py-3 border-b border-jarvis-cyan/15 flex items-center justify-between font-mono">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative w-7 h-7 flex items-center justify-center flex-shrink-0">
              <span
                className="absolute inset-0 rounded-full animate-rotate-slow"
                style={{ animationDuration: '12s', border: '1px dashed rgba(0, 212, 255, 0.5)' }}
              />
              <span
                className="absolute inset-1 rounded-full"
                style={{
                  border: '1px solid rgba(0, 212, 255, 0.6)',
                  boxShadow: '0 0 8px rgba(0, 212, 255, 0.4), inset 0 0 6px rgba(0, 212, 255, 0.4)',
                }}
              />
              <span
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{ background: 'radial-gradient(circle, #ffffff 0%, #00d4ff 60%, transparent 100%)' }}
              />
            </span>
            <div className="min-w-0">
              <div className="text-[10px] tracking-[0.35em] uppercase text-jarvis-cyan">
                Conversation Channel
              </div>
              <div className="text-[9px] tracking-widest uppercase text-jarvis-blue-300/50">
                J.A.R.V.I.S · interactive query
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {voiceAvailable && (
              <button
                onClick={() => toggleEnabled()}
                className="text-jarvis-blue-300/60 hover:text-jarvis-cyan transition-colors"
                title={voiceEnabled ? 'Mute JARVIS voice' : 'Enable JARVIS voice'}
                aria-label="Toggle JARVIS voice"
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4 text-jarvis-gold-400" /> : <VolumeX className="w-4 h-4" />}
              </button>
            )}
            <button
              onClick={onClose}
              className="text-jarvis-blue-300/60 hover:text-jarvis-cyan transition-colors"
              aria-label="Close conversation"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Transcript */}
        <div className="relative flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[260px]">
          {messages.map((m, i) => (
            <div key={i} className="font-mono leading-relaxed">
              <div className="flex items-start gap-2 text-[10px] tracking-widest uppercase mb-0.5">
                <span className={m.isUser ? 'text-jarvis-gold-400' : 'text-jarvis-cyan/70'}>
                  [{m.isUser ? 'YOU' : 'J.A.R.V.I.S'}]
                </span>
                <span className="text-jarvis-blue-300/40 tabular-nums">{formatTime(m.timestamp)}</span>
              </div>
              <div className={`text-sm ${m.isUser ? 'text-gray-100' : 'text-gray-200'} whitespace-pre-wrap`}>
                {m.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="font-mono leading-relaxed">
              <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase mb-0.5">
                <span className="text-jarvis-cyan/70">[J.A.R.V.I.S]</span>
                <span className="text-jarvis-blue-300/40">querying…</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-jarvis-cyan" />
                <span>Compiling response…</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input row */}
        <div className="relative border-t border-jarvis-cyan/15 px-3 py-2.5">
          <div className="flex items-center gap-2 font-mono">
            <span className={`text-sm select-none ${listening ? 'text-red-400' : 'text-jarvis-gold-400'}`}>
              {listening ? '◉' : '›_'}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={listening && interim ? interim : input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              disabled={isLoading || listening}
              placeholder={
                listening
                  ? 'Listening… speak your query'
                  : recognitionAvailable
                    ? 'Type your query, or tap mic to speak…'
                    : 'Type your query for JARVIS…'
              }
              className={`flex-1 bg-transparent outline-none text-sm placeholder:text-gray-500 placeholder:text-xs tracking-wide ${
                listening && interim ? 'text-jarvis-cyan/80 italic' : 'text-gray-100'
              }`}
              aria-label="Ask JARVIS"
            />
            {recognitionAvailable && (
              <button
                type="button"
                onClick={onMic}
                disabled={isLoading}
                className="relative transition-colors disabled:opacity-40"
                style={{ color: listening ? '#ef4444' : 'rgba(0, 212, 255, 0.7)' }}
                aria-label={listening ? 'Stop listening' : 'Speak your query'}
                title={listening ? 'Stop listening' : 'Speak'}
              >
                {listening && (
                  <span className="absolute inset-0 -m-1.5 rounded-full animate-ping" style={{ background: 'rgba(239, 68, 68, 0.4)' }} />
                )}
                <Mic className="relative w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => send()}
              disabled={!input.trim() || isLoading || listening}
              className="font-mono text-[10px] tracking-[0.3em] uppercase px-2.5 py-1 rounded-sm border transition-all disabled:opacity-40 inline-flex items-center gap-1.5"
              style={{
                color: '#fbbf24',
                borderColor: 'rgba(251, 191, 36, 0.5)',
                backgroundColor: 'rgba(251, 191, 36, 0.08)',
              }}
              aria-label="Send query"
            >
              <Send className="w-3 h-3" />
              Send
            </button>
          </div>
          <div className="mt-1.5 text-[9px] tracking-widest uppercase text-jarvis-blue-300/40">
            Try: "what are his recent projects" · "tell me about voice ai work" · "how to reach him"
          </div>
        </div>
      </HUDFrame>
    </motion.div>
  );
}
