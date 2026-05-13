'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import HUDFrame from '@/components/ui/HUDFrame';
import JarvisNarrator from '@/components/ui/JarvisNarrator';

interface PanelHeaderProps {
  module: string;       // module ID, e.g. "PROJECT ARCHIVE"
  query: string;        // user's "query" echoed back, e.g. "show project archive"
  response: string[];   // JARVIS narration lines
  accent?: string;
  queryId?: string;     // overrides the auto-generated ID
}

function genQueryId() {
  // 6-char alphanumeric ID
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
  let out = '';
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export default function PanelHeader({
  module,
  query,
  response,
  accent = '#00d4ff',
  queryId,
}: PanelHeaderProps) {
  const [time, setTime] = useState('--:--:--');
  const [id, setId] = useState(queryId ?? 'Q-------');

  useEffect(() => {
    if (!queryId) setId(`Q-${genQueryId()}`);
    const tick = () => {
      const opts: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/Los_Angeles',
      };
      setTime(new Intl.DateTimeFormat('en-US', opts).format(new Date()));
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [queryId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <HUDFrame accent={accent} cornerSize={14} showScan className="bg-jarvis-dark-700/70 backdrop-blur-md p-5 sm:p-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${accent}10 0%, rgba(0, 8, 20, 0.55) 100%)` }}
        />

        <div className="relative">
          {/* Top metadata row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 font-mono text-[10px] tracking-[0.3em] uppercase">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-jarvis-blue-300/70 hover:text-jarvis-cyan transition-colors"
                aria-label="Back to JARVIS console"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Console</span>
              </Link>
              <span className="text-jarvis-blue-300/40">›</span>
              <span style={{ color: accent }}>Module · {module}</span>
            </div>
            <div className="flex items-center gap-3 text-jarvis-blue-300/60">
              <span className="hidden sm:inline">{id}</span>
              <span className="text-jarvis-cyan tabular-nums">{time} PST</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                Loaded
              </span>
            </div>
          </div>

          {/* Echoed user query */}
          <div className="flex items-start gap-3 font-mono text-xs sm:text-sm leading-relaxed mb-2">
            <span className="text-jarvis-gold-400 uppercase tracking-widest whitespace-nowrap text-[10px] sm:text-xs pt-0.5">
              [YOU]
            </span>
            <span className="text-gray-300 italic">{query}</span>
          </div>

          {/* JARVIS narration response */}
          <JarvisNarrator
            lines={response}
            speed={18}
            startDelay={350}
          />
        </div>
      </HUDFrame>
    </motion.div>
  );
}
