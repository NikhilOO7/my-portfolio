'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import EnhancedProjectCard from '@/components/EnhancedProjectCard';
import Button from '@/components/Button';
import { projects } from '@/data/projects';

export default function Projects() {
  const [filter, setFilter] = useState<string>('all');
  
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'backend', label: 'Backend' },
  ];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => {
        if (filter === 'ai') return project.tags.some(tag => ['AI', 'LLM', 'NLP', 'RAG'].includes(tag));
        if (filter === 'fullstack') return project.techStack.includes('React') && (project.techStack.includes('Node.js') || project.techStack.includes('FastAPI'));
        if (filter === 'backend') return project.techStack.includes('FastAPI') || project.techStack.includes('Node.js') || project.techStack.includes('Java');
        return true;
      });

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-jarvis-dark-500 text-white relative font-display overflow-x-hidden z-10 pt-16"
    >
      <section className="py-20 sm:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-jarvis-blue-500 leading-tight text-center"
          >
            Projects
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mt-8 mb-12 space-x-4 overflow-x-auto py-2"
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={filter === category.id ? "primary" : "outline"}
                size="sm"
                onClick={() => setFilter(category.id)}
                className={filter === category.id ? 'shadow-jarvis-glow animate-pulse-glow' : ''}
              >
                {category.label}
              </Button>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-12"
          >
            {filteredProjects.map((project) => (
              <EnhancedProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                longDescription={project.longDescription}
                tags={project.tags}
                techStack={project.techStack}
                imageUrl={project.imageUrl}
                github={project.github}
                demo={project.demo}
                achievements={project.achievements}
              />
            ))}
          </motion.div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center text-gray-400 mt-12">
              No projects found in this category.
            </div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex justify-center"
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
                Hire Me
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}