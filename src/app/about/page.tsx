'use client';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import InteractiveResume from '@/components/InteractiveResume';
import SectionHeader from '@/components/ui/SectionHeader';
import HUDFrame from '@/components/ui/HUDFrame';
import ArcReactor from '@/components/ui/ArcReactor';
import DataReadout from '@/components/ui/DataReadout';
import PanelHeader from '@/components/ui/PanelHeader';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Code2, Sparkles, Rocket, MapPin, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import profileImage from '@/assets/images/nikhil.png';

const quickStats = [
  { value: '6+', label: 'Years shipping', accent: '#3b82f6' },
  { value: '5', label: 'Companies', accent: '#06b6d4' },
  { value: '8.4M', label: 'Daily requests handled', accent: '#14b8a6' },
  { value: '15+', label: 'AI agents orchestrated', accent: '#a855f7' },
];

const philosophyCards = [
  {
    icon: Code2,
    title: 'Production-First',
    accent: '#3b82f6',
    body: 'I build systems with the assumption they will see traffic and break in unexpected ways. Observability, idempotency, and graceful degradation aren\'t afterthoughts.',
  },
  {
    icon: Sparkles,
    title: 'AI as Leverage',
    accent: '#06b6d4',
    body: 'AI isn\'t a replacement for engineering judgment — it\'s leverage. I focus on building agentic systems that augment human decisions instead of black-boxing them.',
  },
  {
    icon: Rocket,
    title: 'Ship, Then Polish',
    accent: '#a855f7',
    body: 'I optimize for measurable outcomes over premature abstractions. Get a working version out, instrument it, then iterate based on what production actually shows you.',
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

          <div className="mt-14">
            <SectionHeader
              eyebrow="Who I am"
              title="About Me"
              gradient="blue-cyan"
              size="xl"
            />
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-10 mt-14">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative flex-shrink-0 w-56 h-56 lg:w-72 lg:h-72 mx-auto lg:mx-0 flex items-center justify-center"
            >
              {/* Arc reactor halo around photo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <ArcReactor size={300} intensity={0.6} className="lg:hidden" />
              </div>
              <div className="absolute inset-0 hidden lg:flex items-center justify-center">
                <ArcReactor size={380} intensity={0.7} />
              </div>

              <div
                className="relative w-40 h-40 lg:w-56 lg:h-56 rounded-full overflow-hidden border-2 border-jarvis-cyan/70"
                style={{ boxShadow: '0 0 30px rgba(0, 212, 255, 0.5), inset 0 0 20px rgba(0, 212, 255, 0.25)' }}
              >
                <Image
                  src={profileImage}
                  alt="Nikhil Bindal"
                  fill
                  priority
                  sizes="(max-width: 768px) 10rem, 14rem"
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-jarvis-cyan/20" />
                {/* Scan line */}
                <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-jarvis-cyan to-transparent animate-scan-down" style={{ boxShadow: '0 0 12px #00d4ff' }} />
              </div>

              {/* HUD label */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-jarvis-dark-700/90 border border-jarvis-cyan/40 rounded-sm font-mono text-[9px] tracking-[0.3em] uppercase text-jarvis-cyan whitespace-nowrap">
                Subject · N.Bindal
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1"
            >
              <h2
                className="text-2xl sm:text-3xl font-display mb-3"
                style={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Full-Stack & AI Infrastructure Engineer
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400 mb-5">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> San Francisco, CA
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> nikhil.bindal@outlook.com
                </span>
              </div>
              <p className="text-base sm:text-lg text-gray-300 mb-4 leading-relaxed">
                Hi, I'm Nikhil — a Full-stack and AI engineer with 6+ years of experience building distributed
                systems, real-time streaming platforms, and agentic AI applications across fintech, media,
                research, and AI startups.
              </p>
              <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
                I started in frontend/mobile development, later architected microservices and event-driven
                systems, and now specialize in low-latency AI workflows, multimodal RAG, multi-agent
                orchestration, and production AI infrastructure. Known for taking full ownership from concept
                to production and delivering measurable outcomes.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="https://linkedin.com/in/nikhil-bindal" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <FaLinkedin className="mr-2" /> LinkedIn
                  </Button>
                </Link>
                <Link href="https://github.com/NikhilOO7" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <FaGithub className="mr-2" /> GitHub
                  </Button>
                </Link>
                <Link href="https://x.com/NikhilBindal2" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <FaXTwitter className="mr-2" /> X
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {quickStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                whileHover={{ y: -3 }}
              >
                <HUDFrame accent={stat.accent} cornerSize={12} className="p-5 h-full">
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${stat.accent}10 0%, rgba(0, 8, 20, 0.5) 100%)`,
                    }}
                  />
                  <div
                    className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-3xl opacity-25"
                    style={{ backgroundColor: stat.accent }}
                  />
                  <div className="relative">
                    <DataReadout
                      value={stat.value}
                      label={stat.label}
                      accent={stat.accent}
                      scrambleDuration={1000 + i * 150}
                    />
                  </div>
                </HUDFrame>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech highlight cluster */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-2 justify-center"
          >
            {techHighlights.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="text-xs sm:text-sm font-display px-3 py-1.5 rounded-md border border-jarvis-blue-500/25 bg-jarvis-blue-500/[0.04] text-gray-300 hover:border-jarvis-blue-500/60 hover:bg-jarvis-blue-500/10 transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Resume */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20"
          >
            <SectionHeader
              eyebrow="The journey"
              title="Professional Journey"
              gradient="cyan-violet"
            />
            <div className="mt-10">
              <InteractiveResume />
            </div>
          </motion.div>

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20"
          >
            <SectionHeader
              eyebrow="How I work"
              title="Technical Philosophy"
              gradient="teal-cyan"
            />

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
              {philosophyCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <HUDFrame accent={card.accent} cornerSize={14} className="p-6 h-full">
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `linear-gradient(135deg, ${card.accent}10 0%, rgba(0, 8, 20, 0.55) 100%)`,
                        }}
                      />
                      <div
                        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-25"
                        style={{ backgroundColor: card.accent }}
                      />
                      <div className="relative">
                        <div
                          className="text-[10px] font-mono tracking-[0.3em] uppercase mb-3"
                          style={{ color: card.accent, opacity: 0.65 }}
                        >
                          Doctrine · 0{i + 1}
                        </div>
                        <div
                          className="w-12 h-12 rounded-sm flex items-center justify-center mb-4"
                          style={{
                            background: `linear-gradient(135deg, ${card.accent}, ${card.accent}aa)`,
                            boxShadow: `0 0 16px -4px ${card.accent}`,
                          }}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3
                          className="text-xl font-display mb-3"
                          style={{ color: card.accent }}
                        >
                          {card.title}
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {card.body}
                        </p>
                      </div>
                    </HUDFrame>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
