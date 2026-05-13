'use client';
import { useEffect, useRef, useState } from 'react';
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
  // Track which line indices we've already spoken so re-renders (e.g. when
  // the voice context updates) cannot re-trigger speech for the same line.
  const spokenRef = useRef<Set<number>>(new Set());
  // Keep the latest lines accessible without putting them in effect deps —
  // parents often recreate the array on every render which would otherwise
  // refire the speech effect.
  const linesRef = useRef(lines);
  linesRef.current = lines;

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  // Speak each line out loud (if voice is on) the moment it starts typing.
  // Dependencies are only `started` and `lineIndex` so a parent re-creating
  // its `lines` array does not retrigger the same line's speech.
  useEffect(() => {
    if (!started) return;
    const currentLines = linesRef.current;
    if (lineIndex >= currentLines.length) return;
    if (spokenRef.current.has(lineIndex)) return;
    spokenRef.current.add(lineIndex);
    speak(currentLines[lineIndex], { interrupt: lineIndex === 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, lineIndex]);

  useEffect(() => {
    if (!started) return;
    const currentLines = linesRef.current;
    if (lineIndex >= currentLines.length) return;
    const current = currentLines[lineIndex];
    if (charIndex < current.length) {
      const t = setTimeout(() => setCharIndex(charIndex + 1), speed);
      return () => clearTimeout(t);
    }
    // Line finished; if more lines, advance after pause
    if (lineIndex < currentLines.length - 1) {
      const t = setTimeout(() => {
        setLineIndex(lineIndex + 1);
        setCharIndex(0);
      }, 450);
      return () => clearTimeout(t);
    }
    onDone?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIndex, lineIndex, started, speed, onDone]);

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
