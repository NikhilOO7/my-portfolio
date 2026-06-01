/**
 * JARVIS Knowledge Graph — Nikhil Bindal
 *
 * Structured representation of every fact JARVIS can answer about the subject:
 * person, experiences, projects, skills, education, contact, philosophy.
 *
 * This file is the single source of truth that:
 *   1. The `/api/chatbot` LLM uses as system context (via `serializeForLLM`).
 *   2. Future rule-based fallbacks can query directly via the typed structure.
 *   3. Sections of the portfolio can render from (replacing scattered data).
 *
 * Keep dates as ISO-ish strings; keep arrays lean and human-readable.
 */

export interface Person {
  name: string;
  shortName: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  links: {
    linkedin: string;
    github: string;
    twitter: string;
    portfolio: string;
  };
  summary: string;
  availability: string;
  yearsExperience: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyKind?: string;
  location: string;
  startDate: string; // "Sep 2024" or "2017-08"
  endDate: string;   // "Present" or "May 2018"
  category: 'ai' | 'fullstack' | 'backend' | 'frontend';
  bullets: string[];
  tech: string[];
  highlights?: { label: string; value: string }[];
  subRoles?: { company: string; bullets: string[] }[];
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  domain: ('ai' | 'voice' | 'rag' | 'fintech' | 'backend' | 'fullstack' | 'devtools' | 'data' | 'ml' | 'real-time')[];
  tech: string[];
  achievements: string[];
  github?: string;
  demo?: string;
  featured: boolean;
}

export interface SkillEntry {
  name: string;
  level: number;
  tier: 'expert' | 'advanced' | 'intermediate' | 'familiar';
}

export interface SkillGroup {
  id: 'development' | 'infrastructure' | 'ai' | 'tools';
  label: string;
  blurb: string;
  skills: SkillEntry[];
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  school: string;
  location: string;
  start: string;
  end: string;
  notes?: string;
}

export interface Specialty {
  id: string;
  label: string;
  blurb: string;
  metric?: { value: string; label: string };
  bullets: string[];
}

export interface KnowledgeGraph {
  person: Person;
  experiences: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  education: Education[];
  specialties: Specialty[];
  philosophy: string[];
  stats: { value: string; label: string }[];
}

// ─────────────────────────────────────────────────────────────────────────────

export const PERSON: Person = {
  name: 'Nikhil Bindal',
  shortName: 'Nikhil',
  title: 'Full-Stack & AI Infrastructure Engineer',
  location: 'San Francisco, CA',
  email: 'nikhil.bindal@outlook.com',
  phone: '(857) 313-5445',
  links: {
    linkedin: 'https://linkedin.com/in/nikhil-bindal',
    github: 'https://github.com/NikhilOO7',
    twitter: 'https://x.com/NikhilBindal2',
    portfolio: 'https://nikhilbindal.com',
  },
  summary:
    "Full-stack and AI engineer with 6+ years of experience building distributed systems, real-time streaming platforms, and agentic AI applications across fintech, media, research, and AI startups. Specializes in low-latency AI workflows, multimodal RAG, multi-agent orchestration, and production AI infrastructure. Started in frontend/mobile development, later architected microservices and event-driven systems, and now focuses on AI infrastructure. Known for taking full ownership from concept to production and delivering measurable outcomes.",
  availability: 'Available for new engagements',
  yearsExperience: 6,
};

