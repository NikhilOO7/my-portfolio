/**
 * Pure prose-only mirror of the site's content modules.
 *
 * The chunker imports this file (NOT the page components) because the
 * page components transitively import images and React-specific modules
 * that tsx cannot evaluate outside Next.js's bundler.
 *
 * If you edit doctrine / service / FAQ / mission content in the page
 * files, update the matching entry here so the chatbot's RAG index
 * reflects it. Both copies must agree.
 */

// ── About page — 6 operating principles (philosophyCards) ────────────────
export interface Doctrine {
  id: string;
  title: string;
  doctrine: string; // "Doctrine · 01 · craft"
  body: string;
}

export const DOCTRINES: Doctrine[] = [
  {
    id: 'production-first',
    title: 'Production-First',
    doctrine: 'Doctrine · 01 · craft',
    body: "I build with the assumption a system will be paged at 3am. Observability, idempotency, and graceful degradation are designed in — not bolted on after the first incident.",
  },
  {
    id: 'ai-as-leverage',
    title: 'AI as Leverage',
    doctrine: 'Doctrine · 02 · vision',
    body: "AI is not a replacement for engineering judgment — it's leverage. I build agentic systems that compound human decisions and keep a human in the loop on every escape hatch.",
  },
  {
    id: 'ship-then-polish',
    title: 'Ship, Then Polish',
    doctrine: 'Doctrine · 03 · velocity',
    body: 'I optimize for measurable outcomes over premature abstractions. Get a working version into production, instrument it, then iterate on what the data actually shows — not what the design doc predicted.',
  },
  {
    id: 'ownership-over-tasks',
    title: 'Ownership Over Tasks',
    doctrine: 'Doctrine · 04 · ownership',
    body: "I own outcomes, not assignments. If something blocks the goal — a broken test in another service, an unclear product spec, a vendor outage — it becomes my problem until it's resolved or properly escalated.",
  },
  {
    id: 'strong-opinions-loose-grip',
    title: 'Strong Opinions, Loose Grip',
    doctrine: 'Doctrine · 05 · judgment',
    body: 'I form sharp views early and argue for them with evidence. The moment better evidence shows up, I drop the position cleanly. Disagree hard, commit fast — politics costs more than humility ever does.',
  },
  {
    id: 'force-multiplier',
    title: 'Force Multiplier',
    doctrine: 'Doctrine · 06 · leverage',
    body: "My code is only half the job. Clear APIs, sharp docs, sturdy tests, and unblocking teammates compound my output beyond what any individual contributor can ship — that's how staff-level impact actually shows up.",
  },
];

export const VITAL_STATS = [
  { value: '6+',   label: 'years shipping' },
  { value: '5',    label: 'companies' },
  { value: '8.4M', label: 'daily requests' },
  { value: '15+',  label: 'AI agents' },
  { value: '22K',  label: 'TPS sustained' },
  { value: '73%',  label: 'latency cut' },
];

export const TECH_HIGHLIGHTS = [
  'Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'Redis',
  'LangGraph', 'CrewAI', 'GPT-4o', 'WebRTC', 'LiveKit',
  'Kafka', 'Kubernetes', 'GCP', 'AWS', 'Qdrant',
];

// ── Services section — 4 modules ─────────────────────────────────────────
export interface ServiceContent {
  id: string;
  title: string;
  blurb: string;
  metric: { value: string; label: string };
  capabilities: string[];
  stack: string[];
  principles: string[];
  status: 'OPEN' | 'LIMITED';
  tier: 'ALPHA' | 'BETA' | 'OPS' | 'ADVISORY';
  visual: 'agentic' | 'voice' | 'backend' | 'consulting';
}

