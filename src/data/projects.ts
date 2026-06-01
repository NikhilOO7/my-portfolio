import CollabHubImage from './../assets/images/collabhub.png';
import ChatbotImage from './../assets/images/chatbot.png';
import BlogGenImage from './../assets/images/blogGen.png';
import FianceAnalyse from './../assets/images/financial-analyser.png';
import VoiceDocIntelligenceImage from './../assets/images/voice-doc-intelligence.png';
import GaussianImage from './../assets/images/Gaussian-splatting.png';
import RecoMeImage from './../assets/images/ml-feature-selection.png';
import GennieImage from './../assets/images/gennie.png';
import TradingImage from './../assets/images/trading.png';
import AnomalyImage from './../assets/images/anomaly.png';
import LLMBiasImage from './../assets/images/bias-analyser.png';
import MLFeatureImage from './../assets/images/ml-feature-selection.png';
import WeatherImage from './../assets/images/weather.png';

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    tags: string[];
    techStack: string[];
    imageUrl: any;
    github?: string;
    demo?: string;
    achievements: string[];
    featured: boolean;
  }
  
  export const projects: Project[] = [
    {
      id: "recome-recommendation-engine",
      title: "RecoMe — Personalized Recommendation Engine",
      description: "Personal interest-graph and agentic recommendation engine turning cross-platform activity into a typed Neo4j interest graph with SSE-streamed recommendations.",
      longDescription: "Built RecoMe — a capture → signal → graph → agent → surface pipeline that ingests 15+ cross-platform activity sources into a typed Neo4j interest graph plus Qdrant per-user vectors, with recommendations streamed to the client over SSE. Orchestrated 5 background agents behind a single Guardian gate enforcing a hard $0.10/user/day LLM cost cap, throttling, and quiet hours, plus a prompt-injection-resistant scorer (the LLM writes prose only, never the verdict). Runs on BullMQ workers with idempotent Stripe metering and a dual consumer + multi-tenant surface on one backend.",
      tags: ["AI", "Agentic", "Recommendation Systems", "Personalization", "Knowledge Graph", "Real-time"],
      techStack: ["TypeScript", "Hono", "Prisma", "Neo4j", "Qdrant", "Redis", "BullMQ", "Stripe", "SSE", "PostgreSQL"],
      imageUrl: RecoMeImage,
      github: "https://github.com/NikhilOO7/recome-website",
      achievements: [
        "Pipeline ingests 15+ cross-platform sources into a typed Neo4j interest graph + Qdrant per-user vectors",
        "Guardian gate enforces a hard $0.10/user/day LLM cost cap with prompt-injection-resistant scoring",
        "Recommendations streamed over SSE; runs on BullMQ workers with idempotent Stripe metering"
      ],
      featured: true
    },
    {
      id: "voice-document-intelligence",
      title: "Donna — Voice Document Intelligence Platform",
      description: "AI meeting-intelligence platform automating pre-meeting research, live in-meeting assistance, and post-meeting synthesis with real-time voice and hybrid RAG.",
      longDescription: "Built Donna — an AI meeting-intelligence platform shipped end to end (0→1) that automates pre-meeting research, live in-meeting assistance, and post-meeting synthesis for real users. A 3-phase agentic architecture orchestrates 15 specialized agents behind a uniform contract, with hybrid contextual RAG over Qdrant combining vector and keyword retrieval via reciprocal-rank fusion (~40% relevance lift over a naive dense baseline, measured). The real-time voice pipeline (LiveKit WebRTC + Deepgram STT + Cartesia TTS) targets sub-200ms perceived latency with a replica-independent WebSocket fan-out over Redis pub/sub.",
      tags: ["AI", "Voice AI", "RAG", "Multi-Agent", "Real-time", "Agentic"],
      techStack: ["Python", "FastAPI", "PostgreSQL", "Qdrant", "Redis", "LiveKit", "WebRTC", "Deepgram", "Cartesia", "CrewAI"],
      imageUrl: VoiceDocIntelligenceImage,
      github: "https://github.com/NikhilOO7/voice-doc-intelligence",
      achievements: [
        "15-agent 3-phase orchestration behind a uniform agent contract — parallel fan-out trivial to extend",
        "Hybrid contextual RAG (vector + keyword + reciprocal-rank fusion) lifted retrieval relevance ~40% over a naive dense baseline",
        "Real-time voice pipeline (LiveKit WebRTC + Deepgram + Cartesia) targeting sub-200ms perceived latency",
        "Replica-independent WebSocket fan-out over Redis pub/sub for horizontal scaling"
      ],
      featured: true
    },
    {
      id: "knowledge-graph-application",
      title: "Knowledge Graph Application",
      description: "Document-ingestion system whose centerpiece is automatic context routing — embedding-similarity decides whether to extend an existing knowledge bucket or create a new one.",
      longDescription: "A document-ingestion system whose centerpiece is automatic context routing — on upload it decides append-to-existing vs. create-new \"bucket\" via embedding similarity with an LLM tie-breaker, so related documents enrich one graph and unrelated ones stay isolated. A LangGraph state machine (prepare → route → ontology → extract → finalize) drives a CrewAI crew and a per-bucket inferred ontology (no hardcoded types), with graceful degradation when no LLM key is present.",
      tags: ["AI", "Knowledge Graph", "Multi-Agent", "RAG", "LLM", "Agentic"],
      techStack: ["Python", "FastAPI", "LangGraph", "CrewAI", "Neo4j", "PostgreSQL", "React"],
      imageUrl: GaussianImage,
      github: "https://github.com/NikhilOO7/knowledge-graph-application",
      achievements: [
        "Automatic context routing — embedding similarity + LLM tie-breaker decides append-vs-new-bucket per upload",
        "LangGraph state machine (prepare → route → ontology → extract → finalize) drives a CrewAI crew",
        "Per-bucket inferred ontology (no hardcoded types) with graceful degradation when no LLM key is present"
      ],
      featured: false
    },
    {
      id: "manifold-strata",
      title: "Manifold Strata — Geometric Low-LLM Retrieval Engine",
      description: "Knowledge-graph retrieval engine that minimises LLM calls by doing entity resolution and validation in embedding and rule space; concepts live in hyperbolic (Poincaré) geometry.",
      longDescription: "Manifold Strata ingests arXiv papers (auto-fetch → PDF extraction → agentic extract/resolve/validate with edge-level provenance) into a knowledge graph, then minimises LLM calls by doing entity resolution and relationship validation in embedding/rule space rather than per-step prompts — canonicalising variants like \"3DGS\" → \"3D Gaussian Splatting\" and cutting ~60 raw mentions to ~42 deduped entities per paper. Retrieval uses HippoRAG-style Personalized PageRank; concepts live in hyperbolic (Poincaré) space for hierarchy-aware similarity; context is compressed via propositions + MMR before a single answer call. Exposes the graph to AI clients (e.g. Claude) as an MCP server for tool-based search/retrieval, with a PIPELINE_MODE=field|legacy switch that A/B-benchmarks the LLM-call savings.",
      tags: ["AI", "Knowledge Graph", "RAG", "Agentic", "Geometric ML", "MCP"],
      techStack: ["TypeScript", "Hono", "Drizzle", "PostgreSQL", "React", "MCP Server"],
      imageUrl: GaussianImage,
      github: "https://github.com/NikhilOO7/manifold-strata",
      achievements: [
        "Entity resolution & relationship validation in embedding/rule space — cuts LLM call volume vs. per-step prompts",
        "Canonicalises variants (e.g. \"3DGS\" → \"3D Gaussian Splatting\"): ~60 raw mentions collapse to ~42 deduped entities per paper",
        "Retrieval via HippoRAG-style Personalized PageRank; concepts in hyperbolic (Poincaré) space for hierarchy-aware similarity",
        "Exposes the graph to AI clients as an MCP server; PIPELINE_MODE switch A/B-benchmarks the LLM-call savings"
      ],
      featured: true
    },
    {
      id: "gaussian-splatting-knowledge-graph",
      title: "Gaussian Splatting Knowledge Graph (archived)",
      description: "Earlier 3-agent multi-agent LLM system that ingested academic papers and constructed a queryable knowledge graph with provenance tracking.",
      longDescription: "Full-stack multi-agent LLM system that ingested academic papers and constructed a queryable knowledge graph using a 3-agent pipeline (Extractor → Resolver → Validator) with GPT-4o under strict JSON schema and provenance tracking across 40+ document chunks. Superseded by the Manifold Strata engine, which moved the same problem into embedding/rule space and added a Poincaré-disk geometry for hierarchy-aware retrieval.",
      tags: ["AI Research", "Knowledge Graph", "Multi-Agent", "LLM"],
      techStack: ["PostgreSQL", "Hono", "Drizzle ORM", "React", "GPT-4o", "TypeScript"],
      imageUrl: GaussianImage,
      github: "https://github.com/NikhilOO7/gaussian-splatting",
      achievements: [
        "Implemented 3-agent pipeline (Extractor → Resolver → Validator) using GPT-4o",
        "Built queryable knowledge graph with provenance tracking across 40+ document chunks",
        "Designed structured entity/relationship extraction with strict JSON schema outputs"
      ],
      featured: false
    },
    {
      id: "nexus-chatbot",
      title: "NexusChatbot - Multi-Agent AI Assistant",
      description: "Multi-agent conversational AI with specialized agents for research, coding, and task automation.",
      longDescription: "Built a sophisticated multi-agent AI chatbot using CrewAI and LangChain that orchestrates specialized agents for research, coding assistance, and task automation. Implemented dynamic agent coordination, context management, and tool integration for enhanced conversational capabilities with persistent memory and learning.",
      tags: ["AI", "Multi-Agent", "LLM", "Automation"],
      techStack: ["Python", "CrewAI", "LangChain", "FastAPI", "React", "PostgreSQL", "Redis"],
      imageUrl: ChatbotImage,
      github: "https://github.com/NikhilOO7/nexusChatbot",
      achievements: [
        "Orchestrated multiple specialized AI agents with dynamic coordination and context sharing",
        "Implemented persistent memory and learning capabilities using vector databases",
        "Built tool integration framework for web search, code execution, and API interactions"
      ],
      featured: false
    },
    {
      id: "conversational-ai-chatbot",
      title: "Conversational AI Platform (Gennie)",
      description: "Next-door chatbot with Google Gemini API integration and real-time sentiment detection.",
      longDescription: "Integrated Google Gemini API and sentiment detection into a React/FastAPI app; supported 500+ concurrent users with 40% lower latency, demonstrating ability to blend full-stack engineering with AI. The platform features real-time sentiment analysis, context-aware responses, and personalized conversation flows with emotional intelligence.",
      tags: ["LLM", "AI", "Real-time", "Full-Stack", "Sentiment Analysis"],
      techStack: ["React", "FastAPI", "Python", "Google Gemini", "WebSocket", "Redis", "PostgreSQL"],
      imageUrl: GennieImage,
      github: "https://github.com/NikhilOO7/next-door-chatbot",
      achievements: [
        "Supported 500+ concurrent users with 40% lower latency through optimized WebSocket connections",
        "Integrated Google Gemini API for advanced conversational AI with context retention",
        "Implemented real-time sentiment detection and emotional intelligence in conversations"
      ],
      featured: false
    },
    {
      id: "trading-platform",
      title: "Trading Platform",
      description: "End-to-end MERN + TypeScript app for live stock trading with GraphQL and WebSocket feeds.",
      longDescription: "Developed a comprehensive trading platform using MERN stack with TypeScript, implementing GraphQL and WebSocket feeds for real-time stock data. The platform features responsive dashboards, portfolio management, real-time price alerts, and reduced API calls by 60% through efficient data fetching strategies and intelligent caching.",
      tags: ["Fintech", "Real-time", "Trading", "Full-Stack"],
      techStack: ["MongoDB", "Express", "React", "Node.js", "TypeScript", "GraphQL", "WebSocket", "Redis"],
      imageUrl: TradingImage,
      github: "https://github.com/NikhilOO7/zerodha-ai-trading-platform",
      achievements: [
        "Implemented GraphQL and WebSocket feeds for real-time stock data with sub-100ms latency",
        "Reduced API calls by 60% through intelligent caching and efficient data fetching",
        "Built responsive dashboards with live trading, portfolio management, and price alerts"
      ],
      featured: false
    },
    {
      id: "financial-data-anomaly-detection",
      title: "Anomaly Detection in Financial Data",
      description: "ML-powered fraud detection pipeline using Isolation Forest and One-Class SVM with 95%+ accuracy.",
      longDescription: "Built fraud-detection pipeline using Isolation Forest and One-Class SVM; achieved 95%+ accuracy and visualised insights via Plotly dashboards. The system processes large volumes of financial transactions in real-time to detect anomalies, potential fraud patterns, and suspicious activities with comprehensive alerting and reporting.",
      tags: ["Fintech", "Machine Learning", "Fraud Detection", "Data Science"],
      techStack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Plotly", "FastAPI", "PostgreSQL"],
      imageUrl: AnomalyImage,
      github: "https://github.com/NikhilOO7/Anomaly-Detection-in-Financial-Data",
      achievements: [
        "Achieved 95%+ accuracy in fraud detection using ensemble ML models",
        "Built real-time anomaly detection pipeline processing 10K+ transactions per minute",
        "Created interactive Plotly dashboards for visualizing fraud patterns and insights"
      ],
      featured: false
    },
    {
      id: "collabhub",
      title: "CollabHub",
      description: "Real-time team collaboration platform integrating chat, task management, and video conferencing.",
      longDescription: "Developed a comprehensive team collaboration platform with real-time chat, task management, Kanban boards, and video conferencing features. Built with a microservices architecture to ensure scalability and reliability, the platform offers seamless integration between different collaboration tools in one unified interface with role-based access control.",
      tags: ["Collaboration", "Real-time", "WebRTC", "SaaS", "Full-Stack"],
      techStack: ["React", "Node.js", "MongoDB", "GraphQL", "WebRTC", "Socket.io", "AWS", "Docker"],
      imageUrl: CollabHubImage,
      github: "https://github.com/NikhilOO7/collabhub",
      achievements: [
        "Implemented WebRTC and Socket.IO for real-time communication and data synchronization",
        "Designed a responsive UI with React.js, Material-UI, and Apollo Client for GraphQL",
        "Built a scalable microservices backend with Node.js, MongoDB, and containerized deployment"
      ],
      featured: false
    },
    {
      id: "llm-bias-analyzer",
      title: "LLM Bias Analyzer",
      description: "Tool to analyze and detect biases in Large Language Model outputs across different demographics.",
      longDescription: "Developed a comprehensive bias detection and analysis tool for Large Language Models that evaluates outputs across gender, race, age, and other demographic dimensions. Uses statistical analysis, sentiment comparison, and semantic similarity to identify potential biases in LLM responses with detailed reporting and visualization.",
      tags: ["AI", "Ethics", "LLM", "Research", "Data Science"],
      techStack: ["Python", "PyTorch", "Transformers", "FastAPI", "React", "Plotly", "Pandas"],
      imageUrl: LLMBiasImage,
      github: "https://github.com/NikhilOO7/llm-bias-analyzer",
      achievements: [
        "Built multi-dimensional bias detection framework analyzing gender, race, and age biases",
        "Implemented statistical analysis and semantic similarity metrics for bias quantification",
        "Created interactive visualizations and comprehensive reports for bias patterns"
      ],
      featured: false
    },
    {
      id: "ai-saas-chatbot",
      title: "AI-SaaS-Chatbot",
      description: "SaaS chatbot platform with customizable AI agents, analytics, and multi-channel integration.",
      longDescription: "Built a comprehensive SaaS chatbot platform that allows businesses to create, customize, and deploy AI-powered chatbots across multiple channels. Features include customizable conversation flows, analytics dashboard, multi-language support, CRM integration, and usage-based billing with tiered subscription plans.",
      tags: ["SaaS", "AI", "Chatbot", "Full-Stack", "Business"],
      techStack: ["React", "Node.js", "PostgreSQL", "Redis", "Stripe", "WebSocket", "Docker", "AWS"],
      imageUrl: ChatbotImage,
      github: "https://github.com/NikhilOO7/ai-saas-chatbot",
      achievements: [
        "Built multi-tenant SaaS architecture with customizable AI chatbot creation and deployment",
        "Implemented analytics dashboard with conversation insights and performance metrics",
        "Integrated Stripe for subscription management and usage-based billing"
      ],
      featured: false
    },
    {
      id: "ml-data-cleaning",
      title: "ML Data Cleaning and Feature Selection",
      description: "Automated ML pipeline for data preprocessing, cleaning, and intelligent feature selection.",
      longDescription: "Developed an automated machine learning pipeline that handles data preprocessing, cleaning, missing value imputation, outlier detection, and intelligent feature selection using multiple algorithms. Supports various data types and provides recommendations for optimal feature sets to improve model performance and reduce training time.",
      tags: ["Machine Learning", "Data Science", "Automation", "MLOps"],
      techStack: ["Python", "Scikit-learn", "Pandas", "NumPy", "XGBoost", "FastAPI", "Docker"],
      imageUrl: MLFeatureImage,
      github: "hhttps://github.com/NikhilOO7/ML-Data-Cleaning-and-Feature-Selection",
      achievements: [
        "Built automated data cleaning pipeline handling missing values, outliers, and duplicates",
        "Implemented multiple feature selection algorithms (RFE, LASSO, Tree-based importance)",
        "Reduced training time by 50% through intelligent feature selection while maintaining model accuracy"
      ],
      featured: false
    },
    {
      id: "weather-app",
      title: "Weather Application",
      description: "Modern weather app with real-time forecasts, location-based alerts, and interactive visualizations.",
      longDescription: "Built a comprehensive weather application featuring real-time weather data, 7-day forecasts, severe weather alerts, and interactive visualizations. Includes location-based services, favorite locations, historical weather data comparison, and beautiful UI with animated weather conditions and responsive design across all devices.",
      tags: ["Full-Stack", "API Integration", "Real-time", "Mobile-Friendly"],
      techStack: ["React", "TypeScript", "Node.js", "OpenWeather API", "Chart.js", "Tailwind CSS"],
      imageUrl: WeatherImage,
      github: "https://github.com/NikhilOO7/weather-app",
      achievements: [
        "Integrated multiple weather APIs with fallback mechanisms for 99.9% uptime",
        "Built responsive UI with animated weather conditions and interactive visualizations",
        "Implemented location-based services with geolocation and favorite locations management"
      ],
      featured: false
    }
  ];
  
  export const featuredProjects = projects.filter(project => project.featured);