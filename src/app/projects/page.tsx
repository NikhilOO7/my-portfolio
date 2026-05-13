'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderOpen, Brain, Mic, ChartScatter, DollarSign, Activity,
  Layers, Server, Crosshair,
} from 'lucide-react';
import Button from '@/components/Button';
import SectionHeader from '@/components/ui/SectionHeader';
import PanelHeader from '@/components/ui/PanelHeader';
import HUDFrame from '@/components/ui/HUDFrame';
import ProjectArchiveCard from '@/components/ProjectArchiveCard';
import { projects } from '@/data/projects';
import { DOMAINS, filterProjectsByDomain, type DomainId } from '@/lib/projectDomain';

const DOMAIN_ICONS: Record<DomainId, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  all: FolderOpen,
  ai: Brain,
  'voice-rag': Mic,
  'ml-data': ChartScatter,
  fintech: DollarSign,
  'real-time': Activity,
  fullstack: Layers,
  backend: Server,
};

export default function Projects() {
  const [domain, setDomain] = useState<DomainId>('all');

  const filtered = useMemo(() => filterProjectsByDomain(projects, domain), [domain]);
  const totalCount = projects.length;
  const featuredCount = projects.filter(p => p.featured).length;

  // Per-domain counts for the chips (so the user sees how many records match each filter)
  const domainCounts = useMemo(() => {
    const counts: Record<DomainId, number> = {
      all: totalCount,
      ai: 0, 'voice-rag': 0, 'ml-data': 0, fintech: 0, fullstack: 0, backend: 0, 'real-time': 0,
    };
    for (const d of DOMAINS) {
      if (d.id === 'all') continue;
      counts[d.id] = projects.filter(p => d.match(p)).length;
    }
    return counts;
  }, [totalCount]);

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
            module="Project Archive"
            query="show me his project archive"
            response={[
              'Accessing operational history.',
              `${totalCount} entries available, ${featuredCount} marked featured. Filtering controls online.`,
              'Records sorted by recency. Most recent work involves multi-agent AI infrastructure and real-time voice pipelines.',
            ]}
            accent="#06b6d4"
          />

          <div className="mt-14">
            <SectionHeader
              eyebrow="Operations log"
              title="Mission Archive"
              subtitle="Each file is a shipped operation — voice and RAG platforms, distributed backends, ML pipelines. Click OPEN FILE on any record for mission outcomes."
              gradient="cyan-violet"
              size="xl"
            />
          </div>

          {/* TARGET DOMAIN — filter selector */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-10"
          >
            <HUDFrame accent="#06b6d4" cornerSize={14} showScan className="bg-jarvis-dark-700/70 backdrop-blur-md p-5 sm:p-6">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.06) 0%, rgba(0, 8, 20, 0.55) 100%)' }}
              />
              <div className="relative">
                {/* Header row: title + active filter readout */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-jarvis-cyan/15">
                  <div className="flex items-center gap-3 font-mono uppercase">
                    <Crosshair className="w-4 h-4 text-jarvis-cyan" />
                    <span className="text-[10px] tracking-[0.4em] text-jarvis-blue-300/60">› Target Domain</span>
                    <span className="text-[10px] tracking-[0.4em] text-jarvis-blue-300/40">·</span>
                    {(() => {
                      const active = DOMAINS.find(d => d.id === domain);
                      if (!active) return null;
                      return (
                        <span
                          className="text-xs sm:text-sm tracking-[0.3em] font-semibold inline-flex items-center gap-1.5"
                          style={{ color: active.accent, textShadow: `0 0 10px ${active.accent}66` }}
                        >
                          {active.label}
                        </span>
                      );
                    })()}
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase">
                    <span className="text-jarvis-blue-300/50">Records</span>
                    <span className="text-jarvis-cyan tabular-nums text-base font-bold" style={{ textShadow: '0 0 8px rgba(0, 212, 255, 0.6)' }}>
                      {String(filtered.length).padStart(2, '0')}
                    </span>
                    <span className="text-jarvis-blue-300/40">/</span>
                    <span className="text-jarvis-blue-300/70 tabular-nums">{String(totalCount).padStart(2, '0')}</span>
                  </div>
                </div>

                {/* Domain chip grid — icon + label + count, always-visible accent */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                  {DOMAINS.map(d => {
                    const active = domain === d.id;
                    const count = domainCounts[d.id];
                    const disabled = count === 0;
                    const Icon = DOMAIN_ICONS[d.id];
                    return (
                      <motion.button
                        key={d.id}
                        onClick={() => setDomain(d.id)}
                        disabled={disabled}
                        whileHover={!disabled ? { y: -2 } : undefined}
                        whileTap={!disabled ? { scale: 0.97 } : undefined}
                        className="group relative font-mono px-3 py-2.5 rounded-sm border transition-all disabled:opacity-30 disabled:cursor-not-allowed text-left overflow-hidden"
                        style={
                          active
                            ? {
                                borderColor: d.accent,
                                backgroundColor: `${d.accent}22`,
                                boxShadow: `0 0 14px ${d.accent}66, inset 0 0 18px ${d.accent}22`,
                              }
                            : {
                                borderColor: `${d.accent}33`,
                                backgroundColor: `${d.accent}0a`,
                              }
                        }
                      >
                        {/* Active scan line */}
                        {active && (
                          <motion.span
                            className="absolute left-0 right-0 h-px pointer-events-none"
                            style={{ background: d.accent, top: 0, boxShadow: `0 0 6px ${d.accent}` }}
                            animate={{ top: ['-2%', '102%'] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                          />
                        )}

                        <div className="relative flex items-center gap-2 mb-1">
                          <Icon
                            className="w-3.5 h-3.5"
                            style={{ color: d.accent, opacity: active ? 1 : 0.7 }}
                          />
                          <span
                            className="text-[10px] tracking-[0.2em] uppercase truncate"
                            style={{
                              color: active ? d.accent : 'rgba(229, 231, 235, 0.88)',
                              textShadow: active ? `0 0 8px ${d.accent}66` : 'none',
                            }}
                          >
                            {d.label}
                          </span>
                        </div>

                        <div className="relative flex items-baseline justify-between">
                          <span
                            className="text-[8px] tracking-[0.3em] uppercase"
                            style={{ color: active ? d.accent : 'rgba(148, 163, 184, 0.7)', opacity: 0.7 }}
                          >
                            records
                          </span>
                          <span
                            className="text-base font-bold tabular-nums leading-none"
                            style={{
                              color: d.accent,
                              opacity: active ? 1 : 0.85,
                              textShadow: active ? `0 0 8px ${d.accent}` : 'none',
                            }}
                          >
                            {String(count).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Active indicator dot */}
                        {active && (
                          <span
                            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                            style={{ background: d.accent, boxShadow: `0 0 6px ${d.accent}` }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </HUDFrame>
          </motion.div>

          {/* ARCHIVE GRID */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={domain}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid gap-6 md:gap-7 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
              >
                {filtered.map((project, i) => (
                  <ProjectArchiveCard key={project.id} project={project} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="mt-12 text-center font-mono text-sm text-jarvis-blue-300/60 tracking-[0.25em] uppercase">
                ◇ No records match these scan parameters.
              </div>
            )}
          </div>

          {/* TRANSMISSION END footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-14 mb-6 flex items-center justify-center gap-3 font-mono text-[10px] tracking-[0.4em] uppercase text-jarvis-blue-300/60"
          >
            <span className="h-px flex-1 max-w-[180px] bg-gradient-to-r from-transparent to-jarvis-cyan/30" />
            <span>◇ end of archive · {totalCount} records served</span>
            <span className="h-px flex-1 max-w-[180px] bg-gradient-to-l from-transparent to-jarvis-cyan/30" />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-2 flex justify-center"
          >
            <motion.div
              animate={{ boxShadow: '0 0 10px rgba(25, 118, 255, 0.3), 0 0 20px rgba(0, 212, 255, 0.3)' }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            >
              <Button
                variant="secondary"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 12px rgba(25, 118, 255, 0.5), 0 0 24px rgba(0, 212, 255, 0.3)',
                  backgroundColor: '#00b7eb',
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/contact'}
              >
                Have a project in mind?
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
