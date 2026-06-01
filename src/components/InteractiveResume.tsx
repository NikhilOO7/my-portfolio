'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import HUDFrame from '@/components/ui/HUDFrame';
import {
  Briefcase, GraduationCap, Filter,
  Download, Calendar, MapPin,
} from 'lucide-react';
import Link from 'next/link';

const MONO = 'font-mono uppercase tracking-[0.25em]';

const CATEGORY_META: Record<string, { tier: string; accent: string; classification: string }> = {
  ai: { tier: 'ALPHA', accent: '#a855f7', classification: 'AI Infrastructure' },
  fullstack: { tier: 'BETA', accent: '#06b6d4', classification: 'Full-Stack Engineering' },
  backend: { tier: 'BETA', accent: '#22c55e', classification: 'Distributed Backend' },
  frontend: { tier: 'OPS', accent: '#00d4ff', classification: 'Frontend Engineering' },
};

interface SubRole {
  company: string;
  description: string[];
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  subRoles?: SubRole[];
  skills: string[];
  category: string;
}

interface Education {
  id: string;
  degree: string;
  field: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}

interface FilterOption {
  id: string;
  label: string;
}

export default function InteractiveResume() {
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'All Experience' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'backend', label: 'Backend' },
    { id: 'ai', label: 'AI & ML' }
  ];
  
  const experiences: Experience[] = [
    {
      id: 'ai-consultant',
      title: 'AI Consultant / AI Infrastructure Engineer',
      company: 'Neurologica · Stealth AI Startup',
      location: 'San Francisco, CA',
      startDate: 'Sep 2024',
      endDate: 'Present',
      description: [],
      subRoles: [
        {
          company: 'Neurologica — Engineering Contractor',
          description: [
            'Architected a production multi-agent AI coaching platform on GCP Cloud Run combining biometric/HCI signal processing with a persistent personal-memory system, owning system design end to end.',
            'Cut end-to-end AI latency 73% (36s → 9.5s) by re-architecting a 6-agent pipeline into a coordinator-orchestrated DAG with prompt consolidation, model tiering, and async parallel execution.',
            'Designed "Mnemosyne," a context-scoped memory architecture with semantic retrieval and a temporal-decay lifecycle, bucketed per user and domain so context can never cross boundaries.',
            'Engineered Redis-backed concurrency control and session orchestration that prevented state corruption across concurrent real-time voice sessions, plus a parallel voice sidecar (Gemini Live) running sentiment/query/analytics off the hot path.',
            'Shipped Python and JavaScript SDKs (32 operations) spanning orchestration, memory, analytics, sessions, and BYOD multi-tenant infrastructure, with CI/CD, audit logging, and webhook delivery.'
          ]
        },
        {
          company: 'Stealth AI Startup — AI Solutions Consultant',
          description: [
            'Built "Donna," an AI meeting-intelligence platform, end to end (0→1) automating pre-meeting research, live in-meeting assistance, and post-meeting synthesis, and released it for real users.',
            'Designed a 3-phase architecture orchestrating 15 specialized agents behind a uniform agent contract that made parallel orchestration and fan-out trivial to extend.',
            'Built hybrid contextual RAG over Qdrant combining vector and keyword retrieval with reciprocal-rank fusion, improving retrieval relevance ~40% over a naive dense baseline (measured, not estimated).',
            'Implemented a real-time voice pipeline (LiveKit WebRTC + Deepgram STT + Cartesia TTS) targeting sub-200ms perceived latency, with a replica-independent WebSocket fan-out over Redis pub/sub.',
            'Built "RecoMe," a personal interest-graph & agentic recommendation engine — a capture → signal → graph → agent → surface pipeline turning cross-platform activity (15+ sources) into a typed Neo4j interest graph plus Qdrant per-user vectors, with recommendations streamed to the client over SSE.',
            'Orchestrated 5 background agents behind a single Guardian gate enforcing a hard $0.10/user/day LLM cost cap, throttling, and quiet hours, with a prompt-injection-resistant scorer (the LLM writes prose only, never the verdict); ran on BullMQ workers with idempotent Stripe metering and a dual consumer + multi-tenant surface on one backend (TypeScript, Hono, Prisma).'
          ]
        }
      ],
      skills: ['Python', 'FastAPI', 'Node.js', 'TypeScript', 'Hono', 'PostgreSQL', 'Redis', 'Qdrant', 'Neo4j', 'WebRTC', 'LiveKit', 'Gemini Live', 'CrewAI', 'LangGraph', 'GPT-4o', 'Deepgram', 'Cartesia', 'BullMQ', 'Stripe', 'Kubernetes', 'GCP Cloud Run', 'Prometheus'],
      category: 'ai'
    },
    {
      id: 'northeastern',
      title: 'Full-Stack & AI Engineer',
      company: 'Northeastern University — Minkara Computational Lab',
      location: 'Boston, MA',
      startDate: 'Feb 2023',
      endDate: 'Dec 2023',
      description: [
        'Built a semantic-search & visualization platform for biomedical research (FastAPI, PostgreSQL + pgvector, React, D3.js) letting researchers search 10K+ papers and molecular datasets by meaning via embeddings and vector search.',
        'Built AWS Batch distributed simulation pipelines orchestrating thousands of parallel molecular computations and cutting compute cost ~40% via spot instances, right-sizing, and scale-to-zero with checkpoint/restart.',
        'Owned backend for scientific data ingestion, metadata APIs, and ML-inference workflows serving models as isolated services so heavy inference never blocked the API.',
        'Designed accessibility tooling for visually impaired researchers — tactile-graphics generation from molecular coordinates and screen-reader/sonification integrations, validated with blind users including the lab PI.'
      ],
      skills: ['FastAPI', 'PostgreSQL', 'pgvector', 'React', 'D3.js', 'AWS Batch', 'Python', 'TypeScript', 'Docker'],
      category: 'fullstack'
    },
    {
      id: 'times-internet',
      title: 'Software Engineer',
      company: 'Times Internet — TOI+ subscription platform',
      location: 'Noida, India',
      startDate: 'Apr 2021',
      endDate: 'Jul 2022',
      description: [
        'Built backend for TOI+ serving ~8.4M daily requests — Node/Express subscription & paywall services with JWT auth and Redis-cached entitlements (sub-ms checks), keeping origin load low by offloading cacheable content to the Akamai edge.',
        'Designed a Verdaccio-based micro-frontend system packaging shared UI as versioned internal npm widgets, so 70+ city portals consumed updates by version bump instead of duplicated code — publish cadence decoupled from consume cadence.',
        'Migrated 70+ legacy XML/XSLT portals to React micro-frontends via a strangler-fig rollout (old + new in parallel, per-portal feature flags, stable API contracts), reaching ~92/100 Lighthouse with instant rollback.',
        'Built the real-time Kafka event pipeline feeding the Signals personalization engine (behavior events → user feature profiles, ~90s refresh), contributing to a measured ~9% CTR lift on recommendations.'
      ],
      skills: ['Node.js', 'Express', 'Redis', 'Kafka', 'React', 'Verdaccio', 'JWT', 'Akamai', 'Docker'],
      category: 'backend'
    },
    {
      id: 'progcap',
      title: 'Founding Software Engineer',
      company: 'Progcap — collateral-free SMB lending fintech',
      location: 'New Delhi, India',
      startDate: 'Jan 2019',
      endDate: 'Mar 2021',
      description: [
        'Owned the underwriting & transaction backbone of a collateral-free lending platform — Node/Express microservices on an event-driven Kafka backbone, with PostgreSQL as the transactional system of record (+ append-only ledger) and MongoDB for high-write capture.',
        'Cut decision latency 90% (8.7s → 890ms) by parallelizing serial KYC/fraud/credit-score checks, trimming the hot path, and adding compound indexes plus Redis caching with connection pooling.',
        'Integrated XGBoost credit scoring on alternative data as an isolated service with timeouts and rule-based fallback, reducing false negatives ~19% (model + rules, measured on repayment cohorts).',
        'Engineered effectively-once disbursement via idempotency — guarded atomic state transitions, idempotency-keyed bank/NPCI calls, and partitioned Kafka consumers; load-tested to ~22K events/sec at the event tier.',
        'Built a Python/Celery service for feature assembly, batch jobs, and reconciliation against the append-only ledger as the source of truth.'
      ],
      skills: ['Node.js', 'Express', 'Kafka', 'PostgreSQL', 'MongoDB', 'Redis', 'XGBoost', 'Python', 'Celery'],
      category: 'backend'
    },
    {
      id: 'livemedia',
      title: 'Software Engineer',
      company: 'LiveMedia / LiveChek — insurance telematics',
      location: 'New Delhi, India',
      startDate: 'Aug 2017',
      endDate: 'May 2018',
      description: [
        'Built backend services and APIs for real-time telematics and behavioral analytics processing driving-behavior and user-interaction streams for insurance workflows.',
        'Contributed to early-stage product and architecture decisions in a fast-moving startup environment.'
      ],
      skills: ['Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'Telematics'],
      category: 'fullstack'
    }
  ];
  
  const education: Education[] = [
    {
      id: 'cumberlands',
      degree: 'Master of Science',
      field: 'Artificial Intelligence',
      school: 'University of the Cumberlands',
      location: 'Williamsburg, KY',
      startDate: '2024',
      endDate: '2025',
      description: 'Courses: Deep Learning, Natural Language Processing, Generative AI & LLMs, Ethics in AI, Data Visualization.'
    },
    {
      id: 'northeastern-edu',
      degree: 'Master of Science',
      field: 'Information Systems',
      school: 'Northeastern University',
      location: 'Boston, MA',
      startDate: '2022',
      endDate: '2024',
      description: 'Courses: Database Design, Algorithms, Cloud Computing, Web Design & Development, Data Science, Research Methods in AI.'
    },
    {
        id: 'kurukshetra',
        degree: 'Bachelor of Technology',
        field: 'Computer Science & Engineering',
        school: 'Kurukshetra University',
        location: 'Kurukshetra, India',
        startDate: '2012',
        endDate: '2016',
        description: 'Courses: Data Structures & Algorithms, Computer Networks, Discrete Mathematics, Object-Oriented Design.'
      }
    ];
    
    const filteredExperiences = activeFilter === 'all'
      ? experiences
      : experiences.filter(exp => exp.category === activeFilter);
  
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {/* JARVIS mode selector — tabs + export action */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className={`${MONO} text-[10px] text-jarvis-blue-300/55 mr-1 hidden sm:inline`}>▸ Mode</span>
            <button
              onClick={() => setActiveTab('experience')}
              className={`${MONO} text-[10px] px-3 py-1.5 rounded-sm border transition-all inline-flex items-center gap-2`}
              style={
                activeTab === 'experience'
                  ? {
                      borderColor: '#00d4ff',
                      backgroundColor: 'rgba(0, 212, 255, 0.18)',
                      color: '#00d4ff',
                      boxShadow: '0 0 12px rgba(0, 212, 255, 0.45), inset 0 0 12px rgba(0, 212, 255, 0.15)',
                    }
                  : {
                      borderColor: 'rgba(0, 212, 255, 0.22)',
                      color: 'rgba(203, 213, 225, 0.85)',
                      backgroundColor: 'rgba(0, 212, 255, 0.04)',
                    }
              }
              aria-pressed={activeTab === 'experience'}
            >
              <Briefcase className="w-3 h-3" />
              <span>Experience</span>
              <span className="opacity-50 tabular-nums">[{experiences.length}]</span>
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`${MONO} text-[10px] px-3 py-1.5 rounded-sm border transition-all inline-flex items-center gap-2`}
              style={
                activeTab === 'education'
                  ? {
                      borderColor: '#fbbf24',
                      backgroundColor: 'rgba(251, 191, 36, 0.18)',
                      color: '#fbbf24',
                      boxShadow: '0 0 12px rgba(251, 191, 36, 0.45), inset 0 0 12px rgba(251, 191, 36, 0.15)',
                    }
                  : {
                      borderColor: 'rgba(251, 191, 36, 0.22)',
                      color: 'rgba(203, 213, 225, 0.85)',
                      backgroundColor: 'rgba(251, 191, 36, 0.04)',
                    }
              }
              aria-pressed={activeTab === 'education'}
            >
              <GraduationCap className="w-3 h-3" />
              <span>Education</span>
              <span className="opacity-50 tabular-nums">[{education.length}]</span>
            </button>
          </div>

          <Link
            href="/resume/Nikhil Bindal Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`${MONO} text-[10px] px-3 py-1.5 rounded-sm border transition-all inline-flex items-center gap-2 group/dl`}
            style={{
              borderColor: 'rgba(251, 191, 36, 0.45)',
              color: '#fbbf24',
              backgroundColor: 'rgba(251, 191, 36, 0.08)',
              boxShadow: '0 0 0 1px rgba(251, 191, 36, 0.08)',
            }}
            title="Download full dossier (PDF)"
          >
            <Download className="w-3 h-3 transition-transform group-hover/dl:translate-y-0.5" />
            <span>Export · Dossier.PDF</span>
          </Link>
        </div>
        
        {activeTab === 'experience' && (
          <>
            {/* JARVIS Scan filter chips */}
            <div className="mb-6">
              <div className={`${MONO} text-[10px] text-jarvis-blue-300/60 mb-2 inline-flex items-center gap-2`}>
                <Filter className="w-3 h-3" /> ▸ Scan Parameters · {filteredExperiences.length} of {experiences.length} ops
              </div>
              <div className="flex flex-wrap gap-2">
                {filterOptions.map(option => {
                  const active = activeFilter === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setActiveFilter(option.id)}
                      className={`${MONO} text-[10px] px-3 py-1.5 rounded-sm border transition-all`}
                      style={
                        active
                          ? {
                              borderColor: '#00d4ff',
                              backgroundColor: 'rgba(0, 212, 255, 0.18)',
                              color: '#00d4ff',
                              boxShadow: '0 0 12px rgba(0, 212, 255, 0.4)',
                            }
                          : {
                              borderColor: 'rgba(0, 212, 255, 0.22)',
                              color: 'rgba(203, 213, 225, 0.85)',
                              backgroundColor: 'rgba(0, 212, 255, 0.04)',
                            }
                      }
                    >
                      <span className="opacity-60 mr-1.5">▸</span>{option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Operation files */}
            <div className="space-y-5">
              {filteredExperiences.map((exp, index) => {
                const meta = CATEGORY_META[exp.category] ?? CATEGORY_META.ai;
                const accent = meta.accent;
                const opNum = `OP-${String(filteredExperiences.length - index).padStart(3, '0')}`;
                const isActive = exp.endDate.toLowerCase().includes('present');
                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
                  >
                    <HUDFrame accent={accent} cornerSize={14} className="bg-jarvis-dark-700/65 backdrop-blur-md">
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: `linear-gradient(135deg, ${accent}10 0%, rgba(0, 8, 20, 0.55) 100%)` }}
                      />

                      {/* TOP METADATA STRIP */}
                      <div className={`relative px-4 py-2 border-b border-white/5 flex flex-wrap items-center justify-between gap-2 ${MONO} text-[10px]`}>
                        <div className="flex items-center gap-3">
                          <span style={{ color: accent, opacity: 0.9 }}>› {opNum}</span>
                          <span className="text-jarvis-blue-300/40">·</span>
                          <span style={{ color: isActive ? '#22c55e' : 'rgba(148, 163, 184, 0.7)' }} className="inline-flex items-center gap-1.5">
                            <span className="relative flex h-1.5 w-1.5">
                              {isActive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />}
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: isActive ? '#22c55e' : '#94a3b8' }} />
                            </span>
                            {isActive ? 'Active' : 'Concluded'}
                          </span>
                          <span className="text-jarvis-blue-300/40">·</span>
                          <span style={{ color: accent }}>class::{meta.tier}</span>
                        </div>
                        <span className="text-jarvis-blue-300/55">{meta.classification}</span>
                      </div>

                      {/* CONTENT */}
                      <div className="relative p-5 sm:p-6">
                        {/* Header — title + dates/location */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                          <div>
                            <h3 className="text-lg sm:text-xl font-display text-white leading-tight">{exp.title}</h3>
                            <p className={`${MONO} text-xs mt-1`} style={{ color: accent, opacity: 0.85 }}>
                              {exp.company}
                            </p>
                          </div>
                          <div className={`${MONO} text-[10px] text-jarvis-blue-300/70 sm:text-right space-y-1 flex-shrink-0`}>
                            <div className="inline-flex items-center gap-1.5">
                              <Calendar className="w-3 h-3" />
                              {exp.startDate} → {exp.endDate}
                            </div>
                            <div className="inline-flex items-center gap-1.5">
                              <MapPin className="w-3 h-3" />
                              {exp.location}
                            </div>
                          </div>
                        </div>

                        {/* Bullets — sub-roles or main */}
                        {exp.subRoles && exp.subRoles.length > 0 ? (
                          <div className="space-y-5 mb-5">
                            {exp.subRoles.map((sub, si) => (
                              <div key={si}>
                                <div className={`${MONO} text-[10px] mb-2 flex items-center gap-2`} style={{ color: accent, opacity: 0.85 }}>
                                  ▸ Theatre {String.fromCharCode(65 + si)} · {sub.company}
                                </div>
                                <ul className="space-y-2 pl-3 border-l" style={{ borderColor: `${accent}33` }}>
                                  {sub.description.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                                      <span
                                        className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: accent, boxShadow: `0 0 4px ${accent}` }}
                                      />
                                      <span className="flex-1 leading-relaxed">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="mb-5">
                            <div className={`${MONO} text-[10px] mb-2`} style={{ color: accent, opacity: 0.85 }}>
                              ▸ Mission Outcomes
                            </div>
                            <ul className="space-y-2">
                              {exp.description.map((item, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                                  <span
                                    className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: accent, boxShadow: `0 0 4px ${accent}` }}
                                  />
                                  <span className="flex-1 leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Deployed assets */}
                        <div>
                          <div className={`${MONO} text-[10px] mb-1.5`} style={{ color: accent, opacity: 0.75 }}>
                            ▸ Deployed Assets
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.skills.map(skill => (
                              <span
                                key={skill}
                                className="font-mono text-[10px] tracking-wide px-2 py-0.5 rounded-sm border"
                                style={{
                                  borderColor: `${accent}33`,
                                  backgroundColor: `${accent}0a`,
                                  color: 'rgba(229, 231, 235, 0.85)',
                                }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </HUDFrame>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
        
        {activeTab === 'education' && (
          <div className="space-y-4">
            <div className={`${MONO} text-[10px] text-jarvis-blue-300/60 mb-3`}>
              ▸ Credentials · {education.length} verified records
            </div>
            {education.map((edu, index) => {
              const accent = ['#fbbf24', '#06b6d4', '#a855f7'][index % 3];
              return (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <HUDFrame accent={accent} cornerSize={12} className="bg-jarvis-dark-700/65 backdrop-blur-md">
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(135deg, ${accent}10 0%, rgba(0, 8, 20, 0.55) 100%)` }}
                    />
                    <div className={`relative px-4 py-2 border-b border-white/5 flex flex-wrap items-center justify-between gap-2 ${MONO} text-[10px]`}>
                      <div className="flex items-center gap-3">
                        <span style={{ color: accent, opacity: 0.9 }}>› CRED-{String(index + 1).padStart(3, '0')}</span>
                        <span className="text-jarvis-blue-300/40">·</span>
                        <span style={{ color: accent }}>Verified</span>
                      </div>
                      <span className="text-jarvis-blue-300/55">Academic Record</span>
                    </div>
                    <div className="relative p-5">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                        <div>
                          <h3 className="text-lg font-display text-white leading-tight">
                            {edu.degree} · {edu.field}
                          </h3>
                          <p className={`${MONO} text-xs mt-1`} style={{ color: accent, opacity: 0.85 }}>
                            {edu.school}
                          </p>
                        </div>
                        <div className={`${MONO} text-[10px] text-jarvis-blue-300/70 sm:text-right space-y-1 flex-shrink-0`}>
                          <div className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            {edu.startDate} → {edu.endDate}
                          </div>
                          <div className="inline-flex items-center gap-1.5">
                            <MapPin className="w-3 h-3" />
                            {edu.location}
                          </div>
                        </div>
                      </div>
                      {edu.description && (
                        <div>
                          <div className={`${MONO} text-[10px] mb-1`} style={{ color: accent, opacity: 0.7 }}>
                            ▸ Coursework
                          </div>
                          <p className="text-sm text-gray-300 leading-relaxed">{edu.description}</p>
                        </div>
                      )}
                    </div>
                  </HUDFrame>
                </motion.div>
              );
            })}
          </div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/contact"
            className={`${MONO} text-[11px] px-5 py-2.5 rounded-sm border transition-all inline-flex items-center gap-2.5 group/cta`}
            style={{
              color: '#00d4ff',
              borderColor: 'rgba(0, 212, 255, 0.5)',
              backgroundColor: 'rgba(0, 212, 255, 0.1)',
              boxShadow: '0 0 14px rgba(0, 212, 255, 0.35), inset 0 0 14px rgba(0, 212, 255, 0.1)',
            }}
          >
            <span className="opacity-60">›</span>
            <span>Open a channel</span>
            <span className="opacity-60 transition-transform group-hover/cta:translate-x-1">→</span>
          </Link>
        </motion.div>
      </motion.div>
    );
  }