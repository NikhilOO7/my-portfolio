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
      'Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'Redis', 'Qdrant',
      'WebRTC', 'LiveKit', 'Gemini Live', 'CrewAI', 'LangGraph',
      'LlamaIndex', 'GPT-4o', 'Deepgram', 'Cartesia', 'Kubernetes',
      'GCP Cloud Run', 'Prometheus',
    ],
    highlights: [
      { label: 'AI latency reduction', value: '73%' },
      { label: 'Voice latency', value: '<200ms' },
    ],
    subRoles: [
      {
        company: 'Neurologica — Engineering Contractor',
        bullets: [
          'Architected and built a production-grade AI coaching platform combining biometric signal analysis with a multi-agent orchestration pipeline and persistent personal memory systems.',
          'Designed and implemented a 6-agent orchestration pipeline reducing end-to-end AI latency from 36s to 9.5s (73% reduction) through prompt consolidation, model tiering, and async execution optimization.',
          'Built Mnemosyne memory architecture with semantic retrieval, temporal decay lifecycle, and context-scoped memory bucketing across multiple user domains.',
          'Engineered Redis-backed concurrency controls and session orchestration preventing state corruption under concurrent real-time voice sessions.',
          'Built parallel voice sidecar architecture using Gemini Live enabling low-latency audio conversations while asynchronously running sentiment, query, and analytics pipelines.',
          'Developed Python and JavaScript SDKs supporting 32 operations across orchestration, memory, analytics, sessions, and BYOD infrastructure.',
          'Established CI/CD pipelines, audit logging, webhook delivery systems, and production deployment workflows on GCP Cloud Run.',
        ],
      },
      {
        company: 'Stealth AI Startup — AI Solutions Consultant',
        bullets: [
          'Architected an AI-powered meeting intelligence platform automating pre-meeting research, live meeting assistance, and post-meeting synthesis workflows.',
          'Designed a 3-phase agentic architecture orchestrating 15 specialized AI agents across research, meeting intelligence, and decision-tracking pipelines.',
          'Built contextual retrieval workflows using multi-level semantic search across Qdrant vector collections, improving retrieval relevance by ~40% over traditional RAG pipelines.',
          'Implemented a real-time voice pipeline using LiveKit WebRTC, Deepgram STT, and Cartesia TTS targeting sub-200ms perceived latency.',
          'Designed PostgreSQL schemas and knowledge graph workflows modeling meeting entities, action items, decisions, transcripts, and research relationships.',
          'Implemented Redis-backed rate limiting, Prometheus metrics, structured logging, and async background workers for scalable production monitoring.',
        ],
      },
    ],
  },
  {
    id: 'northeastern',
    role: 'Full-Stack Developer / Research Assistant',
    company: 'Northeastern University',
    location: 'Boston, MA',
    startDate: 'Feb 2023',
    endDate: 'Dec 2023',
    category: 'fullstack',
    bullets: [
      'Developed a semantic search and data-visualization platform for biomedical research using FastAPI, PostgreSQL, React, and D3.js, enabling researchers to search and analyze 10K+ scientific papers and molecular datasets.',
      'Built AWS Batch-based distributed simulation pipelines orchestrating large-scale molecular computations and reducing compute costs by 40%.',
      'Led backend development for scientific data ingestion pipelines, metadata APIs, and ML inference workflows (TensorFlow CNN classifiers for glycan research) supporting computational biology research.',
      'Designed accessibility-focused tooling including tactile graphics generation and screen-reader integrations to improve STEM accessibility.',
    ],
    tech: ['React', 'FastAPI', 'Python', 'PostgreSQL', 'AWS Batch', 'D3.js', 'TensorFlow', 'OpenCV', 'TypeScript', 'Docker'],
    highlights: [
      { label: 'Compute cost reduction', value: '40%' },
      { label: 'Papers indexed', value: '10K+' },
    ],
  },
  {
    id: 'times-internet',
    role: 'Software Engineer',
    company: 'Times Internet',
    location: 'Noida, India',
    startDate: 'Apr 2021',
    endDate: 'Jul 2022',
    category: 'backend',
    bullets: [
      'Built and scaled backend services (Spring Boot + Redis) for the TOI+ subscription platform handling 8.4M daily requests and supporting 120K+ subscribers, contributing to $150M+ annual revenue.',
      'Migrated 70+ city portals from legacy systems to React-based micro-frontends, raising Lighthouse performance scores to 92/100.',
      'Designed a Kafka-based personalization and recommendations pipeline that achieved a 9.7% CTR increase for premium users.',
      'Containerized services using Docker and deployed to AWS EKS, reducing infrastructure costs by 35%.',
    ],
    tech: ['Spring Boot', 'Java', 'Node.js', 'Redis', 'Kafka', 'React', 'Docker', 'Kubernetes', 'AWS EKS', 'Jenkins'],
    highlights: [
      { label: 'Daily requests', value: '8.4M' },
      { label: 'CTR uplift', value: '9.7%' },
      { label: 'Infra cost cut', value: '35%' },
    ],
  },
  {
    id: 'progcap',
    role: 'Founding Software Engineer',
    company: 'Progcap (Fintech)',
    location: 'New Delhi, India',
    startDate: 'Jan 2019',
    endDate: 'Mar 2021',
    category: 'backend',
    bullets: [
      'Built real-time lending and underwriting microservices using Node.js/Express, Kafka, MongoDB, and event-driven architecture; reduced transaction workflow latency from 8.7s to 890ms.',
      'Implemented Kafka event-driven workflows processing 22K transactions per second with exactly-once semantics.',
      'Integrated ML-powered credit scoring (XGBoost) into backend lending systems, decreasing false negatives by 19%.',
      'Supported product growth to ₹9,800 Cr+ lending volume, helping secure Series B funding (US$25M).',
    ],
    tech: ['Node.js', 'Express', 'Kafka', 'MongoDB', 'Redis', 'XGBoost', 'AWS ECS', 'Python'],
    highlights: [
      { label: 'TPS', value: '22K' },
      { label: 'Latency cut', value: '8.7s → 890ms' },
      { label: 'Lending volume', value: '₹9,800 Cr+' },
    ],
  },
  {
    id: 'livemedia',
    role: 'Software Engineer',
    company: 'LiveMedia / LiveChek',
    location: 'New Delhi, India',
    startDate: 'Aug 2017',
    endDate: 'May 2018',
    category: 'fullstack',
    bullets: [
      'Worked on insurance-focused telematics and behavioral analytics systems integrating real-time driving behavior and user interaction data.',
      'Built an OCR-based document verification system using Tesseract.js and Python APIs, achieving 92%+ accuracy.',
      'Developed a React Native offline-first inspection app used for 50K+ monthly site inspections; reduced inspection time from 45 minutes to 22 minutes.',
      'Created a React.js + Django claims platform that cut insurance claims processing time by 60%.',
    ],
    tech: ['React Native', 'React', 'Django', 'Python', 'Tesseract.js', 'PostgreSQL', 'Redux', 'REST APIs'],
    highlights: [
      { label: 'OCR accuracy', value: '92%+' },
      { label: 'Inspections/mo', value: '50K+' },
      { label: 'Claims time cut', value: '60%' },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'voice-document-intelligence',
    name: 'Voice Document Intelligence Platform',
    tagline: 'Real-time voice-based document Q&A with multi-agent RAG',
    description:
      'Voice-based document intelligence platform using WebRTC, LiveKit, FastAPI and PostgreSQL; multi-agent RAG pipeline with CrewAI and LlamaIndex improving search relevance by 40%, supporting 1,000+ concurrent sessions with sub-50ms latency and 95%+ transcription accuracy.',
    domain: ['ai', 'voice', 'rag', 'real-time'],
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'WebRTC', 'LiveKit', 'CrewAI', 'LlamaIndex', 'Qdrant', 'Deepgram', 'Kubernetes', 'GCP'],
    achievements: [
      'Multi-agent RAG pipeline with 40% improvement in search relevance',
      '1,000+ concurrent sessions, sub-50ms latency, 95%+ transcription accuracy',
      'Streaming STT/TTS via Deepgram Nova-3 and Cartesia Sonic',
      'Deployed on GCP with Docker, Kubernetes, and Prometheus/Grafana monitoring',
    ],
    github: 'https://github.com/NikhilOO7/voice-doc-intelligence',
    featured: true,
  },
  {
    id: 'recome',
    name: 'RecoMe — Personalized Recommendation Engine',
    tagline: 'Behavioral recommendation system for cross-platform discovery',
    description:
      'Behavioral recommendation engine that models user preferences and interaction patterns across platforms to personalize content discovery. Hybrid pipeline combining collaborative filtering, content-based signals, and session-level behavioral features with feedback loops.',
    domain: ['ai', 'ml'],
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Scikit-learn', 'Pandas', 'Docker'],
    achievements: [
      'Modeled user preferences and cross-platform interaction patterns',
      'Hybrid recommendation pipeline (collaborative + content + behavioral)',
      'Feedback loops for continuous model improvement',
    ],
    github: 'https://github.com/NikhilOO7/recome',
    featured: true,
  },
  {
    id: 'gaussian-splatting',
    name: 'Gaussian Splatting Knowledge Graph',
    tagline: 'Multi-agent LLM pipeline for academic paper ingestion',
    description:
      'Full-stack multi-agent LLM system that ingests academic papers, extracts structured entities/relationships, and constructs a queryable knowledge graph. 3-agent pipeline (Extractor → Resolver → Validator) using GPT-4o with provenance tracking across 40+ document chunks.',
    domain: ['ai', 'rag'],
    tech: ['PostgreSQL', 'Hono', 'Drizzle ORM', 'React', 'GPT-4o', 'TypeScript'],
    achievements: [
      '3-agent pipeline (Extractor → Resolver → Validator) with GPT-4o',
      'Queryable knowledge graph with provenance over 40+ chunks',
      'Structured entity/relationship extraction with strict JSON schemas',
    ],
    github: 'https://github.com/NikhilOO7/gaussian-splatting',
    featured: true,
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
    featured: true,
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
