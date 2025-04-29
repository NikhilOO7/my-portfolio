'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, X, Plus, Trash2, ExternalLink } from 'lucide-react';
import IronMan3 from '@/assets/audio/IronMan3.mp3';
import IronMan3Quote from '@/assets/audio/ironman3-quote.mp3';

interface MusicPlayerProps {
  onClose: () => void;
}

interface Track {
  name: string;
  artist?: string;
  color?: string;
  type: 'youtube' | 'local';
  src: string;
  youtubeId?: string;
}

// Utility function to extract YouTube ID from URL
const getYoutubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export default function EnhancedMusicPlayer({ onClose }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [newTrackUrl, setNewTrackUrl] = useState('');
  const [isAddingTrack, setIsAddingTrack] = useState(false);
  const [error, setError] = useState('');
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Load tracks from localStorage or use defaults
  const [tracks, setTracks] = useState<Track[]>(() => {
    if (typeof window !== 'undefined') {
      const savedTracks = localStorage.getItem('musicPlayerTracks');
      if (savedTracks) {
        try {
          return JSON.parse(savedTracks);
        } catch (e) {
          console.error('Error parsing saved tracks', e);
        }
      }
    }
    
    // Default tracks
    return [
      { 
        name: 'Iron Man 3 Theme', 
        src: IronMan3,
        artist: 'J.A.R.V.I.S. Audio',
        type: 'local',
        color: '#00d4ff'
      },
      { 
        name: 'My qoute', 
        src: IronMan3Quote,
        artist: 'J.A.R.V.I.S. Audio',
        type: 'local',
        color: '#00d4ff'
      },
      { 
        name: 'Lofi Study', 
        artist: 'Lofi Girl',
        src: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
        youtubeId: 'jfKfPfyJRdk',
        type: 'youtube',
        color: '#7C3AED'
      },
      { 
        name: 'Chill Work Music', 
        artist: 'ChillHop',
        src: 'https://www.youtube.com/watch?v=7NOSDKb0HlU',
        youtubeId: '7NOSDKb0HlU',
        type: 'youtube',
        color: '#2563EB'
      }
    ];
  });

  // Save tracks to localStorage when updated
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('musicPlayerTracks', JSON.stringify(tracks));
    }
  }, [tracks]);

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
      
      return () => {
        audio.removeEventListener('loadedmetadata', () => {});
        audio.removeEventListener('ended', handleNext);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
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
        clearInterval(progressIntervalRef.current);
      }
    }
    
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    const track = tracks[currentTrack];
    
    if (track.type === 'youtube') {
      // For YouTube tracks, open in a new tab (audio-only not directly supported)
      window.open(`https://www.youtube.com/watch?v=${track.youtubeId}`, '_blank');
      return;
    }
    
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
      const track = tracks[index];
      
      if (track.type === 'local') {
        audioRef.current.src = track.src;
        audioRef.current.load();
        
        if (isPlaying) {
          audioRef.current.play();
        }
      } else {
        // For YouTube tracks, we don't auto-play since we'll open in a new tab
        setIsPlaying(false);
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
  
  const addYoutubeTrack = () => {
    if (!newTrackUrl.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }
    
    const youtubeId = getYoutubeId(newTrackUrl);
    if (!youtubeId) {
      setError('Invalid YouTube URL');
      return;
    }
    
    // Add new track
    const newTrack: Track = {
      name: `YouTube Track ${tracks.length + 1}`,
      artist: 'YouTube',
      src: newTrackUrl,
      youtubeId: youtubeId,
      type: 'youtube',
      color: '#FF0000' // YouTube red
    };
    
    setTracks([...tracks, newTrack]);
    setNewTrackUrl('');
    setIsAddingTrack(false);
    setError('');
  };
  
  const removeTrack = (index: number) => {
    const newTracks = [...tracks];
    newTracks.splice(index, 1);
    
    if (newTracks.length === 0) {
      // Add a default track if all are removed
      newTracks.push({
        name: 'Lofi Study',
        artist: 'Lofi Girl',
        src: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
        youtubeId: 'jfKfPfyJRdk',
        type: 'youtube',
        color: '#7C3AED'
      });
    }
    
    setTracks(newTracks);
    
    // If current track is removed, change to the first track
    if (index === currentTrack) {
      changeTrack(0);
    } else if (index < currentTrack) {
      // If a track before the current one is removed, adjust current track index
      setCurrentTrack(currentTrack - 1);
    }
  };
  
  // Format time in mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const getCurrentTrackInfo = () => {
    const track = tracks[currentTrack];
    return {
      name: track.name,
      artist: track.artist || 'Unknown Artist',
      color: track.color || '#00d4ff',
      isYoutube: track.type === 'youtube'
    };
  };

  const currentTrackInfo = getCurrentTrackInfo();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-24 right-8 z-50 w-80 enhanced-ui-panel rounded-lg shadow-jarvis-glow"
    >
      <div className="flex items-center justify-between p-4 enhanced-ui-header rounded-t-lg">
        <h3 className="text-lg font-display text-jarvis-blue-500">Music Player</h3>
        <button onClick={onClose} className="text-gray-300 hover:text-jarvis-blue-500">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <audio ref={audioRef} src={tracks[currentTrack].type === 'local' ? tracks[currentTrack].src : ''} />
      
      <div className="px-4 py-5">
        {/* Track Info and Album Art */}
        <div className="flex items-center mb-4">
          <div 
            className="w-16 h-16 rounded-lg mr-4 flex-shrink-0 relative overflow-hidden border border-jarvis-blue-500/30"
            style={{ backgroundColor: currentTrackInfo.color }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {currentTrackInfo.isYoutube ? (
                <svg viewBox="0 0 24 24" width="32" height="32" fill="white" className="opacity-50">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              ) : (
                <Music className="w-8 h-8 text-white opacity-50" />
              )}
            </div>
            {isPlaying && !currentTrackInfo.isYoutube && (
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
            <h4 className="text-white font-display">{currentTrackInfo.name}</h4>
            <p className="text-gray-400 text-sm">{currentTrackInfo.artist}</p>
            {currentTrackInfo.isYoutube && (
              <div className="text-xs text-jarvis-blue-500 mt-1 flex items-center">
                <ExternalLink className="w-3 h-3 mr-1" /> Opens in YouTube
              </div>
            )}
          </div>
        </div>
        
        {/* Progress Bar - Only show for local tracks */}
        {!currentTrackInfo.isYoutube && (
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
        )}
        
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
            {isPlaying && !currentTrackInfo.isYoutube ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          
          <button 
            onClick={handleNext}
            className="p-2 text-white hover:text-jarvis-blue-500 transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
        
        {/* Volume Control - Only show for local tracks */}
        {!currentTrackInfo.isYoutube && (
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
        )}
        
        {/* Playlist */}
        <div className="mt-5 border-t border-jarvis-blue-500/10 pt-3">
          <div className="flex justify-between items-center mb-2">
            <h5 className="text-sm text-gray-400">Playlist</h5>
            <button 
              onClick={() => setIsAddingTrack(!isAddingTrack)} 
              className="text-xs text-jarvis-blue-500 hover:text-jarvis-blue-400 flex items-center"
            >
              <Plus className="w-3 h-3 mr-1" /> Add Track
            </button>
          </div>
          
          {isAddingTrack && (
            <div className="mb-3 bg-jarvis-dark-700 p-2 rounded-md">
              <div className="text-xs text-gray-300 mb-1">Add YouTube URL:</div>
              <div className="flex">
                <input 
                  type="text" 
                  value={newTrackUrl}
                  onChange={(e) => setNewTrackUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="flex-1 text-xs p-1 bg-jarvis-dark-600 border border-jarvis-dark-400 rounded-l-md"
                />
                <button 
                  onClick={addYoutubeTrack} 
                  className="bg-jarvis-blue-500 hover:bg-jarvis-blue-600 text-white text-xs px-2 rounded-r-md"
                >
                  Add
                </button>
              </div>
              {error && <div className="text-red-400 text-xs mt-1">{error}</div>}
            </div>
          )}
          
          <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
            {tracks.map((track, index) => (
              <div
                key={index}
                className={`w-full text-left p-2 rounded-md flex items-center hover:bg-jarvis-dark-500 transition-colors group ${
                  currentTrack === index ? 'bg-jarvis-dark-500 border-l-2 border-jarvis-blue-500' : ''
                }`}
              >
                <button onClick={() => changeTrack(index)} className="flex-1 flex items-center text-left">
                  <span className="text-xs text-gray-400 mr-3">{index + 1}</span>
                  <div>
                    <p className={`text-sm ${currentTrack === index ? 'text-jarvis-blue-500' : 'text-white'}`}>
                      {track.name}
                    </p>
                    <div className="flex items-center">
                      <p className="text-xs text-gray-400">{track.artist}</p>
                      {track.type === 'youtube' && (
                        <span className="ml-1 bg-red-500 text-white text-xs px-1 rounded">
                          YT
                        </span>
                      )}
                    </div>
                  </div>
                </button>
                
                <button 
                  onClick={() => removeTrack(index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                {currentTrack === index && isPlaying && track.type === 'local' && (
                  <div className="ml-2">
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
              </div>
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