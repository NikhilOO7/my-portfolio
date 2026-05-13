'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';

interface RecognitionHandlers {
  onInterim?: (text: string) => void;
  onFinal?: (text: string) => void;
  onError?: (err: string) => void;
  onEnd?: () => void;
}

interface JarvisVoiceContextValue {
  // TTS
  enabled: boolean;
  speaking: boolean;
  available: boolean;
  toggleEnabled: () => void;
  setEnabled: (v: boolean) => void;
  speak: (text: string, opts?: { interrupt?: boolean }) => void;
  stop: () => void;

  // STT
  listening: boolean;
  recognitionAvailable: boolean;
  startListening: (handlers?: RecognitionHandlers) => void;
  stopListening: () => void;
}

const Ctx = createContext<JarvisVoiceContextValue | null>(null);

export function useJarvisVoice(): JarvisVoiceContextValue {
  const ctx = useContext(Ctx);
  if (!ctx) {
    return {
      enabled: false,
      speaking: false,
      available: false,
      toggleEnabled: () => {},
      setEnabled: () => {},
      speak: () => {},
      stop: () => {},
      listening: false,
      recognitionAvailable: false,
      startListening: () => {},
      stopListening: () => {},
    };
  }
  return ctx;
}

const STORAGE_KEY = 'jarvis.voice.enabled';

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices.length) return null;
  // Preference order — calm, lower-register, British-male voices closest to
  // the JARVIS / FRIDAY film delivery. "Enhanced" / "Premium" / "Natural"
  // variants are higher quality and preferred first.
  const tests: ((v: SpeechSynthesisVoice) => boolean)[] = [
    // Microsoft Natural (Edge) — highest quality if available
    v => /\(natural\)/i.test(v.name) && /ryan|guy|tony|brian|adam/i.test(v.name) && v.lang.startsWith('en'),
    v => /\(natural\)/i.test(v.name) && v.lang === 'en-GB',
    // macOS enhanced/premium variants of British male voices
    v => /daniel.*\((enhanced|premium)\)/i.test(v.name),
    v => /oliver.*\((enhanced|premium)\)/i.test(v.name),
    v => /arthur.*\((enhanced|premium)\)/i.test(v.name),
    // Standard British male voices (macOS / Chrome)
    v => /^daniel$/i.test(v.name) && v.lang.startsWith('en'),
    v => /\b(oliver|arthur|george|jamie)\b/i.test(v.name) && v.lang.startsWith('en'),
    v => v.name.toLowerCase().includes('google uk english male'),
    v => v.lang === 'en-GB' && /male/i.test(v.name),
    v => v.lang === 'en-GB',
    // Any English male as last resort
    v => v.lang.startsWith('en') && /male|ryan|guy|brian|adam/i.test(v.name),
    v => v.lang.startsWith('en'),
  ];
  for (const t of tests) {
    const hit = voices.find(t);
    if (hit) return hit;
  }
  return voices[0];
}

interface ProviderProps {
  children: ReactNode;
}

export function JarvisVoiceProvider({ children }: ProviderProps) {
  // ── TTS ────────────────────────────────────────────────────────────
  const [enabled, setEnabledState] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [available, setAvailable] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const enabledRef = useRef(false);

  useEffect(() => { enabledRef.current = enabled; }, [enabled]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const synth = window.speechSynthesis;
    if (!synth) {
      setAvailable(false);
      return;
    }
    setAvailable(true);

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === '1') setEnabledState(true);

    const loadVoices = () => {
      const voices = synth.getVoices();
      voiceRef.current = pickVoice(voices);
    };
    loadVoices();
    synth.addEventListener?.('voiceschanged', loadVoices);

    return () => {
      synth.removeEventListener?.('voiceschanged', loadVoices);
      synth.cancel();
    };
  }, []);

  const setEnabled = useCallback((v: boolean) => {
    setEnabledState(v);
    try { localStorage.setItem(STORAGE_KEY, v ? '1' : '0'); } catch {}
    if (!v && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, []);

  const toggleEnabled = useCallback(() => {
    setEnabled(!enabledRef.current);
  }, [setEnabled]);

  const speak = useCallback((text: string, opts?: { interrupt?: boolean }) => {
    if (!enabledRef.current) return;
    if (typeof window === 'undefined') return;
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (opts?.interrupt !== false) synth.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    if (voiceRef.current) utt.voice = voiceRef.current;
    // JARVIS-style delivery: measured, lower register, modest volume.
    utt.rate = 0.98;
    utt.pitch = 0.85;
    utt.volume = 0.55;
    utt.onstart = () => setSpeaking(true);
    utt.onend = () => setSpeaking(false);
    utt.onerror = () => setSpeaking(false);
    synth.speak(utt);
  }, []);

  const stop = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);

  // ── STT ────────────────────────────────────────────────────────────
  const [listening, setListening] = useState(false);
  const [recognitionAvailable, setRecognitionAvailable] = useState(false);
  const recognitionRef = useRef<any>(null);
  const handlersRef = useRef<RecognitionHandlers | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    setRecognitionAvailable(!!SR);
    return () => {
      try { recognitionRef.current?.abort?.(); } catch {}
      recognitionRef.current = null;
    };
  }, []);

  const startListening = useCallback((handlers?: RecognitionHandlers) => {
    if (typeof window === 'undefined') return;
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SR) return;

    // Halt any in-flight TTS so the mic doesn't hear JARVIS.
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }

    // Tear down any existing instance first.
    try { recognitionRef.current?.abort?.(); } catch {}

    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = 'en-US';
    rec.maxAlternatives = 1;

    handlersRef.current = handlers ?? null;

    rec.onresult = (event: any) => {
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0]?.transcript ?? '';
        if (result.isFinal) final += text;
        else interim += text;
      }
      if (interim) handlersRef.current?.onInterim?.(interim.trim());
      if (final) handlersRef.current?.onFinal?.(final.trim());
    };

    rec.onerror = (event: any) => {
      handlersRef.current?.onError?.(event?.error ?? 'unknown');
    };

    rec.onend = () => {
      setListening(false);
      handlersRef.current?.onEnd?.();
      handlersRef.current = null;
      recognitionRef.current = null;
    };

    try {
      rec.start();
      recognitionRef.current = rec;
      setListening(true);
    } catch (err) {
      // start() throws if already running — ignore
      setListening(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    try { recognitionRef.current?.stop?.(); } catch {}
  }, []);

  return (
    <Ctx.Provider
      value={{
        enabled,
        speaking,
        available,
        toggleEnabled,
        setEnabled,
        speak,
        stop,
        listening,
        recognitionAvailable,
        startListening,
        stopListening,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
