import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import {
  SiReact, SiNextdotjs, SiPython, SiNodedotjs, SiMongodb, SiAmazonwebservices,
  SiGooglecloud, SiTensorflow, SiFastapi, SiPostgresql, SiRedis, SiTypescript,
  SiGraphql, SiExpress, SiKubernetes, SiDocker, SiSocketdotio, SiPandas,
  SiNumpy, SiScikitlearn, SiPytorch, SiPlotly, SiStripe, SiTailwindcss,
  SiOpencv
} from 'react-icons/si';
import { TbBrandOpenai } from 'react-icons/tb';
import Button from './Button';

const techIcons: Record<string, React.ReactNode> = {
  'React': <SiReact className="w-5 h-5 text-[#61DAFB]" />,
  'Next.js': <SiNextdotjs className="w-5 h-5 text-white" />,
  'Python': <SiPython className="w-5 h-5 text-[#3776AB]" />,
  'Node.js': <SiNodedotjs className="w-5 h-5 text-[#339933]" />,
  'MongoDB': <SiMongodb className="w-5 h-5 text-[#47A248]" />,
  'AWS': <SiAmazonwebservices className="w-5 h-5 text-[#FF9900]" />,
  'GCP': <SiGooglecloud className="w-5 h-5 text-[#4285F4]" />,
  'TensorFlow': <SiTensorflow className="w-5 h-5 text-[#FF6F00]" />,
  'FastAPI': <SiFastapi className="w-5 h-5 text-[#009688]" />,
  'PostgreSQL': <SiPostgresql className="w-5 h-5 text-[#4169E1]" />,
  'Redis': <SiRedis className="w-5 h-5 text-[#DC382D]" />,
  'TypeScript': <SiTypescript className="w-5 h-5 text-[#3178C6]" />,
  'GraphQL': <SiGraphql className="w-5 h-5 text-[#E10098]" />,
  'Express': <SiExpress className="w-5 h-5 text-gray-300" />,
  'Kubernetes': <SiKubernetes className="w-5 h-5 text-[#326CE5]" />,
  'Docker': <SiDocker className="w-5 h-5 text-[#2496ED]" />,
  'WebSocket': <SiSocketdotio className="w-5 h-5 text-gray-300" />,
  'Socket.io': <SiSocketdotio className="w-5 h-5 text-white" />,
  'Pandas': <SiPandas className="w-5 h-5 text-[#150458]" />,
  'NumPy': <SiNumpy className="w-5 h-5 text-[#013243]" />,
  'Scikit-learn': <SiScikitlearn className="w-5 h-5 text-[#F7931E]" />,
  'PyTorch': <SiPytorch className="w-5 h-5 text-[#EE4C2C]" />,
  'Plotly': <SiPlotly className="w-5 h-5 text-[#3F4F75]" />,
  'Stripe': <SiStripe className="w-5 h-5 text-[#008CDD]" />,
  'Tailwind CSS': <SiTailwindcss className="w-5 h-5 text-[#06B6D4]" />,
  'WebRTC': <SiOpencv className="w-5 h-5 text-[#5C3EE8]" />,
  'GPT-4o': <TbBrandOpenai className="w-5 h-5 text-[#10A37F]" />,
  'Google Gemini': <SiGooglecloud className="w-5 h-5 text-[#4285F4]" />,
  'Hono': <SiNodedotjs className="w-5 h-5 text-[#E36002]" />,
  'Drizzle ORM': <SiPostgresql className="w-5 h-5 text-[#C5F74F]" />,
  'CrewAI': <TbBrandOpenai className="w-5 h-5 text-[#7C3AED]" />,
  'LangChain': <TbBrandOpenai className="w-5 h-5 text-[#1C3C3C]" />,
  'LlamaIndex': <TbBrandOpenai className="w-5 h-5 text-[#8B5CF6]" />,
  'Qdrant': <SiPostgresql className="w-5 h-5 text-[#DC244C]" />,
  'Deepgram': <SiPython className="w-5 h-5 text-[#13EF93]" />,
  'LiveKit': <SiOpencv className="w-5 h-5 text-[#5C3EE8]" />,
  'XGBoost': <SiScikitlearn className="w-5 h-5 text-[#FF6600]" />,
  'Transformers': <SiPytorch className="w-5 h-5 text-[#FFD21E]" />,
  'Chart.js': <SiPlotly className="w-5 h-5 text-[#FF6384]" />,
  'OpenWeather API': <SiOpencv className="w-5 h-5 text-[#EB6E4B]" />,
  'Material-UI': <SiReact className="w-5 h-5 text-[#007FFF]" />,
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
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-b from-jarvis-dark-400 to-jarvis-dark-500 rounded-lg shadow-jarvis-glow border border-jarvis-blue-500/30 overflow-visible relative"
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

          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-wrap gap-3 flex-1 mr-4">
              {techStack.map((tech) => (
                <div key={tech} title={tech}>
                  {techIcons[tech] || <span className="text-xs text-gray-400">{tech}</span>}
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-jarvis-blue-500 hover:text-jarvis-blue-300 transition-colors flex-shrink-0"
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

      {/* Expanded overlay */}
      {isExpanded && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            onClick={() => setIsExpanded(false)}
          />

          {/* Expanded content modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            id={`details-${title.toLowerCase().replace(/\s+/g, '-')}`}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-3xl max-h-[85vh] overflow-y-auto bg-gradient-to-b from-jarvis-dark-400 to-jarvis-dark-500 rounded-lg shadow-jarvis-glow border border-jarvis-blue-500/50 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-display text-jarvis-blue-500 font-semibold">{title}</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-jarvis-blue-500 transition-colors"
              >
                <FaChevronUp className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={`${title} thumbnail`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            <p className="text-gray-300 text-sm mb-4 leading-relaxed">{longDescription}</p>

            {achievements.length > 0 && (
              <div className="mb-4">
                <h4 className="text-base font-display text-jarvis-blue-400 mb-3">Key Achievements:</h4>
                <ul className="space-y-2">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="text-sm text-gray-300 flex">
                      <span className="mr-2 text-jarvis-blue-400 flex-shrink-0">•</span>
                      <span className="flex-1">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-4">
              <h4 className="text-base font-display text-jarvis-blue-400 mb-3">Tech Stack:</h4>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <div key={tech} className="flex items-center gap-2 bg-jarvis-dark-600 px-3 py-2 rounded-lg border border-jarvis-blue-600/30">
                    {techIcons[tech]}
                    <span className="text-xs text-gray-300">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

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

            <div className="flex space-x-3 pt-4 border-t border-jarvis-blue-500/20">
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
          </motion.div>
        </>
      )}
    </>
  );
}