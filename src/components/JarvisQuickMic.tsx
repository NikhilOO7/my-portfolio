'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X } from 'lucide-react';
import { useJarvisVoice } from '@/components/JarvisVoiceContext';
import { matchJarvisCommand } from '@/lib/jarvisCommands';
import { useJarvisDispatcher } from '@/lib/useJarvisDispatcher';

type Feedback =
  | { kind: 'idle' }
  | { kind: 'routing'; text: string }
  | { kind: 'miss'; text: string };

export default function JarvisQuickMic() {
  const {
    speak,
    listening,
    recognitionAvailable,
    startListening,
    stopListening,
  } = useJarvisVoice();
  const dispatch = useJarvisDispatcher();
  const [interim, setInterim] = useState('');
  const [feedback, setFeedback] = useState<Feedback>({ kind: 'idle' });
  const feedbackTimer = useRef<number | null>(null);

  // Cmd/Ctrl + K toggles mic. Escape stops it. Ignored when typing in inputs.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inField =
        !!target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        if (inField && !listening) return;
        e.preventDefault();
        toggle();
        return;
      }
      if (e.key === 'Escape' && listening) {
        e.preventDefault();
        stopListening();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening]);

  const clearFeedbackLater = (ms: number) => {
    if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current);
    feedbackTimer.current = window.setTimeout(() => {
      setFeedback({ kind: 'idle' });
      feedbackTimer.current = null;
    }, ms);
  };

  const toggle = () => {
    if (listening) {
      stopListening();
      return;
    }
    setInterim('');
    setFeedback({ kind: 'idle' });
    startListening({
      onInterim: text => setInterim(text),
      onFinal: text => {
        setInterim('');
        const matched = matchJarvisCommand(text);
        if (matched) {
          const { reply } = dispatch(matched);
          setFeedback({ kind: 'routing', text: reply });
          clearFeedbackLater(matched.route ? 1500 : 2200);
        } else {
          setFeedback({
            kind: 'miss',
            text: `Heard: “${text}”. I could not parse a command.`,
          });
          speak('Apologies — I could not parse that.');
          clearFeedbackLater(3500);
        }
      },
      onError: () => {
        setInterim('');
      },
      onEnd: () => {
        setInterim('');
      },
    });
  };

  if (!recognitionAvailable) return null;

  const overlayVisible = listening || feedback.kind !== 'idle';

  return (
    <>
      {/* Floating mic button — bottom-right, above the ControlPanel stack */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        onClick={toggle}
        className="fixed bottom-52 right-8 z-40 w-12 h-12 rounded-full flex items-center justify-center transition-shadow"
        style={{
          background: listening
            ? 'radial-gradient(circle, #ef4444 0%, #7f1d1d 100%)'
            : 'radial-gradient(circle, #00d4ff 0%, #075985 100%)',
          boxShadow: listening
            ? '0 0 18px rgba(239, 68, 68, 0.7), 0 0 36px rgba(239, 68, 68, 0.4)'
            : '0 0 14px rgba(0, 212, 255, 0.55), 0 0 28px rgba(0, 212, 255, 0.25)',
        }}
        aria-label={listening ? 'Stop listening' : 'Speak a command (Cmd+K)'}
        title={listening ? 'Listening — press Esc to cancel' : 'Speak a command   ·   ⌘K / Ctrl+K'}
      >
        {listening && (
          <>
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: 'rgba(239, 68, 68, 0.5)' }}
            />
            <span
              className="absolute -inset-1 rounded-full"
              style={{ border: '1px dashed rgba(239, 68, 68, 0.6)' }}
            />
          </>
        )}
        <Mic className="relative w-5 h-5 text-white" />
      </motion.button>

      {/* Listening overlay — appears near the mic */}
      <AnimatePresence>
        {overlayVisible && (
          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-52 right-24 z-50 max-w-sm pointer-events-auto"
            style={{ minWidth: '300px' }}
          >
            <div
              className="bg-jarvis-dark-700/95 backdrop-blur-md p-4 rounded-sm relative overflow-hidden"
              style={{
                border: `1px solid ${
                  listening ? 'rgba(239, 68, 68, 0.5)' : feedback.kind === 'miss' ? 'rgba(251, 191, 36, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                }`,
                boxShadow: listening
                  ? '0 0 22px rgba(239, 68, 68, 0.35)'
                  : '0 0 18px rgba(0, 212, 255, 0.25)',
              }}
            >
              {/* HUD corner brackets */}
              {(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const).map(corner => {
                const isTop = corner.startsWith('top');
                const isLeft = corner.endsWith('left');
                return (
                  <span
                    key={corner}
                    className="absolute pointer-events-none"
                    style={{
                      width: 10,
                      height: 10,
                      top: isTop ? -1 : 'auto',
                      bottom: !isTop ? -1 : 'auto',
                      left: isLeft ? -1 : 'auto',
                      right: !isLeft ? -1 : 'auto',
                      borderTop: isTop ? `1.5px solid ${listening ? '#ef4444' : '#00d4ff'}` : 'none',
                      borderBottom: !isTop ? `1.5px solid ${listening ? '#ef4444' : '#00d4ff'}` : 'none',
                      borderLeft: isLeft ? `1.5px solid ${listening ? '#ef4444' : '#00d4ff'}` : 'none',
                      borderRight: !isLeft ? `1.5px solid ${listening ? '#ef4444' : '#00d4ff'}` : 'none',
                    }}
                  />
                );
              })}

              <div className="flex items-center justify-between mb-2 font-mono text-[10px] tracking-[0.3em] uppercase">
                <span
                  className="inline-flex items-center gap-2"
                  style={{
                    color: listening
                      ? '#fca5a5'
                      : feedback.kind === 'miss'
                        ? '#fbbf24'
                        : '#00d4ff',
                  }}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${listening ? 'animate-pulse' : ''}`}
                    style={{
                      backgroundColor: listening
                        ? '#ef4444'
                        : feedback.kind === 'miss'
                          ? '#fbbf24'
                          : '#00d4ff',
                    }}
                  />
                  {listening
                    ? 'Listening'
                    : feedback.kind === 'routing'
                      ? 'Dispatching'
                      : 'Unrecognized'}
                </span>
                {listening && (
                  <button
                    onClick={() => stopListening()}
                    className="text-jarvis-blue-300/50 hover:text-jarvis-cyan transition-colors"
                    aria-label="Stop listening"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="font-mono text-sm text-gray-200 min-h-[20px] leading-snug">
                {listening
                  ? interim || <span className="text-gray-500">Speak now…</span>
                  : feedback.kind !== 'idle'
                    ? feedback.text
                    : null}
              </div>

              {listening && (
                <div className="mt-2 text-[9px] tracking-widest uppercase text-jarvis-blue-300/50 font-mono">
                  ⌘K to toggle · Esc to cancel
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
