'use client';

import { motion } from 'framer-motion';

export default function ExperienceSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-12"
    >
      <h3 className="text-2xl font-display text-jarvis-blue-500 text-center mb-8">Experience</h3>
      <div className="relative border-l-2 border-jarvis-blue-500 ml-4 sm:ml-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center"
        >
          <span className="absolute -left-3 w-6 h-6 bg-jarvis-blue-500 rounded-full animate-pulse-glow" />
          <div className="ml-8">
            <p className="text-sm text-gray-400">2021 - Present</p>
            <p className="text-lg text-gray-200">Senior AI Engineer at TechCorp</p>
            <p className="text-gray-300">Led development of AI-driven solutions, including chatbots and content generation tools.</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex items-center"
        >
          <span className="absolute -left-3 w-6 h-6 bg-jarvis-blue-500 rounded-full animate-pulse-glow" />
          <div className="ml-8">
            <p className="text-sm text-gray-400">2019 - 2021</p>
            <p className="text-lg text-gray-200">Software Developer at InnovateLabs</p>
            <p className="text-gray-300">Developed full-stack web applications with React and Node.js.</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 flex items-center"
        >
          <span className="absolute -left-3 w-6 h-6 bg-jarvis-blue-500 rounded-full animate-pulse-glow" />
          <div className="ml-8">
            <p className="text-sm text-gray-400">2018 - 2019</p>
            <p className="text-lg text-gray-200">Junior Developer at StartUpX</p>
            <p className="text-gray-300">Built and maintained web applications, focusing on frontend development.</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}