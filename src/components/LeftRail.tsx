'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navMarkers = [
  { id: '/', label: 'home' },
  { id: '/about', label: 'about' },
  { id: '/skills', label: 'skills' },
  { id: '/projects', label: 'projects' },
  { id: '/contact', label: 'contact' },
];

export default function LeftRail() {
  const pathname = usePathname();
  const [power, setPower] = useState(98);

  useEffect(() => {
    const t = setInterval(() => {
      setPower(prev => {
        const next = prev + (Math.random() * 1.6 - 0.8);
        return Math.max(94, Math.min(100, Math.round(next * 10) / 10));
      });
    }, 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.35 }}
      className="hidden xl:flex fixed top-7 bottom-0 left-0 w-14 z-40 flex-col items-center justify-between py-4 pointer-events-none"
      style={{
        background: 'linear-gradient(180deg, rgba(0, 8, 20, 0.5) 0%, rgba(0, 8, 20, 0.25) 100%)',
        borderRight: '1px solid rgba(0, 212, 255, 0.18)',
      }}
      aria-hidden
    >
      {/* Top: mini reactor */}
      <div className="relative w-9 h-9 flex items-center justify-center pointer-events-auto">
        <span
          className="absolute inset-0 rounded-full animate-rotate-slow"
          style={{ animationDuration: '14s', border: '1px dashed rgba(0, 212, 255, 0.45)' }}
        />
        <span
          className="absolute inset-1.5 rounded-full"
          style={{
            border: '1px solid rgba(0, 212, 255, 0.6)',
            boxShadow: '0 0 8px rgba(0, 212, 255, 0.4), inset 0 0 8px rgba(0, 212, 255, 0.4)',
          }}
        />
        <span
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: 'radial-gradient(circle, #ffffff 0%, #00d4ff 60%, transparent 100%)',
            filter: 'blur(0.5px)',
          }}
        />
      </div>

      {/* Middle: rotated brand text + nav markers */}
      <div className="flex flex-col items-center gap-6 flex-1 justify-center pointer-events-auto">
        <div
          className="font-mono text-[9px] tracking-[0.45em] uppercase text-jarvis-blue-300/70 whitespace-nowrap select-none"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Stark Industries · J.A.R.V.I.S · v4.7
        </div>

        {/* Nav dot markers */}
        <ul className="flex flex-col items-center gap-3">
          {navMarkers.map(m => {
            const active = m.id === '/' ? pathname === '/' : pathname.startsWith(m.id);
            return (
              <li key={m.id} className="group relative">
                <Link href={m.id} aria-label={`Go to ${m.label}`} className="block">
                  <span
                    className="block w-1.5 h-1.5 rounded-full transition-all"
                    style={{
                      backgroundColor: active ? '#fbbf24' : 'rgba(0, 212, 255, 0.45)',
                      boxShadow: active ? '0 0 8px #fbbf24, 0 0 14px #fbbf24aa' : 'none',
                      transform: active ? 'scale(1.6)' : 'scale(1)',
                    }}
                  />
                </Link>
                <span className="absolute left-5 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-sm font-mono text-[9px] tracking-widest uppercase text-jarvis-cyan bg-jarvis-dark-700/90 border border-jarvis-cyan/40 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {m.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom: vertical power gauge */}
      <div className="flex flex-col items-center gap-2 pointer-events-auto">
        <div className="relative w-1 h-20 rounded-full overflow-hidden bg-jarvis-dark-700/70">
          <motion.div
            className="absolute bottom-0 left-0 right-0"
            animate={{ height: `${power}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              background: 'linear-gradient(180deg, #fbbf24 0%, #00d4ff 100%)',
              boxShadow: '0 0 8px rgba(0, 212, 255, 0.6)',
            }}
          />
        </div>
        <span className="font-mono text-[8px] tracking-widest uppercase text-jarvis-blue-300/80">
          PWR
        </span>
        <span
          className="font-mono text-[9px] tracking-wider tabular-nums"
          style={{ color: '#fbbf24' }}
        >
          {power.toFixed(0)}
        </span>
      </div>
    </motion.aside>
  );
}
