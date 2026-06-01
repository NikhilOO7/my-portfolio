'use client';
import { motion } from 'framer-motion';
import { Radio, Activity, Cpu, Layers, Database, MapPin, Calendar } from 'lucide-react';
import HUDFrame from '@/components/ui/HUDFrame';

const MONO = 'font-mono uppercase tracking-[0.25em]';

interface Stat {
  value: string;
  unit?: string;
  label: string;
  sub: string;
  accent: string;
}

const STATS: Stat[] = [
  { value: '9.5s', unit: 'e2e', label: 'AI Latency', sub: '↓ 73% from 36s', accent: '#00d4ff' },
  { value: '6', unit: 'agents', label: 'Pipeline DAG', sub: 'Coordinator-orchestrated', accent: '#a855f7' },
  { value: '5', unit: 'lanes', label: 'Mnemosyne Memory', sub: 'Context-scoped, per-user', accent: '#22c55e' },
  { value: '32', unit: 'ops', label: 'SDKs Shipped', sub: 'Python + JavaScript', accent: '#fbbf24' },
];

interface Subsystem {
  id: string;
  label: string;
  detail: string;
  Icon: typeof Cpu;
  accent: string;
}

const SUBSYSTEMS: Subsystem[] = [
  {
    id: 'pipeline',
    label: '6-Agent Orchestration',
    detail: 'Re-architected a serial 6-agent pipeline into a coordinator-driven DAG with prompt consolidation, model tiering, and async parallel execution. End-to-end latency 36s → 9.5s.',
    Icon: Cpu,
    accent: '#00d4ff',
  },
  {
    id: 'mnemosyne',
    label: 'Mnemosyne Memory',
    detail: 'Context-scoped memory architecture with semantic retrieval and temporal-decay lifecycle (Core → Dream → Forgotten → Deleted), bucketed per user and domain so context cannot cross boundaries.',
    Icon: Database,
    accent: '#22c55e',
  },
  {
    id: 'voice',
    label: 'Voice Sidecar (Gemini Live)',
    detail: 'Parallel voice sidecar running sentiment, query, and analytics pipelines asynchronously off the hot path — they never add to perceived response time.',
    Icon: Radio,
    accent: '#a855f7',
  },
  {
    id: 'concurrency',
    label: 'Concurrency & Sessions',
    detail: 'Redis-backed concurrency control with per-session sliding-window locks prevents state corruption when multiple real-time voice turns hit the same session simultaneously.',
    Icon: Activity,
    accent: '#06b6d4',
  },
  {
    id: 'sdks',
    label: 'Python + JS SDKs · 32 ops',
    detail: 'Shipped both SDKs covering orchestration, memory, analytics, sessions, and BYOD multi-tenant infrastructure — with CI/CD, audit logging, and signed webhook delivery.',
    Icon: Layers,
    accent: '#fbbf24',
  },
  {
    id: 'infra',
    label: 'Production Ops on GCP',
    detail: 'CI/CD pipelines, audit logging, signed webhooks, circuit breakers, and graceful shutdown — all on Cloud Run + Cloud SQL + Memorystore behind a private VPC.',
    Icon: Cpu,
    accent: '#ec4899',
  },
];

const STACK = [
  'Python', 'FastAPI', 'Node.js', 'GCP Cloud Run', 'Cloud SQL (Postgres)',
  'Memorystore (Redis)', 'Vertex AI · Gemini', 'Gemini Live', 'CrewAI',
  'LangGraph', 'Kubernetes', 'Prometheus', 'Terraform',
];

