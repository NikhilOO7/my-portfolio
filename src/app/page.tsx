// src/app/page.tsx
'use client';

import EnhancedServicesSection from '@/components/ServicesSection';
import EnhancedFeaturedProjectsSection from '@/components/FeaturedProjectSection';
import JarvisConsole from '@/components/JarvisConsole';
import LiveMissionSection from '@/components/LiveMissionSection';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export default function Home() {
  const briefingsRef = useRef<HTMLDivElement | null>(null);

  const scrollToBriefings = () => {
    briefingsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-stretch px-4"
    >
      {/* JARVIS CONSOLE — primary interface */}
      <div className="min-h-[calc(100vh-84px)] w-full flex flex-col items-center justify-start relative">
        <div className="relative w-full max-w-4xl mx-auto pt-6 sm:pt-8 pb-6 z-10">
          <JarvisConsole />
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0.3] }}
          transition={{ duration: 1.5, delay: 3.5, repeat: Infinity, repeatType: 'loop' }}
          className="relative z-10 text-jarvis-cyan/70 mt-6 hover:text-jarvis-gold-400 transition-colors mb-6"
          onClick={scrollToBriefings}
          aria-label="Scroll to prepared briefings"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.button>
      </div>

      {/* PREPARED BRIEFINGS — JARVIS-curated info below the fold */}
      <div ref={briefingsRef} className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-4"
        >
          <div className="flex items-center justify-center gap-3 font-mono text-[10px] sm:text-xs tracking-[0.4em] uppercase text-jarvis-cyan/70">
            <span className="h-px flex-1 max-w-[160px] bg-gradient-to-r from-transparent to-jarvis-cyan/40" />
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-jarvis-cyan animate-corner-pulse" />
              Prepared Briefings · Curated by J.A.R.V.I.S
            </span>
            <span className="h-px flex-1 max-w-[160px] bg-gradient-to-l from-transparent to-jarvis-cyan/40" />
          </div>
        </motion.div>

        <LiveMissionSection />
        <EnhancedServicesSection />
        <EnhancedFeaturedProjectsSection />
      </div>
    </motion.main>
  );
}
