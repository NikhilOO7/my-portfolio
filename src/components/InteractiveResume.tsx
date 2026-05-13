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
            'Architected and built a production-grade AI coaching platform combining biometric signal analysis with a multi-agent orchestration pipeline and persistent personal memory systems.',
            'Designed and implemented a 6-agent orchestration pipeline reducing end-to-end AI latency from 36s to 9.5s (73% reduction) through prompt consolidation, model tiering, and async execution optimization.',
            'Built Mnemosyne memory architecture with semantic retrieval, temporal decay lifecycle, and context-scoped memory bucketing across multiple user domains.',
            'Engineered Redis-backed concurrency controls and session orchestration preventing state corruption under concurrent real-time voice sessions.',
            'Built parallel voice sidecar architecture using Gemini Live enabling low-latency audio conversations while asynchronously running sentiment, query, and analytics pipelines.',
            'Integrated real-time HCI signal processing workflows using multimodal emotion/context signals to adapt conversational reasoning dynamically.',
            'Developed Python and JavaScript SDKs supporting 32 operations across orchestration, memory, analytics, sessions, and BYOD infrastructure.',
            'Established CI/CD pipelines, audit logging infrastructure, webhook delivery systems, and production deployment workflows on GCP Cloud Run.'
          ]
        },
        {
          company: 'Stealth AI Startup — AI Solutions Consultant',
          description: [
            'Architected an AI-powered meeting intelligence platform automating pre-meeting research, live meeting assistance, and post-meeting synthesis workflows.',
            'Designed a 3-phase agentic architecture orchestrating 15 specialized AI agents across research, meeting intelligence, and decision-tracking pipelines.',
            'Built contextual retrieval workflows using multi-level semantic search across Qdrant vector collections improving retrieval relevance by ~40% over traditional RAG pipelines.',
            'Implemented a real-time voice pipeline using LiveKit WebRTC, Deepgram STT, and Cartesia TTS targeting sub-200ms perceived latency.',
            'Designed PostgreSQL schemas and knowledge graph workflows modeling meeting entities, action items, decisions, transcripts, and research relationships.',
            'Implemented Redis-backed rate limiting, Prometheus metrics, structured logging, and async background workers for scalable production monitoring.'
          ]
        }
      ],
      skills: ['Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'Redis', 'Qdrant', 'WebRTC', 'LiveKit', 'Gemini Live', 'CrewAI', 'LangGraph', 'LlamaIndex', 'GPT-4o', 'Deepgram', 'Cartesia', 'Kubernetes', 'GCP Cloud Run', 'Prometheus'],
      category: 'ai'
    },
    {
      id: 'northeastern',
      title: 'Full-Stack Developer / Research Assistant',
      company: 'Northeastern University',
      location: 'Boston, MA',
      startDate: 'Feb 2023',
      endDate: 'Dec 2023',
      description: [
        'Developed a semantic search and data-visualization platform for biomedical research using FastAPI, PostgreSQL, React, and D3.js, enabling researchers to search and analyze 10K+ scientific papers and molecular datasets.',
        'Built AWS Batch-based distributed simulation pipelines orchestrating large-scale molecular computations and reducing compute costs by 40%.',
        'Led backend development for scientific data ingestion pipelines, metadata APIs, and ML inference workflows (TensorFlow CNN classifiers for glycan research) supporting computational biology research.',
        'Designed accessibility-focused tooling including tactile graphics generation and screen-reader integrations to improve STEM accessibility for visually impaired students and researchers.'
      ],
      skills: ['React', 'FastAPI', 'Python', 'PostgreSQL', 'AWS Batch', 'D3.js', 'TensorFlow', 'OpenCV', 'TypeScript', 'Docker'],
      category: 'fullstack'
    },
    {
      id: 'times-internet',
      title: 'Software Engineer',
      company: 'Times Internet',
      location: 'Noida, India',
      startDate: 'Apr 2021',
      endDate: 'Jul 2022',
      description: [
        'Built and scaled backend services (Spring Boot + Redis) for the TOI+ subscription platform handling 8.4M daily requests and supporting 120K+ subscribers, contributing to $150M+ annual revenue.',
        'Migrated 70+ city portals from legacy systems to React-based micro-frontends, raising Lighthouse performance scores to 92/100 and improving maintainability.',
        'Designed a Kafka-based personalization and recommendations pipeline that delivered personalized news feeds; achieved 9.7% CTR increase for premium users and supported higher engagement and retention.',
        'Containerized services using Docker and deployed to AWS EKS, reducing infrastructure costs by 35% and simplifying deployments.'
      ],
      skills: ['Spring Boot', 'Java', 'Node.js', 'Redis', 'Kafka', 'React', 'Docker', 'Kubernetes', 'AWS EKS', 'Jenkins'],
      category: 'backend'
    },
    {
      id: 'progcap',
      title: 'Founding Software Engineer',
      company: 'Progcap (Fintech)',
      location: 'New Delhi, India',
      startDate: 'Jan 2019',
      endDate: 'Mar 2021',
      description: [
        'Built real-time lending and underwriting microservices using Node.js/Express, Kafka, MongoDB, and event-driven architecture; reduced transaction workflow latency from 8.7s to 890ms through caching and optimized queries.',
        'Implemented Kafka event-driven workflows processing 22K transactions per second with exactly-once semantics to ensure financial integrity across high-throughput lending operations.',
        'Integrated ML-powered credit scoring (XGBoost) into backend lending systems, decreasing false negatives by 19% and enabling smarter lending decisions for large-scale financial operations.',
        'Supported product growth to ₹9,800 Cr+ lending volume, helping secure Series B funding (US$25M).'
      ],
      skills: ['Node.js', 'Express', 'Kafka', 'MongoDB', 'Redis', 'XGBoost', 'AWS ECS', 'Python'],
      category: 'backend'
    },
    {
      id: 'livemedia',
      title: 'Software Engineer',
      company: 'LiveMedia / LiveChek',
      location: 'New Delhi, India',
      startDate: 'Aug 2017',
      endDate: 'May 2018',
      description: [
        'Worked on insurance-focused telematics and behavioral analytics systems integrating real-time driving behavior and user interaction data into backend services and APIs.',
        'Built an OCR-based document verification system using Tesseract.js and Python APIs, achieving 92%+ accuracy for identity verification.',
        'Developed a React Native offline-first inspection app used for 50K+ monthly site inspections; reduced inspection time from 45 minutes to 22 minutes through local caching and sync logic.',
        'Created a React.js + Django claims platform that cut insurance claims processing time by 60% and contributed to early-stage product and architecture decisions in a startup environment.'
      ],
      skills: ['React Native', 'React', 'Django', 'Python', 'Tesseract.js', 'PostgreSQL', 'Redux', 'REST APIs'],
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