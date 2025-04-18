'use client';

import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 max-w-lg mx-auto bg-jarvis-dark-600 p-6 rounded-lg shadow-jarvis-glow"
          >
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-display text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full mt-1 p-2 bg-jarvis-dark-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-jarvis-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-display text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full mt-1 p-2 bg-jarvis-dark-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-jarvis-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-display text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full mt-1 p-2 bg-jarvis-dark-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-jarvis-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-jarvis-blue-500 text-white py-2 rounded-md hover:bg-jarvis-blue-600 transition-colors animate-pulse-glow"
              >
                Send Message
              </button>
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex justify-center space-x-6"
          >
            <Link href="https://linkedin.com/in/nikhilbindal" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-jarvis-blue-500">
              <FaLinkedin size={24} />
            </Link>
            <Link href="https://github.com/nikhilbindal" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-jarvis-blue-500">
              <FaGithub size={24} />
            </Link>
            <Link href="https://twitter.com/nikhilbindal" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-jarvis-blue-500">
              <FaTwitter size={24} />
            </Link>
            <Link href="mailto:nikhilbindal@example.com" className="text-gray-300 hover:text-jarvis-blue-500">
              <FaEnvelope size={24} />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}