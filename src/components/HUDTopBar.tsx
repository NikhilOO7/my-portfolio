'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Command } from 'lucide-react';
import { useJarvisVoice } from '@/components/JarvisVoiceContext';
import { useJarvisSystem } from '@/components/JarvisSystemContext';

export default function HUDTopBar() {
  const [time, setTime] = useState('--:--:--');
  const [scanLevel, setScanLevel] = useState(96);
  const { enabled: voiceEnabled, speaking, available: voiceAvailable, toggleEnabled, speak } = useJarvisVoice();
  const { togglePalette, paletteOpen } = useJarvisSystem();

  const onToggleVoice = () => {
    if (!voiceAvailable) return;
    const next = !voiceEnabled;
    toggleEnabled();
    if (next) {
      // Defer slightly so state flip lands before speak triggers
      setTimeout(() => speak('Voice systems online. At your service.'), 60);
    }
  };

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const opts: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/Los_Angeles',
      };
      setTime(new Intl.DateTimeFormat('en-US', opts).format(now));
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setScanLevel(prev => {
        const next = prev + (Math.random() * 4 - 2);
        return Math.max(88, Math.min(99, Math.round(next * 10) / 10));
      });
    }, 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-[55] pointer-events-none"
    >
      <div
        className="border-b border-jarvis-blue-500/20 backdrop-blur-md h-7"
        style={{ background: 'linear-gradient(180deg, rgba(0, 8, 20, 0.7) 0%, rgba(0, 8, 20, 0.25) 100%)' }}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-widest text-jarvis-blue-300/80 uppercase">
          {/* Left cluster */}
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span className="text-emerald-300">JARVIS · ONLINE</span>
            </span>
            <span className="hidden md:inline text-jarvis-blue-300/60">SYS.UPLINK::stable</span>
            <span className="hidden lg:inline text-jarvis-gold-400/80 animate-hud-flicker">PWR 1.21 GW</span>
          </div>

          {/* Center cluster — geo */}
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-jarvis-blue-300/60">37.7749°N · 122.4194°W</span>
          </div>

          {/* Right cluster — palette + voice toggle + scan + clock */}
          <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
            <button
              onClick={togglePalette}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm border transition-all"
              style={
                paletteOpen
                  ? {
                      borderColor: '#00d4ff',
                      color: '#00d4ff',
                      backgroundColor: 'rgba(0, 212, 255, 0.1)',
                      boxShadow: '0 0 8px rgba(0, 212, 255, 0.35)',
                    }
                  : {
                      borderColor: 'rgba(0, 212, 255, 0.3)',
                      color: 'rgba(125, 211, 252, 0.7)',
                    }
              }
              title="JARVIS command registry — ⌘P / Ctrl+P"
              aria-pressed={paletteOpen}
              aria-label="Toggle JARVIS command registry"
            >
              <Command className="w-3 h-3" />
              <span className="hidden sm:inline">CMD · ⌘P</span>
            </button>
            {voiceAvailable && (
              <button
                onClick={onToggleVoice}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm border transition-all"
                style={
                  voiceEnabled
                    ? {
                        borderColor: '#fbbf24',
                        color: '#fbbf24',
                        backgroundColor: 'rgba(251, 191, 36, 0.08)',
                        boxShadow: '0 0 8px rgba(251, 191, 36, 0.35)',
                      }
                    : {
                        borderColor: 'rgba(0, 212, 255, 0.3)',
                        color: 'rgba(125, 211, 252, 0.7)',
                      }
                }
                title={voiceEnabled ? 'JARVIS voice on — click to mute' : 'JARVIS voice off — click to activate'}
                aria-pressed={voiceEnabled}
                aria-label="Toggle JARVIS voice"
              >
                {voiceEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                <span className="hidden sm:inline">
                  VOICE {voiceEnabled ? (speaking ? '· SPK' : '· ON') : '· OFF'}
                </span>
              </button>
            )}
            <span className="hidden md:inline text-jarvis-blue-300/70">SCAN {scanLevel.toFixed(1)}%</span>
            <span className="text-jarvis-cyan font-medium">{time} PST</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
