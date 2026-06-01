/**
 * Hand-curated project complexity ranking.
 *
 * Pure RAG can't answer "what's the most complex project?" — top-K
 * retrieval pulls a couple of projects, never the whole set. This card
 * is the ground truth: every project scored across 5 dimensions and
 * ranked, with one-line reasoning. Edit this when projects change.
 *
 * Dimensions (each 1–5):
 *   • scale     — concurrent users / req·s / data volume
 *   • agents    — count of distinct LLM agents / pipelines
 *   • infra     — infra novelty (event-driven, multi-tenant, low-latency)
 *   • latency   — strictness of latency budget
 *   • novelty   — research-y / unusual techniques
 */
import type { AggregateCard } from '../types';

interface RankedProject {
  id: string;
  name: string;
  scale: number;
  agents: number;
  infra: number;
  latency: number;
  novelty: number;
  why: string;
}

const RANKED: RankedProject[] = [
  {
    id: 'voice-document-intelligence',
    name: 'Donna — Voice Document Intelligence Platform',
    scale: 4, agents: 5, infra: 5, latency: 5, novelty: 4,
    why:
      'Shipped 0→1, orchestrates 15 specialized agents behind a uniform contract, hybrid RAG over Qdrant with reciprocal-rank fusion, real-time voice pipeline (LiveKit + Deepgram + Cartesia) under a sub-200ms perceived-latency budget, replica-independent WebSocket fan-out over Redis pub/sub. The hardest combination — real-time voice, multi-agent orchestration, and production RAG — in one system.',
  },
  {
    id: 'neurologyca-coaching-platform',
    name: 'Neurologyca AI Coaching Platform (current)',
    scale: 4, agents: 5, infra: 5, latency: 4, novelty: 5,
    why:
      'Production multi-agent AI coaching platform on GCP Cloud Run fusing biometric/HCI signal processing with a coordinator-orchestrated 6-agent DAG and the Mnemosyne memory architecture (semantic retrieval + temporal-decay lifecycle, context-scoped per user and domain). Pipeline re-architected from 36s to 9.5s (−73%). Plus 32-op Python + JS SDKs and a parallel Gemini Live voice sidecar. Closest match in novelty (biometric fusion) and infra to Donna.',
  },
  {
    id: 'recome',
    name: 'RecoMe — Personalized Recommendation Engine',
    scale: 3, agents: 4, infra: 5, latency: 3, novelty: 4,
    why:
      'Capture → signal → graph → agent → surface pipeline across 15+ data sources into a typed Neo4j interest graph plus Qdrant per-user vectors, streamed over SSE. The Guardian gate is the clever part — a hard $0.10/user/day LLM cost cap with prompt-injection-resistant scoring (LLM writes prose, never the verdict) on BullMQ workers with idempotent Stripe metering. Multi-tenant IaaS surface on one backend.',
  },
  {
    id: 'manifold-strata',
    name: 'Manifold Strata — Geometric Low-LLM Retrieval Engine',
    scale: 2, agents: 3, infra: 3, latency: 2, novelty: 5,
    why:
      'Highest novelty by far — concepts live in hyperbolic (Poincaré) space for hierarchy-aware similarity, retrieval via HippoRAG-style Personalized PageRank, entity resolution and validation done in embedding/rule space to cut LLM calls. Exposed to AI clients as an MCP server. Not as much scale or latency pressure as Donna, but more researchy and rare.',
  },
  {
    id: 'progcap-fintech',
    name: 'Progcap underwriting & transaction backbone (career)',
    scale: 5, agents: 0, infra: 5, latency: 5, novelty: 3,
    why:
      'Cut decision latency 8.7s → 890ms (−90%) and load-tested to ~22K events/sec at the event tier with exactly-once disbursement via idempotency-keyed bank/NPCI calls, partitioned Kafka consumers, append-only ledger, XGBoost credit scoring as an isolated service. Highest scale and latency stakes (real money moving) of anything on the list.',
  },
  {
    id: 'knowledge-graph-application',
    name: 'Knowledge Graph Application',
    scale: 2, agents: 4, infra: 2, latency: 2, novelty: 3,
    why:
      'Document-ingestion system with automatic context routing — embedding similarity + LLM tie-breaker decides append-to-existing vs. create-new bucket per upload. LangGraph state machine drives a CrewAI crew, per-bucket inferred ontology. Smart routing logic but smaller scale than the platforms above.',
  },
  {
    id: 'times-internet',
    name: 'Times Internet TOI+ subscription platform (career)',
    scale: 5, agents: 0, infra: 4, latency: 4, novelty: 2,
    why:
      '8.4M daily requests with sub-ms entitlement checks (JWT + Redis), 70+ city portals migrated via strangler-fig from XML/XSLT to React micro-frontends with per-portal feature flags. Real-time Kafka pipeline feeding the Signals personalization engine (≈9% CTR lift). High scale, smart rollout strategy.',
  },
];

const TOTAL = (r: RankedProject) => r.scale + r.agents + r.infra + r.latency + r.novelty;

function buildBody(): string {
  const sorted = [...RANKED].sort((a, b) => TOTAL(b) - TOTAL(a));
  const lines: string[] = [];
  lines.push(
    'Project complexity ranking (scored across scale, agent count, infra novelty, latency budget, and technical novelty — each 1–5, total /25):'
  );
  sorted.forEach((p, i) => {
    lines.push(
      `${i + 1}. ${p.name} — ${TOTAL(p)}/25 ` +
      `(scale ${p.scale} · agents ${p.agents} · infra ${p.infra} · latency ${p.latency} · novelty ${p.novelty}). ${p.why}`
    );
  });
  lines.push(
    'When asked "most complex", answer with #1 and one sentence on why. ' +
    'If the visitor asks for runners-up, give #2 and #3.'
  );
  return lines.join('\n');
}

export const complexityRankingCard: AggregateCard = {
  id: 'complexity_ranking',
  title: 'PROJECT COMPLEXITY RANKING (hand-scored)',
  body: buildBody(),
  triggers: [
    /\b(most|biggest|hardest|toughest|complex|complicated|sophisticated|advanced|challenging)\b/i,
    /\bwhich (?:project|work|build)\b/i,
    /\bhardest\b/i,
    /\bproudest\b/i,
    /\bfavorite\b/i,
  ],
};
