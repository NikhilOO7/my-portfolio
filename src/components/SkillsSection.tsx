'use client';

import Button from '@/components/Button';
import { motion } from 'framer-motion';

export default function SkillsSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-jarvis-blue-500 animate-pulse-glow leading-tight text-center"
        >
          Skills
        </motion.h1>
        {/* Add skill grid here */}
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
    </motion.div>
  );
}