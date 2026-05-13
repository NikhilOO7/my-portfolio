'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import SectionHeader from '@/components/ui/SectionHeader';
import HUDFrame from '@/components/ui/HUDFrame';
import RadialGauge from '@/components/ui/RadialGauge';
import {
  SiReact, SiNodedotjs, SiPython, SiTypescript, SiAmazonwebservices,
  SiGooglecloud, SiDocker, SiKubernetes, SiPostgresql,
  SiFastapi, SiRedis, SiApachekafka, SiPrometheus, SiJenkins,
  SiClaude, SiGithubcopilot, SiGit, SiPostman, SiGooglechrome,
  SiJupyter,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { BsCodeSlash, BsDatabaseGear } from 'react-icons/bs';
import { Wrench, Sparkles, Cpu, Terminal } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  category: 'development' | 'infrastructure' | 'ai' | 'tools';
}

const categoryAccents: Record<string, string> = {
  all: '#3b82f6',
  development: '#3b82f6',
  infrastructure: '#f59e0b',
  ai: '#a855f7',
  tools: '#06b6d4',
};

const tierFor = (level: number) => {
  if (level >= 90) return 'Expert';
  if (level >= 80) return 'Advanced';
  if (level >= 65) return 'Intermediate';
  return 'Familiar';
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Skills' },
    { id: 'development', name: 'Development' },
    { id: 'infrastructure', name: 'Infrastructure' },
    { id: 'ai', name: 'AI / LLM' },
    { id: 'tools', name: 'Tools' },
  ];

  const skills: Skill[] = [
    // Development — core engineering toolkit
    { name: 'Python', level: 95, icon: <SiPython size={22} />, category: 'development' },
    { name: 'FastAPI', level: 90, icon: <SiFastapi size={22} />, category: 'development' },
    { name: 'Node.js', level: 90, icon: <SiNodedotjs size={22} />, category: 'development' },
    { name: 'TypeScript', level: 85, icon: <SiTypescript size={22} />, category: 'development' },
    { name: 'React', level: 85, icon: <SiReact size={22} />, category: 'development' },
    { name: 'PostgreSQL', level: 90, icon: <SiPostgresql size={22} />, category: 'development' },
    { name: 'Redis', level: 85, icon: <SiRedis size={22} />, category: 'development' },
    { name: 'REST APIs', level: 95, icon: <BsCodeSlash size={22} />, category: 'development' },

    // Infrastructure
    { name: 'GCP', level: 90, icon: <SiGooglecloud size={22} />, category: 'infrastructure' },
    { name: 'AWS', level: 85, icon: <SiAmazonwebservices size={22} />, category: 'infrastructure' },
    { name: 'Docker', level: 90, icon: <SiDocker size={22} />, category: 'infrastructure' },
    { name: 'Kubernetes', level: 85, icon: <SiKubernetes size={22} />, category: 'infrastructure' },
    { name: 'Kafka', level: 85, icon: <SiApachekafka size={22} />, category: 'infrastructure' },
    { name: 'Prometheus', level: 80, icon: <SiPrometheus size={22} />, category: 'infrastructure' },
    { name: 'CI/CD', level: 85, icon: <SiJenkins size={22} />, category: 'infrastructure' },

    // AI / LLM
    { name: 'Agentic Workflows', level: 95, icon: <GiArtificialIntelligence size={22} />, category: 'ai' },
    { name: 'RAG Systems', level: 95, icon: <GiArtificialIntelligence size={22} />, category: 'ai' },
    { name: 'CrewAI', level: 90, icon: <GiArtificialIntelligence size={22} />, category: 'ai' },
    { name: 'LangGraph', level: 85, icon: <GiArtificialIntelligence size={22} />, category: 'ai' },
    { name: 'LangChain', level: 85, icon: <GiArtificialIntelligence size={22} />, category: 'ai' },
    { name: 'LlamaIndex', level: 85, icon: <GiArtificialIntelligence size={22} />, category: 'ai' },
    { name: 'GPT-4o', level: 90, icon: <GiArtificialIntelligence size={22} />, category: 'ai' },
    { name: 'Gemini', level: 85, icon: <GiArtificialIntelligence size={22} />, category: 'ai' },
    { name: 'Qdrant', level: 85, icon: <BsDatabaseGear size={22} />, category: 'ai' },

    // Tools — AI / Dev tooling
    { name: 'Claude Code', level: 95, icon: <SiClaude size={22} />, category: 'tools' },
    { name: 'Cursor', level: 90, icon: <Sparkles size={22} />, category: 'tools' },
    { name: 'GitHub Copilot', level: 90, icon: <SiGithubcopilot size={22} />, category: 'tools' },
    { name: 'VS Code', level: 95, icon: <VscVscode size={22} />, category: 'tools' },
    { name: 'Git', level: 95, icon: <SiGit size={22} />, category: 'tools' },
    { name: 'Postman', level: 90, icon: <SiPostman size={22} />, category: 'tools' },
    { name: 'Chrome DevTools', level: 85, icon: <SiGooglechrome size={22} />, category: 'tools' },
    { name: 'Jupyter', level: 85, icon: <SiJupyter size={22} />, category: 'tools' },
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'development': return <Terminal className="w-4 h-4 mr-2" />;
      case 'infrastructure': return <Cpu className="w-4 h-4 mr-2" />;
      case 'ai': return <GiArtificialIntelligence className="w-4 h-4 mr-2" />;
      case 'tools': return <Wrench className="w-4 h-4 mr-2" />;
      default: return null;
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-jarvis-dark-500 text-white relative font-display overflow-x-hidden z-10 pt-16"
    >
      <section className="py-20 sm:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What I work with"
            title="Skills & Tooling"
            subtitle="A focused toolkit refined across fintech, media, research, and AI startups — the stack I reach for most."
            gradient="blue-cyan"
            size="xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex justify-center flex-wrap gap-2"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              const accent = categoryAccents[category.id];
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="text-sm font-display flex items-center px-4 py-2 rounded-md border transition-all"
                  style={
                    isActive
                      ? {
                          borderColor: accent,
                          backgroundColor: `${accent}1a`,
                          color: accent,
                          boxShadow: `0 0 12px ${accent}55, 0 0 24px ${accent}33`,
                        }
                      : {
                          borderColor: 'rgba(148, 163, 184, 0.2)',
                          color: 'rgb(203, 213, 225)',
                        }
                  }
                >
                  {getCategoryIcon(category.id)}
                  {category.name}
                </button>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          >
            {filteredSkills.map((skill, index) => {
              const accent = categoryAccents[skill.category];
              const tier = tierFor(skill.level);
              return (
                <motion.div
                  key={`${skill.category}-${skill.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.6) }}
                  whileHover={{ y: -4 }}
                >
                  <HUDFrame accent={accent} cornerSize={10} className="p-4 sm:p-5 h-full">
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, ${accent}10 0%, rgba(0, 8, 20, 0.55) 100%)`,
                      }}
                    />
                    <div className="relative flex items-center justify-between mb-2 font-mono">
                      <span
                        className="w-7 h-7 rounded-sm flex items-center justify-center"
                        style={{ backgroundColor: `${accent}1a`, color: accent, border: `1px solid ${accent}33` }}
                      >
                        {skill.icon}
                      </span>
                      <span
                        className="text-[8px] tracking-[0.25em] uppercase"
                        style={{ color: accent, opacity: 0.7 }}
                      >
                        ID·{String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="relative flex flex-col items-center">
                      <RadialGauge
                        value={skill.level}
                        label={skill.name}
                        tier={tier}
                        accent={accent}
                        size={120}
                      />
                    </div>
                  </HUDFrame>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 flex justify-center"
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
                Let's Build Together
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
