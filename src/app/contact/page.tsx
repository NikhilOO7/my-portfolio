'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Placeholder API call (replace with your backend endpoint)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-display text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 bg-jarvis-dark-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-jarvis-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-jarvis-blue-500 text-white py-2 rounded-md hover:bg-jarvis-blue-600 transition-colors animate-pulse-glow disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            {submitStatus && (
              <p className={`mt-4 text-sm text-center ${submitStatus.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                {submitStatus}
              </p>
            )}
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