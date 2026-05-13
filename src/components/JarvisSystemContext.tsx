'use client';
import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from 'react';

export type SuitId = 'mark42' | 'stealth' | 'warmachine' | 'bleeding' | 'mark1';

interface JarvisSystemContextValue {
  chatOpen: boolean;
  musicOpen: boolean;
  paletteOpen: boolean;
  diagnosticsOpen: boolean;
  suit: SuitId;
  toggleChat: () => void;
  toggleMusic: () => void;
  togglePalette: () => void;
  toggleDiagnostics: () => void;
  cycleSuit: () => void;
  setChatOpen: (v: boolean) => void;
  setMusicOpen: (v: boolean) => void;
  setPaletteOpen: (v: boolean) => void;
  setDiagnosticsOpen: (v: boolean) => void;
  setSuit: (s: SuitId) => void;
  closeAll: () => void;
}

const SUIT_ORDER: SuitId[] = ['mark42', 'stealth', 'warmachine', 'bleeding', 'mark1'];

const Ctx = createContext<JarvisSystemContextValue | null>(null);

export function useJarvisSystem(): JarvisSystemContextValue {
  const ctx = useContext(Ctx);
  if (!ctx) {
    return {
      chatOpen: false,
      musicOpen: false,
      paletteOpen: false,
      diagnosticsOpen: true,
      suit: 'mark42',
      toggleChat: () => {},
      toggleMusic: () => {},
      togglePalette: () => {},
      toggleDiagnostics: () => {},
      cycleSuit: () => {},
      setChatOpen: () => {},
      setMusicOpen: () => {},
      setPaletteOpen: () => {},
      setDiagnosticsOpen: () => {},
      setSuit: () => {},
      closeAll: () => {},
    };
  }
  return ctx;
}

export function JarvisSystemProvider({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(true);
  const [suit, setSuit] = useState<SuitId>('mark42');

  const toggleChat = useCallback(() => setChatOpen(v => !v), []);
  const toggleMusic = useCallback(() => setMusicOpen(v => !v), []);
  const togglePalette = useCallback(() => setPaletteOpen(v => !v), []);
  const toggleDiagnostics = useCallback(() => setDiagnosticsOpen(v => !v), []);
  const cycleSuit = useCallback(() => {
    setSuit(current => {
      const idx = SUIT_ORDER.indexOf(current);
      return SUIT_ORDER[(idx + 1) % SUIT_ORDER.length];
    });
  }, []);
  const closeAll = useCallback(() => {
    setChatOpen(false);
    setMusicOpen(false);
    setPaletteOpen(false);
  }, []);

  return (
    <Ctx.Provider
      value={{
        chatOpen,
        musicOpen,
        paletteOpen,
        diagnosticsOpen,
        suit,
        toggleChat,
        toggleMusic,
        togglePalette,
        toggleDiagnostics,
        cycleSuit,
        setChatOpen,
        setMusicOpen,
        setPaletteOpen,
        setDiagnosticsOpen,
        setSuit,
        closeAll,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
