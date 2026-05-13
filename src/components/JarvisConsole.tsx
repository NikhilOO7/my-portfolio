'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mic } from 'lucide-react';
import HUDFrame from '@/components/ui/HUDFrame';
import JarvisNarrator from '@/components/ui/JarvisNarrator';
import { useJarvisVoice } from '@/components/JarvisVoiceContext';
import { JARVIS_COMMANDS, matchJarvisCommand } from '@/lib/jarvisCommands';
import { useJarvisDispatcher } from '@/lib/useJarvisDispatcher';

// COMMANDS and matcher live in src/lib/jarvisCommands.ts (shared with JarvisQuickMic).
// The home console renders only the page-facing commands — Console itself is omitted.
const CONSOLE_COMMANDS = JARVIS_COMMANDS.filter(c => c.id !== 'console');

export default function JarvisConsole() {
  const { speak, listening, recognitionAvailable, enabled: voiceEnabled, startListening, stopListening } = useJarvisVoice();
  const voiceReady = recognitionAvailable && voiceEnabled;
  const executeCommand = useJarvisDispatcher();
  const [query, setQuery] = useState('');
  const [interim, setInterim] = useState('');
  const [transcript, setTranscript] = useState<{ from: 'user' | 'jarvis'; text: string }[]>([]);
  const [routing, setRouting] = useState(false);
  const [narrationDone, setNarrationDone] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [greeting, setGreeting] = useState('Greetings');

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening');
  }, []);

  const handleMic = () => {
    if (!voiceReady || routing) return;
    if (listening) {
      stopListening();
      return;
    }
    setInterim('');
    setQuery('');
    startListening({
      onInterim: (text) => setInterim(text),
      onFinal: (text) => {
        setInterim('');
        setQuery(text);
        // Small delay so the user can see what was heard before routing
        setTimeout(() => dispatch(text), 400);
      },
      onError: () => {
        setInterim('');
      },
      onEnd: () => {
        setInterim('');
      },
    });
  };

  const dispatch = (input: string) => {
    const matched = matchJarvisCommand(input);
    if (matched) {
      const { reply, routed } = executeCommand(matched);
      setTranscript(prev => [
        ...prev,
        { from: 'user', text: input },
        { from: 'jarvis', text: reply },
      ]);
      if (routed) setRouting(true);
    } else {
      const reply = 'Apologies — I could not parse that query. Try a suggested command below, or use keywords such as "projects", "skills", "dossier", or "channel".';
      setTranscript(prev => [
        ...prev,
        { from: 'user', text: input },
        { from: 'jarvis', text: reply },
      ]);
      speak(reply);
    }
    setQuery('');
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    dispatch(query);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* JARVIS sigil + identity header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-4 mb-6"
      >
        <div className="relative w-10 h-10 flex items-center justify-center">
          <span
            className="absolute inset-0 rounded-full animate-rotate-slow"
            style={{ animationDuration: '12s', border: '1px dashed rgba(0, 212, 255, 0.55)' }}
          />
          <span
            className="absolute inset-2 rounded-full"
            style={{
              border: '1px solid rgba(0, 212, 255, 0.6)',
              boxShadow: '0 0 12px rgba(0, 212, 255, 0.5), inset 0 0 8px rgba(0, 212, 255, 0.45)',
            }}
          />
          <span
            className="absolute w-2 h-2 rounded-full animate-pulse-glow"
            style={{
              background: 'radial-gradient(circle, #ffffff 0%, #00d4ff 60%, transparent 100%)',
            }}
          />
        </div>
        <div className="text-left">
          <div className="font-mono text-[10px] tracking-[0.4em] text-jarvis-blue-300/80 uppercase">
            Just A Rather Very Intelligent System
          </div>
          <div className="font-mono text-xs sm:text-sm tracking-[0.3em] text-jarvis-cyan uppercase">
            J.A.R.V.I.S · v4.7 · online
          </div>
        </div>
      </motion.div>

      {/* Transcript / narration panel */}
      <HUDFrame accent="#00d4ff" cornerSize={16} className="bg-jarvis-dark-700/70 backdrop-blur-md p-5 sm:p-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.06) 0%, rgba(0, 8, 20, 0.55) 100%)' }}
        />
        <div className="relative min-h-[180px]">
          {/* Greeting narration */}
          <JarvisNarrator
            speed={20}
            startDelay={500}
            onDone={() => setNarrationDone(true)}
            lines={[
              `${greeting}. I am J.A.R.V.I.S — Nikhil's archival assistant.`,
              `Subject is Nikhil Bindal, a full-stack and AI infrastructure engineer based in San Francisco, currently available for new engagements.`,
              `How may I assist you today, sir or madam?`,
            ]}
          />

          {/* Latest exchange only — crossfades in place when a new command fires. */}
          {transcript.length > 0 && (() => {
            const last = transcript.slice(-2);
            const exchangeKey = last.map(e => `${e.from}:${e.text}`).join('|');
            return (
              <div className="mt-3 pt-3 border-t border-jarvis-cyan/15">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={exchangeKey}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="space-y-1.5"
                  >
                    {last.map((entry, i) => (
                      <div key={i} className="flex items-start gap-3 font-mono text-xs sm:text-sm leading-relaxed">
                        <span
                          className={`uppercase tracking-widest whitespace-nowrap text-[10px] sm:text-xs pt-0.5 ${
                            entry.from === 'user' ? 'text-jarvis-gold-400' : 'text-jarvis-cyan/70'
                          }`}
                        >
                          [{entry.from === 'user' ? 'YOU' : 'J.A.R.V.I.S'}]
                        </span>
                        <span className="text-gray-200 flex-1">{entry.text}</span>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            );
          })()}
        </div>
      </HUDFrame>

      {/* Command chips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: narrationDone ? 1 : 0.4, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {CONSOLE_COMMANDS.map((cmd, i) => (
          <motion.button
            key={cmd.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.4 + i * 0.08 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            disabled={routing}
            onClick={() => dispatch(cmd.label)}
            className="group relative text-left p-3 sm:p-4 rounded-sm overflow-hidden disabled:opacity-50"
            style={{
              background: `linear-gradient(135deg, ${cmd.accent}14 0%, rgba(0, 8, 20, 0.55) 100%)`,
              border: `1px solid ${cmd.accent}44`,
              boxShadow: `0 0 0 1px ${cmd.accent}1a`,
            }}
          >
            <span
              className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-3xl opacity-20 group-hover:opacity-50 transition-opacity"
              style={{ backgroundColor: cmd.accent }}
            />
            <div className="relative">
              <div
                className="font-mono text-[9px] tracking-[0.3em] uppercase mb-2 flex items-center justify-between"
                style={{ color: cmd.accent, opacity: 0.75 }}
              >
                <span>CMD · 0{i + 1}</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="font-display text-base sm:text-lg text-white tracking-wide mb-1">
                {cmd.label}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-400">
                {cmd.hint}
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Free-form query input */}
      <motion.form
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: narrationDone ? 1 : 0.3, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        onSubmit={onSubmit}
        className="mt-5"
      >
        <HUDFrame
          accent={listening ? '#ef4444' : '#fbbf24'}
          cornerSize={10}
          className="bg-jarvis-dark-700/80 backdrop-blur-md transition-colors"
        >
          <div className="relative flex items-center px-4 py-3 gap-3 font-mono">
            <span className={`text-sm tracking-widest select-none transition-colors ${listening ? 'text-red-400' : 'text-jarvis-gold-400'}`}>
              {listening ? '◉' : '›_'}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={listening && interim ? interim : query}
              onChange={e => setQuery(e.target.value)}
              placeholder={
                listening
                  ? 'Listening… speak now'
                  : voiceReady
                    ? "Type — or tap the mic to speak: 'show his projects'"
                    : "Type a command: 'show his projects' or 'how can I reach him'"
              }
              disabled={routing || listening}
              className={`flex-1 bg-transparent outline-none text-sm placeholder:text-gray-500 placeholder:text-xs sm:placeholder:text-sm tracking-wide ${
                listening && interim ? 'text-jarvis-cyan/80 italic' : 'text-gray-100'
              }`}
              autoFocus
              aria-label="Issue command to JARVIS"
            />
            {voiceReady && (
              <button
                type="button"
                onClick={handleMic}
                disabled={routing}
                className="relative transition-colors disabled:opacity-40"
                style={{ color: listening ? '#ef4444' : 'rgba(0, 212, 255, 0.7)' }}
                aria-label={listening ? 'Stop listening' : 'Start voice input'}
                title={listening ? 'Stop listening' : 'Speak a command'}
              >
                {listening && (
                  <span
                    className="absolute inset-0 -m-1.5 rounded-full animate-ping"
                    style={{ background: 'rgba(239, 68, 68, 0.4)' }}
                  />
                )}
                <Mic className="relative w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              disabled={!query.trim() || routing || listening}
              className="font-mono text-[10px] tracking-[0.3em] uppercase px-3 py-1 rounded-sm border transition-all disabled:opacity-40"
              style={{
                color: '#fbbf24',
                borderColor: 'rgba(251, 191, 36, 0.5)',
                backgroundColor: 'rgba(251, 191, 36, 0.08)',
              }}
            >
              Execute
            </button>
          </div>
        </HUDFrame>
      </motion.form>

      {/* Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: narrationDone ? 0.6 : 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-4 text-center font-mono text-[10px] sm:text-xs tracking-widest uppercase text-jarvis-blue-300/60"
      >
        Below: Prepared briefings · scroll to access
      </motion.p>
    </div>
  );
}
