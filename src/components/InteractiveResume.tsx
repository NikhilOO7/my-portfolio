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
      id: 'northeastern',
      title: 'Full Stack Developer',
      company: 'Northeastern University',
      location: 'Boston, MA',
      startDate: 'May 2023',
      endDate: 'Sep 2023',
      description: [
        'Built responsive web components using ReactJS for a bioengineering research portal, improving accessibility compliance.',
        'Developed LLM-driven chatbot for Natural Language to SQL query generation, enabling researchers to interact with protein databases.',
        'Built and deployed FastAPI-based microservices for serving AI models on GCP App Engine with auto-scaling.'
      ],
      skills: ['React', 'FastAPI', 'Python', 'LLMs', 'GCP', 'Docker'],
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
        'Developed and maintained scalable web applications using ReactJS and Next.js, enhancing user engagement by 25%.',
        'Built and integrated secure RESTful APIs with Node.js, enabling seamless data flow and communication.',
        'Developed AI-powered personalization engine for content recommendations, boosting engagement by 30%.'
      ],
      skills: ['React', 'Next.js', 'Node.js', 'RESTful APIs', 'Spring Boot'],
      category: 'fullstack'
    },
    {
      id: 'progcap',
      title: 'Software Engineer',
      company: 'Progcap',
      location: 'New Delhi, India',
      startDate: 'Jan 2019',
      endDate: 'Mar 2021',
      description: [
        'Developed ERP-integrated financial automation modules using ReactJS and FastAPI, enabling real-time loan disbursals with sub-100ms API latency.',
        'Engineered a data ingestion and transformation layer using Python (Pandas, SQLAlchemy) to normalize raw financial statements into structured records in PostgreSQL, reducing reconciliation time by 60%.',
        'Built a credit risk scoring pipeline using Scikit-learn and deployed it into production to evaluate high-volume transactions, resulting in a 35% improvement in bad-loan prediction accuracy.'
      ],
      skills: ['Java', 'Spring Boot', 'React', 'FastAPI', 'MongoDB', 'AWS', 'Scikit-learn'],
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
        'Developed two microservices-based full-stack applications using ReactJS and Node.js for streamlined motor insurance claims processing.',
        'Built a rule-based vehicle inspection engine in Python for auto-validating image metadata and geotags, reducing manual claim verification efforts by 50%.',
        'Orchestrated deployments using GitLab CI, Docker, and Terraform, enabling repeatable, scalable builds across development and staging environments.'
      ],
      skills: ['React', 'Node.js', 'Python', 'Docker', 'GitLab CI', 'Terraform'],
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
      startDate: 'Aug 2024',
      endDate: 'Present',
      description: 'Currently pursuing advanced studies in AI with focus on deep learning, NLP, and computer vision.'
    },
    {
      id: 'northeastern-edu',
      degree: 'Master of Science',
      field: 'Information Systems',
      school: 'Northeastern University',
      location: 'Boston, MA',
      startDate: 'Sep 2022',
      endDate: 'Apr 2024',
      description: 'Specialized in AI applications in information systems, data analytics, and cloud computing.'
    },
    {
        id: 'kurukshetra',
        degree: 'Bachelor of Technology',
        field: 'Computer Science',
        school: 'Kurukshetra University',
        location: 'Kurukshetra, India',
        startDate: 'Aug 2012',
        endDate: 'Jun 2016',
        description: 'Completed undergraduate studies with focus on algorithms, data structures, and software engineering principles.'
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
              className="flex items-center"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Experience
            </Button>
            <Button
              variant={activeTab === 'education' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('education')}
              className="flex items-center"
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Education
            </Button>
          </div>
          
          <Link href="/Nikhil_Bindal_Resume.pdf" target="_blank" rel="noopener noreferrer">
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
                    
                    <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-sm">{item}</li>
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