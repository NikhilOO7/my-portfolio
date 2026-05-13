export type JarvisAction =
  | 'toggle-chat'
  | 'toggle-music'
  | 'toggle-voice'
  | 'toggle-palette'
  | 'toggle-diagnostics'
  | 'cycle-suit';

export interface JarvisCommand {
  id: string;
  label: string;
  hint: string;
  route?: string;
  action?: JarvisAction;
  accent: string;
  keywords: string[];
  group: 'navigate' | 'engage' | 'system';
  /** Optional keyboard shortcut hint, e.g. "⌘K" */
  shortcut?: string;
  /** A representative phrase the user can speak to trigger this command */
  speakExample?: string;
}

export const JARVIS_COMMANDS: JarvisCommand[] = [
  // ── NAVIGATION ────────────────────────────────────────────────────
  {
    id: 'console',
    label: 'Return to Console',
    hint: 'home · JARVIS prompt',
    route: '/',
    accent: '#00d4ff',
    keywords: ['home', 'console', 'back', 'start', 'main', 'return'],
    group: 'navigate',
    speakExample: '"return to console"',
  },
  {
    id: 'dossier',
    label: 'Subject Dossier',
    hint: 'biography · professional · education',
    route: '/about',
    accent: '#00d4ff',
    keywords: [
      'about',
      'who',
      'dossier',
      'bio',
      'background',
      'experience',
      'career',
      'history',
      'profile',
      'nikhil',
    ],
    group: 'navigate',
    speakExample: '"show me his dossier"',
  },
  {
    id: 'archive',
    label: 'Project Archive',
    hint: '12 entries · 3 featured',
    route: '/projects',
    accent: '#06b6d4',
    keywords: [
      'project',
      'projects',
      'archive',
      'work',
      'portfolio',
      'built',
      'shipped',
      'cases',
      'studies',
      'recome',
      'gaussian',
      'voice',
    ],
    group: 'navigate',
    speakExample: '"show his projects"',
  },
  {
    id: 'matrix',
    label: 'Capabilities Matrix',
    hint: '32 verified competencies',
    route: '/skills',
    accent: '#a855f7',
    keywords: [
      'skill',
      'skills',
      'capabilit',
      'tech',
      'stack',
      'tools',
      'matrix',
      'expert',
      'know',
      'knowledge',
      'language',
      'framework',
    ],
    group: 'navigate',
    speakExample: '"view his capabilities"',
  },
  {
    id: 'channel',
    label: 'Open Channel',
    hint: 'direct communication',
    route: '/contact',
    accent: '#fbbf24',
    keywords: [
      'contact',
      'email',
      'reach',
      'message',
      'channel',
      'hire',
      'engage',
      'connect',
      'call',
      'phone',
      'consult',
    ],
    group: 'navigate',
    speakExample: '"open a channel"',
  },

  // ── ENGAGEMENT ────────────────────────────────────────────────────
  {
    id: 'conversation',
    label: 'Engage Conversation',
    hint: 'open chat window',
    action: 'toggle-chat',
    accent: '#06b6d4',
    keywords: ['chat', 'talk', 'conversation', 'discuss', 'ask', 'question'],
    group: 'engage',
    speakExample: '"open conversation"',
  },

  // ── SYSTEM ────────────────────────────────────────────────────────
  {
    id: 'ambient-audio',
    label: 'Ambient Audio',
    hint: 'toggle background audio',
    action: 'toggle-music',
    accent: '#a855f7',
    keywords: ['music', 'audio', 'sound', 'ambient', 'play', 'song', 'pause', 'silence'],
    group: 'system',
    speakExample: '"play ambient audio"',
  },
  {
    id: 'voice-systems',
    label: 'Voice Systems',
    hint: 'toggle JARVIS speech',
    action: 'toggle-voice',
    accent: '#fbbf24',
    keywords: ['voice', 'speak', 'speech', 'silent', 'mute', 'unmute', 'narration'],
    group: 'system',
    speakExample: '"toggle voice"',
  },
  {
    id: 'registry',
    label: 'Command Registry',
    hint: 'list every command',
    action: 'toggle-palette',
    accent: '#00d4ff',
    keywords: ['help', 'commands', 'registry', 'palette', 'menu', 'options'],
    group: 'system',
    shortcut: '⌘P',
    speakExample: '"show commands"',
  },
  {
    id: 'diagnostics',
    label: 'System Diagnostics',
    hint: 'toggle SYS·DIAG widget',
    action: 'toggle-diagnostics',
    accent: '#06b6d4',
    keywords: ['diagnostics', 'diag', 'sysdiag', 'metrics', 'cpu', 'mem', 'hide diagnostics', 'show diagnostics'],
    group: 'system',
    speakExample: '"toggle diagnostics"',
  },
  {
    id: 'suit',
    label: 'Change Suit',
    hint: 'cycle hologram palette',
    action: 'cycle-suit',
    accent: '#fbbf24',
    keywords: ['suit', 'armor', 'hologram', 'theme', 'colour', 'color', 'mark', 'stealth', 'war machine'],
    group: 'system',
    speakExample: '"change suit"',
  },
];

export function matchJarvisCommand(input: string): JarvisCommand | null {
  const lower = input.toLowerCase().trim();
  if (!lower) return null;
  const tokens = lower.split(/\s+/);
  let best: { cmd: JarvisCommand; score: number } | null = null;
  for (const cmd of JARVIS_COMMANDS) {
    let score = 0;
    for (const kw of cmd.keywords) {
      if (lower.includes(kw)) score += 2;
      else if (tokens.some(t => kw.startsWith(t) && t.length >= 3)) score += 1;
    }
    if (lower.includes(cmd.label.toLowerCase())) score += 3;
    if (score > 0 && (!best || score > best.score)) best = { cmd, score };
  }
  return best?.cmd ?? null;
}
