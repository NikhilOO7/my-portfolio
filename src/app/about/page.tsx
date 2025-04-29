'use client';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import InteractiveResume from '@/components/InteractiveResume';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import profileImage from '@/assets/images/nikhil.png';

export default function About() {
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
            About Me
          </motion.h1>
          
          <div className="flex flex-col lg:flex-row items-center gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative w-48 h-48 lg:w-64 lg:h-64 shadow-jarvis-glow rounded-full overflow-hidden border-2 border-jarvis-blue-500"
            >
              <Image
                src={profileImage}
                alt="Nikhil Bindal"
                fill
                priority
                sizes="(max-width: 768px) 12rem, 16rem"
                style={{ objectFit: 'cover' }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-jarvis-blue-500/30"></div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1"
            >
              <h2 className="text-2xl font-display text-jarvis-blue-400 mb-4">Software Engineer & AI/ML Practitioner</h2>
              <p className="text-base sm:text-lg text-gray-300 mb-4">
                Hi, I'm Nikhil – a passionate Software Engineer with a focus on building intelligent, high-performance applications. 
                With over 5 years of experience across full-stack development and AI engineering, I specialize in creating solutions 
                that blend cutting-edge technology with seamless user experiences.
              </p>
              <p className="text-base sm:text-lg text-gray-300 mb-6">
                My expertise spans React, Next.js, Python, and AI technologies like LLMs and RAG. I'm deeply interested in 
                leveraging artificial intelligence to solve real-world problems and create innovative applications that push 
                the boundaries of what's possible.
              </p>
              
              <div className="flex space-x-4">
                <Link href="https://linkedin.com/in/nikhil-bindal" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <FaLinkedin className="mr-2" /> LinkedIn
                  </Button>
                </Link>
                <Link href="https://github.com/NikhilOO7" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <FaGithub className="mr-2" /> GitHub
                  </Button>
                </Link>
                <Link href="https://twitter.com/nikhilbindal" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <FaTwitter className="mr-2" /> Twitter
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-display text-jarvis-blue-500 text-center mb-8">My Professional Journey</h2>
            <InteractiveResume />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-display text-jarvis-blue-500 text-center mb-8">Technical Philosophy</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-jarvis-dark-600 p-6 rounded-lg shadow-jarvis-glow border border-jarvis-blue-500/30">
                <h3 className="text-xl font-display text-jarvis-blue-400 mb-3">Clean Code Advocate</h3>
                <p className="text-sm text-gray-300">
                  I believe in writing maintainable, well-tested code that clearly communicates intent. 
                  My approach focuses on readability, simplicity, and robust architecture to build systems 
                  that can evolve with changing requirements.
                </p>
              </div>
              
              <div className="bg-jarvis-dark-600 p-6 rounded-lg shadow-jarvis-glow border border-jarvis-blue-500/30">
                <h3 className="text-xl font-display text-jarvis-blue-400 mb-3">User-Centered Design</h3>
                <p className="text-sm text-gray-300">
                  Technology should serve people, not the other way around. I prioritize intuitive interfaces,
                  accessibility, and performance to create applications that feel natural and responsive to users' needs.
                </p>
              </div>
              
              <div className="bg-jarvis-dark-600 p-6 rounded-lg shadow-jarvis-glow border border-jarvis-blue-500/30">
                <h3 className="text-xl font-display text-jarvis-blue-400 mb-3">AI Augmentation</h3>
                <p className="text-sm text-gray-300">
                  I see AI not as a replacement for human intelligence, but as a powerful tool to augment our capabilities.
                  My work focuses on creating AI-powered systems that enhance human productivity, creativity, and decision-making.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}