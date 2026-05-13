'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Github, ExternalLink, ChevronDown } from 'lucide-react';
import HUDFrame from '@/components/ui/HUDFrame';
import ProjectSchematic from '@/components/ProjectSchematic';
import type { Project } from '@/data/projects';
import {
  classificationFor,
  statusFor,
  keyMetricFor,
  fileNumberFor,
  schematicFor,
} from '@/lib/projectDomain';

interface Props {
  project: Project;
  index: number;
}

export default function ProjectArchiveCard({ project, index }: Props) {
  const [expanded, setExpanded] = useState(false);
  const status = statusFor(project);
  const classification = classificationFor(project);
  const metric = keyMetricFor(project);
  const fileNum = fileNumberFor(index);
  const accent = classification.accent;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <HUDFrame accent={accent} cornerSize={14} showScan className="bg-jarvis-dark-700/70 backdrop-blur-md h-full flex flex-col overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${accent}10 0%, rgba(0, 8, 20, 0.55) 100%)` }}
        />

        {/* TOP METADATA BAR */}
        <div className="relative px-4 py-2 border-b border-white/5 flex items-center justify-between font-mono text-[9px] tracking-[0.3em] uppercase">
          <span style={{ color: accent, opacity: 0.85 }}>
            › {fileNum}
          </span>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5" style={{ color: status.accent }}>
              <span className="relative flex h-1.5 w-1.5">
                {project.featured && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: status.accent }} />
                )}
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: status.accent }} />
              </span>
              {status.label}
            </span>
            <span className="text-jarvis-blue-300/40">·</span>
            <span style={{ color: accent }}>class::{classification.tier}</span>
          </div>
        </div>

        {/* SCHEMATIC — replaces the photographic hero image */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-jarvis-dark-800">
          <ProjectSchematic type={schematicFor(project)} accent={accent} />
          {/* Decorative corner brackets only (no text — internal SVG labels handle that) */}
          <span className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-l border-t z-10" style={{ borderColor: accent }} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-r border-t z-10" style={{ borderColor: accent }} />
          <span className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-l border-b z-10" style={{ borderColor: accent }} />
          <span className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-r border-b z-10" style={{ borderColor: accent }} />
        </div>

        {/* BODY */}
        <div className="relative px-5 py-4 flex flex-col flex-1 gap-3">
          {/* Codename + tagline */}
          <div>
            <h3
              className="font-display text-lg sm:text-xl text-white leading-tight tracking-wide"
            >
              {project.title}
            </h3>
            <p className="text-sm text-gray-300 mt-1 leading-snug">{project.description}</p>
          </div>

          {/* KEY METRIC CALLOUT */}
          {metric && (
            <div
              className="relative px-3 py-2 rounded-sm font-mono"
              style={{
                background: `linear-gradient(135deg, ${accent}1a 0%, transparent 100%)`,
                border: `1px solid ${accent}33`,
              }}
            >
              <div className="text-[9px] tracking-[0.3em] uppercase text-jarvis-blue-300/70 mb-0.5">
                › Key Metric
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-xl sm:text-2xl font-bold leading-none tracking-wider"
                  style={{ color: accent, textShadow: `0 0 12px ${accent}66` }}
                >
                  {metric.value}
                </span>
                <span className="text-[10px] tracking-widest uppercase text-gray-400 leading-tight">
                  {metric.label}
                </span>
              </div>
            </div>
          )}

          {/* DOMAIN TAGS */}
          {project.tags?.length > 0 && (
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-jarvis-blue-300/70">
              <span className="opacity-60">▸ domain: </span>
              <span style={{ color: accent }}>
                {project.tags.slice(0, 4).join(' · ')}
              </span>
            </div>
          )}

          {/* DEPLOYED ASSETS */}
          <div>
            <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-jarvis-blue-300/70 mb-1.5">
              › Deployed Assets
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 8).map(tech => (
                <span
                  key={tech}
                  className="font-mono text-[10px] tracking-wide px-2 py-0.5 rounded-sm border"
                  style={{
                    borderColor: `${accent}33`,
                    backgroundColor: `${accent}0a`,
                    color: 'rgba(229, 231, 235, 0.85)',
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 8 && (
                <span
                  className="font-mono text-[10px] tracking-wide px-2 py-0.5 rounded-sm"
                  style={{ color: 'rgba(229, 231, 235, 0.55)' }}
                >
                  + {project.techStack.length - 8} more
                </span>
              )}
            </div>
          </div>

          {/* EXPANDABLE: ACHIEVEMENTS */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <div className="pt-2">
                  <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-jarvis-blue-300/70 mb-2">
                    › Mission Outcomes
                  </div>
                  <ul className="space-y-1.5">
                    {project.achievements.map((a, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-300 leading-snug">
                        <span
                          className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}` }}
                        />
                        <span className="flex-1">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ACTIONS */}
          <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between gap-2 font-mono text-[10px] tracking-[0.25em] uppercase">
            <button
              onClick={() => setExpanded(v => !v)}
              className="inline-flex items-center gap-1.5 transition-colors"
              style={{ color: accent }}
              aria-expanded={expanded}
            >
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-3 h-3" />
              </motion.span>
              {expanded ? 'Close File' : 'Open File'}
            </button>

            <div className="flex items-center gap-2.5">
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-jarvis-blue-300/70 hover:text-jarvis-cyan transition-colors"
                  aria-label="Open repository"
                >
                  <Github className="w-3 h-3" /> Repo
                </Link>
              )}
              {project.demo && (
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-jarvis-blue-300/70 hover:text-jarvis-cyan transition-colors"
                  aria-label="Open demo"
                >
                  <ExternalLink className="w-3 h-3" /> Live
                </Link>
              )}
            </div>
          </div>
        </div>
      </HUDFrame>
    </motion.article>
  );
}
