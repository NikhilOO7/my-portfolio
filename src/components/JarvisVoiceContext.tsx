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
  // Preference order — neural/natural voices first (these are *dramatically*
  // more human-sounding than the legacy formant-synthesis ones), then
  // enhanced/premium British males which best match the JARVIS film delivery.
  const tests: ((v: SpeechSynthesisVoice) => boolean)[] = [
    // Microsoft Online (Natural) — Edge's neural voices. By far the most human.
    v => /\bonline\b.*\(natural\)/i.test(v.name) && /ryan|guy|brian|tony|adam|davis|jason/i.test(v.name) && v.lang.startsWith('en'),
    v => /\(natural\)/i.test(v.name) && v.lang === 'en-GB',
    v => /\(natural\)/i.test(v.name) && v.lang.startsWith('en'),
    // Google neural voices (Chrome desktop)
    v => /^google.*(uk|british).*male/i.test(v.name),
    v => /^google us english/i.test(v.name) && /male/i.test(v.name),
    // macOS enhanced/premium variants — neural-grade on Apple silicon
    v => /(daniel|oliver|arthur|tom).*\((enhanced|premium)\)/i.test(v.name),
    v => /\((enhanced|premium)\)/i.test(v.name) && v.lang === 'en-GB',
    v => /\((enhanced|premium)\)/i.test(v.name) && v.lang.startsWith('en'),
    // Standard British male voices
    v => /^daniel$/i.test(v.name) && v.lang.startsWith('en'),
    v => /\b(oliver|arthur|george|jamie)\b/i.test(v.name) && v.lang.startsWith('en'),
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

// Pre-process text for natural pronunciation. The TTS engine spells out
// "J.A.R.V.I.S" letter-by-letter; substituting the word makes it speak "Jarvis"
// as a single token. Also expands a few abbreviations that read oddly.
function humanizeForSpeech(input: string): string {
  return input
    .replace(/\bJ\.A\.R\.V\.I\.S\.?/g, 'Jarvis')
    .replace(/\bF\.R\.I\.D\.A\.Y\.?/g, 'Friday')
    .replace(/\bA\.I\.?\b/g, 'AI')
    .replace(/\bU\.K\.?\b/g, 'UK')
    .replace(/\bU\.S\.?\b/g, 'US');
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

  // Cloud TTS playback state. Each queue item carries its own AbortController
  // so interrupt() can yank in-flight fetches without affecting newer ones.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const queueRef = useRef<{ text: string; controller: AbortController }[]>([]);
  const processingRef = useRef(false);

  const stopAll = useCallback(() => {
    queueRef.current.forEach(item => item.controller.abort());
    queueRef.current = [];
    if (audioRef.current) {
      try { audioRef.current.pause(); } catch {}
      audioRef.current = null;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }, []);

  const playWebSpeech = (text: string): Promise<void> =>
    new Promise(resolve => {
      if (typeof window === 'undefined' || !window.speechSynthesis) return resolve();
      const synth = window.speechSynthesis;
      const utt = new SpeechSynthesisUtterance(text);
      if (voiceRef.current) utt.voice = voiceRef.current;
      utt.rate = 0.95;
      utt.pitch = 0.92;
      utt.volume = 0.7;
      utt.onstart = () => setSpeaking(true);
      utt.onend = () => { setSpeaking(false); resolve(); };
      utt.onerror = () => { setSpeaking(false); resolve(); };
      synth.speak(utt);
    });

  const playOne = (text: string, controller: AbortController): Promise<void> =>
    new Promise(async resolve => {
      const done = () => { setSpeaking(false); resolve(); };
      try {
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
          signal: controller.signal,
        });
        if (controller.signal.aborted || !enabledRef.current) return done();
        if (!res.ok) throw new Error(`tts-${res.status}`);
        const blob = await res.blob();
        if (controller.signal.aborted || !enabledRef.current) return done();

        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.volume = 0.95;
        audioRef.current = audio;

        const cleanup = () => {
          URL.revokeObjectURL(url);
          if (audioRef.current === audio) audioRef.current = null;
          done();
        };
        audio.onplay = () => setSpeaking(true);
        audio.onended = cleanup;
        audio.onerror = cleanup;
        controller.signal.addEventListener('abort', () => {
          try { audio.pause(); } catch {}
          cleanup();
        });
        await audio.play();
      } catch (err) {
        if (controller.signal.aborted || !enabledRef.current) return done();
        // Cloud TTS unavailable — fall back to the browser's voice.
        await playWebSpeech(text);
        done();
      }
    });

  const processQueue = useCallback(async () => {
    if (processingRef.current) return;
    processingRef.current = true;
    while (queueRef.current.length > 0 && enabledRef.current) {
      const item = queueRef.current.shift()!;
      if (item.controller.signal.aborted) continue;
      await playOne(item.text, item.controller);
    }
    processingRef.current = false;
  }, []);

  const setEnabled = useCallback((v: boolean) => {
    setEnabledState(v);
    try { localStorage.setItem(STORAGE_KEY, v ? '1' : '0'); } catch {}
    if (!v) stopAll();
  }, [stopAll]);

  const toggleEnabled = useCallback(() => {
    setEnabled(!enabledRef.current);
  }, [setEnabled]);

  const speak = useCallback((text: string, opts?: { interrupt?: boolean }) => {
    if (!enabledRef.current) return;
    if (typeof window === 'undefined') return;
    const spoken = humanizeForSpeech(text);
    if (!spoken.trim()) return;

    if (opts?.interrupt !== false) stopAll();
    queueRef.current.push({ text: spoken, controller: new AbortController() });
    processQueue();
  }, [stopAll, processQueue]);

  const stop = useCallback(() => {
    stopAll();
  }, [stopAll]);

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

    // Halt any in-flight TTS (cloud audio or Web Speech) so the mic doesn't hear JARVIS.
    stopAll();

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
  }, [stopAll]);

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
