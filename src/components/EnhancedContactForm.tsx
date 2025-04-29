import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaPhone } from 'react-icons/fa';
import { Loader2, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

export default function EnhancedContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return 'Please enter a valid email address';
    if (!formData.message.trim()) return 'Message is required';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
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
  
  // Mock form options
  const inquiryTypes = [
    { value: '', label: 'Select an inquiry type' },
    { value: 'job', label: 'Job Opportunity' },
    { value: 'project', label: 'Project Inquiry' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                rows={5}
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
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-jarvis-blue-400/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
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
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col space-y-6"
        >
          <div className="bg-jarvis-dark-600 p-6 rounded-lg shadow-jarvis-glow h-1/2">
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
            </div>
          </div>
          
          <div className="bg-jarvis-dark-600 p-6 rounded-lg shadow-jarvis-glow h-1/2">
            <h2 className="text-2xl font-display text-jarvis-blue-500 mb-6">Connect With Me</h2>
            
            <div className="space-y-4">
              <a 
                href="https://linkedin.com/in/nikhil-bindal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-jarvis-dark-500 rounded-md hover:bg-jarvis-dark-400 transition-colors"
              >
                <FaLinkedin className="w-6 h-6 text-[#0077b5] mr-3" />
                <span className="text-gray-300">LinkedIn</span>
                <div className="ml-auto text-jarvis-blue-500">Connect</div>
              </a>
              
              <a 
                href="https://github.com/NikhilOO7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-jarvis-dark-500 rounded-md hover:bg-jarvis-dark-400 transition-colors"
              >
                <FaGithub className="w-6 h-6 text-white mr-3" />
                <span className="text-gray-300">GitHub</span>
                <div className="ml-auto text-jarvis-blue-500">Follow</div>
              </a>
              
              <a 
                href="https://twitter.com/nikhilbindal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-jarvis-dark-500 rounded-md hover:bg-jarvis-dark-400 transition-colors"
              >
                <FaTwitter className="w-6 h-6 text-[#1DA1F2] mr-3" />
                <span className="text-gray-300">Twitter</span>
                <div className="ml-auto text-jarvis-blue-500">Follow</div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}