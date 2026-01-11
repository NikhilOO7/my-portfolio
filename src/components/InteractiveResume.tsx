'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import { 
  Briefcase, GraduationCap, Award, Filter, 
  Download, ExternalLink, Calendar, MapPin
} from 'lucide-react';
import Link from 'next/link';

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  skills: string[];
  category: string;
}

interface Education {
  id: string;
  degree: string;
  field: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}

interface FilterOption {
  id: string;
  label: string;
}

export default function InteractiveResume() {
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'All Experience' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'backend', label: 'Backend' },
    { id: 'ai', label: 'AI & ML' }
  ];
  
  const experiences: Experience[] = [
    {
      id: 'ai-consultant',
      title: 'AI Solutions Consultant — Backend & AI Infrastructure',
      company: 'Independent',
      location: 'San Francisco, CA',
      startDate: 'Sep 2024',
      endDate: 'Present',
      description: [
        'Architected a voice-based document intelligence platform using WebRTC, LiveKit, FastAPI and PostgreSQL; implemented a multi-agent RAG pipeline with CrewAI and LlamaIndex that improved search relevance by 40%, supported 1,000+ concurrent sessions with sub-50 ms latency and 95%+ transcription accuracy.',
        'Designed multi-agent LLM reasoning pipelines (CrewAI + LlamaIndex) with a three-tier RAG approach (local/document/global embeddings) powering semantic question generation and context-aware inference.',
        'Built continuous streaming infrastructure for STT/TTS (Deepgram Nova-3, Cartesia Sonic) and model inference in production with real-time WebRTC voice UI.',
        'Led end-to-end solution from prototyping to production on GCP, leveraging Docker, Kubernetes, Qdrant vector database, and introduced comprehensive monitoring (Prometheus/Grafana) and CI/CD pipelines; collaborated with clients to prioritize features and mentored junior engineers in both front- and back-end best practices.'
      ],
      skills: ['Python', 'FastAPI', 'Django', 'PostgreSQL', 'Redis', 'WebRTC', 'LiveKit', 'CrewAI', 'LlamaIndex', 'Qdrant', 'Kubernetes', 'GCP', 'Deepgram'],
      category: 'ai'
    },
    {
      id: 'northeastern',
      title: 'Full-Stack + AI Developer',
      company: 'Northeastern University',
      location: 'Boston, MA',
      startDate: 'Feb 2023',
      endDate: 'Dec 2023',
      description: [
        'Designed a FastAPI + PostgreSQL pipeline enabling semantic search across 10K+ biomedical articles; integrated vector embeddings and search scoring to surface relevant literature for biomedical research.',
        'Built AWS Batch cloud pipeline to execute large-scale simulations; automated job orchestration and resource provisioning, reducing compute costs by 40%.',
        'Created React + D3.js visualization tools and TensorFlow CNN classifiers for glycan research analysis.',
        'Developed a tactile graphics generator and screen-reader plugins to improve STEM accessibility, leveraging React and OpenCV.'
      ],
      skills: ['React', 'FastAPI', 'Python', 'PostgreSQL', 'AWS Batch', 'D3.js', 'TensorFlow', 'OpenCV', 'TypeScript', 'Docker'],
      category: 'fullstack'
    },
    {
      id: 'times-internet',
      title: 'Software Engineer',
      company: 'Times Internet',
      location: 'Noida, India',
      startDate: 'Apr 2021',
      endDate: 'Jul 2022',
      description: [
        'Scaled backend services (Spring Boot + Redis) to handle 8.4M daily requests and supported 120K+ subscribers, contributing to $150M+ annual revenue for the TOI+ subscription platform.',
        'Designed a Kafka-based personalization and recommendations pipeline that delivered personalized news feeds; achieved 9.7% CTR increase for premium users.',
        'Led migration of 70+ city sections into React micro-frontends, improving page load times and raising Lighthouse performance scores to 92/100.',
        'Containerized services using Docker and deployed to AWS EKS, reducing infrastructure costs by 35% and simplifying deployments.'
      ],
      skills: ['Spring Boot', 'Java', 'Node.js', 'Redis', 'Kafka', 'React', 'Docker', 'Kubernetes', 'AWS EKS', 'Jenkins'],
      category: 'backend'
    },
    {
      id: 'progcap',
      title: 'Founding Software Engineer',
      company: 'Progcap (Fintech)',
      location: 'New Delhi, India',
      startDate: 'Jan 2019',
      endDate: 'Mar 2021',
      description: [
        'Designed and built Node.js/Express microservices for real-time loan underwriting; reduced latency from 8.7s to 890ms through caching and optimized database queries.',
        'Implemented a Kafka event-driven architecture processing 22K transactions per second with exactly-once semantics to ensure financial integrity.',
        'Developed credit scoring ML models (XGBoost) that decreased false negatives by 19%, enabling smarter lending decisions.',
        'Supported product growth to ₹9,800 Cr+ lending volume, helping secure Series B funding (US$25M).'
      ],
      skills: ['Node.js', 'Express', 'Kafka', 'MongoDB', 'Redis', 'XGBoost', 'AWS ECS', 'Python'],
      category: 'backend'
    },
    {
      id: 'livemedia',
      title: 'Software Engineer',
      company: 'Livemedia',
      location: 'New Delhi, India',
      startDate: 'Aug 2017',
      endDate: 'May 2018',
      description: [
        'Built an OCR-based document verification system using Tesseract.js and Python APIs, achieving 92%+ accuracy for identity verification.',
        'Developed a React Native offline-first inspection app used for 50K+ monthly site inspections; reduced inspection time from 45 minutes to 22 minutes through local caching and sync logic.',
        'Created a React.js + Django claims platform that cut insurance claims processing time by 60%.'
      ],
      skills: ['React Native', 'React', 'Django', 'Python', 'Tesseract.js', 'PostgreSQL', 'Redux', 'REST APIs'],
      category: 'fullstack'
    }
  ];
  
  const education: Education[] = [
    {
      id: 'cumberlands',
      degree: 'Master of Science',
      field: 'Artificial Intelligence',
      school: 'University of the Cumberlands',
      location: 'Williamsburg, KY',
      startDate: '2024',
      endDate: '2025',
      description: 'Courses: Deep Learning, Natural Language Processing, Generative AI & LLMs, Ethics in AI, Data Visualization.'
    },
    {
      id: 'northeastern-edu',
      degree: 'Master of Science',
      field: 'Information Systems',
      school: 'Northeastern University',
      location: 'Boston, MA',
      startDate: '2022',
      endDate: '2024',
      description: 'Courses: Database Design, Algorithms, Cloud Computing, Web Design & Development, Data Science, Research Methods in AI.'
    },
    {
        id: 'kurukshetra',
        degree: 'Bachelor of Technology',
        field: 'Computer Science & Engineering',
        school: 'Kurukshetra University',
        location: 'Kurukshetra, India',
        startDate: '2012',
        endDate: '2016',
        description: 'Courses: Data Structures & Algorithms, Computer Networks, Discrete Mathematics, Object-Oriented Design.'
      }
    ];
    
    const filteredExperiences = activeFilter === 'all'
      ? experiences
      : experiences.filter(exp => exp.category === activeFilter);
  
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-2">
            <Button
              variant={activeTab === 'experience' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('experience')}
              className={activeTab === 'experience' ? 'flex items-center shadow-jarvis-glow animate-pulse-glow' : 'flex items-center'}
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Experience
            </Button>
            <Button
              variant={activeTab === 'education' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('education')}
              className={activeTab === 'education' ? 'flex items-center shadow-jarvis-glow animate-pulse-glow' : 'flex items-center'}
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Education
            </Button>
          </div>
          
          <Link href="/resume/Nikhil Bindal Resume.pdf" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </Link>
        </div>
        
        {activeTab === 'experience' && (
          <>
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="text-sm text-gray-400 flex items-center mr-2">
                <Filter className="w-4 h-4 mr-1" /> Filter:
              </span>
              
              {filterOptions.map(option => (
                <Button
                  key={option.id}
                  variant={activeFilter === option.id ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setActiveFilter(option.id)}
                  className={activeFilter === option.id ? 'shadow-jarvis-glow animate-pulse-glow' : ''}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            
            <div className="relative border-l-2 border-jarvis-blue-500 ml-4 sm:ml-6 space-y-12">
              {filteredExperiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-8"
                >
                  <span className="absolute -left-3 w-6 h-6 bg-jarvis-blue-500 rounded-full animate-pulse-glow" />
                  
                  <div className="bg-jarvis-dark-600 p-6 rounded-lg shadow-jarvis-glow border border-jarvis-blue-500/30">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                      <div>
                        <h3 className="text-xl font-display text-jarvis-blue-500">{exp.title}</h3>
                        <p className="text-gray-300 font-display text-lg">{exp.company}</p>
                      </div>
                      <div className="mt-2 sm:mt-0 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {exp.startDate} - {exp.endDate}
                        </div>
                        <div className="flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                    
                    <ul className="text-gray-300 space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-sm flex">
                          <span className="mr-2 text-jarvis-blue-400 flex-shrink-0">•</span>
                          <span className="flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs font-display text-gray-200 bg-jarvis-dark-700 px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
        
        {activeTab === 'education' && (
          <div className="relative border-l-2 border-jarvis-blue-500 ml-4 sm:ml-6 space-y-12">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8"
              >
                <span className="absolute -left-3 w-6 h-6 bg-jarvis-blue-500 rounded-full animate-pulse-glow" />
                
                <div className="bg-jarvis-dark-600 p-6 rounded-lg shadow-jarvis-glow border border-jarvis-blue-500/30">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-display text-jarvis-blue-500">{edu.degree} in {edu.field}</h3>
                      <p className="text-gray-300 font-display text-lg">{edu.school}</p>
                    </div>
                    <div className="mt-2 sm:mt-0 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {edu.startDate} - {edu.endDate}
                      </div>
                      <div className="flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {edu.location}
                      </div>
                    </div>
                  </div>
                  
                  {edu.description && (
                    <p className="text-sm text-gray-300">{edu.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
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
      </motion.div>
    );
  }