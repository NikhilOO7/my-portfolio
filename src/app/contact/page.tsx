'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaLinkedin, FaGithub, FaFacebook, FaInstagram, FaMedium,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import {
  Loader2, Send, CheckCircle, AlertCircle, Mail, Phone, MapPin, Radio,
} from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import MapComponent from '@/components/MapComponent';
import BuyMeCoffeeButton from '@/components/BuyMeCoffeeButton';
import PanelHeader from '@/components/ui/PanelHeader';
import HUDFrame from '@/components/ui/HUDFrame';
import { PERSON } from '@/lib/knowledge/graph';

const MONO = 'font-mono uppercase tracking-[0.25em]';

const INQUIRY_TYPES = [
  { value: '', label: '— SELECT CHANNEL TYPE —' },
  { value: 'job', label: 'JOB OPPORTUNITY' },
  { value: 'project', label: 'PROJECT INQUIRY' },
  { value: 'collaboration', label: 'COLLABORATION' },
  { value: 'consulting', label: 'CONSULTING REQUEST' },
  { value: 'other', label: 'OTHER' },
];

const CHANNELS = [
  { href: PERSON.links.linkedin, icon: FaLinkedin, label: 'LinkedIn', uplink: 'CH·001', status: 'PRIMARY', accent: '#0077b5' },
  { href: PERSON.links.github, icon: FaGithub, label: 'GitHub', uplink: 'CH·002', status: 'PRIMARY', accent: '#a855f7' },
  { href: PERSON.links.twitter, icon: FaXTwitter, label: 'X (Twitter)', uplink: 'CH·003', status: 'ACTIVE', accent: '#06b6d4' },
  { href: 'https://www.facebook.com/nikhil.bindal2', icon: FaFacebook, label: 'Facebook', uplink: 'CH·004', status: 'IDLE', accent: '#3b82f6' },
  { href: 'https://www.instagram.com/nikhil.bindal2/', icon: FaInstagram, label: 'Instagram', uplink: 'CH·005', status: 'IDLE', accent: '#ec4899' },
  { href: 'https://medium.com/@nikhilbindal2', icon: FaMedium, label: 'Medium', uplink: 'CH·006', status: 'ACTIVE', accent: '#fbbf24' },
];

