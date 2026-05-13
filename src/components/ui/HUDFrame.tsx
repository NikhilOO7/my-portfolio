'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HUDFrameProps {
  children: ReactNode;
  accent?: string;
  className?: string;
  cornerSize?: number;
  showScan?: boolean;
}

export default function HUDFrame({
  children,
  accent = '#00d4ff',
  className = '',
  cornerSize = 14,
  showScan = false,
}: HUDFrameProps) {
  const corner = `${cornerSize}px`;

  return (
    <div className={`relative ${className}`}>
      {/* Corner brackets */}
      <span
        className="absolute -top-px -left-px pointer-events-none"
        style={{
          width: corner,
          height: corner,
          borderTop: `1.5px solid ${accent}`,
          borderLeft: `1.5px solid ${accent}`,
          boxShadow: `0 0 8px -2px ${accent}, inset 0 0 6px -2px ${accent}55`,
        }}
        aria-hidden
      />
      <span
        className="absolute -top-px -right-px pointer-events-none"
        style={{
          width: corner,
          height: corner,
          borderTop: `1.5px solid ${accent}`,
          borderRight: `1.5px solid ${accent}`,
          boxShadow: `0 0 8px -2px ${accent}`,
        }}
        aria-hidden
      />
      <span
        className="absolute -bottom-px -left-px pointer-events-none"
        style={{
          width: corner,
          height: corner,
          borderBottom: `1.5px solid ${accent}`,
          borderLeft: `1.5px solid ${accent}`,
          boxShadow: `0 0 8px -2px ${accent}`,
        }}
        aria-hidden
      />
      <span
        className="absolute -bottom-px -right-px pointer-events-none"
        style={{
          width: corner,
          height: corner,
          borderBottom: `1.5px solid ${accent}`,
          borderRight: `1.5px solid ${accent}`,
          boxShadow: `0 0 8px -2px ${accent}`,
        }}
        aria-hidden
      />

      {/* Optional scan-line that drifts down */}
      {showScan && (
        <motion.span
          className="absolute left-2 right-2 top-0 h-px pointer-events-none animate-scan-down"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${accent} 50%, transparent 100%)`,
            boxShadow: `0 0 10px ${accent}`,
          }}
          aria-hidden
        />
      )}

      {children}
    </div>
  );
}
