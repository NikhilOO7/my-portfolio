'use client';
import { motion } from 'framer-motion';
import { FaCode, FaRobot, FaLightbulb } from 'react-icons/fa';
import { Code, BrainCircuit, Presentation } from 'lucide-react';
import Link from 'next/link';
import Button from './Button';

const serviceCards = [
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    description: 'End-to-end solutions with modern frameworks like React, Next.js, and Node.js.',
    icon: <Code className="w-12 h-12 text-jarvis-blue-500" />,
    tags: ['Web Apps', 'APIs', 'Performance'],
    color: 'from-blue-600/10 to-blue-700/5',
    highlight: 'border-blue-500/30'
  },
  {
    id: 'ai',
    title: 'AI Solutions',
    description: 'Custom AI models for automation, chatbots, and content generation using LLMs.',
    icon: <BrainCircuit className="w-12 h-12 text-jarvis-accent-500" />,
    tags: ['Machine Learning', 'NLP', 'Automation'],
    color: 'from-cyan-600/10 to-cyan-700/5',
    highlight: 'border-cyan-500/30'
  },
  {
    id: 'consulting',
    title: 'Consulting & Strategy',
    description: 'Expert guidance on tech strategy, architecture, and AI integration.',
    icon: <Presentation className="w-12 h-12 text-purple-500" />,
    tags: ['Advisory', 'Architecture', 'Innovation'],
    color: 'from-purple-600/10 to-purple-700/5',
    highlight: 'border-purple-500/30'
  }
];

export default function EnhancedServicesSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl font-bold text-jarvis-blue-500 animate-pulse-glow leading-tight text-center mb-16"
        >
          Services I Offer
        </motion.h2>
        
        <div className="grid gap-10 grid-cols-1 lg:grid-cols-3">
          {serviceCards.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 25px rgba(25, 118, 255, 0.15)'
              }}
              className={`bg-gradient-to-b ${service.color} rounded-xl overflow-hidden shadow-jarvis-glow border ${service.highlight} p-8 flex flex-col`}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-display text-white mb-1">{service.title}</h3>
                </div>
                <div className="rounded-full p-3 bg-jarvis-dark-600/50">
                  {service.icon}
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 flex-grow">{service.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {service.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="text-xs font-display text-gray-200 bg-jarvis-dark-600/50 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <Link href="/contact" className="mt-auto">
                <Button variant="outline" size="sm" className="w-full">
                  Inquire
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}