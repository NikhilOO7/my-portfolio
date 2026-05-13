// Enhanced Featured Projects Section
// src/components/EnhancedFeaturedProjectsSection.tsx

import { motion } from 'framer-motion';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';
import Image from 'next/image';
import { featuredProjects } from '@/data/projects';
import SectionHeader from '@/components/ui/SectionHeader';
import HUDFrame from '@/components/ui/HUDFrame';
import {
  SiReact, SiNextdotjs, SiPython, SiNodedotjs, SiMongodb, SiAmazonwebservices,
  SiGooglecloud, SiTensorflow, SiFastapi, SiPostgresql, SiRedis, SiTypescript,
  SiGraphql, SiExpress, SiKubernetes, SiDocker, SiSocketdotio, SiPandas,
  SiNumpy, SiScikitlearn, SiPytorch, SiPlotly, SiStripe, SiTailwindcss,
  SiOpencv
} from 'react-icons/si';
import { TbBrandOpenai } from 'react-icons/tb';

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
        <div className="mb-12">
          <SectionHeader
            eyebrow="Selected work"
            title="Featured Projects"
            subtitle="A curated selection of recent production AI systems and full-stack work."
            gradient="cyan-violet"
          />
          <div className="hidden md:flex justify-end mt-6">
            <Link href="/projects" className="inline-flex items-center text-jarvis-blue-300 hover:text-jarvis-accent-500 transition-colors group">
              <span className="mr-2">View all projects</span>
              <BsArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="grid gap-10 grid-cols-1 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Link href={`/projects#${project.id}`} key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                <HUDFrame accent="#00d4ff" cornerSize={16} showScan className="bg-jarvis-dark-600/60 overflow-hidden h-full flex flex-col">
                  <div className="absolute inset-0 border border-jarvis-blue-500/20 pointer-events-none" />
                  <div className="relative h-48 w-full">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-jarvis-dark-900 via-transparent to-transparent" />
                    {/* HUD scan bar across top of image */}
                    <div className="absolute top-2 left-3 right-3 flex items-center justify-between font-mono text-[9px] tracking-[0.3em] uppercase text-jarvis-cyan/80">
                      <span>› Project {String(index + 1).padStart(2, '0')}</span>
                      <span className="text-jarvis-gold-400/90">ACTIVE</span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow relative">
                    <h3 className="text-xl sm:text-2xl font-display text-white mb-2 leading-tight">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 flex-grow">{project.description}</p>

                    <div className="flex flex-wrap gap-3 mt-auto">
                      {project.techStack.slice(0, 6).map(tech => (
                        <div key={tech} title={tech}>
                          {techIcons[tech] || (
                            <span className="text-xs font-mono text-gray-200 bg-jarvis-dark-700/70 px-2.5 py-0.5 rounded-sm border border-jarvis-blue-500/30">
                              {tech}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </HUDFrame>
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