export const EXPERIENCES: Experience[] = [
  {
    id: 'ai-consultant',
    role: 'AI Consultant / AI Infrastructure Engineer',
    company: 'Neurologica · Stealth AI Startup',
    location: 'San Francisco, CA',
    startDate: 'Sep 2024',
    endDate: 'Present',
    category: 'ai',
    bullets: [],
    tech: [
      'Python', 'FastAPI', 'Node.js', 'TypeScript', 'Hono', 'PostgreSQL',
      'Redis', 'Qdrant', 'Neo4j', 'WebRTC', 'LiveKit', 'Gemini Live',
      'CrewAI', 'LangGraph', 'GPT-4o', 'Deepgram', 'Cartesia', 'BullMQ',
      'Stripe', 'Kubernetes', 'GCP Cloud Run', 'Prometheus',
    ],
    highlights: [
      { label: 'AI latency reduction', value: '73%' },
      { label: 'Voice latency', value: '<200ms' },
      { label: 'RAG relevance lift', value: '+40%' },
    ],
    subRoles: [
      {
        company: 'Neurologica — Engineering Contractor',
        bullets: [
          'Architected a production multi-agent AI coaching platform on GCP Cloud Run combining biometric/HCI signal processing with a persistent personal-memory system, owning system design end to end.',
          'Cut end-to-end AI latency 73% (36s → 9.5s) by re-architecting a 6-agent pipeline into a coordinator-orchestrated DAG with prompt consolidation, model tiering, and async parallel execution.',
          'Designed "Mnemosyne," a context-scoped memory architecture with semantic retrieval and a temporal-decay lifecycle, bucketed per user and domain so context can never cross boundaries.',
          'Engineered Redis-backed concurrency control and session orchestration that prevented state corruption across concurrent real-time voice sessions, plus a parallel voice sidecar (Gemini Live) running sentiment/query/analytics off the hot path.',
          'Shipped Python and JavaScript SDKs (32 operations) spanning orchestration, memory, analytics, sessions, and BYOD multi-tenant infrastructure, with CI/CD, audit logging, and webhook delivery.',
        ],
      },
      {
        company: 'Stealth AI Startup — AI Solutions Consultant',
        bullets: [
          'Built "Donna," an AI meeting-intelligence platform, end to end (0→1) automating pre-meeting research, live in-meeting assistance, and post-meeting synthesis, and released it for real users.',
          'Designed a 3-phase architecture orchestrating 15 specialized agents behind a uniform agent contract that made parallel orchestration and fan-out trivial to extend.',
          'Built hybrid contextual RAG over Qdrant combining vector and keyword retrieval with reciprocal-rank fusion, improving retrieval relevance ~40% over a naive dense baseline (measured, not estimated).',
          'Implemented a real-time voice pipeline (LiveKit WebRTC + Deepgram STT + Cartesia TTS) targeting sub-200ms perceived latency, with a replica-independent WebSocket fan-out over Redis pub/sub.',
          'Built "RecoMe," a personal interest-graph & agentic recommendation engine — a capture → signal → graph → agent → surface pipeline turning cross-platform activity (15+ sources) into a typed Neo4j interest graph plus Qdrant per-user vectors, with recommendations streamed to the client over SSE.',
          'Orchestrated 5 background agents behind a single Guardian gate enforcing a hard $0.10/user/day LLM cost cap, throttling, and quiet hours, with a prompt-injection-resistant scorer (the LLM writes prose only, never the verdict); ran on BullMQ workers with idempotent Stripe metering and a dual consumer + multi-tenant surface on one backend (TypeScript, Hono, Prisma).',
        ],
      },
    ],
  },
  {
    id: 'northeastern',
    role: 'Full-Stack & AI Engineer',
    company: 'Northeastern University — Minkara Computational Lab',
    location: 'Boston, MA',
    startDate: 'Feb 2023',
    endDate: 'Dec 2023',
    category: 'fullstack',
    bullets: [
      'Built a semantic-search & visualization platform for biomedical research (FastAPI, PostgreSQL + pgvector, React, D3.js) letting researchers search 10K+ papers and molecular datasets by meaning via embeddings and vector search.',
      'Built AWS Batch distributed simulation pipelines orchestrating thousands of parallel molecular computations and cutting compute cost ~40% via spot instances, right-sizing, and scale-to-zero with checkpoint/restart.',
      'Owned backend for scientific data ingestion, metadata APIs, and ML-inference workflows serving models as isolated services so heavy inference never blocked the API.',
      'Designed accessibility tooling for visually impaired researchers — tactile-graphics generation from molecular coordinates and screen-reader/sonification integrations, validated with blind users including the lab PI.',
    ],
    tech: ['FastAPI', 'PostgreSQL', 'pgvector', 'React', 'D3.js', 'AWS Batch', 'Python', 'TypeScript', 'Docker'],
    highlights: [
      { label: 'Compute cost reduction', value: '40%' },
      { label: 'Papers indexed', value: '10K+' },
    ],
  },
  {
    id: 'times-internet',
    role: 'Software Engineer',
    company: 'Times Internet — TOI+ subscription platform',
    location: 'Noida, India',
    startDate: 'Apr 2021',
    endDate: 'Jul 2022',
    category: 'backend',
    bullets: [
      'Built backend for TOI+ serving ~8.4M daily requests — Node/Express subscription & paywall services with JWT auth and Redis-cached entitlements (sub-ms checks), keeping origin load low by offloading cacheable content to the Akamai edge.',
      'Designed a Verdaccio-based micro-frontend system packaging shared UI as versioned internal npm widgets, so 70+ city portals consumed updates by version bump instead of duplicated code — publish cadence decoupled from consume cadence.',
      'Migrated 70+ legacy XML/XSLT portals to React micro-frontends via a strangler-fig rollout (old + new in parallel, per-portal feature flags, stable API contracts), reaching ~92/100 Lighthouse with instant rollback.',
      'Built the real-time Kafka event pipeline feeding the Signals personalization engine (behavior events → user feature profiles, ~90s refresh), contributing to a measured ~9% CTR lift on recommendations.',
    ],
    tech: ['Node.js', 'Express', 'Redis', 'Kafka', 'React', 'Verdaccio', 'JWT', 'Akamai', 'Docker'],
    highlights: [
      { label: 'Daily requests', value: '~8.4M' },
      { label: 'CTR uplift', value: '~9%' },
      { label: 'Lighthouse', value: '~92/100' },
    ],
  },
  {
    id: 'progcap',
    role: 'Founding Software Engineer',
    company: 'Progcap — collateral-free SMB lending fintech',
    location: 'New Delhi, India',
    startDate: 'Jan 2019',
    endDate: 'Mar 2021',
    category: 'backend',
    bullets: [
      'Owned the underwriting & transaction backbone of a collateral-free lending platform — Node/Express microservices on an event-driven Kafka backbone, with PostgreSQL as the transactional system of record (+ append-only ledger) and MongoDB for high-write capture.',
      'Cut decision latency 90% (8.7s → 890ms) by parallelizing serial KYC/fraud/credit-score checks, trimming the hot path, and adding compound indexes plus Redis caching with connection pooling.',
      'Integrated XGBoost credit scoring on alternative data as an isolated service with timeouts and rule-based fallback, reducing false negatives ~19% (model + rules, measured on repayment cohorts).',
      'Engineered effectively-once disbursement via idempotency — guarded atomic state transitions, idempotency-keyed bank/NPCI calls, and partitioned Kafka consumers; load-tested to ~22K events/sec at the event tier.',
      'Built a Python/Celery service for feature assembly, batch jobs, and reconciliation against the append-only ledger as the source of truth.',
    ],
    tech: ['Node.js', 'Express', 'Kafka', 'PostgreSQL', 'MongoDB', 'Redis', 'XGBoost', 'Python', 'Celery'],
    highlights: [
      { label: 'Event throughput', value: '~22K/sec' },
      { label: 'Latency cut', value: '8.7s → 890ms' },
      { label: 'False negatives', value: '−19%' },
    ],
  },
  {
    id: 'livemedia',
    role: 'Software Engineer',
    company: 'LiveMedia / LiveChek — insurance telematics',
    location: 'New Delhi, India',
    startDate: 'Aug 2017',
    endDate: 'May 2018',
    category: 'fullstack',
    bullets: [
      'Built backend services and APIs for real-time telematics and behavioral analytics processing driving-behavior and user-interaction streams for insurance workflows.',
      'Contributed to early-stage product and architecture decisions in a fast-moving startup environment.',
    ],
    tech: ['Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'Telematics'],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'recome',
    name: 'RecoMe — Personalized Recommendation Engine',
    tagline: 'Agentic interest-graph engine with hard LLM cost cap and SSE streaming',
    description:
      'A capture → signal → graph → agent → surface pipeline that ingests 15+ cross-platform activity sources into a typed Neo4j interest graph plus Qdrant per-user vectors, with recommendations streamed to the client over SSE. Five background agents run behind a single Guardian gate enforcing a hard $0.10/user/day LLM cost cap, throttling, and quiet hours, plus a prompt-injection-resistant scorer (the LLM writes prose only, never the verdict). Runs on BullMQ workers with idempotent Stripe metering on a dual consumer + multi-tenant surface.',
    domain: ['ai', 'ml', 'backend'],
    tech: ['TypeScript', 'Hono', 'Prisma', 'Neo4j', 'Qdrant', 'Redis', 'BullMQ', 'Stripe', 'SSE', 'PostgreSQL'],
    achievements: [
      'Pipeline ingests 15+ cross-platform sources into a typed Neo4j interest graph + Qdrant per-user vectors',
      'Guardian gate enforces a hard $0.10/user/day LLM cost cap with prompt-injection-resistant scoring',
      'Recommendations streamed over SSE; BullMQ workers + idempotent Stripe metering',
    ],
    github: 'https://github.com/NikhilOO7/recome-website',
    featured: true,
  },
  {
    id: 'voice-document-intelligence',
    name: 'Donna — Voice Document Intelligence Platform',
    tagline: 'AI meeting-intelligence platform with 15-agent orchestration and sub-200ms voice',
    description:
      'Donna automates pre-meeting research, live in-meeting assistance, and post-meeting synthesis, shipped end to end (0→1) for real users. A 3-phase agentic architecture orchestrates 15 specialized agents behind a uniform contract; hybrid contextual RAG over Qdrant combines vector and keyword retrieval via reciprocal-rank fusion, lifting retrieval relevance ~40% over a naive dense baseline. The real-time voice pipeline (LiveKit WebRTC + Deepgram STT + Cartesia TTS) targets sub-200ms perceived latency with a replica-independent WebSocket fan-out over Redis pub/sub.',
    domain: ['ai', 'voice', 'rag', 'real-time'],
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Qdrant', 'Redis', 'LiveKit', 'WebRTC', 'Deepgram', 'Cartesia', 'CrewAI'],
    achievements: [
      '15-agent 3-phase orchestration behind a uniform agent contract',
      'Hybrid contextual RAG (vector + keyword + reciprocal-rank fusion) — ~40% relevance lift over naive dense baseline',
      'Real-time voice pipeline (LiveKit WebRTC + Deepgram + Cartesia) targeting sub-200ms perceived latency',
      'Replica-independent WebSocket fan-out over Redis pub/sub for horizontal scaling',
    ],
    github: 'https://github.com/NikhilOO7/voice-doc-intelligence',
    featured: true,
  },
  {
    id: 'knowledge-graph-application',
    name: 'Knowledge Graph Application',
    tagline: 'Document-ingestion with automatic context-routing (append vs. new bucket)',
    description:
      'A document-ingestion system whose centerpiece is automatic context routing — on upload it decides append-to-existing vs. create-new "bucket" via embedding similarity with an LLM tie-breaker, so related documents enrich one graph and unrelated ones stay isolated. A LangGraph state machine (prepare → route → ontology → extract → finalize) drives a CrewAI crew and a per-bucket inferred ontology (no hardcoded types), with graceful degradation when no LLM key is present.',
    domain: ['ai', 'rag'],
    tech: ['Python', 'FastAPI', 'LangGraph', 'CrewAI', 'Neo4j', 'PostgreSQL', 'React'],
    achievements: [
      'Automatic context routing — embedding similarity + LLM tie-breaker decides append vs. new bucket per upload',
      'LangGraph state machine (prepare → route → ontology → extract → finalize) drives a CrewAI crew',
      'Per-bucket inferred ontology (no hardcoded types); graceful degradation without an LLM key',
    ],
    github: 'https://github.com/NikhilOO7/knowledge-graph-application',
    featured: true,
  },
  {
    id: 'manifold-strata',
    name: 'Manifold Strata — Geometric Low-LLM Retrieval Engine',
    tagline: 'arXiv KG with hyperbolic (Poincaré) geometry and HippoRAG-style PageRank retrieval',
    description:
      'Manifold Strata ingests arXiv papers (auto-fetch → PDF extraction → agentic extract/resolve/validate with edge-level provenance) into a knowledge graph, then minimises LLM calls by doing entity resolution and relationship validation in embedding/rule space rather than per-step prompts — canonicalising variants like "3DGS" → "3D Gaussian Splatting" and cutting ~60 raw mentions to ~42 deduped entities per paper. Retrieval uses HippoRAG-style Personalized PageRank; concepts live in hyperbolic (Poincaré) space for hierarchy-aware similarity; context is compressed via propositions + MMR before a single answer call. Exposes the graph to AI clients (e.g. Claude) as an MCP server, with a PIPELINE_MODE=field|legacy switch that A/B-benchmarks the LLM-call savings.',
    domain: ['ai', 'rag'],
    tech: ['TypeScript', 'Hono', 'Drizzle', 'PostgreSQL', 'React', 'MCP Server'],
    achievements: [
      'Entity resolution & relationship validation in embedding/rule space — cuts LLM call volume vs. per-step prompts',
      'Canonicalises variants (e.g. "3DGS" → "3D Gaussian Splatting"); ~60 raw mentions → ~42 deduped per paper',
      'Retrieval via HippoRAG-style Personalized PageRank; concepts in hyperbolic (Poincaré) space',
      'Graph exposed to AI clients as an MCP server; PIPELINE_MODE switch A/B-benchmarks the LLM-call savings',
    ],
    github: 'https://github.com/NikhilOO7/manifold-strata',
    featured: true,
  },
  {
    id: 'gaussian-splatting',
    name: 'Gaussian Splatting Knowledge Graph (archived)',
    tagline: 'Earlier 3-agent LLM pipeline for academic paper ingestion',
    description:
      'Full-stack multi-agent LLM system that ingested academic papers and constructed a queryable knowledge graph using a 3-agent pipeline (Extractor → Resolver → Validator) with GPT-4o under strict JSON schema and provenance tracking across 40+ document chunks. Superseded by Manifold Strata, which moved the same problem into embedding/rule space and added a Poincaré-disk geometry for hierarchy-aware retrieval.',
    domain: ['ai', 'rag'],
    tech: ['PostgreSQL', 'Hono', 'Drizzle ORM', 'React', 'GPT-4o', 'TypeScript'],
    achievements: [
      '3-agent pipeline (Extractor → Resolver → Validator) with GPT-4o',
      'Queryable knowledge graph with provenance over 40+ chunks',
      'Structured entity/relationship extraction with strict JSON schemas',
    ],
    github: 'https://github.com/NikhilOO7/gaussian-splatting',
    featured: false,
  },
  {
    id: 'nexus-chatbot',
    name: 'NexusChatbot — Multi-Agent AI Assistant',
    tagline: 'Specialized agents for research, coding, and task automation',
    description:
      'Multi-agent AI chatbot using CrewAI and LangChain orchestrating specialized agents for research, coding assistance, and task automation. Persistent memory and tool integration framework.',
    domain: ['ai'],
    tech: ['Python', 'CrewAI', 'LangChain', 'FastAPI', 'React', 'PostgreSQL', 'Redis'],
    achievements: [
      'Multiple specialized AI agents with dynamic coordination',
      'Persistent memory via vector databases',
      'Tool integration framework (web search, code execution, APIs)',
    ],
    github: 'https://github.com/NikhilOO7/nexusChatbot',
    featured: false,
  },
  {
    id: 'gennie',
    name: 'Conversational AI Platform (Gennie)',
    tagline: 'Gemini-powered chatbot with real-time sentiment detection',
    description:
      'React/FastAPI app with Google Gemini API and sentiment detection supporting 500+ concurrent users with 40% lower latency.',
    domain: ['ai', 'fullstack'],
    tech: ['React', 'FastAPI', 'Python', 'Google Gemini', 'WebSocket', 'Redis', 'PostgreSQL'],
    achievements: [
      '500+ concurrent users at 40% lower latency',
      'Real-time sentiment detection during conversations',
    ],
    github: 'https://github.com/NikhilOO7/next-door-chatbot',
    featured: false,
  },
  {
    id: 'trading-platform',
    name: 'Trading Platform',
    tagline: 'MERN + TypeScript live stock trading with GraphQL & WebSocket',
    description:
      'Comprehensive trading platform with MERN stack, GraphQL, and WebSocket feeds for real-time stock data. Reduced API calls by 60% through caching.',
    domain: ['fintech', 'real-time', 'fullstack'],
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'TypeScript', 'GraphQL', 'WebSocket', 'Redis'],
    achievements: [
      'GraphQL + WebSocket real-time feeds with sub-100ms latency',
      'API calls reduced 60% via intelligent caching',
      'Responsive dashboards with live trading and alerts',
    ],
    github: 'https://github.com/NikhilOO7/zerodha-ai-trading-platform',
    featured: false,
  },
  {
    id: 'anomaly-detection',
    name: 'Anomaly Detection in Financial Data',
    tagline: '95%+ fraud detection with Isolation Forest + One-Class SVM',
    description:
      'Fraud-detection pipeline using Isolation Forest and One-Class SVM achieving 95%+ accuracy; Plotly dashboards over 10K+ transactions/min.',
    domain: ['fintech', 'ml', 'data'],
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Plotly', 'FastAPI', 'PostgreSQL'],
    achievements: [
      '95%+ fraud detection accuracy',
      '10K+ transactions/min processed',
      'Interactive Plotly dashboards for fraud visualization',
    ],
    github: 'https://github.com/NikhilOO7/Anomaly-Detection-in-Financial-Data',
    featured: false,
  },
  {
    id: 'collabhub',
    name: 'CollabHub',
    tagline: 'Real-time team collaboration platform',
    description: 'Team collaboration platform with real-time chat, Kanban, and video conferencing, built on a microservices architecture.',
    domain: ['real-time', 'fullstack'],
    tech: ['React', 'Node.js', 'MongoDB', 'GraphQL', 'WebRTC', 'Socket.io', 'AWS', 'Docker'],
    achievements: [
      'WebRTC + Socket.IO real-time sync',
      'Microservices backend with role-based access control',
    ],
    github: 'https://github.com/NikhilOO7/collabhub',
    featured: false,
  },
  {
    id: 'llm-bias',
    name: 'LLM Bias Analyzer',
    tagline: 'Detect biases across gender, race, age in LLM outputs',
    description:
      'Bias detection framework for LLMs using statistical analysis, sentiment comparison, and semantic similarity.',
    domain: ['ai', 'data'],
    tech: ['Python', 'PyTorch', 'Transformers', 'FastAPI', 'React', 'Plotly', 'Pandas'],
    achievements: [
      'Multi-dimensional bias detection (gender, race, age)',
      'Statistical and semantic similarity metrics',
      'Interactive visualizations of bias patterns',
    ],
    github: 'https://github.com/NikhilOO7/llm-bias-analyzer',
    featured: false,
  },
  {
    id: 'ai-saas-chatbot',
    name: 'AI-SaaS-Chatbot',
    tagline: 'Multi-tenant chatbot platform with billing',
    description:
      'Multi-tenant SaaS chatbot platform with customization, analytics dashboard, and Stripe subscription billing.',
    domain: ['ai', 'fullstack'],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'WebSocket', 'Docker', 'AWS'],
    achievements: [
      'Multi-tenant SaaS architecture',
      'Analytics dashboard with conversation metrics',
      'Stripe subscription + usage-based billing',
    ],
    github: 'https://github.com/NikhilOO7/ai-saas-chatbot',
    featured: false,
  },
  {
    id: 'ml-feature-selection',
    name: 'ML Data Cleaning & Feature Selection',
    tagline: 'Automated preprocessing pipeline',
    description:
      'Automated ML pipeline for data preprocessing, cleaning, outlier detection, and feature selection. 50% training time reduction.',
    domain: ['ml', 'data'],
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'XGBoost', 'FastAPI', 'Docker'],
    achievements: [
      'Automated cleaning of missing values, outliers, duplicates',
      'Multiple feature selection algorithms (RFE, LASSO, Tree-based)',
      '50% training time reduction with maintained accuracy',
    ],
    github: 'https://github.com/NikhilOO7/ML-Data-Cleaning-and-Feature-Selection',
    featured: false,
  },
  {
    id: 'weather',
    name: 'Weather Application',
    tagline: 'Real-time forecasts with interactive viz',
    description:
      'Weather app with real-time data, 7-day forecasts, severe alerts, and interactive visualizations.',
    domain: ['fullstack'],
    tech: ['React', 'TypeScript', 'Node.js', 'OpenWeather API', 'Chart.js', 'Tailwind CSS'],
    achievements: [
      '99.9% uptime via fallback weather APIs',
      'Animated UI with interactive viz',
      'Location-based services with favorites',
    ],
    github: 'https://github.com/NikhilOO7/weather-app',
    featured: false,
  },
];

