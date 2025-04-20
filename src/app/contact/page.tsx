// src/app/contact/page.tsx

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaFacebook, FaInstagram, FaMedium, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Loader2, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import Button from '@/components/Button';
import MapComponent from '@/components/MapComponent';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields');
      setSubmitStatus('error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Send data to backend API
      const response = await axios.post('/api/contact', formData);
      
      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again or contact me directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Clear error when user starts typing again
    if (submitStatus === 'error') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };
  
  const inquiryTypes = [
    { value: '', label: 'Select an inquiry type' },
    { value: 'job', label: 'Job Opportunity' },
    { value: 'project', label: 'Project Inquiry' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'other', label: 'Other' }
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
            Contact Me
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-4 text-center text-gray-300 max-w-2xl mx-auto mb-12"
          >
            Interested in working together? Have a project in mind or just want to connect?
            Drop me a message and I'll get back to you as soon as possible.
          </motion.p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form and Contact Information */}
            <div className="space-y-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-jarvis-dark-600 p-6 rounded-lg shadow-jarvis-glow"
              >
                <h2 className="text-2xl font-display text-jarvis-blue-500 mb-6">Get In Touch</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-display text-gray-300 mb-1">
                      Full Name <span className="text-jarvis-blue-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 bg-jarvis-dark-500 text-white rounded-md border border-jarvis-dark-400 focus:outline-none focus:ring-2 focus:ring-jarvis-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-display text-gray-300 mb-1">
                      Email <span className="text-jarvis-blue-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 bg-jarvis-dark-500 text-white rounded-md border border-jarvis-dark-400 focus:outline-none focus:ring-2 focus:ring-jarvis-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-display text-gray-300 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-2 bg-jarvis-dark-500 text-white rounded-md border border-jarvis-dark-400 focus:outline-none focus:ring-2 focus:ring-jarvis-blue-500 focus:border-transparent"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-display text-gray-300 mb-1">
                      Message <span className="text-jarvis-blue-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={7}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-2 bg-jarvis-dark-500 text-white rounded-md border border-jarvis-dark-400 focus:outline-none focus:ring-2 focus:ring-jarvis-blue-500 focus:border-transparent resize-none"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-jarvis-blue-500 text-white py-2 rounded-md hover:bg-jarvis-blue-600 transition-colors disabled:opacity-50 relative overflow-hidden group flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </button>
                  
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex items-center text-green-500 bg-green-500/10 p-3 rounded-md"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <p>Message sent successfully! I'll get back to you soon.</p>
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex items-center text-red-500 bg-red-500/10 p-3 rounded-md"
                    >
                      <AlertCircle className="w-5 h-5 mr-2" />
                      <p>{errorMessage}</p>
                    </motion.div>
                  )}
                </form>
              </motion.div>
              
              {/* Contact Information - Now under form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-jarvis-dark-600 p-6 rounded-lg shadow-jarvis-glow"
              >
                <h2 className="text-2xl font-display text-jarvis-blue-500 mb-6">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaEnvelope className="w-5 h-5 text-jarvis-blue-500 mt-1 mr-3" />
                    <div>
                      <h3 className="text-lg font-display text-white">Email</h3>
                      <a href="mailto:nikhil.bindal@outlook.com" className="text-gray-300 hover:text-jarvis-blue-500 transition-colors">
                        nikhil.bindal@outlook.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaPhone className="w-5 h-5 text-jarvis-blue-500 mt-1 mr-3" />
                    <div>
                      <h3 className="text-lg font-display text-white">Phone</h3>
                      <a href="tel:+18573135445" className="text-gray-300 hover:text-jarvis-blue-500 transition-colors">
                        (857) 313-5445
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="w-5 h-5 text-jarvis-blue-500 mt-1 mr-3" />
                    <div>
                      <h3 className="text-lg font-display text-white">Location</h3>
                      <p className="text-gray-300">Boston, Massachusetts, USA</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Right Column - Map and Connect With Me */}
            <div className="space-y-8">
              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-jarvis-dark-600 p-6 rounded-lg shadow-jarvis-glow"
              >
                <h2 className="text-2xl font-display text-jarvis-blue-500 mb-4">My Location</h2>
                <div className="h-[300px] rounded-lg overflow-hidden">
                  <MapComponent />
                </div>
                <p className="text-sm text-gray-400 mt-2 text-center">Interactive map showing my location in Boston</p>
              </motion.div>
              
              {/* Connect With Me - Under map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-jarvis-dark-600 p-6 rounded-lg shadow-jarvis-glow"
              >
                <h2 className="text-2xl font-display text-jarvis-blue-500 mb-6">Connect With Me</h2>
                
                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href="https://linkedin.com/in/nikhil-bindal" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-jarvis-dark-500 rounded-md hover:bg-jarvis-dark-400 transition-colors"
                  >
                    <FaLinkedin className="w-5 h-5 text-[#0077b5] mr-3" />
                    <span className="text-gray-300">LinkedIn</span>
                  </a>
                  
                  <a 
                    href="https://github.com/nikhilbindal" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-jarvis-dark-500 rounded-md hover:bg-jarvis-dark-400 transition-colors"
                  >
                    <FaGithub className="w-5 h-5 text-white mr-3" />
                    <span className="text-gray-300">GitHub</span>
                  </a>
                  
                  <a 
                    href="https://twitter.com/nikhilbindal" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-jarvis-dark-500 rounded-md hover:bg-jarvis-dark-400 transition-colors"
                  >
                    <FaTwitter className="w-5 h-5 text-[#1DA1F2] mr-3" />
                    <span className="text-gray-300">Twitter</span>
                  </a>
                  
                  <a 
                    href="https://facebook.com/nikhilbindal" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-jarvis-dark-500 rounded-md hover:bg-jarvis-dark-400 transition-colors"
                  >
                    <FaFacebook className="w-5 h-5 text-[#4267B2] mr-3" />
                    <span className="text-gray-300">Facebook</span>
                  </a>
                  
                  <a 
                    href="https://instagram.com/nikhilbindal" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-jarvis-dark-500 rounded-md hover:bg-jarvis-dark-400 transition-colors"
                  >
                    <FaInstagram className="w-5 h-5 text-[#E1306C] mr-3" />
                    <span className="text-gray-300">Instagram</span>
                  </a>
                  
                  <a 
                    href="https://medium.com/@nikhilbindal" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-jarvis-dark-500 rounded-md hover:bg-jarvis-dark-400 transition-colors"
                  >
                    <FaMedium className="w-5 h-5 text-white mr-3" />
                    <span className="text-gray-300">Medium</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* FAQ Section - Bottom of page */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 bg-jarvis-dark-600 p-8 rounded-lg shadow-jarvis-glow"
          >
            <h2 className="text-2xl font-display text-jarvis-blue-500 mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
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