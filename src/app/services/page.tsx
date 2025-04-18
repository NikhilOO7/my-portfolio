'use client';

import Button from '@/components/Button';
import Card from '@/components/Card';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Services() {
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
            Services
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-12"
          >
            <Card
              title="Full-Stack Development"
              description="End-to-end solutions with modern frameworks like React, Next.js, and Node.js."
              tags={['Web Apps', 'APIs', 'Performance']}
            >
              <div className="flex space-x-2">
                <Link href="/contact">
                  <Button variant="outline" size="sm">Inquire</Button>
                </Link>
                <Button variant="outline" size="sm">
                  See Example
                </Button>
              </div>
            </Card>
            <Card
              title="AI Solutions"
              description="Custom AI models for automation, chatbots, and content generation using LLMs."
              tags={['Machine Learning', 'NLP', 'Automation']}
            >
              <div className="flex space-x-2">
                <Link href="/contact">
                  <Button variant="outline" size="sm">Inquire</Button>
                </Link>
                <Button variant="outline" size="sm">
                  See Example
                </Button>
              </div>
            </Card>
            <Card
              title="Consulting & Strategy"
              description="Expert guidance on tech strategy, architecture, and AI integration."
              tags={['Advisory', 'Architecture', 'Innovation']}
            >
              <div className="flex space-x-2">
                <Link href="/contact">
                  <Button variant="outline" size="sm">Inquire</Button>
                </Link>
                <Button variant="outline" size="sm">
                  See Example
                </Button>
              </div>
            </Card>
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