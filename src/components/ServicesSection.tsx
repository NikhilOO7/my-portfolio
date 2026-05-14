'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Mic, Server, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import HUDFrame from '@/components/ui/HUDFrame';

const MONO = 'font-mono uppercase tracking-[0.25em]';
const MONO_FONT = { fontFamily: 'ui-monospace, monospace' } as const;

type Pillar =
  | { num: '01'; tag: 'craft' }
  | { num: '02'; tag: 'vision' }
  | { num: '03'; tag: 'velocity' }
  | { num: '04'; tag: 'ownership' }
  | { num: '05'; tag: 'judgment' }
  | { num: '06'; tag: 'leverage' };

const PILLARS: Record<string, Pillar> = {
  craft: { num: '01', tag: 'craft' },
  vision: { num: '02', tag: 'vision' },
  velocity: { num: '03', tag: 'velocity' },
  ownership: { num: '04', tag: 'ownership' },
  judgment: { num: '05', tag: 'judgment' },
  leverage: { num: '06', tag: 'leverage' },
};

interface Service {
  id: string;
  module: string;
  tier: 'ALPHA' | 'BETA' | 'OPS' | 'ADVISORY';
  status: 'OPEN' | 'LIMITED';
  title: string;
  blurb: string;
  accent: string;
  metric: { value: string; label: string };
  capabilities: string[];
  stack: string[];
  /** Pillar keys — doctrines that drive this service (links to About → Doctrine) */
  principles: (keyof typeof PILLARS)[];
  visual: 'agentic' | 'voice' | 'backend' | 'consulting';
  icon: React.ComponentType<{ className?: string }>;
}

const SERVICES: Service[] = [
  {
    id: 'ai-infra',
    module: 'MODULE-01',
    tier: 'ALPHA',
    status: 'OPEN',
    title: 'AI Infrastructure & Agentic Systems',
    blurb: 'Multi-agent orchestration with persistent memory and pipeline tuning.',
    accent: '#a855f7',
    metric: { value: '−73%', label: 'latency · 6-agent' },
    capabilities: ['Multi-agent orchestration', 'Memory architectures', 'LangGraph / CrewAI'],
    stack: ['Python', 'FastAPI', 'CrewAI', 'Qdrant', 'GCP'],
    principles: ['craft', 'vision', 'leverage'],
    visual: 'agentic',
    icon: Brain,
  },
  {
    id: 'voice-rag',
    module: 'MODULE-02',
    tier: 'ALPHA',
    status: 'OPEN',
    title: 'Real-Time Voice & RAG',
    blurb: 'Sub-200ms conversational AI with multimodal retrieval and streaming STT/TTS.',
    accent: '#06b6d4',
    metric: { value: '<200ms', label: 'voice latency' },
    capabilities: ['LiveKit / WebRTC', 'Multimodal RAG', 'Streaming STT/TTS'],
    stack: ['LiveKit', 'Deepgram', 'Cartesia', 'Qdrant'],
    principles: ['craft', 'velocity', 'vision'],
    visual: 'voice',
    icon: Mic,
  },
  {
    id: 'backend',
    module: 'MODULE-03',
    tier: 'BETA',
    status: 'OPEN',
    title: 'Scalable Backend Engineering',
    blurb: 'Event-driven systems with exactly-once semantics and observability.',
    accent: '#22c55e',
    metric: { value: '22K TPS', label: 'event throughput' },
    capabilities: ['Event-driven workflows', 'Distributed systems', 'Cloud-native ops'],
    stack: ['Node.js', 'Kafka', 'PostgreSQL', 'Kubernetes'],
    principles: ['craft', 'ownership', 'velocity'],
    visual: 'backend',
    icon: Server,
  },
  {
    id: 'consulting',
    module: 'MODULE-04',
    tier: 'ADVISORY',
    status: 'LIMITED',
    title: 'AI Consulting & Architecture',
    blurb: 'Architecture reviews, AI roadmaps, and hands-on guidance for production teams.',
    accent: '#fbbf24',
    metric: { value: '6+ yrs', label: 'shipping AI' },
    capabilities: ['Architecture review', 'AI strategy', 'Code & design reviews'],
    stack: ['Strategy', 'Architecture', 'Mentoring'],
    principles: ['judgment', 'leverage', 'ownership'],
    visual: 'consulting',
    icon: Lightbulb,
  },
];