const PROTOCOLS = [
  {
    q: 'What types of engagements do you take on?',
    a: "Three lanes — short consulting (1–4 weeks, architecture review or hands-on technical guidance), contract builds (1–6 months, production AI systems), and select full-time roles at well-funded AI teams. Advisory slots open for early-stage AI startups where the technical bet is interesting.",
  },
  {
    q: "What's your ideal project profile?",
    a: 'Production-bound AI/ML systems where infrastructure decisions move the needle — multi-agent orchestration, real-time voice pipelines, RAG at scale, distributed event-driven backends. Strong fit when there is an existing engineering team to compound with. Weak fit: greenfield prototypes with no roadmap to production.',
  },
  {
    q: 'How does an engagement typically start?',
    a: 'Async intake → 30-minute scoping call → written proposal with deliverables, milestones, and rate → mutual NDA + SOW → kickoff. Typically 3–5 business days from first message. Faster on urgent timelines if flagged in the intake.',
  },
  {
    q: 'What is your typical response window?',
    a: 'Twenty-four to forty-eight hours for project and consulting inquiries on business days. Same-day for urgent operational matters. If a deadline is involved, mention it upfront — I will calibrate accordingly.',
  },
  {
    q: 'What is your rate structure?',
    a: 'Project-based pricing for defined scopes; hourly for advisory or open-ended exploration; equity considered for founding-team roles where the alignment is real. Custom quote provided after an intake call so the structure matches the work — accurate beats fast.',
  },
  {
    q: 'Which technologies do you specialize in?',
    a: 'Daily-driver: Python (FastAPI, Django, AsyncIO), Node.js, TypeScript, PostgreSQL, Kafka, Redis. AI: LangGraph, CrewAI, LlamaIndex, GPT-4o, Gemini, Qdrant, Deepgram + Cartesia for voice. Infra: GCP, AWS, Docker, Kubernetes. Language fluency matters less than systems thinking — comfortable picking up new stacks fast.',
  },
  {
    q: 'How do you handle confidentiality and IP?',
    a: 'Mutual NDA before any sensitive technical detail is shared. Default IP terms: work-for-hire on contracted deliverables, with reasonable exclusion for pre-existing tools and open-source primitives. Happy to sign yours or send mine — whichever moves faster.',
  },
  {
    q: 'Are you currently accepting new engagements?',
    a: 'Affirmative — current capacity allows one to two new engagements per quarter. For urgent or short-fuse work, ask directly. I will be honest about bandwidth rather than overbook.',
  },
  {
    q: 'Where are you based and which time zones do you cover?',
    a: 'San Francisco, CA (PST). Remote-first with hybrid on the table for the right Bay Area opportunity. Comfortable across North American, European, and Asian time zones — meeting hours flexible by arrangement.',
  },
  {
    q: 'Do you do architecture reviews or one-off consulting calls?',
    a: 'Yes — a focused 60-minute deep dive is the fastest way to unblock a specific decision. Common topics: AI infrastructure choices, latency optimization, scaling event-driven systems, multi-agent design, and hiring rubrics for senior engineers.',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Required fields missing — name, email, and message must be present.');
      setSubmitStatus('error');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Uplink address malformed — verify email format.');
      setSubmitStatus('error');
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    try {
      const response = await axios.post('/api/contact', formData);
      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      setErrorMessage('Transmission failed. Try again or route via email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submitStatus === 'error') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  const accent = '#fbbf24';

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
            module="Open Channel"
            query="open a channel to him"
            response={[
              'Channel is ready.',
              'Inbound messages routed directly to subject; expected response window is 24–48 hours.',
              'Compose your transmission below — or use a social uplink.',
            ]}
            accent={accent}
          />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6">
            {/* ── TRANSMISSION TERMINAL (form) ───────────────── */}
            <HUDFrame accent={accent} cornerSize={14} showScan className="bg-jarvis-dark-700/70 backdrop-blur-md">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${accent}10 0%, rgba(0, 8, 20, 0.55) 100%)` }}
              />

              <div className={`relative px-4 py-2.5 border-b border-white/5 flex flex-wrap items-center justify-between gap-2 ${MONO} text-[10px]`}>
                <div className="flex items-center gap-3">
                  <span style={{ color: accent, opacity: 0.9 }}>› Transmission Terminal</span>
                  <span className="text-jarvis-blue-300/40">·</span>
                  <span className="text-emerald-300 inline-flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                    </span>
                    Ready
                  </span>
                </div>
                <span className="text-jarvis-blue-300/55">Direct Uplink to Subject</span>
              </div>

              <div className="relative p-5 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* OPERATOR NAME */}
                  <div>
                    <label htmlFor="name" className={`${MONO} text-[10px] block mb-1.5`} style={{ color: accent, opacity: 0.85 }}>
                      › Operator name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative flex items-center font-mono">
                      <span className="absolute left-3 text-jarvis-gold-400 select-none">›_</span>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        className="w-full pl-9 pr-3 py-2.5 bg-jarvis-dark-900/60 text-gray-100 text-sm outline-none border focus:border-jarvis-cyan transition-colors"
                        style={{ borderColor: `${accent}33` }}
                        required
                      />
                    </div>
                  </div>

                  {/* UPLINK ADDRESS */}
                  <div>
                    <label htmlFor="email" className={`${MONO} text-[10px] block mb-1.5`} style={{ color: accent, opacity: 0.85 }}>
                      › Uplink address (email) <span className="text-red-400">*</span>
                    </label>
                    <div className="relative flex items-center font-mono">
                      <span className="absolute left-3 text-jarvis-gold-400 select-none">›_</span>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        className="w-full pl-9 pr-3 py-2.5 bg-jarvis-dark-900/60 text-gray-100 text-sm outline-none border focus:border-jarvis-cyan transition-colors"
                        style={{ borderColor: `${accent}33` }}
                        required
                      />
                    </div>
                  </div>

                  {/* CHANNEL TYPE */}
                  <div>
                    <label htmlFor="subject" className={`${MONO} text-[10px] block mb-1.5`} style={{ color: accent, opacity: 0.85 }}>
                      › Channel type
                    </label>
                    <div className="relative font-mono">
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full pl-3 pr-8 py-2.5 bg-jarvis-dark-900/60 text-gray-100 text-sm outline-none border focus:border-jarvis-cyan transition-colors appearance-none cursor-pointer"
                        style={{ borderColor: `${accent}33` }}
                      >
                        {INQUIRY_TYPES.map(t => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-jarvis-gold-400 pointer-events-none">▾</span>
                    </div>
                  </div>

                  {/* MESSAGE BODY */}
                  <div>
                    <label htmlFor="message" className={`${MONO} text-[10px] block mb-1.5`} style={{ color: accent, opacity: 0.85 }}>
                      › Message body <span className="text-red-400">*</span>
                    </label>
                    <div className="relative font-mono">
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 bg-jarvis-dark-900/60 text-gray-100 text-sm outline-none border focus:border-jarvis-cyan transition-colors resize-none leading-relaxed"
                        style={{ borderColor: `${accent}33` }}
                        placeholder="Compose your transmission..."
                        required
                      />
                    </div>
                  </div>

                  {/* TRANSMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 ${MONO} text-xs flex items-center justify-center gap-2.5 transition-all disabled:opacity-50`}
                    style={{
                      color: '#0b0e1a',
                      background: `linear-gradient(135deg, ${accent} 0%, #f59e0b 100%)`,
                      boxShadow: `0 0 16px ${accent}55, 0 0 32px ${accent}33`,
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        ▸ Transmit
                      </>
                    )}
                  </button>

                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className={`flex items-start gap-2.5 p-3 rounded-sm border font-mono text-xs`}
                      style={{
                        color: '#86efac',
                        borderColor: 'rgba(34, 197, 94, 0.5)',
                        background: 'rgba(34, 197, 94, 0.1)',
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className={MONO} style={{ letterSpacing: '0.25em' }}>▸ Transmission Sent · Queued</div>
                        <div className="text-[11px] mt-1 normal-case tracking-normal text-gray-300">
                          JARVIS confirms receipt. Subject will respond within 24–48 hours.
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className={`flex items-start gap-2.5 p-3 rounded-sm border font-mono text-xs`}
                      style={{
                        color: '#fca5a5',
                        borderColor: 'rgba(239, 68, 68, 0.5)',
                        background: 'rgba(239, 68, 68, 0.08)',
                      }}
                    >
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className={MONO} style={{ letterSpacing: '0.25em' }}>▸ Transmission Aborted</div>
                        <div className="text-[11px] mt-1 normal-case tracking-normal text-gray-300">{errorMessage}</div>
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>
            </HUDFrame>

            {/* ── RIGHT COLUMN ───────────────────────────────── */}
            <div className="space-y-6">
              {/* LIVE COORDINATES + MAP */}
              <HUDFrame accent="#00d4ff" cornerSize={12} className="bg-jarvis-dark-700/65 backdrop-blur-md">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.06) 0%, rgba(0, 8, 20, 0.55) 100%)' }}
                />
                <div className={`relative px-4 py-2.5 border-b border-white/5 flex items-center justify-between ${MONO} text-[10px]`}>
                  <span className="text-jarvis-cyan inline-flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> ▸ Live Coordinates
                  </span>
                  <span className="text-jarvis-blue-300/55">PST · UTC−8</span>
                </div>
                <div className="relative p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3 font-mono">
                    <div>
                      <div className={`${MONO} text-[9px] text-jarvis-blue-300/60 mb-1`}>› Latitude</div>
                      <div className="text-base text-jarvis-cyan tabular-nums" style={{ textShadow: '0 0 6px rgba(0, 212, 255, 0.55)' }}>37.7749°N</div>
                    </div>
                    <div>
                      <div className={`${MONO} text-[9px] text-jarvis-blue-300/60 mb-1`}>› Longitude</div>
                      <div className="text-base text-jarvis-cyan tabular-nums" style={{ textShadow: '0 0 6px rgba(0, 212, 255, 0.55)' }}>122.4194°W</div>
                    </div>
                  </div>
                  <div className="h-[200px] sm:h-[220px] overflow-hidden rounded-sm border border-jarvis-cyan/30">
                    <MapComponent />
                  </div>
                  <div className={`${MONO} text-[9px] text-jarvis-blue-300/55 flex items-center justify-between`}>
                    <span>San Francisco, CA · Bay Area</span>
                    <span className="text-jarvis-cyan/80 inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-jarvis-cyan animate-corner-pulse" />
                      Trace Locked
                    </span>
                  </div>
                </div>
              </HUDFrame>

              {/* DIRECT CONTACT INFO */}
              <HUDFrame accent="#22c55e" cornerSize={12} className="bg-jarvis-dark-700/55 backdrop-blur-md">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.06) 0%, rgba(0, 8, 20, 0.55) 100%)' }}
                />
                <div className={`relative px-4 py-2.5 border-b border-white/5 ${MONO} text-[10px] text-emerald-300`}>
                  ▸ Direct Contact
                </div>
                <div className="relative p-4 space-y-3 font-mono text-sm">
                  <div className="flex items-center gap-3">
                    <Mail className="w-3.5 h-3.5 text-emerald-300/70 flex-shrink-0" />
                    <a href={`mailto:${PERSON.email}`} className="text-gray-100 hover:text-emerald-300 transition-colors break-all">{PERSON.email}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-3.5 h-3.5 text-emerald-300/70 flex-shrink-0" />
                    <a href={`tel:+18573135445`} className="text-gray-100 hover:text-emerald-300 transition-colors">{PERSON.phone}</a>
                  </div>
                </div>
              </HUDFrame>
            </div>
          </div>

          {/* ── CHANNEL ROSTER (Social) ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mt-10"
          >
            <div className={`${MONO} text-[10px] text-jarvis-blue-300/60 mb-3 inline-flex items-center gap-2`}>
              <Radio className="w-3 h-3 text-jarvis-cyan" />
              ▸ Channel Roster · 6 Uplinks Configured
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {CHANNELS.map((c, i) => {
                const Icon = c.icon;
                const live = c.status !== 'IDLE';
                return (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
                    whileHover={{ y: -3 }}
                  >
                    <Link href={c.href} target="_blank" rel="noopener noreferrer" className="block">
                      <HUDFrame accent={c.accent} cornerSize={10} className="bg-jarvis-dark-700/65 backdrop-blur-md p-3.5 h-full">
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{ background: `linear-gradient(135deg, ${c.accent}10 0%, rgba(0, 8, 20, 0.55) 100%)` }}
                        />
                        <div className="relative">
                          <div className="flex items-center justify-between mb-2">
                            <Icon className="w-4 h-4" style={{ color: c.accent }} />
                            <span className={`${MONO} text-[8px]`} style={{ color: c.accent, opacity: 0.7 }}>{c.uplink}</span>
                          </div>
                          <div className="text-sm font-display text-white tracking-wide leading-tight">{c.label}</div>
                          <div className="mt-1 flex items-center gap-1.5">
                            <span
                              className={`w-1 h-1 rounded-full ${live ? 'animate-corner-pulse' : ''}`}
                              style={{ background: live ? c.accent : 'rgba(148, 163, 184, 0.5)' }}
                            />
                            <span
                              className={`${MONO} text-[8px]`}
                              style={{ color: live ? c.accent : 'rgba(148, 163, 184, 0.7)' }}
                            >
                              {c.status}
                            </span>
                          </div>
                        </div>
                      </HUDFrame>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ── STANDARD PROTOCOLS (FAQ) ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-12"
          >
            <div className={`${MONO} text-[10px] text-jarvis-blue-300/60 mb-3 inline-flex items-center gap-2`}>
              <span className="w-1.5 h-1.5 rounded-full bg-jarvis-cyan animate-corner-pulse" />
              ▸ Standard Protocols · Engagement FAQ
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROTOCOLS.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
                >
                  <HUDFrame accent="#06b6d4" cornerSize={10} className="bg-jarvis-dark-700/55 backdrop-blur-md p-4 h-full">
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.06) 0%, rgba(0, 8, 20, 0.55) 100%)' }}
                    />
                    <div className="relative">
                      <div className={`${MONO} text-[9px] mb-2`} style={{ color: '#06b6d4', opacity: 0.7 }}>
                        ▸ Protocol · {String(i + 1).padStart(2, '0')}
                      </div>
                      <h3 className="font-display text-sm text-white tracking-wide mb-2 leading-snug">{p.q}</h3>
                      <p className="text-xs text-gray-300 leading-relaxed">{p.a}</p>
                    </div>
                  </HUDFrame>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── SUPPORT / COFFEE ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <HUDFrame accent="#fbbf24" cornerSize={12} className="bg-jarvis-dark-700/55 backdrop-blur-md p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.06) 0%, rgba(0, 8, 20, 0.55) 100%)' }}
              />
              <div className="relative">
                <div className={`${MONO} text-[9px] text-jarvis-gold-400/70 mb-1`}>▸ Optional Support</div>
                <h3 className="font-display text-base text-white tracking-wide">Found this work useful?</h3>
                <p className="text-xs text-gray-300 mt-1 max-w-md">
                  Help fuel the next experiment. No subscription, just a one-time supply drop.
                </p>
              </div>
              <div className="relative">
                <BuyMeCoffeeButton variant="small" />
              </div>
            </HUDFrame>
          </motion.div>

          {/* ── TRANSMISSION END ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-12 mb-6 flex items-center justify-center gap-3 font-mono text-[10px] tracking-[0.4em] uppercase text-jarvis-blue-300/60"
          >
            <span className="h-px flex-1 max-w-[180px] bg-gradient-to-r from-transparent to-jarvis-cyan/30" />
            <span>◇ channel open · standing by</span>
            <span className="h-px flex-1 max-w-[180px] bg-gradient-to-l from-transparent to-jarvis-cyan/30" />
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