export const SKILLS: SkillGroup[] = [
  {
    id: 'development',
    label: 'Development',
    blurb: 'Core engineering toolkit — services, APIs, data stores, UIs.',
    skills: [
      { name: 'Python', level: 95, tier: 'expert' },
      { name: 'FastAPI', level: 90, tier: 'expert' },
      { name: 'Node.js', level: 90, tier: 'expert' },
      { name: 'TypeScript', level: 85, tier: 'advanced' },
      { name: 'React', level: 85, tier: 'advanced' },
      { name: 'PostgreSQL', level: 90, tier: 'expert' },
      { name: 'Redis', level: 85, tier: 'advanced' },
      { name: 'REST APIs', level: 95, tier: 'expert' },
    ],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    blurb: 'Cloud, containers, streaming, observability.',
    skills: [
      { name: 'GCP', level: 90, tier: 'expert' },
      { name: 'AWS', level: 85, tier: 'advanced' },
      { name: 'Docker', level: 90, tier: 'expert' },
      { name: 'Kubernetes', level: 85, tier: 'advanced' },
      { name: 'Kafka', level: 85, tier: 'advanced' },
      { name: 'Prometheus', level: 80, tier: 'advanced' },
      { name: 'CI/CD (Jenkins, GitHub Actions)', level: 85, tier: 'advanced' },
    ],
  },
  {
    id: 'ai',
    label: 'AI / LLM',
    blurb: 'Agentic systems, RAG, model orchestration.',
    skills: [
      { name: 'Agentic Workflows', level: 95, tier: 'expert' },
      { name: 'RAG Systems', level: 95, tier: 'expert' },
      { name: 'CrewAI', level: 90, tier: 'expert' },
      { name: 'LangGraph', level: 85, tier: 'advanced' },
      { name: 'LangChain', level: 85, tier: 'advanced' },
      { name: 'LlamaIndex', level: 85, tier: 'advanced' },
      { name: 'GPT-4o', level: 90, tier: 'expert' },
      { name: 'Gemini', level: 85, tier: 'advanced' },
      { name: 'Qdrant', level: 85, tier: 'advanced' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    blurb: 'Daily-driver dev and AI tooling.',
    skills: [
      { name: 'Claude Code', level: 95, tier: 'expert' },
      { name: 'Cursor', level: 90, tier: 'expert' },
      { name: 'GitHub Copilot', level: 90, tier: 'expert' },
      { name: 'VS Code', level: 95, tier: 'expert' },
      { name: 'Git', level: 95, tier: 'expert' },
      { name: 'Postman', level: 90, tier: 'expert' },
      { name: 'Chrome DevTools', level: 85, tier: 'advanced' },
      { name: 'Jupyter', level: 85, tier: 'advanced' },
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    id: 'cumberlands',
    degree: 'Master of Science',
    field: 'Artificial Intelligence',
    school: 'University of the Cumberlands',
    location: 'Williamsburg, KY',
    start: '2024',
    end: '2025',
    notes: 'Deep Learning, NLP, Generative AI & LLMs, Ethics in AI, Data Visualization.',
  },
  {
    id: 'northeastern-edu',
    degree: 'Master of Science',
    field: 'Information Systems',
    school: 'Northeastern University',
    location: 'Boston, MA',
    start: '2022',
    end: '2024',
    notes: 'Database Design, Algorithms, Cloud Computing, Data Science, Research Methods in AI.',
  },
  {
    id: 'kurukshetra',
    degree: 'Bachelor of Technology',
    field: 'Computer Science & Engineering',
    school: 'Kurukshetra University',
    location: 'Kurukshetra, India',
    start: '2012',
    end: '2016',
    notes: 'Data Structures & Algorithms, Computer Networks, Discrete Mathematics, OOD.',
  },
];

export const SPECIALTIES: Specialty[] = [
  {
    id: 'ai-infra',
    label: 'AI Infrastructure & Agentic Systems',
    blurb: 'Production-grade multi-agent orchestration with persistent memory, model tiering, and async pipeline tuning.',
    metric: { value: '73%', label: 'latency cut on a 6-agent pipeline' },
    bullets: ['Multi-agent orchestration', 'Memory architectures', 'Async pipeline tuning', 'LangGraph / CrewAI'],
  },
  {
    id: 'voice-rag',
    label: 'Real-Time Voice & RAG',
    blurb: 'Sub-200ms conversational AI with multimodal retrieval, WebRTC pipelines, and streaming STT/TTS.',
    metric: { value: '<200ms', label: 'end-to-end voice latency' },
    bullets: ['LiveKit / WebRTC pipelines', 'Multimodal RAG retrieval', 'Streaming STT/TTS', 'Knowledge graphs'],
  },
  {
    id: 'backend',
    label: 'Scalable Backend Engineering',
    blurb: 'Distributed, event-driven systems with high throughput, exactly-once semantics, and production observability.',
    metric: { value: '22K TPS', label: 'exactly-once event throughput' },
    bullets: ['Distributed systems', 'Event-driven workflows', 'High-throughput services', 'Cloud-native ops'],
  },
  {
    id: 'consulting',
    label: 'AI Consulting & Architecture',
    blurb: 'Architecture reviews, AI roadmaps, and hands-on guidance for teams shipping production AI systems.',
    metric: { value: '6+ yrs', label: 'shipping AI & backend systems' },
    bullets: ['System architecture review', 'AI strategy & roadmaps', 'Tech leadership', 'Code & design reviews'],
  },
];

export const PHILOSOPHY = [
  "Production-first: I build systems with the assumption they will see traffic and break in unexpected ways. Observability, idempotency, and graceful degradation aren't afterthoughts.",
  "AI as leverage, not replacement: I build agentic systems that augment human decisions rather than black-box them.",
  "Ship, then polish: I optimize for measurable outcomes over premature abstractions.",
];

export const HEADLINE_STATS = [
  { value: '6+ yrs', label: 'shipping production' },
  { value: '73%', label: 'AI latency cut on a 6-agent pipeline' },
  { value: '22K TPS', label: 'exactly-once event throughput' },
  { value: '<200ms', label: 'end-to-end voice latency' },
  { value: '8.4M', label: 'daily requests scaled' },
  { value: '12', label: 'production projects' },
  { value: '15+', label: 'AI agents orchestrated' },
];

export const KNOWLEDGE_GRAPH: KnowledgeGraph = {
  person: PERSON,
  experiences: EXPERIENCES,
  projects: PROJECTS,
  skills: SKILLS,
  education: EDUCATION,
  specialties: SPECIALTIES,
  philosophy: PHILOSOPHY,
  stats: HEADLINE_STATS,
};

// ─────────────────────────────────────────────────────────────────────────────
// Serialization helpers

/**
 * Compact human-readable serialization for LLM system prompts.
 * Yields a deterministic Markdown-ish digest of every entity.
 */
export function serializeForLLM(kg: KnowledgeGraph = KNOWLEDGE_GRAPH): string {
  const p = kg.person;
  const lines: string[] = [];

  lines.push(`# SUBJECT — ${p.name}`);
  lines.push(`Title: ${p.title}`);
  lines.push(`Location: ${p.location}`);
  lines.push(`Email: ${p.email}   Phone: ${p.phone}`);
  lines.push(`LinkedIn: ${p.links.linkedin}`);
  lines.push(`GitHub:   ${p.links.github}`);
  lines.push(`Portfolio: ${p.links.portfolio}`);
  lines.push(`Availability: ${p.availability}   Years of experience: ${p.yearsExperience}+`);
  lines.push('');
  lines.push('## SUMMARY');
  lines.push(p.summary);

  lines.push('');
  lines.push('## HEADLINE STATS');
  for (const s of kg.stats) lines.push(`- ${s.value} — ${s.label}`);

  lines.push('');
  lines.push('## SPECIALTIES');
  for (const sp of kg.specialties) {
    lines.push(`- ${sp.label}${sp.metric ? ` (${sp.metric.value} ${sp.metric.label})` : ''}: ${sp.blurb}`);
  }

  lines.push('');
  lines.push('## EXPERIENCE');
  for (const e of kg.experiences) {
    lines.push(`### ${e.role} — ${e.company} (${e.startDate} – ${e.endDate}, ${e.location})`);
    if (e.subRoles?.length) {
      for (const s of e.subRoles) {
        lines.push(`  ${s.company}:`);
        for (const b of s.bullets) lines.push(`    - ${b}`);
      }
    } else {
      for (const b of e.bullets) lines.push(`  - ${b}`);
    }
    if (e.highlights?.length) {
      lines.push(`  Highlights: ${e.highlights.map(h => `${h.value} ${h.label}`).join(' · ')}`);
    }
    lines.push(`  Tech: ${e.tech.join(', ')}`);
  }

  lines.push('');
  lines.push('## PROJECTS');
  for (const pr of kg.projects) {
    lines.push(`### ${pr.name}${pr.featured ? ' [FEATURED]' : ''}`);
    lines.push(`  Tagline: ${pr.tagline}`);
    lines.push(`  Description: ${pr.description}`);
    lines.push(`  Domain: ${pr.domain.join(', ')}`);
    lines.push(`  Tech: ${pr.tech.join(', ')}`);
    lines.push(`  Achievements:`);
    for (const a of pr.achievements) lines.push(`    - ${a}`);
    if (pr.github) lines.push(`  GitHub: ${pr.github}`);
  }

  lines.push('');
  lines.push('## SKILLS');
  for (const g of kg.skills) {
    lines.push(`### ${g.label} — ${g.blurb}`);
    lines.push(`  ${g.skills.map(s => `${s.name} (${s.tier}, ${s.level}%)`).join(', ')}`);
  }

  lines.push('');
  lines.push('## EDUCATION');
  for (const ed of kg.education) {
    lines.push(`- ${ed.degree} in ${ed.field} — ${ed.school}, ${ed.location} (${ed.start}–${ed.end})${ed.notes ? '. ' + ed.notes : ''}`);
  }

  lines.push('');
  lines.push('## PHILOSOPHY');
  for (const ph of kg.philosophy) lines.push(`- ${ph}`);

  return lines.join('\n');
}
