'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';

export default function Writings() {
  const writings = [
    {
      title: 'Fine-Tuning LLMs for Content Generation',
      date: 'April 2024',
      link: 'https://example.com/paper1',
    },
    {
      title: 'Building Real-Time Collaboration Tools',
      date: 'June 2023',
      link: 'https://example.com/blog1',
    },
    {
      title: 'Introduction to NLP in Chatbots',
      date: 'January 2023',
      link: 'https://example.com/blog2',
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
            Writings
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 space-y-8"
          >
            {writings.map((writing, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-jarvis-dark-600 p-6 rounded-lg shadow-jarvis-glow"
              >
                <h3 className="text-xl font-display text-jarvis-blue-500">{writing.title}</h3>
                <p className="text-sm text-gray-400 mt-2">{writing.date}</p>
                <a
                  href={writing.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-jarvis-blue-500 hover:text-jarvis-blue-300"
                >
                  Read More
                </a>
              </motion.div>
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