// Enhanced Featured Projects Section
// src/components/EnhancedFeaturedProjectsSection.tsx

import { motion } from 'framer-motion';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';
import Image from 'next/image';
import { featuredProjects } from '@/data/projects';
import {
  SiReact, SiPython, SiNodedotjs, SiFastapi, SiPostgresql, SiTypescript,
  SiGraphql, SiKubernetes, SiDocker, SiRedis, SiGooglecloud, SiMongodb,
  SiExpress, SiSocketdotio, SiOpencv
} from 'react-icons/si';
import { TbBrandOpenai } from 'react-icons/tb';

const techIcons: Record<string, React.ReactNode> = {
  'React': <SiReact className="w-4 h-4 text-[#61DAFB]" />,
  'Python': <SiPython className="w-4 h-4 text-[#3776AB]" />,
  'Node.js': <SiNodedotjs className="w-4 h-4 text-[#339933]" />,
  'FastAPI': <SiFastapi className="w-4 h-4 text-[#009688]" />,
  'PostgreSQL': <SiPostgresql className="w-4 h-4 text-[#4169E1]" />,
  'TypeScript': <SiTypescript className="w-4 h-4 text-[#3178C6]" />,
  'GraphQL': <SiGraphql className="w-4 h-4 text-[#E10098]" />,
  'Kubernetes': <SiKubernetes className="w-4 h-4 text-[#326CE5]" />,
  'Docker': <SiDocker className="w-4 h-4 text-[#2496ED]" />,
  'Redis': <SiRedis className="w-4 h-4 text-[#DC382D]" />,
  'WebRTC': <SiOpencv className="w-4 h-4 text-[#5C3EE8]" />,
  'GPT-4o': <TbBrandOpenai className="w-4 h-4 text-[#10A37F]" />,
  'CrewAI': <TbBrandOpenai className="w-4 h-4 text-[#7C3AED]" />,
  'LangChain': <TbBrandOpenai className="w-4 h-4 text-[#1C3C3C]" />,
  'LlamaIndex': <TbBrandOpenai className="w-4 h-4 text-[#8B5CF6]" />,
  'GCP': <SiGooglecloud className="w-4 h-4 text-[#4285F4]" />,
  'Google Gemini': <SiGooglecloud className="w-4 h-4 text-[#4285F4]" />,
  'MongoDB': <SiMongodb className="w-4 h-4 text-[#47A248]" />,
  'Express': <SiExpress className="w-4 h-4 text-gray-300" />,
  'WebSocket': <SiSocketdotio className="w-4 h-4 text-gray-300" />,
  'Qdrant': <SiPostgresql className="w-4 h-4 text-[#DC244C]" />,
  'Deepgram': <SiPython className="w-4 h-4 text-[#13EF93]" />,
  'LiveKit': <SiOpencv className="w-4 h-4 text-[#5C3EE8]" />,
  'Hono': <SiNodedotjs className="w-4 h-4 text-[#E36002]" />,
  'Drizzle ORM': <SiPostgresql className="w-4 h-4 text-[#C5F74F]" />,
};

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
            <Link href={`/projects#${project.id}`} key={project.id}>
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
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jarvis-dark-900 via-transparent to-transparent"></div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-display text-jarvis-blue-500 mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>

                  <div className="flex flex-wrap gap-3 mt-auto">
                    {project.techStack.slice(0, 6).map(tech => (
                      <div key={tech} title={tech}>
                        {techIcons[tech] || (
                          <span className="text-xs font-display text-gray-200 bg-jarvis-dark-700/70 px-3 py-1 rounded-full">
                            {tech}
                          </span>
                        )}
                      </div>
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