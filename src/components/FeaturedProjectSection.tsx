'use client';
import { motion } from 'framer-motion';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';
import { projects, featuredProjects } from '@/data/projects';
import ProjectArchiveCard from '@/components/ProjectArchiveCard';
import SectionHeader from '@/components/ui/SectionHeader';

export default function EnhancedFeaturedProjectsSection() {
  // Use each project's index in the full projects list so file numbers
  // (FILE-001 / FILE-007 / etc.) match the Projects archive.
  const featured = featuredProjects.map(p => ({
    project: p,
    index: projects.findIndex(x => x.id === p.id),
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="py-20 bg-jarvis-dark-600/30 w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <SectionHeader
            eyebrow="Selected work"
            title="Featured Projects"
            subtitle="A curated selection of recent production AI systems and full-stack work — each rendered as a JARVIS mission file."
            gradient="cyan-violet"
          />
          <div className="hidden md:flex justify-end mt-6">
            <Link
              href="/projects"
              className="inline-flex items-center text-jarvis-blue-300 hover:text-jarvis-accent-500 transition-colors group font-mono text-[11px] tracking-[0.3em] uppercase"
            >
              <span className="mr-2">View entire archive</span>
              <BsArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:gap-7 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map(({ project, index }) => (
            <ProjectArchiveCard
              key={project.id}
              project={project}
              index={index < 0 ? 0 : index}
            />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center text-jarvis-blue-300 hover:text-jarvis-accent-500 transition-colors font-mono text-[11px] tracking-[0.3em] uppercase"
          >
            <span className="mr-2">View entire archive</span>
            <BsArrowRight />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
