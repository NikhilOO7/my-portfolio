// Enhanced Featured Projects Section
// src/components/EnhancedFeaturedProjectsSection.tsx

import { motion } from 'framer-motion';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';
import Image from 'next/image';
import CollabHubImage from './../assets/images/collabhub.png';

const featuredProjects = [
  {
    id: 'collabhub',
    title: 'CollabHub',
    description: 'Real-time team collaboration platform integrating chat, task management, and video conferencing.',
    image: CollabHubImage,
    tags: ['React', 'Node.js', 'WebSockets'],
    link: '/projects#collabhub'
  },
  {
    id: 'nexus-chatbot',
    title: 'Nexus AI Chatbot',
    description: 'Scalable enterprise chatbot leveraging GPT-4o for customer support automation.',
    image: '/images/nexus-chatbot-thumb.jpg',
    tags: ['Python', 'FastAPI', 'LLM'],
    link: '/projects#nexus-chatbot'
  },
  {
    id: 'quantum-content',
    title: 'Quantum Content Generator',
    description: 'AI-driven blog post and marketing copy generator using Llama 3.1.',
    image: '/images/quantum-content-thumb.jpg',
    tags: ['Next.js', 'Python', 'Fine-tuning'],
    link: '/projects#quantum-content'
  },
];

export default function EnhancedFeaturedProjectsSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="py-20 bg-jarvis-dark-600/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl font-bold text-jarvis-blue-500 leading-tight"
          >
            Featured Projects
          </motion.h2>
          
          <Link href="/projects" className="hidden md:flex items-center text-jarvis-blue-500 hover:text-jarvis-blue-400 transition-colors">
            <span className="mr-2">View all projects</span>
            <BsArrowRight />
          </Link>
        </div>
        
        <div className="grid gap-10 grid-cols-1 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Link href={project.link} key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 0 30px rgba(25, 118, 255, 0.2)'
                }}
                className="bg-jarvis-dark-600 rounded-xl overflow-hidden shadow-jarvis-glow border border-jarvis-blue-500/20 h-full flex flex-col"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jarvis-dark-900 via-transparent to-transparent"></div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-display text-jarvis-blue-500 mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-xs font-display text-gray-200 bg-jarvis-dark-700/70 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/projects" className="inline-flex items-center text-jarvis-blue-500 hover:text-jarvis-blue-400 transition-colors">
            <span className="mr-2">View all projects</span>
            <BsArrowRight />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}