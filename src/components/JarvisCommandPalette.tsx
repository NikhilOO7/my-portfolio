'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, CornerDownLeft } from 'lucide-react';
import { useJarvisSystem } from '@/components/JarvisSystemContext';
import { useJarvisVoice } from '@/components/JarvisVoiceContext';
import { useJarvisDispatcher } from '@/lib/useJarvisDispatcher';
import { JARVIS_COMMANDS, JarvisCommand } from '@/lib/jarvisCommands';
import HUDFrame from '@/components/ui/HUDFrame';

const GROUP_META: Record<JarvisCommand['group'], { label: string; accent: string }> = {
  navigate: { label: 'Navigation', accent: '#00d4ff' },
  engage: { label: 'Engagement', accent: '#06b6d4' },
  system: { label: 'System', accent: '#fbbf24' },
};

export default function JarvisCommandPalette() {
  const { paletteOpen, setPaletteOpen } = useJarvisSystem();
  const { enabled: voiceEnabled, listening } = useJarvisVoice();
  const dispatch = useJarvisDispatcher();
  const [filter, setFilter] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Global Cmd/Ctrl+P toggles the palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setPaletteOpen(!paletteOpen);
      }
      if (e.key === 'Escape' && paletteOpen) {
        e.preventDefault();
        setPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paletteOpen, setPaletteOpen]);

  useEffect(() => {
    if (paletteOpen) {
      setFilter('');
      setActiveIndex(0);
      window.setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [paletteOpen]);

  const filtered = useMemo(() => {
    if (!filter.trim()) return JARVIS_COMMANDS;
    const q = filter.toLowerCase();
    return JARVIS_COMMANDS.filter(cmd =>
      cmd.label.toLowerCase().includes(q) ||
      cmd.hint.toLowerCase().includes(q) ||
      cmd.keywords.some(k => k.includes(q))
    );
  }, [filter]);

  const grouped = useMemo(() => {
    const groups: Record<string, JarvisCommand[]> = {};
    for (const cmd of filtered) {
      if (!groups[cmd.group]) groups[cmd.group] = [];
      groups[cmd.group].push(cmd);
    }
    return groups;
  }, [filtered]);

  // Flat ordered list (matches visual order) for arrow-key navigation
  const orderedFlat = useMemo(() => {
    const order: JarvisCommand['group'][] = ['navigate', 'engage', 'system'];
    return order.flatMap(g => grouped[g] ?? []);
  }, [grouped]);

  useEffect(() => {
    if (activeIndex >= orderedFlat.length) setActiveIndex(0);
  }, [activeIndex, orderedFlat.length]);

  const execute = (cmd: JarvisCommand) => {
    dispatch(cmd);
    // Palette closes after navigation; for action commands, keep open so user can run more
    if (cmd.route) setPaletteOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(orderedFlat.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = orderedFlat[activeIndex];
      if (cmd) execute(cmd);
    }
  };

  return (
    <AnimatePresence>
      {paletteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-start justify-center pt-24 px-4"
          onClick={() => setPaletteOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-jarvis-dark-900/80 backdrop-blur-md" />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative w-full max-w-2xl"
            onClick={e => e.stopPropagation()}
          >
            <HUDFrame accent="#00d4ff" cornerSize={16} showScan className="bg-jarvis-dark-700/95">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.06) 0%, rgba(0, 8, 20, 0.55) 100%)' }}
              />

              {/* Header */}
              <div className="relative px-5 pt-5 pb-3 border-b border-jarvis-cyan/15">
                <div className="flex items-center justify-between mb-3 font-mono text-[10px] tracking-[0.35em] uppercase">
                  <span className="text-jarvis-cyan inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-jarvis-cyan animate-corner-pulse" />
                    JARVIS · Command Registry
                  </span>
                  <button
                    onClick={() => setPaletteOpen(false)}
                    className="text-jarvis-blue-300/50 hover:text-jarvis-cyan transition-colors"
                    aria-label="Close palette"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-3 font-mono">
                  <Search className="w-4 h-4 text-jarvis-cyan/70" />
                  <input
                    ref={inputRef}
                    value={filter}
                    onChange={e => { setFilter(e.target.value); setActiveIndex(0); }}
                    onKeyDown={onKeyDown}
                    placeholder="Search commands or describe what you want…"
                    className="flex-1 bg-transparent outline-none text-sm text-gray-100 placeholder:text-gray-500 placeholder:text-xs sm:placeholder:text-sm tracking-wide"
                    aria-label="Search JARVIS commands"
                  />
                  <span className="hidden sm:inline-flex items-center gap-2 text-[10px] tracking-widest uppercase text-jarvis-blue-300/50">
                    <span className="px-1.5 py-0.5 rounded-sm border border-jarvis-cyan/30">↑↓</span>
                    <span className="px-1.5 py-0.5 rounded-sm border border-jarvis-cyan/30 inline-flex items-center gap-1">
                      <CornerDownLeft className="w-3 h-3" /> exec
                    </span>
                    <span className="px-1.5 py-0.5 rounded-sm border border-jarvis-cyan/30">esc</span>
                  </span>
                </div>

                {/* Quick status line */}
                <div className="mt-2 flex items-center gap-4 font-mono text-[9px] tracking-widest uppercase">
                  <span className={voiceEnabled ? 'text-jarvis-gold-400' : 'text-jarvis-blue-300/50'}>
                    voice {voiceEnabled ? 'on' : 'off'}
                  </span>
                  <span className={listening ? 'text-red-400' : 'text-jarvis-blue-300/50'}>
                    mic {listening ? 'live' : 'idle'}
                  </span>
                  <span className="text-jarvis-blue-300/50">
                    {filtered.length} command{filtered.length === 1 ? '' : 's'}
                  </span>
                </div>
              </div>

              {/* Command list */}
              <div className="relative max-h-[60vh] overflow-y-auto px-3 py-3">
                {orderedFlat.length === 0 ? (
                  <div className="px-3 py-6 text-center font-mono text-sm text-gray-500">
                    No matching commands. Try a different keyword.
                  </div>
                ) : (
                  (['navigate', 'engage', 'system'] as const).map(groupKey => {
                    const list = grouped[groupKey];
                    if (!list?.length) return null;
                    const meta = GROUP_META[groupKey];
                    return (
                      <div key={groupKey} className="mb-3 last:mb-0">
                        <div
                          className="px-3 mb-1.5 font-mono text-[9px] tracking-[0.35em] uppercase"
                          style={{ color: meta.accent, opacity: 0.7 }}
                        >
                          › {meta.label}
                        </div>
                        <ul>
                          {list.map(cmd => {
                            const flatIndex = orderedFlat.findIndex(c => c.id === cmd.id);
                            const active = flatIndex === activeIndex;
                            return (
                              <li key={cmd.id}>
                                <button
                                  onMouseEnter={() => setActiveIndex(flatIndex)}
                                  onClick={() => execute(cmd)}
                                  className="w-full text-left px-3 py-2.5 rounded-sm transition-all flex items-start gap-3 group"
                                  style={
                                    active
                                      ? {
                                          backgroundColor: `${cmd.accent}1a`,
                                          borderLeft: `2px solid ${cmd.accent}`,
                                          boxShadow: `inset 0 0 18px -8px ${cmd.accent}`,
                                        }
                                      : { borderLeft: '2px solid transparent' }
                                  }
                                >
                                  <span
                                    className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                    style={{
                                      backgroundColor: cmd.accent,
                                      boxShadow: active ? `0 0 6px ${cmd.accent}` : 'none',
                                    }}
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline justify-between gap-3">
                                      <span className="font-display text-sm sm:text-base text-white tracking-wide">
                                        {cmd.label}
                                      </span>
                                      <div className="flex items-center gap-2 flex-shrink-0">
                                        {cmd.shortcut && (
                                          <span
                                            className="font-mono text-[10px] tracking-widest px-1.5 py-0.5 rounded-sm border"
                                            style={{
                                              borderColor: `${cmd.accent}44`,
                                              color: cmd.accent,
                                            }}
                                          >
                                            {cmd.shortcut}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    <div className="mt-0.5 text-[11px] text-gray-400 font-mono">
                                      {cmd.hint}
                                      {cmd.speakExample && (
                                        <span className="ml-2 italic text-jarvis-blue-300/40">
                                          · say {cmd.speakExample}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="relative px-5 py-2.5 border-t border-jarvis-cyan/15 font-mono text-[9px] tracking-widest uppercase text-jarvis-blue-300/50 flex items-center justify-between">
                <span>Speak · Click · Type — all accepted</span>
                <span>⌘P toggle</span>
              </div>
            </HUDFrame>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
