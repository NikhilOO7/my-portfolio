import CollabHubImage from './../assets/images/collabhub.png';
import ChatbotImage from './../assets/images/chatbot.png';
import BlogGenImage from './../assets/images/blogGen.png';
import FianceAnalyse from './../assets/images/financial-analyser.png';

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
      id: "voice-document-intelligence",
      title: "Voice Document Intelligence Platform",
      description: "Real-time voice-based document intelligence platform with multi-agent RAG pipeline for semantic search and Q&A.",
      longDescription: "Architected a voice-based document intelligence platform using WebRTC, LiveKit, FastAPI and PostgreSQL; implemented a multi-agent RAG pipeline with CrewAI and LlamaIndex that improved search relevance by 40%, supported 1,000+ concurrent sessions with sub-50 ms latency and 95%+ transcription accuracy. Built continuous streaming infrastructure for STT/TTS (Deepgram Nova-3, Cartesia Sonic) and model inference with real-time WebRTC voice UI.",
      tags: ["AI", "Voice AI", "RAG", "Multi-Agent", "Real-time"],
      techStack: ["Python", "FastAPI", "PostgreSQL", "WebRTC", "LiveKit", "CrewAI", "LlamaIndex", "Qdrant", "Deepgram", "Kubernetes", "GCP"],
      imageUrl: ChatbotImage,
      github: "https://github.com/NikhilOO7/voice-document-intelligence",
      achievements: [
        "Implemented multi-agent RAG pipeline with 40% improvement in search relevance",
        "Supported 1,000+ concurrent sessions with sub-50ms latency and 95%+ transcription accuracy",
        "Built real-time streaming infrastructure for STT/TTS with Deepgram Nova-3 and Cartesia Sonic",
        "Deployed on GCP with Docker, Kubernetes, and comprehensive monitoring (Prometheus/Grafana)"
      ],
      featured: true
    },
    {
      id: "gaussian-splatting-knowledge-graph",
      title: "Gaussian Splatting Knowledge Graph",
      description: "AI Research Infrastructure with multi-agent LLM system for academic paper ingestion and knowledge graph construction.",
      longDescription: "Designed a full-stack multi-agent LLM system that ingests academic papers, extracts structured entities/relationships, and constructs a queryable knowledge graph using PostgreSQL, Hono, Drizzle ORM, and React Flow. Implemented a 3-agent pipeline (Extractor → Resolver → Validator) using GPT-4o with strict JSON schema outputs and provenance tracking across 40+ document chunks.",
      tags: ["AI Research", "Knowledge Graph", "Multi-Agent", "LLM"],
      techStack: ["PostgreSQL", "Hono", "Drizzle ORM", "React", "GPT-4o", "TypeScript"],
      imageUrl: ChatbotImage,
      github: "https://github.com/NikhilOO7/gaussian-splatting-kg",
      achievements: [
        "Implemented 3-agent pipeline (Extractor → Resolver → Validator) using GPT-4o",
        "Built queryable knowledge graph with provenance tracking across 40+ document chunks",
        "Designed structured entity/relationship extraction with strict JSON schema outputs"
      ],
      featured: true
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
      imageUrl: ChatbotImage,
      github: "https://github.com/NikhilOO7/conversational-ai-platform",
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
      imageUrl: FianceAnalyse,
      github: "https://github.com/NikhilOO7/trading-platform",
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
      imageUrl: FianceAnalyse,
      github: "https://github.com/NikhilOO7/financial-anomaly-detection",
      achievements: [
        "Achieved 95%+ accuracy in fraud detection using ensemble ML models",
        "Built real-time anomaly detection pipeline processing 10K+ transactions per minute",
        "Created interactive Plotly dashboards for visualizing fraud patterns and insights"
      ],
      featured: true
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
      imageUrl: ChatbotImage,
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
      imageUrl: BlogGenImage,
      github: "https://github.com/NikhilOO7/ml-data-cleaning-feature-selection",
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
      imageUrl: BlogGenImage,
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