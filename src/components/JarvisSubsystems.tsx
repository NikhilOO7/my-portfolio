'use client';
import Chatbot from '@/components/Chatbot';
import MusicPlayer from '@/components/MusicPlayer';
import { useJarvisSystem } from '@/components/JarvisSystemContext';

/**
 * Mounts JARVIS optional subsystems (Conversation, Ambient Audio) when
 * their corresponding system flags are on. Replaces the old floating
 * ControlPanel widget — now controllable from voice, palette, or any
 * JARVIS surface.
 */
export default function JarvisSubsystems() {
  const { chatOpen, musicOpen, setChatOpen, setMusicOpen } = useJarvisSystem();

  return (
    <>
      {chatOpen && <Chatbot onClose={() => setChatOpen(false)} />}
      {musicOpen && <MusicPlayer onClose={() => setMusicOpen(false)} />}
    </>
  );
}
