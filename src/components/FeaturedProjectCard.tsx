'use client';

import { motion } from 'framer-motion';
import Button from './Button';

interface FeaturedProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
}

export default function FeaturedProjectCard({ title, description, tags, github, demo }: FeaturedProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="bg-jarvis-dark-400 rounded-lg p-6 shadow-jarvis-glow animate-float-smooth h-[220px] flex flex-col justify-between border border-jarvis-blue-500/30 hover:border-jarvis-blue-500 hover:shadow-lg transition-all duration-300"
      whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(25, 118, 255, 0.7)' }}
    >
      <div className="flex flex-col">
        <h3 className="text-xl font-display text-jarvis-blue-500 font-semibold">{title}</h3>
        <p className="mt-3 text-gray-200 font-display text-sm min-h-[48px] line-clamp-2 overflow-hidden">
          {description}
        </p>
        {tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-display text-gray-200 bg-jarvis-dark-600 px-3 py-1 rounded-full border border-jarvis-blue-600/30 hover:bg-jarvis-blue-600/20 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      {(github || demo) && (
        <div className="mt-4 flex space-x-2">
          {github && (
            <Button variant="outline" size="sm" onClick={() => window.open(github, '_blank')}>
              GitHub
            </Button>
          )}
          {demo && (
            <Button variant="outline" size="sm" onClick={() => window.open(demo, '_blank')}>
              Demo
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
}