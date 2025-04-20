'use client';

import { motion } from 'framer-motion';
import EnhancedContactForm from '@/components/EnhancedContactForm';

export default function Contact() {
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
            Contact Me
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-4 text-center text-gray-300 max-w-2xl mx-auto"
          >
            Interested in working together? Have a project in mind or just want to connect?
            Drop me a message and I'll get back to you as soon as possible.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12"
          >
            <EnhancedContactForm />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 bg-jarvis-dark-600 p-6 rounded-lg shadow-jarvis-glow max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-display text-jarvis-blue-500 mb-4 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4 mt-6">
              <div>
                <h3 className="text-xl font-display text-white mb-2">What are your rates?</h3>
                <p className="text-gray-300">My rates vary depending on the project scope, timeline, and complexity. I'm happy to discuss your specific needs and provide a custom quote.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-display text-white mb-2">What is your availability?</h3>
                <p className="text-gray-300">I'm currently available for new projects and opportunities. My typical response time is within 24-48 hours, and I can usually start new projects within 1-2 weeks.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-display text-white mb-2">Do you work remotely?</h3>
                <p className="text-gray-300">Yes, I work remotely with clients globally. I'm based in Boston, MA (EST timezone) but can accommodate different time zones for meetings and collaboration.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-display text-white mb-2">What technologies do you specialize in?</h3>
                <p className="text-gray-300">I specialize in React, Next.js, Node.js, Python, and AI technologies like LLMs and RAG. I'm comfortable with a range of cloud platforms including AWS and GCP.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}