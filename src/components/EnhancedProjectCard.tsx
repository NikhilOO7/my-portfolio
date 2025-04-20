import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { SiReact, SiNextdotjs, SiPython, SiNodedotjs, SiMongodb, SiAmazonwebservices, 
         SiGooglecloud, SiTensorflow, SiFastapi } from 'react-icons/si';
import Button from './Button';

const techIcons: Record<string, React.ReactNode> = {
  'React': <SiReact className="w-5 h-5 text-blue-400" />,
  'Next.js': <SiNextdotjs className="w-5 h-5 text-white" />,
  'Python': <SiPython className="w-5 h-5 text-yellow-400" />,
  'Node.js': <SiNodedotjs className="w-5 h-5 text-green-400" />,
  'MongoDB': <SiMongodb className="w-5 h-5 text-green-500" />,
  'AWS': <SiAmazonwebservices className="w-5 h-5 text-orange-400" />,
  'GCP': <SiGooglecloud className="w-5 h-5 text-blue-400" />,
  'TensorFlow': <SiTensorflow className="w-5 h-5 text-orange-500" />,
  'FastAPI': <SiFastapi className="w-5 h-5 text-teal-400" />,
};

interface EnhancedProjectCardProps {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  techStack: string[];
  imageUrl: string;
  github?: string;
  demo?: string;
  achievements?: string[];
}

export default function EnhancedProjectCard({
  title,
  description,
  longDescription,
  tags,
  techStack,
  imageUrl,
  github,
  demo,
  achievements = [],
}: EnhancedProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-jarvis-dark-400 to-jarvis-dark-500 rounded-lg shadow-jarvis-glow border border-jarvis-blue-500/30 overflow-hidden"
    >
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={`${title} thumbnail`}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jarvis-dark-500 via-transparent to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-display text-jarvis-blue-500 font-semibold mb-2">{title}</h3>
        
        <p className="text-gray-200 text-sm mb-3">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-display text-gray-200 bg-jarvis-dark-600 px-3 py-1 rounded-full border border-jarvis-blue-600/30"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-3">
            {techStack.map((tech) => (
              <div key={tech} className="tooltip" data-tip={tech}>
                {techIcons[tech] || tech}
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="text-jarvis-blue-500 hover:text-jarvis-blue-300 transition-colors"
            aria-expanded={isExpanded}
            aria-controls={`details-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {isExpanded ? (
              <FaChevronUp className="w-4 h-4" />
            ) : (
              <FaChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            id={`details-${title.toLowerCase().replace(/\s+/g, '-')}`}
            className="mb-4"
          >
            <p className="text-gray-300 text-sm mb-3">{longDescription}</p>
            
            {achievements.length > 0 && (
              <div className="mb-3">
                <h4 className="text-sm font-display text-jarvis-blue-400 mb-2">Key Achievements:</h4>
                <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
                  {achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}

        <div className="flex space-x-2">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <FaGithub className="mr-1" /> GitHub
              </Button>
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <FaExternalLinkAlt className="mr-1" /> Demo
              </Button>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}