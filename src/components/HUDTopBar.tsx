'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HUDTopBar() {
  const [time, setTime] = useState('--:--:--');
  const [scanLevel, setScanLevel] = useState(96);

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

          {/* Right cluster — scan + clock */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden md:inline text-jarvis-blue-300/70">SCAN {scanLevel.toFixed(1)}%</span>
            <span className="text-jarvis-cyan font-medium">{time} PST</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
