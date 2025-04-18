'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';

export default function Skills() {
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
            Skills
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-12"
          >
            {[
              { name: 'React', level: 90 },
              { name: 'Next.js', level: 85 },
              { name: 'Node.js', level: 80 },
              { name: 'Python', level: 90 },
              { name: 'Machine Learning', level: 75 },
              { name: 'NLP', level: 70 },
              { name: 'AWS', level: 65 },
              { name: 'Docker', level: 60 },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="hexagon relative w-24 h-24 sm:w-32 sm:h-32 mx-auto flex items-center justify-center bg-jarvis-dark-400 shadow-jarvis-glow animate-float-smooth"
                style={{
                  clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
                }}
              >
                <div className="text-center">
                  <p className="text-sm sm:text-base text-gray-200">{skill.name}</p>
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-1 bg-jarvis-blue-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
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