export default function EnhancedServicesSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="py-16 w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="What I build"
          title="Services I Offer"
          subtitle="Four operational modules — focused capabilities backed by shipped production work."
          gradient="blue-cyan"
        />

        <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const accent = service.accent;
  const statusActive = service.status === 'OPEN';
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: 0.06 + index * 0.05 }}
      whileHover={{ y: -2 }}
      className="h-full"
    >
      <HUDFrame accent={accent} cornerSize={10} showScan className="bg-jarvis-dark-700/65 backdrop-blur-md h-full overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${accent}10 0%, rgba(0, 8, 20, 0.55) 100%)` }}
        />

        {/* TOP METADATA STRIP */}
        <div className={`relative px-3.5 py-1.5 border-b border-white/5 flex items-center justify-between gap-2 ${MONO} text-[8.5px]`}>
          <div className="flex items-center gap-2">
            <span style={{ color: accent, opacity: 0.9 }}>› {service.module}</span>
            <span className="text-jarvis-blue-300/40">·</span>
            <span style={{ color: statusActive ? '#22c55e' : '#fbbf24' }} className="inline-flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                {statusActive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />}
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: statusActive ? '#22c55e' : '#fbbf24' }} />
              </span>
              {service.status}
            </span>
          </div>
          <span style={{ color: accent }}>class::{service.tier}</span>
        </div>

        {/* BODY — horizontal layout: small visual (left) + content (right) */}
        <div className="relative p-3.5 flex gap-3.5">
          {/* LEFT: compact visual + metric */}
          <div className="relative w-[112px] flex-shrink-0 flex flex-col gap-2">
            {/* Mini visual */}
            <div
              className="relative w-full aspect-square overflow-hidden rounded-sm"
              style={{ background: `radial-gradient(circle at center, ${accent}1f 0%, rgba(0, 8, 20, 0.7) 80%)`, border: `1px solid ${accent}33` }}
            >
              {/* Grid bg */}
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(${accent}1a 1px, transparent 1px), linear-gradient(90deg, ${accent}1a 1px, transparent 1px)`,
                  backgroundSize: '14px 14px',
                }}
              />
              {/* Scanlines */}
              <div
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 2px, ${accent}1a 3px, transparent 4px)`,
                  mixBlendMode: 'screen',
                }}
              />
              <CompactVisual type={service.visual} accent={accent} />
              {/* Corner brackets */}
              <span className="absolute top-1 left-1 w-1.5 h-1.5 border-l border-t" style={{ borderColor: accent }} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 border-r border-t" style={{ borderColor: accent }} />
              <span className="absolute bottom-1 left-1 w-1.5 h-1.5 border-l border-b" style={{ borderColor: accent }} />
              <span className="absolute bottom-1 right-1 w-1.5 h-1.5 border-r border-b" style={{ borderColor: accent }} />
            </div>

            {/* Metric callout */}
            <div
              className="relative px-2 py-1.5 rounded-sm font-mono text-center"
              style={{
                background: `linear-gradient(135deg, ${accent}1f 0%, transparent 100%)`,
                border: `1px solid ${accent}40`,
              }}
            >
              <div
                className="text-base font-bold leading-none tracking-wider"
                style={{ color: accent, textShadow: `0 0 8px ${accent}66` }}
              >
                {service.metric.value}
              </div>
              <div className="text-[8px] tracking-[0.2em] uppercase text-gray-400 leading-tight mt-1">
                {service.metric.label}
              </div>
            </div>
          </div>

          {/* RIGHT: content */}
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            {/* Title + tagline */}
            <div>
              <h3 className="font-display text-[15px] sm:text-base text-white leading-tight tracking-wide">
                {service.title}
              </h3>
              <p className="text-[11.5px] text-gray-300 mt-1 leading-snug">{service.blurb}</p>
            </div>

            {/* Capabilities — inline dot list */}
            <div>
              <div className={`${MONO} text-[8px] text-jarvis-blue-300/70 mb-0.5`}>› Capabilities</div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                {service.capabilities.map(cap => (
                  <span key={cap} className="inline-flex items-center gap-1.5 text-[10.5px] text-gray-300">
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: accent, boxShadow: `0 0 4px ${accent}` }}
                    />
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Deployed assets */}
            <div>
              <div className={`${MONO} text-[8px] text-jarvis-blue-300/70 mb-0.5`}>› Deployed Assets</div>
              <div className="flex flex-wrap gap-1">
                {service.stack.map(tech => (
                  <span
                    key={tech}
                    className="font-mono text-[9px] tracking-wide px-1.5 py-0.5 rounded-sm border"
                    style={{
                      borderColor: `${accent}33`,
                      backgroundColor: `${accent}0a`,
                      color: 'rgba(229, 231, 235, 0.85)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Driven by (doctrine pillars) */}
            <div>
              <div className={`${MONO} text-[8px] text-jarvis-blue-300/70 mb-0.5`}>› Driven by</div>
              <div className="flex flex-wrap gap-1">
                {service.principles.map(key => {
                  const pillar = PILLARS[key];
                  return (
                    <Link
                      key={key}
                      href={`/about#doctrine-${pillar.num}`}
                      className="group/pill inline-flex items-center gap-1 font-mono text-[9px] tracking-[0.15em] uppercase px-1.5 py-0.5 rounded-sm border transition-all hover:scale-[1.05]"
                      style={{
                        borderColor: `${accent}55`,
                        backgroundColor: `${accent}14`,
                        color: accent,
                        boxShadow: `0 0 0 1px ${accent}0a`,
                      }}
                      title={`Doctrine · ${pillar.num} · ${pillar.tag}`}
                    >
                      <span style={{ opacity: 0.65 }}>{pillar.num}</span>
                      <span className="opacity-40">·</span>
                      <span>{pillar.tag}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-auto pt-1.5 border-t border-white/5">
              <Link
                href="/contact"
                className={`group/cta inline-flex items-center text-[10px] ${MONO} transition-colors`}
                style={{ color: accent }}
              >
                <span className="opacity-60 mr-1.5">›</span>
                <span className="border-b border-transparent group-hover/cta:border-current pb-0.5">
                  Initiate Dialog
                </span>
                <ArrowRight className="w-3 h-3 ml-1.5 transition-transform group-hover/cta:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </HUDFrame>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Compact visuals — small square SVGs (viewBox 100x100) tuned for ~112px
// display. Each conveys the service essence in one motion-rich glance.
// ─────────────────────────────────────────────────────────────────────────

function CompactVisual({ type, accent }: { type: Service['visual']; accent: string }) {
  if (type === 'agentic') return <CompactAgentic accent={accent} />;
  if (type === 'voice') return <CompactVoice accent={accent} />;
  if (type === 'backend') return <CompactBackend accent={accent} />;
  return <CompactConsulting accent={accent} />;
}

// AGENTIC — central hub + 5 orbital agents with flowing particles
function CompactAgentic({ accent }: { accent: string }) {
  const cx = 50, cy = 50;
  const agents = [
    { angle: -90, r: 32 },
    { angle: -18, r: 36 },
    { angle: 54, r: 32 },
    { angle: 126, r: 36 },
    { angle: 198, r: 32 },
  ];
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
      {/* Concentric pulse rings */}
      {[22, 30, 38].map((r, i) => (
        <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke={accent} strokeOpacity={0.28 - i * 0.07} strokeWidth="0.5" strokeDasharray="2 3" />
      ))}
      {/* Rotating outer scan arc */}
      <g style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <circle cx={cx} cy={cy} r="42" fill="none" stroke={accent} strokeOpacity="0.6" strokeWidth="0.6" strokeDasharray="4 60">
          <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="6s" repeatCount="indefinite" />
        </circle>
      </g>
      {/* Connections + traveling particles */}
      {agents.map((a, i) => {
        const rad = (a.angle * Math.PI) / 180;
        const x = +(cx + Math.cos(rad) * a.r).toFixed(2);
        const y = +(cy + Math.sin(rad) * a.r).toFixed(2);
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={accent} strokeOpacity="0.45" strokeWidth="0.5" strokeDasharray="1 2" />
            <circle r="1" fill={accent}>
              <animateMotion dur={`${1.6 + i * 0.2}s`} repeatCount="indefinite" path={`M ${cx} ${cy} L ${x} ${y}`} />
            </circle>
            <circle cx={x} cy={y} r="4" fill={accent} fillOpacity="0.25" stroke={accent} strokeOpacity="0.9" strokeWidth="0.6" />
          </g>
        );
      })}
      {/* Central hub with double pulse */}
      <circle cx={cx} cy={cy} r="10" fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="0.5">
        <animate attributeName="r" values="10;14;10" dur="2.2s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r="7" fill={accent} fillOpacity="0.4" stroke={accent} strokeWidth="0.8" style={{ filter: `drop-shadow(0 0 3px ${accent})` }} />
    </svg>
  );
}

// VOICE — central waveform + EQ bars below
function CompactVoice({ accent }: { accent: string }) {
  const pts = Array.from({ length: 28 }).map((_, i) => {
    const x = 6 + i * 3.2;
    const y = 42 + Math.sin(i * 0.5) * 12 * Math.sin(i * 0.18 + 1);
    return `${x},${y.toFixed(2)}`;
  }).join(' ');
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
      {/* Listening rings (left mic) */}
      {[6, 10, 14].map((r, i) => (
        <circle key={r} cx="10" cy="42" r={r} fill="none" stroke={accent} strokeOpacity={0.5 - i * 0.13} strokeWidth="0.5">
          <animate attributeName="r" values={`${r};${r + 5};${r}`} dur={`${1.6 + i * 0.3}s`} repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values={`${0.55 - i * 0.13};0;${0.55 - i * 0.13}`} dur={`${1.6 + i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <circle cx="10" cy="42" r="2.5" fill={accent} fillOpacity="0.6" stroke={accent} strokeOpacity="0.95" strokeWidth="0.5" />
      {/* Stacked waveforms */}
      <polyline points={pts} fill="none" stroke={accent} strokeWidth="0.4" strokeOpacity="0.3" transform="translate(0 -6)" />
      <polyline points={pts} fill="none" stroke={accent} strokeWidth="0.4" strokeOpacity="0.3" transform="translate(0 6)" />
      <polyline points={pts} fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.95" style={{ filter: `drop-shadow(0 0 2px ${accent})` }} />
      {/* EQ bars */}
      <g transform="translate(8 78)">
        {Array.from({ length: 14 }).map((_, i) => {
          const h = +(4 + Math.abs(Math.sin(i * 0.8) * 12)).toFixed(2);
          return (
            <rect key={i} x={i * 6.2} y={-h} width="3.4" height={h} fill={accent} fillOpacity="0.7" stroke={accent} strokeOpacity="0.85" strokeWidth="0.3">
              <animate
                attributeName="height"
                values={`${h};${h * 1.5};${h * 0.5};${h}`}
                dur={`${0.8 + (i % 4) * 0.15}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values={`-${h};-${h * 1.5};-${h * 0.5};-${h}`}
                dur={`${0.8 + (i % 4) * 0.15}s`}
                repeatCount="indefinite"
              />
            </rect>
          );
        })}
      </g>
    </svg>
  );
}

// BACKEND — 3 producers → bus → 3 consumers, flowing particles
function CompactBackend({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
      {/* Producers */}
      {[22, 50, 78].map((y, i) => (
        <g key={i}>
          <rect x="6" y={y - 4} width="14" height="8" rx="1" fill={accent} fillOpacity="0.22" stroke={accent} strokeOpacity="0.95" strokeWidth="0.5" />
          <text x="13" y={y + 2} textAnchor="middle" fill={accent} fontSize="3.5" letterSpacing="0.5" fontWeight="bold" {...MONO_FONT}>P{i + 1}</text>
        </g>
      ))}
      {/* Bus */}
      <rect x="40" y="18" width="20" height="64" rx="1" fill={accent} fillOpacity="0.16" stroke={accent} strokeOpacity="0.95" strokeWidth="0.7" />
      <text x="50" y="13" textAnchor="middle" fill={accent} fontSize="3.5" letterSpacing="0.8" fontWeight="bold" {...MONO_FONT}>BUS</text>
      {/* Lanes inside bus + flowing particles */}
      {[28, 40, 52, 64, 76].map((y, i) => (
        <g key={i}>
          <line x1="42" y1={y} x2="58" y2={y} stroke={accent} strokeOpacity="0.3" strokeWidth="0.4" strokeDasharray="1 2" />
          <circle r="0.9" fill={accent} style={{ filter: `drop-shadow(0 0 1.5px ${accent})` }}>
            <animateMotion dur={`${1.4 + i * 0.15}s`} repeatCount="indefinite" path={`M 42 ${y} L 58 ${y}`} />
          </circle>
        </g>
      ))}
      {/* Consumers */}
      {[22, 50, 78].map((y, i) => {
        const hot = i === 1;
        return (
          <g key={i}>
            <rect x="80" y={y - 4} width="14" height="8" rx="1" fill={accent} fillOpacity={hot ? '0.42' : '0.22'} stroke={accent} strokeOpacity="0.95" strokeWidth={hot ? '0.7' : '0.5'} style={hot ? { filter: `drop-shadow(0 0 2px ${accent})` } : undefined} />
            <text x="87" y={y + 2} textAnchor="middle" fill={accent} fontSize="3.5" letterSpacing="0.5" fontWeight="bold" {...MONO_FONT}>C{i + 1}</text>
          </g>
        );
      })}
      {/* Connections */}
      {[22, 50, 78].map((y, i) => (
        <g key={i}>
          <line x1="20" y1={y} x2="40" y2={28 + i * 22} stroke={accent} strokeOpacity="0.5" strokeWidth="0.4" />
          <line x1="60" y1={28 + i * 22} x2="80" y2={y} stroke={accent} strokeOpacity="0.5" strokeWidth="0.4" />
        </g>
      ))}
    </svg>
  );
}

// CONSULTING — 4 stacked layers with scanning audit beam + checkmarks
function CompactConsulting({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id={`scan-c-${accent.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={accent} stopOpacity="0" />
          <stop offset="50%" stopColor={accent} stopOpacity="0.4" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Scanning beam */}
      <rect x="0" width="100" height="10" fill={`url(#scan-c-${accent.replace('#', '')})`}>
        <animate attributeName="y" values="10;90;10" dur="3.5s" repeatCount="indefinite" />
      </rect>
      {/* 4 architecture layers */}
      {[
        { y: 14, label: 'EDGE', ok: true },
        { y: 32, label: 'API', ok: true },
        { y: 50, label: 'AI', highlight: true },
        { y: 68, label: 'DATA', warn: true },
      ].map((tier, i) => (
        <g key={i} transform={`translate(10 ${tier.y})`}>
          <rect width="68" height="12" rx="1" fill={accent} fillOpacity={tier.highlight ? '0.42' : '0.18'} stroke={accent} strokeOpacity={tier.highlight ? '1' : '0.85'} strokeWidth={tier.highlight ? '0.8' : '0.5'} style={tier.highlight ? { filter: `drop-shadow(0 0 2px ${accent})` } : undefined} />
          <text x="34" y="8" textAnchor="middle" fill={accent} fontSize="4" letterSpacing="1.2" fontWeight="bold" {...MONO_FONT}>{tier.label}</text>
          {tier.ok && <text x="-4" y="8" textAnchor="middle" fill={accent} fontSize="5" fontWeight="bold" {...MONO_FONT}>✓</text>}
          {tier.warn && <text x="72" y="8" textAnchor="middle" fill="#fbbf24" fontSize="5" fontWeight="bold" {...MONO_FONT}>⚠</text>}
          {tier.highlight && (
            <rect x="-1" y="-1" width="70" height="14" rx="1.5" fill="none" stroke={accent} strokeWidth="0.5">
              <animate attributeName="stroke-opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" />
            </rect>
          )}
        </g>
      ))}
      {/* Annotation arrow */}
      <line x1="78" y1="56" x2="92" y2="56" stroke={accent} strokeOpacity="0.6" strokeWidth="0.4" strokeDasharray="1 1.5" />
      <text x="92" y="58" textAnchor="middle" fill={accent} fontSize="3.5" letterSpacing="0.5" opacity="0.85" {...MONO_FONT}>↗</text>
      {/* Bottom verdict counts */}
      <text x="10" y="92" fill={accent} fontSize="3.5" letterSpacing="1" fontWeight="bold" {...MONO_FONT}>✓3</text>
      <text x="24" y="92" fill="#fbbf24" fontSize="3.5" letterSpacing="1" fontWeight="bold" {...MONO_FONT}>⚠1</text>
    </svg>
  );
}
