'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import HUDFrame from '@/components/ui/HUDFrame';
import profileImage from '@/assets/images/nikhil.png';
import { PERSON } from '@/lib/knowledge/graph';

interface Stat {
  value: string;
  label: string;
}

const QUICK_STATS: Stat[] = [
  { value: '6+', label: 'years shipping' },
  { value: 'AI INFRA', label: 'primary domain' },
  { value: '12', label: 'production projects' },
  { value: 'OPEN', label: 'engagement status' },
];

const MONO = 'font-mono uppercase tracking-[0.25em]';

/**
 * Tactical "Subject Dossier" identification card for the About page.
 * Replaces the photo + bio block with a JARVIS-formatted ID file —
 * photo with scan band on the left, structured metadata grid on the right.
 */
export default function SubjectIdentificationCard() {
  const accent = '#00d4ff';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <HUDFrame accent={accent} cornerSize={16} showScan className="bg-jarvis-dark-700/70 backdrop-blur-md">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${accent}10 0%, rgba(0, 8, 20, 0.55) 100%)` }}
        />

        {/* Top metadata strip */}
        <div className="relative px-5 py-2.5 border-b border-jarvis-cyan/15 flex flex-wrap items-center justify-between gap-3">
          <div className={`${MONO} text-[10px] text-jarvis-cyan flex items-center gap-3`}>
            <span style={{ opacity: 0.85 }}>› FILE-NB-001</span>
            <span className="text-jarvis-blue-300/40">·</span>
            <span style={{ color: '#22c55e' }} className="inline-flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              Active
            </span>
            <span className="text-jarvis-blue-300/40">·</span>
            <span style={{ color: '#a855f7' }}>class::alpha</span>
          </div>
          <div className={`${MONO} text-[10px] text-jarvis-blue-300/60`}>
            ▸ Subject Identification
          </div>
        </div>

        <div className="relative p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-7 lg:gap-10">
          {/* PHOTO PANEL */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-44 h-44 sm:w-52 sm:h-52">
              {/* Corner brackets */}
              {[
                'top-0 left-0 border-t border-l',
                'top-0 right-0 border-t border-r',
                'bottom-0 left-0 border-b border-l',
                'bottom-0 right-0 border-b border-r',
              ].map((cls, i) => (
                <span
                  key={i}
                  className={`absolute w-4 h-4 ${cls}`}
                  style={{ borderColor: accent, boxShadow: `0 0 8px -2px ${accent}` }}
                />
              ))}
              {/* Inner photo container */}
              <div
                className="absolute inset-3 overflow-hidden"
                style={{
                  border: `1px solid ${accent}66`,
                  boxShadow: `0 0 20px ${accent}55, inset 0 0 16px ${accent}22`,
                }}
              >
                <Image
                  src={profileImage}
                  alt={PERSON.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 11rem, 13rem"
                  style={{ objectFit: 'cover' }}
                />
                {/* Cyan tint */}
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(180deg, transparent 0%, ${accent}1a 100%)` }}
                />
                {/* Scanline overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40"
                  style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 2px, ${accent}1f 3px, transparent 4px)`,
                    mixBlendMode: 'screen',
                  }}
                />
                {/* Sweep scan band */}
                <motion.div
                  className="absolute left-0 right-0 h-px"
                  style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                />
              </div>
              {/* Bottom plaque */}
              <div
                className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-sm ${MONO} text-[8px] whitespace-nowrap`}
                style={{
                  color: accent,
                  background: 'rgba(0, 8, 20, 0.9)',
                  border: `1px solid ${accent}66`,
                  boxShadow: `0 0 10px ${accent}55`,
                }}
              >
                Subject · {PERSON.shortName.toUpperCase()}.B
              </div>
            </div>
          </div>

          {/* METADATA PANEL */}
          <div className="flex flex-col gap-5">
            {/* Name + designation */}
            <div>
              <div className={`${MONO} text-[10px] text-jarvis-blue-300/60 mb-1`}>› Designation</div>
              <h2
                className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight"
                style={{
                  background: 'linear-gradient(120deg, #ffffff 0%, #00d4ff 50%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {PERSON.name}
              </h2>
              <p className="font-display text-jarvis-cyan/85 text-sm sm:text-base mt-1 tracking-wide">
                {PERSON.title}
              </p>
            </div>

            {/* 2-column grid: location/contact + quick stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {/* Coordinates */}
              <div>
                <div className={`${MONO} text-[10px] text-jarvis-blue-300/60 mb-1 inline-flex items-center gap-1.5`}>
                  <MapPin className="w-3 h-3" /> Coordinates
                </div>
                <div className="font-mono text-sm text-gray-100 tracking-wide">37.7749°N · 122.4194°W</div>
                <div className="font-mono text-[11px] text-gray-400">{PERSON.location}</div>
              </div>

              {/* Status */}
              <div>
                <div className={`${MONO} text-[10px] text-jarvis-blue-300/60 mb-1`}>› Status</div>
                <div className="font-mono text-sm text-emerald-300 tracking-wide inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-corner-pulse" />
                  Available for new engagements
                </div>
              </div>

              {/* Contact */}
              <div className="sm:col-span-2">
                <div className={`${MONO} text-[10px] text-jarvis-blue-300/60 mb-1.5`}>› Contact Channels</div>
                <div className="flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[12px] text-gray-200">
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-jarvis-cyan/70" /> {PERSON.email}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-jarvis-cyan/70" /> {PERSON.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {QUICK_STATS.map(s => (
                <div
                  key={s.label}
                  className="relative px-3 py-2 rounded-sm overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${accent}10 0%, rgba(0, 8, 20, 0.45) 100%)`,
                    border: `1px solid ${accent}33`,
                  }}
                >
                  <div className="font-mono text-base sm:text-lg font-bold leading-none tracking-wider" style={{ color: accent, textShadow: `0 0 6px ${accent}55` }}>
                    {s.value}
                  </div>
                  <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-gray-400 mt-1.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Social uplinks */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { href: PERSON.links.linkedin, icon: FaLinkedin, label: 'LinkedIn' },
                { href: PERSON.links.github, icon: FaGithub, label: 'GitHub' },
                { href: PERSON.links.twitter, icon: FaXTwitter, label: 'X' },
              ].map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm font-mono text-[10px] tracking-[0.25em] uppercase transition-all hover:bg-jarvis-cyan/10"
                  style={{
                    color: accent,
                    border: `1px solid ${accent}44`,
                    backgroundColor: `${accent}08`,
                  }}
                >
                  <Icon className="w-3 h-3" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </HUDFrame>
    </motion.div>
  );
}
