'use client';
import { useEffect, useState } from 'react';

interface OrbitNode {
  label: string;
  value: string;
  angle: number; // degrees, 0 = top
  accent?: string;
}

interface OrbitingNodesProps {
  radius: number;
  nodes: OrbitNode[];
  className?: string;
}

const VALUES_CYCLE = ['100%', '98.7%', '99.2%', 'NOMINAL', 'ONLINE', 'READY', 'IDLE'];

export default function OrbitingNodes({ radius, nodes, className = '' }: OrbitingNodesProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick(v => v + 1), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`} aria-hidden>
      <div className="relative" style={{ width: radius * 2, height: radius * 2 }}>
        {nodes.map((node, i) => {
          const rad = ((node.angle - 90) * Math.PI) / 180;
          const x = +(radius + Math.cos(rad) * radius).toFixed(2);
          const y = +(radius + Math.sin(rad) * radius).toFixed(2);
          const accent = node.accent || '#00d4ff';
          const showValue = node.value === '*' ? VALUES_CYCLE[(tick + i) % VALUES_CYCLE.length] : node.value;

          return (
            <div
              key={node.label}
              className="absolute"
              style={{
                left: x,
                top: y,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="flex flex-col items-center gap-1 animate-data-stream" style={{ animationDelay: `${i * 0.3}s`, animationDuration: '8s' }}>
                {/* Connector line back toward center */}
                <span
                  className="absolute h-px"
                  style={{
                    width: 28,
                    background: `linear-gradient(90deg, ${accent}, transparent)`,
                    transform: `rotate(${node.angle - 90 + 180}deg)`,
                    transformOrigin: 'left center',
                    left: '50%',
                    top: '50%',
                    opacity: 0.5,
                  }}
                />
                <div
                  className="relative px-2 py-1 rounded-sm font-mono text-[9px] tracking-[0.25em] uppercase whitespace-nowrap"
                  style={{
                    color: accent,
                    backgroundColor: 'rgba(0, 8, 20, 0.75)',
                    border: `1px solid ${accent}55`,
                    boxShadow: `0 0 10px ${accent}33`,
                  }}
                >
                  <span className="opacity-50 mr-1">›</span>
                  {node.label}
                  <span className="ml-1.5 opacity-90" style={{ color: accent === '#00d4ff' ? '#fbbf24' : accent }}>
                    {showValue}
                  </span>
                </div>
                {/* Pulse dot */}
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: accent,
                    boxShadow: `0 0 8px ${accent}`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
