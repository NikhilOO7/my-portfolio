'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import HUDFrame from '@/components/ui/HUDFrame';
import { useJarvisSystem } from '@/components/JarvisSystemContext';

interface Metrics {
  cpu: number;
  mem: number;
  net: number;
  sparkline: number[];
}

function formatUptime(seconds: number) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function AmbientDiagnostics() {
  const { diagnosticsOpen, toggleDiagnostics } = useJarvisSystem();
  const [metrics, setMetrics] = useState<Metrics>({
    cpu: 18,
    mem: 42,
    net: 12.4,
    sparkline: [12, 15, 11, 18, 22, 16, 14, 19, 21, 17, 13, 15, 18, 16, 14],
  });
  const [mountedAt] = useState(() => Date.now());
  const [uptime, setUptime] = useState('00:00:00');

  useEffect(() => {
    const t = setInterval(() => {
      setMetrics(prev => {
        const cpu = Math.max(8, Math.min(78, prev.cpu + (Math.random() * 8 - 4)));
        const mem = Math.max(30, Math.min(86, prev.mem + (Math.random() * 4 - 2)));
        const net = Math.max(2, Math.min(46, prev.net + (Math.random() * 6 - 3)));
        const nextSpark = [...prev.sparkline.slice(1), Math.round(cpu)];
        return {
          cpu: Math.round(cpu * 10) / 10,
          mem: Math.round(mem * 10) / 10,
          net: Math.round(net * 10) / 10,
          sparkline: nextSpark,
        };
      });
    }, 1400);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setUptime(formatUptime((Date.now() - mountedAt) / 1000));
    }, 1000);
    return () => clearInterval(t);
  }, [mountedAt]);

  const maxSpark = Math.max(...metrics.sparkline, 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, x: -10 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="hidden lg:block fixed bottom-5 left-5 xl:left-[72px] z-40 w-[240px]"
    >
      <HUDFrame accent="#00d4ff" cornerSize={10} className="bg-jarvis-dark-700/85 backdrop-blur-md p-3">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.06) 0%, rgba(0, 8, 20, 0.55) 100%)' }}
        />
        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-2.5 font-mono text-[9px] tracking-[0.3em] uppercase">
            <span className="text-jarvis-cyan inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-jarvis-cyan animate-corner-pulse" />
              SYS·DIAG
            </span>
            <div className="flex items-center gap-2">
              <span className="text-jarvis-gold-400/80">LIVE</span>
              <button
                onClick={toggleDiagnostics}
                className="text-jarvis-blue-300/60 hover:text-jarvis-cyan transition-colors"
                aria-label={diagnosticsOpen ? 'Collapse diagnostics' : 'Expand diagnostics'}
                title={diagnosticsOpen ? 'Collapse' : 'Expand'}
              >
                {diagnosticsOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {diagnosticsOpen && (
              <motion.div
                key="body"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >

          {/* CPU row */}
          <Row label="CPU" value={`${metrics.cpu.toFixed(1)}%`} pct={metrics.cpu} accent="#00d4ff" />
          {/* MEM row */}
          <Row label="MEM" value={`${metrics.mem.toFixed(1)}%`} pct={metrics.mem} accent="#06b6d4" />
          {/* NET row */}
          <Row label="NET" value={`↓ ${metrics.net.toFixed(1)} MB/s`} pct={(metrics.net / 46) * 100} accent="#fbbf24" />

          {/* Sparkline */}
          <div className="mt-3">
            <div className="flex items-center justify-between font-mono text-[8px] tracking-widest uppercase text-jarvis-blue-300/70 mb-1">
              <span>CORE LOAD</span>
              <span className="text-jarvis-cyan">{metrics.sparkline[metrics.sparkline.length - 1]}</span>
            </div>
            <div className="h-7 flex items-end gap-0.5">
              {metrics.sparkline.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm transition-all"
                  style={{
                    height: `${Math.max(8, (v / maxSpark) * 100)}%`,
                    background: `linear-gradient(180deg, #00d4ff, #00d4ff66)`,
                    opacity: 0.45 + (i / metrics.sparkline.length) * 0.55,
                    boxShadow: i === metrics.sparkline.length - 1 ? '0 0 4px #00d4ff' : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Uptime */}
          <div className="mt-2.5 pt-2.5 border-t border-jarvis-cyan/10 flex items-center justify-between font-mono text-[9px] tracking-widest uppercase">
            <span className="text-jarvis-blue-300/70">UPTIME</span>
            <span className="text-jarvis-cyan tabular-nums">{uptime}</span>
          </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </HUDFrame>
    </motion.div>
  );
}

function Row({ label, value, pct, accent }: { label: string; value: string; pct: number; accent: string }) {
  return (
    <div className="mb-1.5">
      <div className="flex items-center justify-between font-mono text-[9px] tracking-widest uppercase mb-0.5">
        <span className="text-jarvis-blue-300/80">{label}</span>
        <span style={{ color: accent }}>{value}</span>
      </div>
      <div className="h-[3px] rounded-full overflow-hidden bg-jarvis-dark-600/80">
        <motion.div
          className="h-full rounded-full"
          animate={{ width: `${Math.min(100, pct)}%` }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            background: `linear-gradient(90deg, ${accent}, ${accent}66)`,
            boxShadow: `0 0 4px ${accent}99`,
          }}
        />
      </div>
    </div>
  );
}
