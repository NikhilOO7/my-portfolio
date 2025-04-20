'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, X } from 'lucide-react';

interface MusicPlayerProps {
  onClose: () => void;
}

export default function MusicPlayer({ onClose }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = [
    { name: 'Ambient Pulse', src: '/audio/ambient-pulse.mp3' }, // Placeholder
    { name: 'Cyber Drift', src: '/audio/cyber-drift.mp3' }, // Placeholder
    { name: 'Neon Horizon', src: '/audio/neon-horizon.mp3' }, // Placeholder
  ];

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const changeTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.src = tracks[index].src;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-24 right-8 z-50 w-80 bg-jarvis-dark-600 rounded-lg shadow-jarvis-glow border border-jarvis-blue-500/30 p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display text-jarvis-blue-500">Music Player</h3>
        <button onClick={onClose} className="text-gray-300 hover:text-jarvis-blue-500">
          <X className="w-5 h-5" />
        </button>
      </div>
      <audio ref={audioRef} src={tracks[currentTrack].src} />
      <div className="text-center">
        <p className="text-sm text-gray-200 mb-2">{tracks[currentTrack].name}</p>
        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-jarvis-blue-500 text-white hover:opacity-80 mb-4"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <div className="flex flex-col gap-2">
          {tracks.map((track, index) => (
            <button
              key={index}
              onClick={() => changeTrack(index)}
              className={`text-sm text-gray-300 hover:text-jarvis-blue-500 ${
                currentTrack === index ? 'text-jarvis-blue-500 font-semibold' : ''
              }`}
            >
              {track.name}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}