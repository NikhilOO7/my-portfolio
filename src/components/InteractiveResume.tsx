'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import { 
  Briefcase, GraduationCap, Award, Filter, 
  Download, ExternalLink, Calendar, MapPin
} from 'lucide-react';
import Link from 'next/link';

interface SubRole {
  company: string;
  description: string[];
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  subRoles?: SubRole[];
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
      title: 'AI Consultant / AI Infrastructure Engineer',
      company: 'Neurologica · Stealth AI Startup',
      location: 'San Francisco, CA',
      startDate: 'Sep 2024',
      endDate: 'Present',
      description: [],
      subRoles: [
        {
          company: 'Neurologica — Engineering Contractor',
          description: [
            'Architected and built a production-grade AI coaching platform combining biometric signal analysis with a multi-agent orchestration pipeline and persistent personal memory systems.',
            'Designed and implemented a 6-agent orchestration pipeline reducing end-to-end AI latency from 36s to 9.5s (73% reduction) through prompt consolidation, model tiering, and async execution optimization.',
            'Built Mnemosyne memory architecture with semantic retrieval, temporal decay lifecycle, and context-scoped memory bucketing across multiple user domains.',
            'Engineered Redis-backed concurrency controls and session orchestration preventing state corruption under concurrent real-time voice sessions.',
            'Built parallel voice sidecar architecture using Gemini Live enabling low-latency audio conversations while asynchronously running sentiment, query, and analytics pipelines.',
            'Integrated real-time HCI signal processing workflows using multimodal emotion/context signals to adapt conversational reasoning dynamically.',
            'Developed Python and JavaScript SDKs supporting 32 operations across orchestration, memory, analytics, sessions, and BYOD infrastructure.',
            'Established CI/CD pipelines, audit logging infrastructure, webhook delivery systems, and production deployment workflows on GCP Cloud Run.'
          ]
        },
        {
          company: 'Stealth AI Startup — AI Solutions Consultant',
          description: [
            'Architected an AI-powered meeting intelligence platform automating pre-meeting research, live meeting assistance, and post-meeting synthesis workflows.',
            'Designed a 3-phase agentic architecture orchestrating 15 specialized AI agents across research, meeting intelligence, and decision-tracking pipelines.',
            'Built contextual retrieval workflows using multi-level semantic search across Qdrant vector collections improving retrieval relevance by ~40% over traditional RAG pipelines.',
            'Implemented a real-time voice pipeline using LiveKit WebRTC, Deepgram STT, and Cartesia TTS targeting sub-200ms perceived latency.',
            'Designed PostgreSQL schemas and knowledge graph workflows modeling meeting entities, action items, decisions, transcripts, and research relationships.',
            'Implemented Redis-backed rate limiting, Prometheus metrics, structured logging, and async background workers for scalable production monitoring.'
          ]
        }
      ],
      skills: ['Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'Redis', 'Qdrant', 'WebRTC', 'LiveKit', 'Gemini Live', 'CrewAI', 'LangGraph', 'LlamaIndex', 'GPT-4o', 'Deepgram', 'Cartesia', 'Kubernetes', 'GCP Cloud Run', 'Prometheus'],
      category: 'ai'
    },
    {
      id: 'northeastern',
      title: 'Full-Stack Developer / Research Assistant',
      company: 'Northeastern University',
      location: 'Boston, MA',
      startDate: 'Feb 2023',
      endDate: 'Dec 2023',
      description: [
        'Developed a semantic search and data-visualization platform for biomedical research using FastAPI, PostgreSQL, React, and D3.js, enabling researchers to search and analyze 10K+ scientific papers and molecular datasets.',
        'Built AWS Batch-based distributed simulation pipelines orchestrating large-scale molecular computations and reducing compute costs by 40%.',
        'Led backend development for scientific data ingestion pipelines, metadata APIs, and ML inference workflows (TensorFlow CNN classifiers for glycan research) supporting computational biology research.',
        'Designed accessibility-focused tooling including tactile graphics generation and screen-reader integrations to improve STEM accessibility for visually impaired students and researchers.'
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
        'Built and scaled backend services (Spring Boot + Redis) for the TOI+ subscription platform handling 8.4M daily requests and supporting 120K+ subscribers, contributing to $150M+ annual revenue.',
        'Migrated 70+ city portals from legacy systems to React-based micro-frontends, raising Lighthouse performance scores to 92/100 and improving maintainability.',
        'Designed a Kafka-based personalization and recommendations pipeline that delivered personalized news feeds; achieved 9.7% CTR increase for premium users and supported higher engagement and retention.',
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
        'Built real-time lending and underwriting microservices using Node.js/Express, Kafka, MongoDB, and event-driven architecture; reduced transaction workflow latency from 8.7s to 890ms through caching and optimized queries.',
        'Implemented Kafka event-driven workflows processing 22K transactions per second with exactly-once semantics to ensure financial integrity across high-throughput lending operations.',
        'Integrated ML-powered credit scoring (XGBoost) into backend lending systems, decreasing false negatives by 19% and enabling smarter lending decisions for large-scale financial operations.',
        'Supported product growth to ₹9,800 Cr+ lending volume, helping secure Series B funding (US$25M).'
      ],
      skills: ['Node.js', 'Express', 'Kafka', 'MongoDB', 'Redis', 'XGBoost', 'AWS ECS', 'Python'],
      category: 'backend'
    },
    {
      id: 'livemedia',
      title: 'Software Engineer',
      company: 'LiveMedia / LiveChek',
      location: 'New Delhi, India',
      startDate: 'Aug 2017',
      endDate: 'May 2018',
      description: [
        'Worked on insurance-focused telematics and behavioral analytics systems integrating real-time driving behavior and user interaction data into backend services and APIs.',
        'Built an OCR-based document verification system using Tesseract.js and Python APIs, achieving 92%+ accuracy for identity verification.',
        'Developed a React Native offline-first inspection app used for 50K+ monthly site inspections; reduced inspection time from 45 minutes to 22 minutes through local caching and sync logic.',
        'Created a React.js + Django claims platform that cut insurance claims processing time by 60% and contributed to early-stage product and architecture decisions in a startup environment.'
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
                    
                    {exp.subRoles && exp.subRoles.length > 0 ? (
                      <div className="space-y-5 mb-4">
                        {exp.subRoles.map((sub, si) => (
                          <div key={si}>
                            <h4 className="text-base font-display text-jarvis-blue-400 mb-2">{sub.company}</h4>
                            <ul className="text-gray-300 space-y-2">
                              {sub.description.map((item, i) => (
                                <li key={i} className="text-sm flex">
                                  <span className="mr-2 text-jarvis-blue-400 flex-shrink-0">•</span>
                                  <span className="flex-1">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ul className="text-gray-300 space-y-2 mb-4">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-sm flex">
                            <span className="mr-2 text-jarvis-blue-400 flex-shrink-0">•</span>
                            <span className="flex-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

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