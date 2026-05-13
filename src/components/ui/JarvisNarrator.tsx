'use client';
import { useEffect, useState } from 'react';
import { useJarvisVoice } from '@/components/JarvisVoiceContext';

interface JarvisNarratorProps {
  lines: string[];
  speed?: number;
  startDelay?: number;
  prompt?: string;
  className?: string;
  cursor?: boolean;
  onDone?: () => void;
}

/**
 * Types out a sequence of lines as if JARVIS is speaking.
 * Each line appears after the previous finishes.
 */
export default function JarvisNarrator({
  lines,
  speed = 22,
  startDelay = 200,
  prompt = 'J.A.R.V.I.S',
  className = '',
  cursor = true,
  onDone,
}: JarvisNarratorProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const { speak } = useJarvisVoice();

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  // Speak each line out loud (if voice is on) the moment it starts typing
  useEffect(() => {
    if (!started) return;
    if (lineIndex >= lines.length) return;
    speak(lines[lineIndex], { interrupt: lineIndex === 0 });
    // We deliberately exclude `speak` from deps — its identity is stable from context
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, lineIndex, lines]);

  useEffect(() => {
    if (!started || lineIndex >= lines.length) return;
    const current = lines[lineIndex];
    if (charIndex < current.length) {
      const t = setTimeout(() => setCharIndex(charIndex + 1), speed);
      return () => clearTimeout(t);
    }
    // Line finished; if more lines, advance after pause
    if (lineIndex < lines.length - 1) {
      const t = setTimeout(() => {
        setLineIndex(lineIndex + 1);
        setCharIndex(0);
      }, 450);
      return () => clearTimeout(t);
    }
    onDone?.();
  }, [charIndex, lineIndex, started, lines, speed, onDone]);

  return (
    <div className={`font-mono text-xs sm:text-sm leading-relaxed ${className}`}>
      {lines.slice(0, lineIndex).map((line, i) => (
        <NarratedLine key={i} prompt={prompt} text={line} done />
      ))}
      {started && lineIndex < lines.length && (
        <NarratedLine
          prompt={prompt}
          text={lines[lineIndex].slice(0, charIndex)}
          cursor={cursor && charIndex < lines[lineIndex].length}
        />
      )}
    </div>
  );
}

function NarratedLine({ prompt, text, cursor, done }: { prompt: string; text: string; cursor?: boolean; done?: boolean }) {
  return (
    <div className="flex items-start gap-3 mb-1.5">
      <span className="text-jarvis-cyan/70 tracking-widest uppercase whitespace-nowrap text-[10px] sm:text-xs pt-0.5">
        [{prompt}]
      </span>
      <span className={`text-gray-200 flex-1 ${done ? 'opacity-90' : ''}`}>
        {text}
        {cursor && (
          <span className="inline-block w-2 h-3.5 sm:h-4 bg-jarvis-cyan ml-0.5 align-middle animate-blink" />
        )}
      </span>
    </div>
  );
}
