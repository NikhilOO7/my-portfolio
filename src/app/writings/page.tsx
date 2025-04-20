'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from '@/components/Button';
import Link from 'next/link';
import { Calendar, Tag, ChevronRight, BookOpen } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link: string;
  category: string;
  readTime: string;
  tags: string[];
}

export default function Writings() {
  const [filter, setFilter] = useState<string>('all');
  
  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'ai', name: 'AI & LLMs' },
    { id: 'programming', name: 'Programming' },
    { id: 'career', name: 'Career' }
  ];
  
  const articles: Article[] = [
    {
      id: 'fine-tuning-llms',
      title: 'Fine-Tuning LLMs for Content Generation: A Practical Guide',
      date: 'April 2024',
      excerpt: 'Explore the process of fine-tuning large language models like Llama 3.1 to excel at specific content generation tasks, with practical code examples and performance benchmarks.',
      link: 'https://example.com/fine-tuning-llms',
      category: 'ai',
      readTime: '15 min read',
      tags: ['LLMs', 'Content Generation', 'Fine-tuning', 'Llama 3.1']
    },
    {
      id: 'rag-systems',
      title: 'Building Retrieval-Augmented Generation Systems with FAISS and LangChain',
      date: 'March 2024',
      excerpt: 'A deep dive into implementing RAG systems using FAISS vector database and LangChain for improved context-awareness in AI applications.',
      link: 'https://example.com/rag-systems',
      category: 'ai',
      readTime: '12 min read',
      tags: ['RAG', 'FAISS', 'LangChain', 'Vector Databases']
    },
    {
      id: 'real-time-collab',
      title: 'Building Real-Time Collaboration Tools with WebRTC and Socket.IO',
      date: 'June 2023',
      excerpt: 'Learn how to architect and implement real-time collaboration features like video conferencing and synchronized editing using WebRTC and Socket.IO.',
      link: 'https://example.com/real-time-collab',
      category: 'programming',
      readTime: '10 min read',
      tags: ['WebRTC', 'Socket.IO', 'Real-time', 'Collaboration']
    },
    {
      id: 'microservices-best-practices',
      title: 'Microservices Architecture: Best Practices for Scalable Systems',
      date: 'May 2023',
      excerpt: 'Explore key design patterns, communication strategies, and deployment techniques for building robust microservices architectures.',
      link: 'https://example.com/microservices-best-practices',
      category: 'programming',
      readTime: '8 min read',
      tags: ['Microservices', 'Architecture', 'Scalability', 'Backend']
    },
    {
      id: 'nlp-chatbots',
      title: 'Introduction to NLP in Chatbots: From Rule-Based to LLMs',
      date: 'January 2023',
      excerpt: 'Trace the evolution of chatbot technology from rule-based systems to modern LLM-powered conversational agents, with implementation examples.',
      link: 'https://example.com/nlp-chatbots',
      category: 'ai',
      readTime: '14 min read',
      tags: ['NLP', 'Chatbots', 'AI']
    },
    {
      id: 'transitioning-to-ai',
      title: 'Transitioning from Software Engineering to AI Engineering',
      date: 'December 2022',
      excerpt: 'Personal journey and practical advice for software engineers looking to pivot into AI and machine learning roles.',
      link: 'https://example.com/transitioning-to-ai',
      category: 'career',
      readTime: '7 min read',
      tags: ['Career', 'AI Engineering', 'Skills Development']
    }
  ];
  
  const filteredArticles = filter === 'all'
    ? articles
    : articles.filter(article => article.category === filter);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-jarvis-dark-500 text-white relative font-display overflow-x-hidden z-10 pt-16"
    >
      <section className="py-20 sm:py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-jarvis-blue-500 animate-pulse-glow leading-tight text-center"
          >
            Writings
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-4 text-center text-gray-300 max-w-2xl mx-auto"
          >
            Technical articles, tutorials, and thoughts on AI, software development, and career growth
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 flex justify-center flex-wrap gap-2"
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={filter === category.id ? "primary" : "outline"}
                size="sm"
                onClick={() => setFilter(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 space-y-8"
          >
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 0 15px rgba(25, 118, 255, 0.5)'
                }}
                className="bg-jarvis-dark-600 p-6 rounded-lg shadow-jarvis-glow border border-jarvis-blue-500/30"
              >
                <Link 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block hover:text-jarvis-blue-300"
                >
                  <h3 className="text-xl font-display text-jarvis-blue-500 mb-2">{article.title}</h3>
                </Link>
                
                <div className="flex items-center text-xs text-gray-400 mb-4 flex-wrap gap-y-2">
                  <span className="flex items-center mr-4">
                    <Calendar className="w-3 h-3 mr-1" />
                    {article.date}
                  </span>
                  <span className="flex items-center mr-4">
                    <BookOpen className="w-3 h-3 mr-1" />
                    {article.readTime}
                  </span>
                  <span className="flex items-center">
                    <Tag className="w-3 h-3 mr-1" />
                    {article.category}
                  </span>
                </div>
                
                <p className="text-sm text-gray-300 mb-4">{article.excerpt}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-display text-gray-200 bg-jarvis-dark-700 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-jarvis-blue-500 hover:text-jarvis-blue-300 text-sm"
                >
                  Read Full Article 
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
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