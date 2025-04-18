'use client';

import { motion } from 'framer-motion';
import Button from './Button';
import Link from 'next/link';

export default function ServicesSection() {
  const services = [
    {
      title: 'Full-Stack Development',
      description: 'End-to-end solutions with modern frameworks like React, Next.js, and Node.js.',
      tags: ['Web Apps', 'APIs', 'Performance'],
    },
    {
      title: 'AI Solutions',
      description: 'Custom AI models for automation, chatbots, and content generation using LLMs.',
      tags: ['Machine Learning', 'NLP', 'Automation'],
    },
    {
      title: 'Consulting & Strategy',
      description: 'Expert guidance on tech strategy, architecture, and AI integration.',
      tags: ['Advisory', 'Architecture', 'Innovation'],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full mt-16 mb-16"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        className="text-3xl sm:text-4xl font-bold text-jarvis-blue-500 animate-pulse-glow leading-tight text-center mb-12"
      >
        Services I Offer
      </motion.h2>
      <div className="max-w-7xl mx-auto px-4 grid gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-jarvis-dark-400 rounded-lg p-6 shadow-jarvis-glow animate-float-smooth h-[220px] flex flex-col justify-between border border-jarvis-blue-500/30 hover:border-jarvis-blue-500 hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(25, 118, 255, 0.7)' }}
          >
            <div className="flex flex-col">
              <h3 className="text-xl font-display text-jarvis-blue-500 font-semibold">{service.title}</h3>
              <p className="mt-3 text-gray-200 font-display text-sm min-h-[48px] line-clamp-2 overflow-hidden">
                {service.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-display text-gray-200 bg-jarvis-dark-600 px-3 py-1 rounded-full border border-jarvis-blue-600/30 hover:bg-jarvis-blue-600/20 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <Link href="/contact">
                <Button variant="outline" size="sm">
                  Inquire
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}