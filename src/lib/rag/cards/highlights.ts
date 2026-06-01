/**
 * Hand-curated "interesting facts" card.
 *
 * "Tell me something interesting about Nikhil" has no semantic signal —
 * RAG can't possibly pick the right chunks. So this card is a human-
 * authored short-list of the most memorable, narrative-worthy facts —
 * the things a recruiter or peer would screenshot and share.
 *
 * Edit freely. Order matters: when the bot needs to pick ONE, it picks
 * from the top, then varies by recent conversation context.
 */
import type { AggregateCard } from '../types';

interface Highlight {
  hook: string;       // short headline framing
  detail: string;     // the substance
  tags: string[];     // routing hints; not user-visible
}

const HIGHLIGHTS: Highlight[] = [
  {
    hook: 'Cut a 6-agent AI pipeline from 36 seconds to 9.5 seconds — a 73% latency drop',
    detail:
      'On the current Neurologyca contract, re-architected a serial multi-agent pipeline into a coordinator-orchestrated DAG with prompt consolidation, model tiering, and async parallel execution. Most teams chase 10% wins; he found a 73% one by changing the shape, not the model.',
    tags: ['ai', 'latency', 'orchestration', 'production'],
  },
  {
    hook: 'Put a knowledge graph into hyperbolic (Poincaré-disk) space',
    detail:
      'Manifold Strata represents concepts in hyperbolic geometry — parents near the disk center, children near the boundary — for hierarchy-aware similarity. Combined with HippoRAG-style Personalized PageRank, it cuts LLM calls roughly 68% versus the naive pipeline. Geometric ML is rare in production portfolios.',
    tags: ['ai', 'research', 'geometric-ml', 'manifold'],
  },
  {
    hook: 'Built a Guardian gate that enforces a hard $0.10/user/day LLM cost cap',
    detail:
      'On RecoMe, five background agents run behind one Guardian that throttles, schedules quiet hours, and uses a prompt-injection-resistant scorer — the LLM writes prose only, never the verdict. Idempotent Stripe metering on BullMQ workers means runaway costs are structurally impossible, not just monitored.',
    tags: ['ai', 'cost-control', 'design', 'recome'],
  },
  {
    hook: 'Took a fintech underwriting flow from 8.7 seconds to 890 milliseconds — 90% faster',
    detail:
      'At Progcap, parallelized serial KYC / fraud / credit-score checks, added compound indexes plus Redis caching with connection pooling, and load-tested the event tier to ~22K events/second with exactly-once disbursement via idempotency-keyed bank/NPCI calls and partitioned Kafka consumers. Real money was moving on this hot path.',
    tags: ['fintech', 'latency', 'reliability', 'progcap'],
  },
  {
    hook: 'Built Donna 0→1 — AI meeting intelligence with 15 specialized agents and sub-200ms voice',
    detail:
      'Donna is end-to-end shipped: pre-meeting research, live in-meeting assistance, post-meeting synthesis. 3-phase architecture orchestrating 15 agents behind a uniform contract. Hybrid contextual RAG over Qdrant (vector + keyword + reciprocal-rank fusion, ~40% relevance lift). Real-time voice on LiveKit + Deepgram + Cartesia with replica-independent WebSocket fan-out over Redis pub/sub.',
    tags: ['ai', 'voice', 'rag', 'donna'],
  },
  {
    hook: 'Scaled a subscription platform to 8.4M daily requests at Times Internet',
    detail:
      'TOI+ subscription & paywall services with JWT auth and Redis-cached entitlements (sub-millisecond checks). Migrated 70+ legacy XML/XSLT city portals to React micro-frontends via a strangler-fig rollout (old + new in parallel, per-portal feature flags, stable API contracts) reaching ~92/100 Lighthouse with instant rollback.',
    tags: ['scale', 'fullstack', 'frontend', 'times-internet'],
  },
  {
    hook: 'Designed accessibility tooling for blind researchers — validated with the lab PI',
    detail:
      'At Northeastern\'s Minkara Computational Lab, built tactile-graphics generation from molecular coordinates and screen-reader / sonification integrations. Validated with visually impaired users including the lab principal investigator, who is blind. Most engineers will never test code with the people it\'s actually for.',
    tags: ['accessibility', 'research', 'human-centered', 'northeastern'],
  },
  {
    hook: 'Shipped 32 SDK operations across Python and JavaScript for the Neurologyca platform',
    detail:
      'Both SDKs cover orchestration, memory, analytics, sessions, and BYOD multi-tenant infrastructure — with CI/CD, audit logging, signed webhook delivery, circuit breakers, and graceful shutdown. The platform exposes itself uniformly to both ecosystems, not just one.',
    tags: ['sdk', 'platform', 'neurologyca'],
  },
  {
    hook: 'Designed the Mnemosyne memory architecture for context that cannot leak across users',
    detail:
      'Semantic retrieval (embeddings + vector search) with a Core → Dream → Forgotten → Deleted temporal-decay lifecycle, bucketed per user and per domain (career, networking, job-search, learning, productivity). Five lanes, each isolated. Privacy is a property of the architecture, not a policy.',
    tags: ['ai', 'memory', 'privacy', 'neurologyca'],
  },
  {
    hook: 'Six years of production engineering across fintech, media, research, and AI startups',
    detail:
      'Founding Software Engineer at Progcap (fintech, ₹9,800 Cr+ in lending volume, Series B helped close), Software Engineer at Times Internet (TOI+, 8.4M req/day), Full-Stack at Northeastern (10K+ papers indexed, ~40% compute cost cut), Founding Engineer at an independent AI venture (Donna + RecoMe), and now AI Infrastructure Engineer at Neurologyca. Multi-domain, multi-stage.',
    tags: ['career', 'breadth'],
  },
];

function buildBody(): string {
  const lines: string[] = [];
  lines.push(
    'Hand-curated highlights — the most memorable, narrative-worthy facts. ' +
    'When asked "tell me something interesting" or similar open-ended questions, ' +
    'pick ONE that matches the visitor\'s implied interest, lead with the hook, and add ' +
    'the detail. Vary picks across the conversation — never repeat the same hook twice.'
  );
  HIGHLIGHTS.forEach((h, i) => {
    lines.push(`${i + 1}. ${h.hook} — ${h.detail}`);
  });
  return lines.join('\n');
}

export const highlightsCard: AggregateCard = {
  id: 'highlights',
  title: 'CURATED HIGHLIGHTS (use for open-ended "interesting" questions)',
  body: buildBody(),
  triggers: [
    /\b(interesting|cool|impressive|memorable|notable|exciting|unique|standout|favourite|favorite)\b/i,
    /\btell me (?:something|more|a bit)\b/i,
    /\bwhat'?s (?:cool|notable|special|interesting|unique)\b/i,
    /\bsurpris(e|ing|ed)\b/i,
    /\bshow off\b/i,
    /\bbest stor(y|ies)\b/i,
    /\bproudest\b/i,
  ],
};
