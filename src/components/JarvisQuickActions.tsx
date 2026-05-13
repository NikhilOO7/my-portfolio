'use client';
import { motion } from 'framer-motion';
import { MessageSquare, Music } from 'lucide-react';
import { useJarvisSystem } from '@/components/JarvisSystemContext';

/**
 * Floating click-access for the two JARVIS subsystems most worth a button:
 * Conversation (chat) and Ambient Audio (music). Stacks below the
 * `JarvisQuickMic` so the bottom-right corner reads as a single column of
 * system controls. Mirrors the voice / palette / mic affordances so users
 * who prefer mouse over voice still get one-tap access.
 */
export default function JarvisQuickActions() {
  const { chatOpen, musicOpen, toggleChat, toggleMusic } = useJarvisSystem();

  return (
    <div className="fixed right-8 bottom-24 z-40 flex flex-col gap-3">
      <ActionButton
        active={chatOpen}
        onClick={toggleChat}
        accent="#06b6d4"
        title={chatOpen ? 'Close conversation' : 'Open conversation'}
        ariaLabel="Toggle JARVIS conversation"
      >
        <MessageSquare className="w-4 h-4" />
      </ActionButton>
      <ActionButton
        active={musicOpen}
        onClick={toggleMusic}
        accent="#a855f7"
        title={musicOpen ? 'Stop ambient audio' : 'Play ambient audio'}
        ariaLabel="Toggle ambient audio"
      >
        <Music className="w-4 h-4" />
      </ActionButton>
    </div>
  );
}

interface ActionButtonProps {
  active: boolean;
  onClick: () => void;
  accent: string;
  title: string;
  ariaLabel: string;
  children: React.ReactNode;
}

function ActionButton({ active, onClick, accent, title, ariaLabel, children }: ActionButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: 0.7 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      title={title}
      aria-label={ariaLabel}
      aria-pressed={active}
      className="relative w-10 h-10 rounded-full flex items-center justify-center transition-shadow"
      style={
        active
          ? {
              background: `radial-gradient(circle, ${accent} 0%, ${accent}66 100%)`,
              color: '#0b0e1a',
              boxShadow: `0 0 14px ${accent}88, 0 0 28px ${accent}55`,
            }
          : {
              background: `radial-gradient(circle, rgba(0, 8, 20, 0.85) 0%, rgba(0, 8, 20, 0.95) 100%)`,
              color: accent,
              border: `1px solid ${accent}55`,
              boxShadow: `0 0 8px ${accent}33`,
            }
      }
    >
      {active && (
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ background: `${accent}33` }}
        />
      )}
      <span className="relative">{children}</span>
    </motion.button>
  );
}
