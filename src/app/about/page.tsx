'use client';
import { motion } from 'framer-motion';
import InteractiveResume from '@/components/InteractiveResume';
import SectionHeader from '@/components/ui/SectionHeader';
import HUDFrame from '@/components/ui/HUDFrame';
import DataReadout from '@/components/ui/DataReadout';
import PanelHeader from '@/components/ui/PanelHeader';
import SubjectIdentificationCard from '@/components/SubjectIdentificationCard';
import { Code2, Sparkles, Rocket, Crosshair, Compass, Users } from 'lucide-react';

const MONO = 'font-mono uppercase tracking-[0.25em]';

const vitalStats = [
  { value: '6+', label: 'YEARS SHIPPING', accent: '#3b82f6' },
  { value: '5', label: 'COMPANIES', accent: '#06b6d4' },
  { value: '8.4M', label: 'DAILY REQUESTS', accent: '#14b8a6' },
  { value: '15+', label: 'AI AGENTS', accent: '#a855f7' },
  { value: '22K', label: 'TPS SUSTAINED', accent: '#fbbf24' },
  { value: '73%', label: 'LATENCY CUT', accent: '#ec4899' },
];

const philosophyCards = [
  {
    icon: Code2,
    title: 'Production-First',
    accent: '#3b82f6',
    doctrine: 'Doctrine · 01 · craft',
    body: "I build with the assumption a system will be paged at 3am. Observability, idempotency, and graceful degradation are designed in — not bolted on after the first incident.",
  },
  {
    icon: Sparkles,
    title: 'AI as Leverage',
    accent: '#06b6d4',
    doctrine: 'Doctrine · 02 · vision',
    body: "AI is not a replacement for engineering judgment — it's leverage. I build agentic systems that compound human decisions and keep a human in the loop on every escape hatch.",
  },
  {
    icon: Rocket,
    title: 'Ship, Then Polish',
    accent: '#a855f7',
    doctrine: 'Doctrine · 03 · velocity',
    body: 'I optimize for measurable outcomes over premature abstractions. Get a working version into production, instrument it, then iterate on what the data actually shows — not what the design doc predicted.',
  },
  {
    icon: Crosshair,
    title: 'Ownership Over Tasks',
    accent: '#22c55e',
    doctrine: 'Doctrine · 04 · ownership',
    body: "I own outcomes, not assignments. If something blocks the goal — a broken test in another service, an unclear product spec, a vendor outage — it becomes my problem until it's resolved or properly escalated.",
  },
  {
    icon: Compass,
    title: 'Strong Opinions, Loose Grip',
    accent: '#fbbf24',
    doctrine: 'Doctrine · 05 · judgment',
    body: 'I form sharp views early and argue for them with evidence. The moment better evidence shows up, I drop the position cleanly. Disagree hard, commit fast — politics costs more than humility ever does.',
  },
  {
    icon: Users,
    title: 'Force Multiplier',
    accent: '#ec4899',
    doctrine: 'Doctrine · 06 · leverage',
    body: "My code is only half the job. Clear APIs, sharp docs, sturdy tests, and unblocking teammates compound my output beyond what any individual contributor can ship — that's how staff-level impact actually shows up.",
  },
];

const techHighlights = [
  'Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'Redis',
  'LangGraph', 'CrewAI', 'GPT-4o', 'WebRTC', 'LiveKit',
  'Kafka', 'Kubernetes', 'GCP', 'AWS', 'Qdrant',
];

