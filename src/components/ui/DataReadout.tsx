'use client';
import { useEffect, useState } from 'react';

interface DataReadoutProps {
  value: string;
  label?: string;
  accent?: string;
  className?: string;
  scrambleOnMount?: boolean;
  scrambleDuration?: number;
}

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';

function scrambleValue(target: string): string {
  return target
    .split('')
    .map(c => (c === ' ' || c === '.' || c === '-' || c === '%' || c === '<' || c === '>' || c === '+' || c === 'K' ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
    .join('');
}

export default function DataReadout({
  value,
  label,
  accent = '#00d4ff',
  className = '',
  scrambleOnMount = true,
  scrambleDuration = 900,
}: DataReadoutProps) {
  const [display, setDisplay] = useState(scrambleOnMount ? scrambleValue(value) : value);

  useEffect(() => {
    if (!scrambleOnMount) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    let raf: number;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / scrambleDuration);
      const reveal = Math.floor(value.length * t);
      const next = value
        .split('')
        .map((c, i) => (i < reveal ? c : scrambleValue(c)))
        .join('');
      setDisplay(next);
      if (t < 1) raf = requestAnimationFrame(step);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, scrambleOnMount, scrambleDuration]);

  return (
    <div className={`font-mono ${className}`}>
      <div
        className="text-2xl sm:text-3xl font-bold leading-none tracking-wider"
        style={{ color: accent, textShadow: `0 0 12px ${accent}66` }}
      >
        {display}
      </div>
      {label && (
        <div className="text-[9px] sm:text-[10px] text-gray-400 mt-1.5 uppercase tracking-[0.25em] font-mono">
          {label}
        </div>
      )}
    </div>
  );
}
