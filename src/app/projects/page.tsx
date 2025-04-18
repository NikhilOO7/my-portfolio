'use client';

import Button from '@/components/Button';
import Card from '@/components/Card';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Projects() {
  const projects = [
    {
      title: 'CollabHub',
      description: 'Real-time team collaboration platform integrating chat, task management, and video conferencing.',
      tags: ['React', 'Node.js', 'WebSockets'],
      thumbnail: '/images/collabhub-thumb.jpg',
      github: 'https://github.com/nikhilbindal/collabhub',
      demo: 'https://collabhub-demo.com',
    },
    {
      title: 'Nexus AI Chatbot',
      description: 'Scalable enterprise chatbot leveraging GPT-4o for customer support automation.',
      tags: ['Python', 'FastAPI', 'LLM', 'VectorDB'],
      thumbnail: '/images/nexus-thumb.jpg',
      github: 'https://github.com/nikhilbindal/nexus-chatbot',
      demo: 'https://nexus-demo.com',
    },
    {
      title: 'Quantum Content Generator',
      description: 'AI-driven blog post and marketing copy generator using Llama 3.1 fine-tuning.',
      tags: ['Next.js', 'Python', 'Llama 3.1', 'Fine-tuning'],
      thumbnail: '/images/quantum-thumb.jpg',
      github: 'https://github.com/nikhilbindal/quantum-content',
      demo: 'https://quantum-demo.com',
    },
  ];

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
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-jarvis-blue-500 animate-pulse-glow leading-tight text-center"
          >
            Projects
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-12"
          >
            {projects.map((project, index) => (
              <Card
                key={index}
                title={project.title}
                description={project.description}
                tags={project.tags}
              >
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={project.thumbnail}
                    alt={`${project.title} thumbnail`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => window.open(project.github, '_blank')}>
                    GitHub
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.open(project.demo, '_blank')}>
                    Demo
                  </Button>
                </div>
              </Card>
            ))}
          </motion.div>
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