export default function About() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-jarvis-dark-500 text-white relative font-display overflow-x-hidden z-10 pt-16"
    >
      <section className="py-10 sm:py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PanelHeader
            module="Subject Dossier"
            query="show me his dossier"
            response={[
              'Right away. Pulling up the full record on Nikhil Bindal.',
              'Cross-referencing biographical, professional, and academic data. Six years of production experience verified across fintech, media, research, and AI startups.',
              'Dossier rendered below.',
            ]}
            accent="#00d4ff"
          />

          {/* ── SUBJECT IDENTIFICATION CARD ───────────────────── */}
          <div className="mt-10">
            <SubjectIdentificationCard />
          </div>

          {/* ── VITAL STATISTICS ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mt-10"
          >
            <div className={`${MONO} text-[10px] text-jarvis-blue-300/60 mb-3 inline-flex items-center gap-2`}>
              <span className="w-1.5 h-1.5 rounded-full bg-jarvis-cyan animate-corner-pulse" />
              ▸ Vital Statistics
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {vitalStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
                  whileHover={{ y: -3 }}
                >
                  <HUDFrame accent={stat.accent} cornerSize={10} className="p-3.5 h-full">
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(135deg, ${stat.accent}10 0%, rgba(0, 8, 20, 0.5) 100%)` }}
                    />
                    <div
                      className="absolute -top-6 -right-6 w-16 h-16 rounded-full blur-2xl opacity-25"
                      style={{ backgroundColor: stat.accent }}
                    />
                    <div className="relative">
                      <DataReadout
                        value={stat.value}
                        label={stat.label}
                        accent={stat.accent}
                        scrambleDuration={1100 + i * 120}
                      />
                    </div>
                  </HUDFrame>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── DEPLOYED ASSETS / TECH MATRIX ──────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-10"
          >
            <div className={`${MONO} text-[10px] text-jarvis-blue-300/60 mb-3 inline-flex items-center gap-2`}>
              <span className="w-1.5 h-1.5 rounded-full bg-jarvis-gold-400 animate-corner-pulse" />
              ▸ Deployed Assets · Reach Stack
            </div>
            <HUDFrame accent="#06b6d4" cornerSize={12} className="bg-jarvis-dark-700/55 backdrop-blur-md p-4 sm:p-5">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.06) 0%, rgba(0, 8, 20, 0.55) 100%)' }}
              />
              <div className="relative flex flex-wrap gap-2">
                {techHighlights.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="font-mono text-xs tracking-wide px-3 py-1 rounded-sm border border-jarvis-cyan/30 bg-jarvis-cyan/[0.05] text-gray-200 hover:border-jarvis-cyan/70 hover:bg-jarvis-cyan/10 transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </HUDFrame>
          </motion.div>

          {/* ── OPERATIONS LOG (Resume + Education tabs) ──────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-14"
          >
            <SectionHeader
              eyebrow="The journey"
              title="Operations Log"
              subtitle="Career history rendered as classified mission files. Toggle to view credentials."
              gradient="cyan-violet"
            />
            <div className="mt-8">
              <InteractiveResume />
            </div>
          </motion.div>

          {/* ── DOCTRINE (Philosophy) ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className="mt-16"
          >
            <SectionHeader
              eyebrow="How I work"
              title="Doctrine"
              subtitle="Six operating principles drawn from staff-level engineering and founding-team experience — the rules I default to when there's no playbook."
              gradient="teal-cyan"
            />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {philosophyCards.map((card, i) => {
                const Icon = card.icon;
                const num = String(i + 1).padStart(2, '0');
                return (
                  <motion.div
                    key={card.title}
                    id={`doctrine-${num}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="scroll-mt-24"
                  >
                    <HUDFrame accent={card.accent} cornerSize={14} className="p-5 h-full">
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: `linear-gradient(135deg, ${card.accent}10 0%, rgba(0, 8, 20, 0.55) 100%)` }}
                      />
                      <div
                        className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-3xl opacity-25"
                        style={{ backgroundColor: card.accent }}
                      />
                      <div className="relative">
                        <div className={`${MONO} text-[10px] mb-3`} style={{ color: card.accent, opacity: 0.7 }}>
                          ▸ {card.doctrine}
                        </div>
                        <div
                          className="w-11 h-11 rounded-sm flex items-center justify-center mb-3.5"
                          style={{
                            background: `linear-gradient(135deg, ${card.accent}, ${card.accent}aa)`,
                            boxShadow: `0 0 16px -4px ${card.accent}`,
                          }}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-display mb-2.5" style={{ color: card.accent }}>
                          {card.title}
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed">{card.body}</p>
                      </div>
                    </HUDFrame>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ── TRANSMISSION END ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-14 mb-6 flex items-center justify-center gap-3 font-mono text-[10px] tracking-[0.4em] uppercase text-jarvis-blue-300/60"
          >
            <span className="h-px flex-1 max-w-[180px] bg-gradient-to-r from-transparent to-jarvis-cyan/30" />
            <span>◇ end of dossier · file sealed</span>
            <span className="h-px flex-1 max-w-[180px] bg-gradient-to-l from-transparent to-jarvis-cyan/30" />
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
