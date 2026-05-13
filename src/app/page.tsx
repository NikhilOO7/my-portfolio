// src/app/page.tsx
'use client';

import Button from '@/components/Button';
import EnhancedServicesSection from '@/components/ServicesSection';
import EnhancedFeaturedProjectsSection from '@/components/FeaturedProjectSection';
import BuyMeCoffeeButton from '@/components/BuyMeCoffeeButton';
import DataReadout from '@/components/ui/DataReadout';
import HUDFrame from '@/components/ui/HUDFrame';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowDown, Sparkles } from 'lucide-react';

const roles = [
  'AI Infrastructure Engineer',
  'Full-Stack Engineer',
  'Distributed Systems Architect',
  'Voice & RAG Specialist',
];

const specialties = [
  { label: 'AI Infrastructure', color: '#00d4ff' },
  { label: 'Real-Time Voice & RAG', color: '#06b6d4' },
  { label: 'Distributed Backends', color: '#1976ff' },
  { label: 'Agentic Systems', color: '#fbbf24' },
];

const heroStats = [
  { value: '6+ YRS', label: 'shipping production', accent: '#00d4ff' },
  { value: '73%', label: 'AI latency cut', accent: '#06b6d4' },
  { value: '22K TPS', label: 'event throughput', accent: '#1976ff' },
  { value: '<200MS', label: 'voice latency', accent: '#fbbf24' },
];

const quotes = [
  "Code is like humor: when you have to explain it, it's bad. – Cory House",
  "Programming isn't about what you know; it's about what you can figure out. – Chris Pine",
  "The only way to learn a new programming language is by writing programs in it. – Dennis Ritchie",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. – Martin Fowler",
  "I'm not a great programmer; I'm just a good programmer with great habits. – Kent Beck",
  "First, solve the problem. Then, write the code. – John Johnson",
  "Debugging is twice as hard as writing the code in the first place. – Brian Kernighan",
  "Talk is cheap. Show me the code. – Linus Torvalds",
];

