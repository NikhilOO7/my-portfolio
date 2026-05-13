'use client';
import { motion } from 'framer-motion';
import { Brain, Mic, Server, Lightbulb, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import HUDFrame from '@/components/ui/HUDFrame';

interface Service {
  id: string;
  title: string;
  blurb: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  metric: { value: string; label: string };
  capabilities: string[];
  stack: string[];
}

const services: Service[] = [
  {
    id: 'ai-infra',
    title: 'AI Infrastructure & Agentic Systems',
    blurb: 'Production-grade multi-agent orchestration with persistent memory, model tiering, and async pipeline tuning.',
    icon: Brain,
    accent: '#3b82f6',
    metric: { value: '73%', label: 'latency cut on a 6-agent pipeline' },
    capabilities: ['Multi-agent orchestration', 'Memory architectures', 'Async pipeline tuning', 'LangGraph / CrewAI'],
    stack: ['Python', 'FastAPI', 'GCP', 'Redis', 'Qdrant'],
  },
  {
    id: 'voice-rag',
    title: 'Real-Time Voice & RAG',
    blurb: 'Sub-200ms conversational AI with multimodal retrieval, WebRTC pipelines, and streaming STT/TTS.',
    icon: Mic,
    accent: '#06b6d4',
    metric: { value: '<200ms', label: 'end-to-end voice latency' },
    capabilities: ['LiveKit / WebRTC pipelines', 'Multimodal RAG retrieval', 'Streaming STT/TTS', 'Knowledge graphs'],
    stack: ['LiveKit', 'Deepgram', 'Cartesia', 'Qdrant', 'PostgreSQL'],
  },
  {
    id: 'backend',
    title: 'Scalable Backend Engineering',
    blurb: 'Distributed, event-driven systems with high throughput, exactly-once semantics, and production observability.',
    icon: Server,
    accent: '#14b8a6',
    metric: { value: '22K TPS', label: 'exactly-once event throughput' },
    capabilities: ['Distributed systems', 'Event-driven workflows', 'High-throughput services', 'Cloud-native ops'],
    stack: ['Node.js', 'Kafka', 'PostgreSQL', 'Kubernetes', 'AWS'],
  },
  {
    id: 'consulting',
    title: 'AI Consulting & Architecture',
    blurb: 'Architecture reviews, AI roadmaps, and hands-on guidance for teams shipping production AI systems.',
    icon: Lightbulb,
    accent: '#a855f7',
    metric: { value: '6+ yrs', label: 'shipping AI & backend systems' },
    capabilities: ['System architecture review', 'AI strategy & roadmaps', 'Tech leadership', 'Code & design reviews'],
    stack: ['Strategy', 'Architecture', 'Mentoring', 'Reviews'],
  },
];

export default function EnhancedServicesSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="py-20 w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="What I build"
          title="Services I Offer"
          subtitle="Specialized engineering and consulting across AI infrastructure, real-time voice & RAG, and distributed backends — grounded in 6+ years of production experience."
          gradient="blue-cyan"
        />

        <div className="mt-14 grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <HUDFrame accent={service.accent} cornerSize={18} showScan className="group relative overflow-hidden rounded-sm h-full"
                >
                <div className="absolute inset-0 rounded-sm"
                  style={{
                    background: `linear-gradient(135deg, ${service.accent}14 0%, rgba(10, 14, 26, 0.55) 55%, rgba(10, 14, 26, 0.9) 100%)`,
                    border: `1px solid ${service.accent}22`,
                    boxShadow: `0 10px 40px -10px ${service.accent}33`,
                  }}
                />
                <div
                  className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 group-hover:opacity-50 transition-opacity duration-700"
                  style={{ backgroundColor: service.accent }}
                />
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(${service.accent} 1px, transparent 1px), linear-gradient(90deg, ${service.accent} 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                  }}
                />

                <div className="relative p-7 sm:p-8 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: 4 }}
                      transition={{ type: 'spring', stiffness: 220 }}
                      className="relative flex-shrink-0"
                    >
                      <div
                        className="absolute inset-0 rounded-xl blur-md opacity-60"
                        style={{ backgroundColor: service.accent }}
                      />
                      <div
                        className="relative w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${service.accent}, ${service.accent}aa)`,
                        }}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </motion.div>

                    <div className="text-right">
                      <div
                        className="text-3xl sm:text-4xl font-mono font-bold leading-none tracking-wider"
                        style={{ color: service.accent, textShadow: `0 0 20px ${service.accent}66` }}
                      >
                        {service.metric.value}
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-gray-400 mt-1.5 uppercase tracking-[0.25em] font-mono">
                        {service.metric.label}
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase mb-2" style={{ color: service.accent, opacity: 0.6 }}>
                    Module {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display text-white mb-3 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 mb-6 leading-relaxed">
                    {service.blurb}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-300">
                        <span
                          className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: service.accent, boxShadow: `0 0 8px ${service.accent}` }}
                        />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                    {service.stack.map(tech => (
                      <span
                        key={tech}
                        className="text-[11px] font-display text-gray-200 px-2.5 py-1 rounded-md border"
                        style={{
                          borderColor: `${service.accent}40`,
                          backgroundColor: `${service.accent}10`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="group/cta inline-flex items-center text-sm font-mono uppercase tracking-widest transition-colors"
                    style={{ color: service.accent }}
                  >
                    <span className="opacity-60 mr-2">›</span>
                    <span className="border-b border-transparent group-hover/cta:border-current pb-0.5">
                      Initiate dialog
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/cta:translate-x-1" />
                  </Link>
                </div>
                </HUDFrame>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
