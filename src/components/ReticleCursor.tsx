'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function ReticleCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(cursorY, { damping: 30, stiffness: 400, mass: 0.4 });
  const [enabled, setEnabled] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    // Only render on devices with a fine pointer (no touch)
    const mq = window.matchMedia('(pointer: fine)');
    setEnabled(mq.matches);
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select');
      setLocked(!!interactive);
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [enabled, cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[80] hidden md:block"
      style={{ x: springX, y: springY }}
      aria-hidden
    >
      <motion.div
        animate={{ scale: locked ? 1.35 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="relative"
        style={{ translateX: '-50%', translateY: '-50%' }}
      >
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
          {/* Outer ring */}
          <circle
            cx="21"
            cy="21"
            r="14"
            stroke={locked ? '#fbbf24' : '#00d4ff'}
            strokeWidth="1"
            strokeOpacity={locked ? 0.9 : 0.5}
            strokeDasharray="3 3"
            style={{ transition: 'stroke 0.2s' }}
          />
          {/* Crosshair lines */}
          <line x1="21" y1="2" x2="21" y2="9" stroke={locked ? '#fbbf24' : '#00d4ff'} strokeWidth="1" />
          <line x1="21" y1="33" x2="21" y2="40" stroke={locked ? '#fbbf24' : '#00d4ff'} strokeWidth="1" />
          <line x1="2" y1="21" x2="9" y2="21" stroke={locked ? '#fbbf24' : '#00d4ff'} strokeWidth="1" />
          <line x1="33" y1="21" x2="40" y2="21" stroke={locked ? '#fbbf24' : '#00d4ff'} strokeWidth="1" />
          {/* Center dot */}
          <circle cx="21" cy="21" r="1.5" fill={locked ? '#fbbf24' : '#00d4ff'} />
        </svg>
      </motion.div>
    </motion.div>
  );
}