export const SERVICES_CONTENT: ServiceContent[] = [
  {
    id: 'ai-infra',
    title: 'AI Infrastructure & Agentic Systems',
    blurb: 'Multi-agent orchestration with persistent memory and pipeline tuning.',
    metric: { value: '−73%', label: 'latency · 6-agent' },
    capabilities: ['Multi-agent orchestration', 'Memory architectures', 'LangGraph / CrewAI'],
    stack: ['Python', 'FastAPI', 'CrewAI', 'Qdrant', 'GCP'],
    principles: ['craft', 'vision', 'leverage'],
    status: 'OPEN',
    tier: 'ALPHA',
    visual: 'agentic',
  },
  {
    id: 'voice-rag',
    title: 'Real-Time Voice & RAG',
    blurb: 'Sub-200ms conversational AI with multimodal retrieval and streaming STT/TTS.',
    metric: { value: '<200ms', label: 'voice latency' },
    capabilities: ['LiveKit / WebRTC', 'Multimodal RAG', 'Streaming STT/TTS'],
    stack: ['LiveKit', 'Deepgram', 'Cartesia', 'Qdrant'],
    principles: ['craft', 'velocity', 'vision'],
    status: 'OPEN',
    tier: 'ALPHA',
    visual: 'voice',
  },
  {
    id: 'backend',
    title: 'Scalable Backend Engineering',
    blurb: 'Event-driven systems with exactly-once semantics and observability.',
    metric: { value: '22K TPS', label: 'event throughput' },
    capabilities: ['Event-driven workflows', 'Distributed systems', 'Cloud-native ops'],
    stack: ['Node.js', 'Kafka', 'PostgreSQL', 'Kubernetes'],
    principles: ['craft', 'ownership', 'velocity'],
    status: 'OPEN',
    tier: 'BETA',
    visual: 'backend',
  },
  {
    id: 'consulting',
    title: 'AI Consulting & Architecture',
    blurb: 'Architecture reviews, AI roadmaps, and hands-on guidance for production teams.',
    metric: { value: '6+ yrs', label: 'shipping AI' },
    capabilities: ['Architecture review', 'AI strategy', 'Code & design reviews'],
    stack: ['Strategy', 'Architecture', 'Mentoring'],
    principles: ['judgment', 'leverage', 'ownership'],
    status: 'LIMITED',
    tier: 'ADVISORY',
    visual: 'consulting',
  },
];

// ── Contact FAQs — 10 q/a pairs (PROTOCOLS) ──────────────────────────────
export const FAQS: { q: string; a: string }[] = [
  {
    q: 'What types of engagements do you take on?',
    a: "Three lanes — short consulting (1–4 weeks, architecture review or hands-on technical guidance), contract builds (1–6 months, production AI systems), and select full-time roles at well-funded AI teams. Advisory slots open for early-stage AI startups where the technical bet is interesting.",
  },
  {
    q: "What's your ideal project profile?",
    a: 'Production-bound AI/ML systems where infrastructure decisions move the needle — multi-agent orchestration, real-time voice pipelines, RAG at scale, distributed event-driven backends. Strong fit when there is an existing engineering team to compound with. Weak fit: greenfield prototypes with no roadmap to production.',
  },
  {
    q: 'How does an engagement typically start?',
    a: 'Async intake → 30-minute scoping call → written proposal with deliverables, milestones, and rate → mutual NDA + SOW → kickoff. Typically 3–5 business days from first message. Faster on urgent timelines if flagged in the intake.',
  },
  {
    q: 'What is your typical response window?',
    a: 'Twenty-four to forty-eight hours for project and consulting inquiries on business days. Same-day for urgent operational matters. If a deadline is involved, mention it upfront — I will calibrate accordingly.',
  },
  {
    q: 'What is your rate structure?',
    a: 'Project-based pricing for defined scopes; hourly for advisory or open-ended exploration; equity considered for founding-team roles where the alignment is real. Custom quote provided after an intake call so the structure matches the work — accurate beats fast.',
  },
  {
    q: 'Which technologies do you specialize in?',
    a: 'Daily-driver: Python (FastAPI, Django, AsyncIO), Node.js, TypeScript, PostgreSQL, Kafka, Redis. AI: LangGraph, CrewAI, LlamaIndex, GPT-4o, Gemini, Qdrant, Deepgram + Cartesia for voice. Infra: GCP, AWS, Docker, Kubernetes. Language fluency matters less than systems thinking — comfortable picking up new stacks fast.',
  },
  {
    q: 'How do you handle confidentiality and IP?',
    a: 'Mutual NDA before any sensitive technical detail is shared. Default IP terms: work-for-hire on contracted deliverables, with reasonable exclusion for pre-existing tools and open-source primitives. Happy to sign yours or send mine — whichever moves faster.',
  },
  {
    q: 'Are you currently accepting new engagements?',
    a: 'Affirmative — current capacity allows one to two new engagements per quarter. For urgent or short-fuse work, ask directly. I will be honest about bandwidth rather than overbook.',
  },
  {
    q: 'Where are you based and which time zones do you cover?',
    a: 'San Francisco, CA (PST). Remote-first with hybrid on the table for the right Bay Area opportunity. Comfortable across North American, European, and Asian time zones — meeting hours flexible by arrangement.',
  },
  {
    q: 'Do you do architecture reviews or one-off consulting calls?',
    a: 'Yes — a focused 60-minute deep dive is the fastest way to unblock a specific decision. Common topics: AI infrastructure choices, latency optimization, scaling event-driven systems, multi-agent design, and hiring rubrics for senior engineers.',
  },
];

