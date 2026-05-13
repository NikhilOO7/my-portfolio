'use client';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  gradient?: 'blue-cyan' | 'cyan-violet' | 'teal-cyan' | 'violet-pink' | 'amber-pink';
  size?: 'lg' | 'xl';
  decorated?: boolean;
}

const gradients: Record<NonNullable<SectionHeaderProps['gradient']>, string> = {
  'blue-cyan': 'linear-gradient(120deg, #60a5fa 0%, #06b6d4 35%, #818cf8 70%, #60a5fa 100%)',
  'cyan-violet': 'linear-gradient(120deg, #22d3ee 0%, #a855f7 50%, #22d3ee 100%)',
  'teal-cyan': 'linear-gradient(120deg, #2dd4bf 0%, #22d3ee 50%, #2dd4bf 100%)',
  'violet-pink': 'linear-gradient(120deg, #a855f7 0%, #ec4899 50%, #a855f7 100%)',
  'amber-pink': 'linear-gradient(120deg, #fbbf24 0%, #ec4899 50%, #fbbf24 100%)',
};

const underlineGradients: Record<NonNullable<SectionHeaderProps['gradient']>, string> = {
  'blue-cyan': 'linear-gradient(90deg, transparent 0%, #3b82f6 30%, #06b6d4 50%, #3b82f6 70%, transparent 100%)',
  'cyan-violet': 'linear-gradient(90deg, transparent 0%, #06b6d4 30%, #a855f7 50%, #06b6d4 70%, transparent 100%)',
  'teal-cyan': 'linear-gradient(90deg, transparent 0%, #14b8a6 30%, #06b6d4 50%, #14b8a6 70%, transparent 100%)',
  'violet-pink': 'linear-gradient(90deg, transparent 0%, #a855f7 30%, #ec4899 50%, #a855f7 70%, transparent 100%)',
  'amber-pink': 'linear-gradient(90deg, transparent 0%, #f59e0b 30%, #ec4899 50%, #f59e0b 70%, transparent 100%)',
};

const underlineShadow: Record<NonNullable<SectionHeaderProps['gradient']>, string> = {
  'blue-cyan': '0 0 14px rgba(6, 182, 212, 0.6)',
  'cyan-violet': '0 0 14px rgba(168, 85, 247, 0.6)',
  'teal-cyan': '0 0 14px rgba(34, 211, 238, 0.6)',
  'violet-pink': '0 0 14px rgba(236, 72, 153, 0.6)',
  'amber-pink': '0 0 14px rgba(236, 72, 153, 0.6)',
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  gradient = 'blue-cyan',
  size = 'lg',
  decorated = true,
}: SectionHeaderProps) {
  const isCenter = align === 'center';
  const titleSize = size === 'xl'
    ? 'text-5xl sm:text-6xl lg:text-7xl'
    : 'text-4xl sm:text-5xl lg:text-6xl';

  return (
    <div className={isCenter ? 'text-center' : 'text-left'}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className={`flex items-center gap-3 mb-5 ${isCenter ? 'justify-center' : ''}`}
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent via-jarvis-blue-400/70 to-jarvis-blue-400" />
          <span className="text-[10px] sm:text-xs font-display tracking-[0.45em] text-jarvis-blue-300 uppercase inline-flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-jarvis-accent-500 animate-corner-pulse" />
            {eyebrow}
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent via-jarvis-blue-400/70 to-jarvis-blue-400" />
        </motion.div>
      )}

      <div className={`relative inline-block ${isCenter ? 'mx-auto' : ''}`}>
        {decorated && (
          <>
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden sm:block absolute -left-9 top-0 text-jarvis-blue-400/50 text-xl font-mono select-none animate-corner-pulse"
              aria-hidden
            >
              ⟦
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden sm:block absolute -right-9 top-0 text-jarvis-blue-400/50 text-xl font-mono select-none animate-corner-pulse"
              aria-hidden
            >
              ⟧
            </motion.span>
          </>
        )}

        {/* Glow halo layer */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className={`${titleSize} font-bold leading-[1.05] tracking-tight absolute inset-0 pointer-events-none select-none blur-2xl`}
          style={{
            backgroundImage: gradients[gradient],
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          aria-hidden
        >
          {title}
        </motion.h2>

        {/* Main animated gradient title */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`${titleSize} font-bold leading-[1.05] tracking-tight relative animate-gradient-shift animate-title-glow`}
          style={{
            backgroundImage: gradients[gradient],
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {title}
        </motion.h2>

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className={`h-[3px] mt-4 rounded-full origin-center ${isCenter ? 'mx-auto' : ''}`}
          style={{
            width: '70%',
            background: underlineGradients[gradient],
            boxShadow: underlineShadow[gradient],
          }}
        />
      </div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`text-gray-400 mt-5 max-w-2xl text-sm sm:text-base leading-relaxed ${isCenter ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
