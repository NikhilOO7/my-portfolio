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

          {/* MINI ARCHITECTURE SCHEMATIC */}
          <div className="relative px-5 sm:px-8 pb-5">
            <div className={`${MONO} text-[10px] text-emerald-400/80 mb-2`}>
              ▸ Live Architecture · Signal Flow
            </div>
            <div className="relative w-full overflow-hidden rounded-sm border border-emerald-400/15 bg-jarvis-dark-900/60">
              <ArchitectureSchematic />
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

// ─────────────────────────────────────────────────────────────────────────
// Mini live-architecture schematic — voice/HCI in → 6-agent DAG →
// Mnemosyne memory → response, with Gemini Live sidecar branched off.
// ─────────────────────────────────────────────────────────────────────────
function ArchitectureSchematic() {
  // Six pipeline agents arranged in a horizontal staggered DAG
  const agentLabels = ['INTAKE', 'PLAN', 'RETRIEVE', 'REASON', 'COMPOSE', 'EMIT'];
  const baseX = 96;
  const stepX = 50;
  return (
    <svg viewBox="0 0 720 240" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="lm-bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.04" />
        </linearGradient>
        <marker id="lm-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#22c55e" fillOpacity="0.8" />
        </marker>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="720" height="240" fill="url(#lm-bg)" />

      {/* Lane labels */}
      <text x="48" y="22" fill="#22c55e" fillOpacity="0.6" fontSize="9" letterSpacing="2" fontFamily="ui-monospace, monospace">› INPUT</text>
      <text x="360" y="22" textAnchor="middle" fill="#00d4ff" fillOpacity="0.6" fontSize="9" letterSpacing="2" fontFamily="ui-monospace, monospace">› ORCHESTRATION · 6-AGENT DAG</text>
      <text x="640" y="22" textAnchor="end" fill="#fbbf24" fillOpacity="0.7" fontSize="9" letterSpacing="2" fontFamily="ui-monospace, monospace">› OUTPUT</text>

      {/* ── INPUT cluster (voice mic + HCI bio signals) ─────────────── */}
      <g transform="translate(20 60)">
        {/* Voice mic */}
        <rect width="68" height="44" rx="2" fill="#22c55e" fillOpacity="0.10" stroke="#22c55e" strokeOpacity="0.85" strokeWidth="0.9" />
        <circle cx="14" cy="22" r="6" fill="#22c55e" fillOpacity="0.5">
          <animate attributeName="fill-opacity" values="0.5;0.9;0.5" dur="1.4s" repeatCount="indefinite" />
        </circle>
        <text x="24" y="20" fill="#22c55e" fontSize="9" letterSpacing="1.4" fontFamily="ui-monospace, monospace">VOICE</text>
        <text x="24" y="32" fill="#22c55e" fontSize="7" letterSpacing="1" opacity="0.7" fontFamily="ui-monospace, monospace">WebRTC</text>

        {/* HCI biometrics */}
        <g transform="translate(0 56)">
          <rect width="68" height="44" rx="2" fill="#a855f7" fillOpacity="0.10" stroke="#a855f7" strokeOpacity="0.85" strokeWidth="0.9" />
          <text x="6" y="14" fill="#a855f7" fontSize="9" letterSpacing="1.4" fontFamily="ui-monospace, monospace">HCI</text>
          {/* Mini biometric waveforms */}
          <polyline
            points="6,30 12,24 18,32 24,26 30,30 36,22 42,30 48,26 54,30 60,24"
            fill="none"
            stroke="#a855f7"
            strokeOpacity="0.85"
            strokeWidth="0.9"
          />
          <text x="6" y="40" fill="#a855f7" fontSize="6" letterSpacing="0.8" opacity="0.7" fontFamily="ui-monospace, monospace">EMOTION · ATTN</text>
        </g>
      </g>

      {/* Animated dashed flow from input → pipeline */}
      <line x1="88" y1="82" x2="92" y2="100" stroke="#22c55e" strokeOpacity="0.7" strokeWidth="0.9" strokeDasharray="3 3" markerEnd="url(#lm-arrow)">
        <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.4s" repeatCount="indefinite" />
      </line>
      <line x1="88" y1="138" x2="92" y2="120" stroke="#a855f7" strokeOpacity="0.7" strokeWidth="0.9" strokeDasharray="3 3" markerEnd="url(#lm-arrow)">
        <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.6s" repeatCount="indefinite" />
      </line>

      {/* ── 6-AGENT DAG (horizontal, staggered) ─────────────────────── */}
      {agentLabels.map((label, i) => {
        const x = baseX + i * stepX;
        const y = i % 2 === 0 ? 100 : 124;
        return (
          <g key={label}>
            <rect
              x={x}
              y={y}
              width="44"
              height="22"
              rx="2"
              fill="#00d4ff"
              fillOpacity="0.16"
              stroke="#00d4ff"
              strokeOpacity="0.85"
              strokeWidth="0.9"
            />
            <text
              x={x + 22}
              y={y + 14}
              textAnchor="middle"
              fill="#00d4ff"
              fontSize="8"
              letterSpacing="1.4"
              fontFamily="ui-monospace, monospace"
            >
              {label}
            </text>
            {/* Activity pulse on each agent */}
            <rect x={x + 6} y={y + 17} width="32" height="1.5" fill="#00d4ff" fillOpacity="0.15" />
            <rect x={x + 6} y={y + 17} width={[26, 18, 30, 12, 22, 28][i]} height="1.5" fill="#00d4ff" fillOpacity="0.85">
              <animate attributeName="width" values={`${[26, 18, 30, 12, 22, 28][i]};${[18, 28, 14, 26, 30, 20][i]};${[26, 18, 30, 12, 22, 28][i]}`} dur={`${1.6 + i * 0.18}s`} repeatCount="indefinite" />
            </rect>
          </g>
        );
      })}

      {/* DAG edges between agents */}
      {agentLabels.slice(0, -1).map((_, i) => {
        const fromX = baseX + i * stepX + 44;
        const fromY = (i % 2 === 0 ? 100 : 124) + 11;
        const toX = baseX + (i + 1) * stepX;
        const toY = ((i + 1) % 2 === 0 ? 100 : 124) + 11;
        return (
          <line
            key={i}
            x1={fromX}
            y1={fromY}
            x2={toX}
            y2={toY}
            stroke="#00d4ff"
            strokeOpacity="0.6"
            strokeWidth="0.8"
            strokeDasharray="2 3"
            markerEnd="url(#lm-arrow)"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-10" dur={`${1.5 + i * 0.15}s`} repeatCount="indefinite" />
          </line>
        );
      })}

      {/* Coordinator pill (above the DAG) */}
      <g transform="translate(220 60)">
        <rect width="140" height="22" rx="11" fill="#00d4ff" fillOpacity="0.18" stroke="#00d4ff" strokeOpacity="0.9" strokeWidth="0.9" style={{ filter: 'drop-shadow(0 0 6px rgba(0, 212, 255, 0.4))' }} />
        <text x="70" y="14" textAnchor="middle" fill="#00d4ff" fontSize="8" letterSpacing="2.5" fontFamily="ui-monospace, monospace">COORDINATOR · DAG</text>
        {/* Connection lines down to each agent */}
        {[0, 1, 2, 3, 4, 5].map(i => {
          const x = baseX + i * stepX + 22;
          return (
            <line
              key={i}
              x1={70}
              y1={22}
              x2={x - 220}
              y2={(i % 2 === 0 ? 100 : 124) - 60}
              stroke="#00d4ff"
              strokeOpacity="0.3"
              strokeDasharray="1 3"
            />
          );
        })}
      </g>

      {/* ── Gemini Live voice sidecar (top) ───────────────────────────── */}
      <g transform="translate(420 50)">
        <rect width="120" height="34" rx="3" fill="#a855f7" fillOpacity="0.16" stroke="#a855f7" strokeOpacity="0.9" strokeWidth="0.9" />
        <text x="60" y="14" textAnchor="middle" fill="#a855f7" fontSize="8" letterSpacing="2" fontFamily="ui-monospace, monospace">GEMINI LIVE</text>
        <text x="60" y="26" textAnchor="middle" fill="#a855f7" fontSize="7" letterSpacing="1.5" opacity="0.7" fontFamily="ui-monospace, monospace">VOICE SIDECAR</text>
        {/* Animated sentiment / analytics labels */}
        <text x="60" y="48" textAnchor="middle" fill="#a855f7" fontSize="6" letterSpacing="1.5" opacity="0.6" fontFamily="ui-monospace, monospace">ASYNC · OFF HOT PATH</text>
      </g>
      <line x1="420" y1="80" x2="356" y2="106" stroke="#a855f7" strokeOpacity="0.55" strokeWidth="0.7" strokeDasharray="2 3">
        <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="1.8s" repeatCount="indefinite" />
      </line>

      {/* ── MNEMOSYNE memory (bottom) — 5 lanes ──────────────────────── */}
      <g transform="translate(140 170)">
        <text x="0" y="-2" fill="#22c55e" fillOpacity="0.7" fontSize="8" letterSpacing="2" fontFamily="ui-monospace, monospace">› MNEMOSYNE · 5 LANES</text>
        {['CAREER', 'NETWORK', 'JOB-SEARCH', 'LEARNING', 'PRODUCTIVITY'].map((lane, i) => (
          <g key={lane} transform={`translate(${i * 76} 4)`}>
            <rect width="70" height="22" rx="2" fill="#22c55e" fillOpacity={0.08 + (i % 2) * 0.05} stroke="#22c55e" strokeOpacity="0.7" strokeWidth="0.8" />
            <text x="35" y="9" textAnchor="middle" fill="#22c55e" fontSize="6" letterSpacing="1.2" fontFamily="ui-monospace, monospace">{lane}</text>
            <rect x="6" y="13" width="58" height="2" fill="#22c55e" fillOpacity="0.2" />
            <rect x="6" y="13" width={[42, 30, 50, 24, 38][i]} height="2" fill="#22c55e" fillOpacity="0.85" />
            <text x="6" y="20" fill="#22c55e" fontSize="5" letterSpacing="0.8" opacity="0.7" fontFamily="ui-monospace, monospace">CORE → DREAM</text>
          </g>
        ))}
      </g>

      {/* Connections from agents down to memory */}
      {[0, 2, 4].map(i => {
        const fromX = baseX + i * stepX + 22;
        return (
          <line
            key={i}
            x1={fromX}
            y1={146}
            x2={fromX}
            y2={172}
            stroke="#22c55e"
            strokeOpacity="0.45"
            strokeWidth="0.7"
            strokeDasharray="1 3"
          />
        );
      })}

      {/* ── OUTPUT (right) ───────────────────────────────────────────── */}
      <g transform="translate(620 100)">
        <rect width="84" height="44" rx="2" fill="#fbbf24" fillOpacity="0.16" stroke="#fbbf24" strokeOpacity="0.9" strokeWidth="0.9" />
        <text x="42" y="18" textAnchor="middle" fill="#fbbf24" fontSize="8.5" letterSpacing="2" fontFamily="ui-monospace, monospace">RESPONSE</text>
        <text x="42" y="32" textAnchor="middle" fill="#fbbf24" fontSize="6.5" letterSpacing="1.5" opacity="0.7" fontFamily="ui-monospace, monospace">9.5s e2e</text>
        {/* glow */}
        <rect x="0" y="0" width="84" height="44" rx="2" fill="none" stroke="#fbbf24" strokeOpacity="0.95" strokeWidth="0.6">
          <animate attributeName="stroke-opacity" values="0.95;0.4;0.95" dur="2.2s" repeatCount="indefinite" />
        </rect>
      </g>
      <line x1={baseX + 5 * stepX + 44} y1={(5 % 2 === 0 ? 100 : 124) + 11} x2={620} y2={122} stroke="#fbbf24" strokeOpacity="0.7" strokeWidth="0.9" strokeDasharray="3 3" markerEnd="url(#lm-arrow)">
        <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.4s" repeatCount="indefinite" />
      </line>

      {/* Bottom caption */}
      <text x="360" y="232" textAnchor="middle" fill="#9ca3af" fontSize="8" letterSpacing="1.5" opacity="0.7" fontFamily="ui-monospace, monospace">
        BIOMETRICS · 6-AGENT DAG · 5 MEMORY LANES · GEMINI LIVE SIDECAR
      </text>
    </svg>
  );
}
