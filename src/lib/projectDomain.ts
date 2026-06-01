/**
 * Helpers that turn a portfolio Project into JARVIS "mission file" metadata:
 * file number, status, classification, key metric, and domain tags for
 * filtering. Derives everything from the existing tags/achievements so we
 * don't need to re-author any project data.
 */
import type { Project } from '@/data/projects';

export type DomainId =
  | 'all'
  | 'ai'
  | 'voice-rag'
  | 'ml-data'
  | 'fintech'
  | 'fullstack'
  | 'backend'
  | 'real-time';

interface DomainSpec {
  id: DomainId;
  label: string;
  accent: string;
  match: (project: Project) => boolean;
}

const tagSet = (p: Project) => new Set([...p.tags, ...p.techStack].map(t => t.toLowerCase()));

export const DOMAINS: DomainSpec[] = [
  {
    id: 'all',
    label: 'All Archives',
    accent: '#00d4ff',
    match: () => true,
  },
  {
    id: 'ai',
    label: 'AI · LLM',
    accent: '#a855f7',
    match: p => {
      const t = tagSet(p);
      return ['ai', 'llm', 'gpt-4o', 'multi-agent', 'rag', 'crewai', 'langchain', 'langgraph', 'llamaindex', 'agentic', 'agentic workflows', 'agentic systems'].some(k => t.has(k));
    },
  },
  {
    id: 'voice-rag',
    label: 'Voice · RAG',
    accent: '#06b6d4',
    match: p => {
      const t = tagSet(p);
      return ['voice ai', 'voice', 'rag', 'webrtc', 'livekit', 'deepgram', 'cartesia'].some(k => t.has(k));
    },
  },
  {
    id: 'ml-data',
    label: 'ML · Data',
    accent: '#fbbf24',
    match: p => {
      const t = tagSet(p);
      return ['machine learning', 'data science', 'ml', 'fraud detection', 'pytorch', 'scikit-learn', 'xgboost', 'pandas', 'numpy', 'behavioral analytics', 'mlops'].some(k => t.has(k));
    },
  },
  {
    id: 'fintech',
    label: 'Fintech',
    accent: '#22c55e',
    match: p => {
      const t = tagSet(p);
      return ['fintech', 'trading', 'fraud detection', 'stripe'].some(k => t.has(k));
    },
  },
  {
    id: 'real-time',
    label: 'Real-Time',
    accent: '#f97316',
    match: p => {
      const t = tagSet(p);
      return ['real-time', 'webrtc', 'websocket', 'socket.io', 'livekit'].some(k => t.has(k));
    },
  },
  {
    id: 'fullstack',
    label: 'Full-Stack',
    accent: '#3b82f6',
    match: p => {
      const t = tagSet(p);
      return ['full-stack', 'fullstack', 'saas', 'business'].some(k => t.has(k));
    },
  },
  {
    id: 'backend',
    label: 'Backend',
    accent: '#ec4899',
    match: p => {
      const t = tagSet(p);
      return ['fastapi', 'node.js', 'express', 'spring boot', 'java', 'kafka', 'postgresql', 'mongodb', 'redis', 'qdrant'].some(k => t.has(k));
    },
  },
];

export function filterProjectsByDomain(projects: Project[], domainId: DomainId): Project[] {
  const spec = DOMAINS.find(d => d.id === domainId);
  if (!spec || domainId === 'all') return projects;
  return projects.filter(p => spec.match(p));
}

// ─────────────────────────────────────────────────────────────────────────
// Classification (CLASS::ALPHA / BETA / GAMMA / OPS) derived from domain.
// ─────────────────────────────────────────────────────────────────────────

export function classificationFor(p: Project): { tier: string; accent: string } {
  const t = tagSet(p);
  // ALPHA = production AI infrastructure / multi-agent
  if (['multi-agent', 'voice ai', 'rag', 'llm'].some(k => t.has(k))) {
    return { tier: 'ALPHA', accent: '#a855f7' };
  }
  // BETA = fintech / production backend
  if (['fintech', 'trading', 'fraud detection'].some(k => t.has(k))) {
    return { tier: 'BETA', accent: '#22c55e' };
  }
  // GAMMA = research / ML / data
  if (['data science', 'research', 'machine learning', 'ethics', 'mlops'].some(k => t.has(k))) {
    return { tier: 'GAMMA', accent: '#fbbf24' };
  }
  return { tier: 'OPS', accent: '#00d4ff' };
}