// ── Contact channels — links only (no icons) ─────────────────────────────
export interface ChannelEntry {
  label: string;
  href: string;
  uplink: string;
  status: string;
}

export const CHANNELS_CONTENT: ChannelEntry[] = [
  { label: 'LinkedIn',     href: 'https://linkedin.com/in/nikhil-bindal',           uplink: 'CH·001', status: 'PRIMARY' },
  { label: 'GitHub',       href: 'https://github.com/NikhilOO7',                    uplink: 'CH·002', status: 'PRIMARY' },
  { label: 'X (Twitter)',  href: 'https://x.com/NikhilBindal2',                     uplink: 'CH·003', status: 'ACTIVE' },
  { label: 'Facebook',     href: 'https://www.facebook.com/nikhil.bindal2',         uplink: 'CH·004', status: 'IDLE' },
  { label: 'Instagram',    href: 'https://www.instagram.com/nikhil.bindal2/',       uplink: 'CH·005', status: 'IDLE' },
  { label: 'Medium',       href: 'https://medium.com/@nikhilbindal2',               uplink: 'CH·006', status: 'ACTIVE' },
];

// ── Live Mission section (Neurologyca current engagement) ────────────────
export interface MissionStat { value: string; unit?: string; label: string; sub: string }
export interface MissionSubsystem { id: string; label: string; detail: string }

export const MISSION_STATS_CONTENT: MissionStat[] = [
  { value: '9.5s', unit: 'e2e',    label: 'AI Latency',         sub: '↓ 73% from 36s' },
  { value: '6',    unit: 'agents', label: 'Pipeline DAG',       sub: 'Coordinator-orchestrated' },
  { value: '5',    unit: 'lanes',  label: 'Mnemosyne Memory',   sub: 'Context-scoped, per-user' },
  { value: '32',   unit: 'ops',    label: 'SDKs Shipped',       sub: 'Python + JavaScript' },
];

export const MISSION_SUBSYSTEMS_CONTENT: MissionSubsystem[] = [
  {
    id: 'pipeline',
    label: '6-Agent Orchestration',
    detail: 'Re-architected a serial 6-agent pipeline into a coordinator-driven DAG with prompt consolidation, model tiering, and async parallel execution. End-to-end latency 36s → 9.5s.',
  },
  {
    id: 'mnemosyne',
    label: 'Mnemosyne Memory',
    detail: 'Context-scoped memory architecture with semantic retrieval and temporal-decay lifecycle (Core → Dream → Forgotten → Deleted), bucketed per user and domain so context cannot cross boundaries.',
  },
  {
    id: 'voice',
    label: 'Voice Sidecar (Gemini Live)',
    detail: 'Parallel voice sidecar running sentiment, query, and analytics pipelines asynchronously off the hot path — they never add to perceived response time.',
  },
  {
    id: 'concurrency',
    label: 'Concurrency & Sessions',
    detail: 'Redis-backed concurrency control with per-session sliding-window locks prevents state corruption when multiple real-time voice turns hit the same session simultaneously.',
  },
  {
    id: 'sdks',
    label: 'Python + JS SDKs · 32 ops',
    detail: 'Shipped both SDKs covering orchestration, memory, analytics, sessions, and BYOD multi-tenant infrastructure — with CI/CD, audit logging, and signed webhook delivery.',
  },
  {
    id: 'infra',
    label: 'Production Ops on GCP',
    detail: 'CI/CD pipelines, audit logging, signed webhooks, circuit breakers, and graceful shutdown — all on Cloud Run + Cloud SQL + Memorystore behind a private VPC.',
  },
];

export const MISSION_STACK = [
  'Python', 'FastAPI', 'Node.js', 'GCP Cloud Run', 'Cloud SQL (Postgres)',
  'Memorystore (Redis)', 'Vertex AI · Gemini', 'Gemini Live', 'CrewAI',
  'LangGraph', 'Kubernetes', 'Prometheus', 'Terraform',
];
