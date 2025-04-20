'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, X } from 'lucide-react';

interface MusicPlayerProps {
  onClose: () => void;
}

interface Track {
  name: string;
  src: string;
  artist?: string;
  color?: string;
}

export default function EnhancedMusicPlayer({ onClose }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const tracks: Track[] = [
    { 
      name: 'Ambient Pulse', 
      src: '/audio/ambient-pulse.mp3',
      artist: 'J.A.R.V.I.S. Audio',
      color: '#00d4ff'
    },
    { 
      name: 'Cyber Drift', 
      src: '/audio/cyber-drift.mp3',
      artist: 'Neon Labs',
      color: '#1976ff'
    },
    { 
      name: 'Neon Horizon', 
      src: '/audio/neon-horizon.mp3',
      artist: 'Digital Frontier',
      color: '#0088ff'
    },
  ];

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      // Set up event listeners
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });
      
      audio.addEventListener('ended', handleNext);
      
      // Set initial volume
      audio.volume = volume;
      
      // Initial load doesn't auto-play
      if (initialLoad) {
        setInitialLoad(false);
      }
      
      return () => {
        audio.removeEventListener('loadedmetadata', () => {});
        audio.removeEventListener('ended', handleNext);
        if (progressIntervalRef.current) {
            if (progressIntervalRef.current !== null) {
              clearInterval(progressIntervalRef.current);
            }
        }
      };
    }
  }, [currentTrack]);

  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        if (audioRef.current) {
          setProgress(audioRef.current.currentTime);
        }
      }, 100);
    } else {
        if (progressIntervalRef.current) {
            if (progressIntervalRef.current !== null) {
              clearInterval(progressIntervalRef.current);
            }
        }
    }
    
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current as NodeJS.Timeout);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrev = () => {
    const newIndex = (currentTrack - 1 + tracks.length) % tracks.length;
    changeTrack(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentTrack + 1) % tracks.length;
    changeTrack(newIndex);
  };

  const changeTrack = (index: number) => {
    setCurrentTrack(index);
    setProgress(0);
    
    if (audioRef.current) {
      audioRef.current.src = tracks[index].src;
      audioRef.current.load();
      
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    
    if (audioRef.current) {
      audioRef.current.currentTime = newProgress;
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume > 0 ? volume : 0.7;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };
  
  // Format time in mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-24 right-8 z-50 w-80 bg-jarvis-dark-600 rounded-lg shadow-jarvis-glow border border-jarvis-blue-500/30"
    >
      <div className="flex items-center justify-between p-4 border-b border-jarvis-blue-500/30">
        <h3 className="text-lg font-display text-jarvis-blue-500">Music Player</h3>
        <button onClick={onClose} className="text-gray-300 hover:text-jarvis-blue-500">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <audio ref={audioRef} src={tracks[currentTrack].src} />
      
      <div className="px-4 py-5">
        {/* Track Info and Album Art */}
        <div className="flex items-center mb-4">
          <div 
            className="w-16 h-16 rounded-lg mr-4 flex-shrink-0 relative overflow-hidden border border-jarvis-blue-500/30"
            style={{ backgroundColor: tracks[currentTrack].color }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Music className="w-8 h-8 text-white opacity-50" />
            </div>
            {isPlaying && (
              <div className="absolute inset-0 bg-black bg-opacity-20">
                <div className="flex h-full justify-evenly items-end pb-1">
                  {[1, 2, 3, 4].map((n) => (
                    <div 
                      key={n}
                      className="w-1.5 bg-white rounded-t-sm" 
                      style={{ 
                        height: `${10 + Math.sin(Date.now() / (300 * n)) * 10}px`,
                        animation: `eq-bar ${0.5 + n * 0.2}s ease-in-out infinite alternate`
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h4 className="text-white font-display">{tracks[currentTrack].name}</h4>
            <p className="text-gray-400 text-sm">{tracks[currentTrack].artist}</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1 bg-jarvis-dark-400 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #1976ff ${(progress / (duration || 100)) * 100}%, #333 0%)`,
            }}
          />
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={handlePrev}
            className="p-2 text-white hover:text-jarvis-blue-500 transition-colors"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          
          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-jarvis-blue-500 text-white hover:bg-jarvis-blue-600 transition-colors shadow-jarvis-glow"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          
          <button 
            onClick={handleNext}
            className="p-2 text-white hover:text-jarvis-blue-500 transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
        
        {/* Volume Control */}
        <div className="flex items-center">
          <button 
            onClick={toggleMute}
            className="p-2 text-white hover:text-jarvis-blue-500 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full h-1 ml-2 bg-jarvis-dark-400 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #1976ff ${(isMuted ? 0 : volume) * 100}%, #333 0%)`,
            }}
          />
        </div>
        
        {/* Playlist */}
        <div className="mt-5 border-t border-jarvis-blue-500/10 pt-3">
          <h5 className="text-sm text-gray-400 mb-2">Playlist</h5>
          <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
            {tracks.map((track, index) => (
              <button
                key={index}
                onClick={() => changeTrack(index)}
                className={`w-full text-left p-2 rounded-md flex items-center hover:bg-jarvis-dark-500 transition-colors ${
                  currentTrack === index ? 'bg-jarvis-dark-500 border-l-2 border-jarvis-blue-500' : ''
                }`}
              >
                <span className="text-xs text-gray-400 mr-3">{index + 1}</span>
                <div>
                  <p className={`text-sm ${currentTrack === index ? 'text-jarvis-blue-500' : 'text-white'}`}>
                    {track.name}
                  </p>
                  <p className="text-xs text-gray-400">{track.artist}</p>
                </div>
                {currentTrack === index && isPlaying && (
                  <div className="ml-auto">
                    <div className="flex items-end space-x-0.5 h-3">
                      {[1, 2, 3].map((n) => (
                        <div 
                          key={n}
                          className="w-0.5 bg-jarvis-blue-500 rounded-t-sm" 
                          style={{ 
                            height: `${4 + Math.sin(Date.now() / (300 * n)) * 4}px`,
                            animation: `eq-bar ${0.5 + n * 0.2}s ease-in-out infinite alternate`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Add animations to global CSS */}
      <style jsx global>{`
        @keyframes eq-bar {
          0% { height: 3px; }
          100% { height: 12px; }
        }
      `}</style>
    </motion.div>
  );
}