export default function Home() {
  const [greeting, setGreeting] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const servicesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      setGreeting(hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening');
    };
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % quotes.length);
    }, 5500);
    return () => clearInterval(quoteTimer);
  }, []);

  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(roleTimer);
  }, []);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center px-4"
    >
      <div className="min-h-[calc(100vh-84px)] w-full flex flex-col items-center justify-center relative overflow-hidden">
        <div className="relative pt-12 pb-12 w-full max-w-5xl mx-auto z-10">
          {/* Identification header — JARVIS scan */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-6 font-mono"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-sm border border-emerald-500/30 bg-emerald-500/[0.04] text-emerald-300 text-[10px] sm:text-xs tracking-[0.35em] uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>Identity Verified · SF</span>
              <span className="opacity-50">·</span>
              <span className="text-jarvis-gold-400">Avail::TRUE</span>
            </div>
          </motion.div>

          {/* Greeting with chevrons */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[10px] sm:text-xs font-mono tracking-[0.4em] text-jarvis-blue-400 uppercase mb-3"
          >
            <span className="opacity-60">›</span> {greeting} — I am <span className="opacity-60">‹</span>
          </motion.p>

          {/* Name with HUD frame and gradient */}
          <div className="relative inline-block px-8 py-2">
            <motion.span
              className="hidden sm:block absolute -left-1 top-0 text-jarvis-cyan/60 text-2xl font-mono animate-corner-pulse"
              aria-hidden
            >
              ⌜
            </motion.span>
            <motion.span
              className="hidden sm:block absolute -right-1 top-0 text-jarvis-cyan/60 text-2xl font-mono animate-corner-pulse"
              aria-hidden
            >
              ⌝
            </motion.span>
            <motion.span
              className="hidden sm:block absolute -left-1 bottom-0 text-jarvis-cyan/60 text-2xl font-mono animate-corner-pulse"
              aria-hidden
            >
              ⌞
            </motion.span>
            <motion.span
              className="hidden sm:block absolute -right-1 bottom-0 text-jarvis-cyan/60 text-2xl font-mono animate-corner-pulse"
              aria-hidden
            >
              ⌟
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight animate-gradient-shift animate-title-glow"
              style={{
                backgroundImage: 'linear-gradient(120deg, #ffffff 0%, #00d4ff 35%, #fbbf24 70%, #00d4ff 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Nikhil Bindal
            </motion.h1>
          </div>

          {/* Rotating role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-4 h-10 sm:h-12 flex items-center justify-center font-mono"
          >
            <AnimatePresence mode="wait">
              <motion.h2
                key={roleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-lg sm:text-xl lg:text-2xl font-light text-gray-200 tracking-[0.15em] uppercase"
              >
                <span className="text-jarvis-cyan/60 mr-2">//</span>
                {roles[roleIndex]}
                <span className="inline-block w-2 h-4 bg-jarvis-cyan ml-2 animate-blink align-middle" />
              </motion.h2>
            </AnimatePresence>
          </motion.div>

          {/* Specialty chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-6 flex flex-wrap justify-center gap-2"
          >
            {specialties.map((s, i) => (
              <motion.span
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
                className="text-[10px] sm:text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-sm border"
                style={{
                  borderColor: `${s.color}55`,
                  backgroundColor: `${s.color}10`,
                  color: s.color,
                }}
              >
                <span className="opacity-50 mr-1.5">▸</span>{s.label}
              </motion.span>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-6 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Architecting production AI systems — multi-agent pipelines, real-time voice, and distributed backends — for teams shipping at scale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-8 flex justify-center space-x-4 flex-wrap gap-y-3"
          >
            <Link href="/projects">
              <Button variant="primary" className="shadow-jarvis-glow">
                Explore Projects
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary">Hire Me</Button>
            </Link>
            <BuyMeCoffeeButton />
          </motion.div>

          {/* Stat strip — JARVIS readouts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto"
          >
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 + i * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <HUDFrame accent={stat.accent}>
                  <div
                    className="relative rounded-sm px-3 py-4 overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${stat.accent}10 0%, rgba(0, 8, 20, 0.5) 100%)`,
                      borderTop: `1px solid ${stat.accent}22`,
                      borderBottom: `1px solid ${stat.accent}22`,
                    }}
                  >
                    <div
                      className="absolute -top-6 -right-6 w-16 h-16 rounded-full blur-2xl opacity-30"
                      style={{ backgroundColor: stat.accent }}
                    />
                    <div className="relative">
                      <DataReadout
                        value={stat.value}
                        label={stat.label}
                        accent={stat.accent}
                        scrambleDuration={1100 + i * 200}
                      />
                    </div>
                  </div>
                </HUDFrame>
              </motion.div>
            ))}
          </motion.div>

          {/* Hint + quote */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.9 }}
            className="mt-12 text-xs sm:text-sm text-gray-500 inline-flex items-center gap-2 font-mono uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5 text-jarvis-cyan" />
            Try: "Show me your skills" via the assistant
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={quoteIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mt-6 text-sm sm:text-base text-gray-400 italic max-w-2xl mx-auto"
            >
              "{quotes[quoteIndex]}"
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5] }}
          transition={{ duration: 1.5, delay: 2.2, repeat: Infinity, repeatType: 'loop' }}
          className="relative z-10 text-jarvis-cyan text-2xl cursor-pointer mt-6 hover:text-jarvis-gold-400 transition-colors"
          onClick={scrollToServices}
          aria-label="Scroll to services"
        >
          <ArrowDown className="w-7 h-7" />
        </motion.button>
      </div>

      <div ref={servicesRef} className="w-full">
        <EnhancedServicesSection />
      </div>

      <EnhancedFeaturedProjectsSection />
    </motion.main>
  );
}
