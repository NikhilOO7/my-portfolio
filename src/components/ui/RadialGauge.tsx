'use client';
import { motion } from 'framer-motion';

interface RadialGaugeProps {
  value: number; // 0–100
  label: string;
  tier: string;
  accent?: string;
  icon?: React.ReactNode;
  size?: number;
}

export default function RadialGauge({
  value,
  label,
  tier,
  accent = '#00d4ff',
  icon,
  size = 140,
}: RadialGaugeProps) {
  const stroke = 4;
  const radius = (size - stroke) / 2 - 6;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const center = size / 2;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Slow outer rotation decoration */}
        <div className="absolute inset-0 animate-rotate-slow" style={{ animationDuration: '30s' }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
              cx={center}
              cy={center}
              r={radius + 4}
              fill="none"
              stroke={accent}
              strokeOpacity={0.25}
              strokeWidth="0.6"
              strokeDasharray="2 8"
            />
          </svg>
        </div>

        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute inset-0 -rotate-90"
        >
          {/* Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={stroke}
          />
          {/* Progress */}
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={accent}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 6px ${accent})` }}
          />
          {/* Tick marks on outer edge */}
          <g stroke={accent} strokeOpacity={0.55} strokeWidth="1">
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const inner = radius + 6;
              const outer = radius + 10;
              const x1 = +(center + Math.cos(angle) * inner).toFixed(2);
              const y1 = +(center + Math.sin(angle) * inner).toFixed(2);
              const x2 = +(center + Math.cos(angle) * outer).toFixed(2);
              const y2 = +(center + Math.sin(angle) * outer).toFixed(2);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
          </g>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {icon && (
            <div className="mb-1" style={{ color: accent }}>
              {icon}
            </div>
          )}
          <div
            className="font-mono text-2xl font-bold leading-none tracking-wider"
            style={{ color: accent, textShadow: `0 0 10px ${accent}55` }}
          >
            {value}
            <span className="text-xs ml-0.5 opacity-60">%</span>
          </div>
          <div className="text-[9px] uppercase tracking-[0.25em] text-gray-400 mt-1 font-mono">
            {tier}
          </div>
        </div>
      </div>

      <div className="mt-3 text-sm font-display text-white tracking-wide">
        {label}
      </div>
    </div>
  );
}
