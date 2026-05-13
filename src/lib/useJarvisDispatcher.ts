'use client';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useJarvisVoice } from '@/components/JarvisVoiceContext';
import { useJarvisSystem } from '@/components/JarvisSystemContext';
import { SUITS } from '@/components/IronManHologram';
import type { JarvisCommand } from '@/lib/jarvisCommands';

export interface DispatchResult {
  reply: string;
  /** Did the dispatcher schedule a route change? */
  routed: boolean;
}

/**
 * Unified executor for any JARVIS command. Used by:
 *   - JarvisConsole (free-form / chip clicks)
 *   - JarvisQuickMic (voice input from any page)
 *   - JarvisCommandPalette (click / search-and-execute)
 *
 * Returns the JARVIS-spoken reply so callers can append it to their transcripts.
 */
export function useJarvisDispatcher() {
  const router = useRouter();
  const { speak, toggleEnabled, enabled: voiceEnabled } = useJarvisVoice();
  const {
    toggleChat,
    toggleMusic,
    togglePalette,
    toggleDiagnostics,
    cycleSuit,
    chatOpen,
    musicOpen,
    paletteOpen,
    diagnosticsOpen,
    suit,
  } = useJarvisSystem();

  return useCallback(
    (cmd: JarvisCommand): DispatchResult => {
      // Navigation
      if (cmd.route) {
        const reply = `Right away. Accessing ${cmd.label.toLowerCase()}.`;
        speak(reply);
        window.setTimeout(() => router.push(cmd.route!), 650);
        return { reply, routed: true };
      }

      // Action commands
      if (cmd.action) {
        switch (cmd.action) {
          case 'toggle-chat': {
            toggleChat();
            const next = !chatOpen;
            const reply = next
              ? 'Conversation channel open. Standing by.'
              : 'Conversation channel closed.';
            speak(reply);
            return { reply, routed: false };
          }
          case 'toggle-music': {
            toggleMusic();
            const next = !musicOpen;
            const reply = next
              ? 'Ambient audio engaged.'
              : 'Ambient audio disengaged.';
            speak(reply);
            return { reply, routed: false };
          }
          case 'toggle-voice': {
            const next = !voiceEnabled;
            toggleEnabled();
            const reply = next
              ? 'Voice systems online. At your service.'
              : 'Voice systems offline.';
            // Speak only if turning on (otherwise we'd be silent anyway)
            if (next) {
              window.setTimeout(() => speak(reply), 80);
            }
            return { reply, routed: false };
          }
          case 'toggle-palette': {
            togglePalette();
            const next = !paletteOpen;
            const reply = next
              ? 'Command registry open.'
              : 'Command registry closed.';
            speak(reply);
            return { reply, routed: false };
          }
          case 'toggle-diagnostics': {
            toggleDiagnostics();
            const next = !diagnosticsOpen;
            const reply = next ? 'Diagnostics restored.' : 'Diagnostics collapsed.';
            speak(reply);
            return { reply, routed: false };
          }
          case 'cycle-suit': {
            cycleSuit();
            // Determine next suit in sequence for the reply
            const order = ['mark42', 'stealth', 'warmachine', 'bleeding', 'mark1'] as const;
            const idx = order.indexOf(suit);
            const nextSuit = order[(idx + 1) % order.length];
            const label = SUITS[nextSuit].label;
            const reply = `Hologram switched to ${label}.`;
            speak(reply);
            return { reply, routed: false };
          }
        }
      }

      return { reply: 'Unknown command.', routed: false };
    },
    [router, speak, toggleEnabled, voiceEnabled, toggleChat, toggleMusic, togglePalette, toggleDiagnostics, cycleSuit, chatOpen, musicOpen, paletteOpen, diagnosticsOpen, suit]
  );
}