export function statusFor(p: Project): { label: string; accent: string } {
  if (p.featured) return { label: 'ACTIVE', accent: '#22c55e' };
  return { label: 'ARCHIVED', accent: '#94a3b8' };
}

// ─────────────────────────────────────────────────────────────────────────
// Key metric extraction — find the first numeric-bearing achievement, pull
// out the number and a short label. Falls back to null if nothing matches.
// ─────────────────────────────────────────────────────────────────────────

const METRIC_RE = /(?:<\s*)?(\d[\d,.]*)(\s*\+|%|x|×|ms|s\b|tps|gb|mb|k|M|cr|kw)?/i;

export interface KeyMetric {
  value: string;
  label: string;
}

export function keyMetricFor(p: Project): KeyMetric | null {
  for (const a of p.achievements) {
    const m = a.match(METRIC_RE);
    if (!m) continue;
    const value = m[0].replace(/\s+/g, '').toUpperCase();
    // Take the chunk after the match up to a comma or period for the label.
    const idx = a.indexOf(m[0]) + m[0].length;
    const rest = a.substring(idx).trim();
    const label = rest
      .replace(/^[%+\-x×]/, '')
      .replace(/^(?:in\s|with\s|of\s|for\s|to\s)/i, '')
      .split(/[.,;]|\bthrough\b|\busing\b|\bvia\b/)[0]
      .trim()
      .toUpperCase()
      .slice(0, 32);
    return { value, label: label || 'IMPACT' };
  }
  return null;
}

export function fileNumberFor(index: number): string {
  return `FILE-${String(index + 1).padStart(3, '0')}`;
}

// ─────────────────────────────────────────────────────────────────────────
// Schematic classifier — maps a project to the JARVIS visualisation that
// best represents what it does (replaces the photographic hero image).
// ─────────────────────────────────────────────────────────────────────────

export type SchematicType =
  // Per-project specific
  | 'voice'
  | 'recommend'
  | 'graph'
  | 'manifold'
  | 'multi-agent-3'
  | 'chat-sentiment'
  | 'trading'
  | 'anomaly'
  | 'collab'
  | 'bias'
  | 'saas'
  | 'pipeline'
  | 'weather'
  // Generic fallbacks
  | 'agentic'
  | 'ml'
  | 'fintech'
  | 'realtime'
  | 'fullstack'
  | 'default';

/**
 * Per-project schematic overrides — each project gets a visualisation that
 * actually represents what it does, instead of a generic domain shape.
 * Add new entries here when projects are added.
 */
const PROJECT_SCHEMATIC: Record<string, SchematicType> = {
  'voice-document-intelligence': 'voice',
  'recome-recommendation-engine': 'recommend',
  'knowledge-graph-application': 'graph',
  'manifold-strata': 'manifold',
  'gaussian-splatting-knowledge-graph': 'graph',
  'nexus-chatbot': 'multi-agent-3',
  'conversational-ai-chatbot': 'chat-sentiment',
  'trading-platform': 'trading',
  'financial-data-anomaly-detection': 'anomaly',
  'collabhub': 'collab',
  'llm-bias-analyzer': 'bias',
  'ai-saas-chatbot': 'saas',
  'ml-data-cleaning': 'pipeline',
  'weather-app': 'weather',
};

export function schematicFor(p: Project): SchematicType {
  const explicit = PROJECT_SCHEMATIC[p.id];
  if (explicit) return explicit;
  // Fallback to domain-based heuristic (so new projects still render something)
  const t = tagSet(p);
  if (['voice ai', 'voice', 'rag', 'multimodal rag'].some(k => t.has(k))) return 'voice';
  if (['knowledge graph', 'graph'].some(k => t.has(k))) return 'graph';
  if (['multi-agent', 'agentic', 'agentic systems', 'agentic workflows', 'llm', 'ai'].some(k => t.has(k))) return 'agentic';
  if (['fraud detection', 'trading', 'fintech'].some(k => t.has(k))) return 'fintech';
  if (['real-time', 'webrtc', 'collaboration'].some(k => t.has(k))) return 'realtime';
  if (['machine learning', 'ml', 'data science', 'mlops', 'automation'].some(k => t.has(k))) return 'ml';
  if (['full-stack', 'fullstack', 'saas', 'business'].some(k => t.has(k))) return 'fullstack';
  return 'default';
}
