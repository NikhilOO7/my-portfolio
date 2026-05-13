'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useJarvisSystem, type SuitId } from '@/components/JarvisSystemContext';

interface SuitPalette {
  primary: string;
  secondary: string;
  glow: string;
  outline: string;
  /** CSS filter chain applied over the image to tint it per suit. */
  imageFilter: string;
  label: string;
}

/**
 * Suit palettes — `imageFilter` is tuned against a holographic cyan/blue
 * source image. Other hues are produced by rotating the cyan source.
 *
 * Source image:  /public/images/iron-man-hologram.jpeg
 */
export const SUITS: Record<SuitId, SuitPalette> = {
  mark42: {
    primary: '#c41e3a',
    secondary: '#fbbf24',
    glow: '#fbbf24',
    outline: '#fbbf24',
    imageFilter:
      'brightness(1.05) saturate(1.6) contrast(1.05) hue-rotate(-30deg)',
    label: 'Mark XLII · Classic',
  },
  stealth: {
    primary: '#0f172a',
    secondary: '#67e8f9',
    glow: '#22d3ee',
    outline: '#22d3ee',
    imageFilter:
      'brightness(1.05) saturate(1.3) contrast(1.05) hue-rotate(0deg)',
    label: 'Stealth · Mark XV',
  },
  warmachine: {
    primary: '#374151',
    secondary: '#d1d5db',
    glow: '#cbd5e1',
    outline: '#cbd5e1',
    imageFilter:
      'brightness(1.05) saturate(0.25) contrast(1.1) hue-rotate(180deg)',
    label: 'War Machine',
  },
  bleeding: {
    primary: '#dc2626',
    secondary: '#fde047',
    glow: '#facc15',
    outline: '#facc15',
    imageFilter:
      'brightness(1.1) saturate(1.7) contrast(1.05) hue-rotate(40deg)',
    label: 'Bleeding Edge · Mark L',
  },
  mark1: {
    primary: '#78350f',
    secondary: '#fbbf24',
    glow: '#f97316',
    outline: '#fb923c',
    imageFilter:
      'brightness(1.0) saturate(1.5) contrast(1.05) hue-rotate(15deg)',
    label: 'Mark I · Origin',
  },
};

interface Props {
  className?: string;
  /** 0–1, overall opacity so the hologram lives behind content. */
  intensity?: number;
  /** Source image path. */
  src?: string;
}

export default function IronManHologram({
  className = '',
  intensity = 0.55,
  src = '/images/iron-man-hologram.png',
}: Props) {
  const { suit } = useJarvisSystem();
  const palette = SUITS[suit];
  const [missing, setMissing] = useState(false);

  return (
    <div
      // Sit below the persistent HUD chrome (HUDTopBar 28px + Header 56px = 84px)
      // so the hologram's head doesn't disappear behind the top bar.
      className={`fixed inset-0 pt-[84px] z-0 pointer-events-none flex items-center justify-center overflow-hidden ${className}`}
      aria-hidden
    >
      {/* Vertical scan band sweeping the figure */}
      <motion.div
        className="absolute inset-x-0 h-40 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${palette.glow}33 50%, transparent 100%)`,
          mixBlendMode: 'screen',
        }}
        initial={{ y: '-100%' }}
        animate={{ y: '120vh' }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
      />

      <div
        className="relative h-[min(92vh,1000px)] aspect-[2/3] flex items-center justify-center"
        style={{ opacity: intensity }}
      >
        {/* The hologram itself — JPEG with dark bg, blended via screen */}
        {missing ? (
          <FallbackHint glow={palette.glow} />
        ) : (
          <motion.img
            src={src}
            alt=""
            onError={() => setMissing(true)}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 1.4 },
              scale: { duration: 1.4 },
              y: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="relative z-10 h-full w-auto object-contain"
            style={{
              filter: `${palette.imageFilter} drop-shadow(0 0 18px ${palette.glow}aa) drop-shadow(0 0 42px ${palette.glow}66) drop-shadow(0 0 80px ${palette.glow}33)`,
              mixBlendMode: 'screen',
            }}
            draggable={false}
          />
        )}

        {/* Extra accent ring under the pedestal (image already has one — this lights it more) */}
        <div
          className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[55%] max-w-[420px] h-2 pointer-events-none z-20"
          style={{
            background: `radial-gradient(ellipse at center, ${palette.glow}cc 0%, ${palette.glow}33 40%, transparent 80%)`,
            filter: 'blur(10px)',
          }}
        />

        {/* CRT scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 2px, ${palette.glow}1a 3px, transparent 4px)`,
            mixBlendMode: 'screen',
          }}
        />

        {/* Subtle chromatic-aberration vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: `radial-gradient(ellipse at center, transparent 35%, rgba(0, 8, 20, 0.4) 100%)`,
          }}
        />

        {/* Status label above the figure */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.4em] uppercase whitespace-nowrap z-30"
          style={{ color: palette.outline, opacity: 0.65 }}
        >
          ◇ {palette.label} · scan stable
        </div>
      </div>
    </div>
  );
}

function FallbackHint({ glow }: { glow: string }) {
  return (
    <div
      className="relative z-10 h-[80%] aspect-[2/3] flex items-center justify-center"
      style={{ border: `1px dashed ${glow}55` }}
    >
      <div
        className="text-center font-mono text-[10px] tracking-[0.3em] uppercase max-w-[200px] leading-relaxed"
        style={{ color: glow, opacity: 0.65 }}
      >
        Hologram image not found at<br />
        <span className="text-[11px]">/images/iron-man-hologram.png</span>
      </div>
    </div>
  );
}