export default function LiveMissionSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Section title strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className={`${MONO} text-[10px] sm:text-xs text-jarvis-cyan/60 mb-4 inline-flex items-center gap-2`}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
        </span>
        ▸ Live Mission · Active Engagement
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
      >
        <HUDFrame accent="#22c55e" cornerSize={16} className="bg-jarvis-dark-700/65 backdrop-blur-md">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(34, 197, 94, 0.10) 0%, rgba(0, 8, 20, 0.6) 60%, rgba(168, 85, 247, 0.06) 100%)',
            }}
          />

          {/* TOP STRIP — operation + status + dates */}
          <div className={`relative px-5 py-2.5 border-b border-emerald-400/15 flex flex-wrap items-center justify-between gap-2 ${MONO} text-[10px]`}>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-emerald-400/95">› MISSION · NRG-001</span>
              <span className="text-jarvis-blue-300/40">·</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                Transmitting · Live
              </span>
              <span className="text-jarvis-blue-300/40">·</span>
              <span className="text-emerald-400/90">class::ALPHA</span>
            </div>
            <div className="flex items-center gap-3 text-jarvis-blue-300/55">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3 h-3" /> Jan 2026 → Present
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5">
                <MapPin className="w-3 h-3" /> San Francisco, CA
              </span>
            </div>
          </div>

          {/* HERO */}
          <div className="relative px-5 sm:px-8 pt-6 sm:pt-8 pb-4">
            <div className={`${MONO} text-[10px] text-emerald-400/85 mb-2`}>
              ▸ Subject · Neurologyca — AI Coaching Infrastructure (Contract)
            </div>
            <h2 className="font-display text-2xl sm:text-4xl text-white tracking-tight leading-tight max-w-3xl">
              Architecting a multi-agent AI coaching platform that fuses{' '}
              <span className="text-emerald-400">biometric signal analysis</span> with{' '}
              <span className="text-jarvis-cyan">persistent personal memory</span>.
            </h2>
            <p className="mt-3 text-gray-300 leading-relaxed max-w-3xl text-sm sm:text-[15px]">
              Owning system design end to end on GCP Cloud Run — a 6-agent orchestration pipeline (Kopernica),
              the Mnemosyne memory subsystem, and a parallel voice sidecar that runs sentiment / query /
              analytics off the hot path. Currently shipping the production-grade Python + JavaScript SDKs
              and the multi-tenant BYOD surface that exposes it all.
            </p>
          </div>

          {/* STATS GRID */}
          <div className="relative px-5 sm:px-8 pb-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  className="relative p-3 sm:p-4 rounded-sm overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${s.accent}14 0%, rgba(0, 8, 20, 0.55) 100%)`,
                    border: `1px solid ${s.accent}44`,
                    boxShadow: `inset 0 0 18px -8px ${s.accent}`,
                  }}
                >
                  <span
                    className="absolute -top-8 -right-8 w-20 h-20 rounded-full blur-3xl opacity-30"
                    style={{ backgroundColor: s.accent }}
                  />
                  <div className="relative">
                    <div className={`${MONO} text-[9px] mb-1.5`} style={{ color: s.accent, opacity: 0.85 }}>
                      › {s.label}
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-2xl sm:text-3xl text-white tracking-tight" style={{ textShadow: `0 0 12px ${s.accent}80` }}>
                        {s.value}
                      </span>
                      {s.unit && (
                        <span className={`${MONO} text-[10px] text-gray-400`}>{s.unit}</span>
                      )}
                    </div>
                    <div className={`${MONO} text-[9px] text-jarvis-blue-300/65 mt-1`}>{s.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Signal-flow one-liner — the diagram in 12 words */}
          <div className="relative px-5 sm:px-8 pb-5">
            <div
              className={`${MONO} text-[10px] sm:text-[11px] flex flex-wrap items-center gap-x-2 gap-y-1 px-3 py-2.5 rounded-sm border border-emerald-400/15`}
              style={{ background: 'rgba(34, 197, 94, 0.04)' }}
            >
              <span className="text-emerald-400/85">▸ Signal Flow</span>
              <span className="text-jarvis-blue-300/35">›</span>
              <span className="text-emerald-400">Voice + HCI</span>
              <span className="text-jarvis-blue-300/35">→</span>
              <span className="text-jarvis-cyan">Coordinator · 6-agent DAG</span>
              <span className="text-jarvis-blue-300/35">→</span>
              <span className="text-jarvis-gold-400">Response · 9.5s</span>
              <span className="text-jarvis-blue-300/35">·</span>
              <span className="text-emerald-400/85">Mnemosyne · 5 lanes</span>
              <span className="text-jarvis-blue-300/35">·</span>
              <span className="text-jarvis-purple-300/90" style={{ color: '#c4a8f8' }}>Gemini Live async sidecar</span>
            </div>
          </div>

          {/* SUBSYSTEMS — what's being built right now */}
          <div className="relative px-5 sm:px-8 pb-5">
            <div className={`${MONO} text-[10px] text-emerald-400/80 mb-3`}>
              ▸ What I'm Building · Active Subsystems
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SUBSYSTEMS.map((sub, i) => {
                const Icon = sub.Icon;
                return (
                  <motion.div
                    key={sub.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: 0.05 * i }}
                    className="relative p-3.5 rounded-sm overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${sub.accent}10 0%, rgba(0, 8, 20, 0.55) 100%)`,
                      border: `1px solid ${sub.accent}33`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="w-7 h-7 rounded-sm border inline-flex items-center justify-center flex-shrink-0"
                        style={{
                          borderColor: `${sub.accent}55`,
                          backgroundColor: `${sub.accent}14`,
                        }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: sub.accent }} />
                      </span>
                      <span className="font-display text-sm text-white tracking-wide">{sub.label}</span>
                    </div>
                    <p className="text-[12px] text-gray-400 leading-relaxed">{sub.detail}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* STACK */}
          <div className="relative px-5 sm:px-8 pb-6">
            <div className={`${MONO} text-[10px] text-emerald-400/70 mb-2`}>
              ▸ Deployed Assets · Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {STACK.map(t => (
                <span
                  key={t}
                  className={`${MONO} text-[10px] px-2 py-0.5 rounded-sm border`}
                  style={{
                    borderColor: 'rgba(34, 197, 94, 0.25)',
                    backgroundColor: 'rgba(34, 197, 94, 0.05)',
                    color: 'rgba(229, 231, 235, 0.85)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* BOTTOM STRIP */}
          <div className={`relative px-5 py-2.5 border-t border-emerald-400/15 ${MONO} text-[9px] flex items-center justify-between text-jarvis-blue-300/55`}>
            <span>UPLINK · STABLE · CONTRACT ENGAGEMENT</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400/85">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-corner-pulse" />
              MISSION ONGOING
            </span>
          </div>
        </HUDFrame>
      </motion.div>
    </section>
  );
}
