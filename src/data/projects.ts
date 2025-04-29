import CollabHubImage from './../assets/images/collabhub.png';
import ChatbotImage from './../assets/images/chatbot.png';
import BlogGenImage from './../assets/images/blogGen.png';

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
      id: "ai-blog-generator",
      title: "AI-Powered Blog Generator",
      description: "AI-driven blog post and content generator using Llama 3.1 and RAG.",
      longDescription: "Designed and developed a full-stack web application that automatically generates, edits, and publishes SEO-optimized blogs using LLMs (Llama 3.1 via Hugging Face). The system uses Retrieval-Augmented Generation (RAG) with FAISS vector database to produce contextually relevant content based on user-provided topics and outlines.",
      tags: ["AI", "Content Generation", "LLM", "RAG"],
      techStack: ["React", "FastAPI", "Python", "AWS"],
      imageUrl: BlogGenImage,
      github: "https://github.com/NikhilOO7/ai-blog-generator",
      demo: "https://blog-generator-demo.com",
      achievements: [
        "Implemented real-time fine-tuning with RAG on dynamic datasets, enhancing content relevance and personalization",
        "Built custom FastAPI microservices for prompt engineering and model inference, serving responses via RESTful APIs",
        "Created a ReactJS-based markdown editor with live preview and version history, improving editor productivity by 40%"
      ],
      featured: true
    },
    {
      id: "conversational-ai-chatbot",
      title: "Nexus AI Chatbot",
      description: "Enterprise-grade AI chatbot leveraging GPT-4o for customer support automation.",
      longDescription: "Built a production-grade AI chatbot using GPT-4o (OpenAI API) and LangChain to automate responses for tier-1 customer support queries. Implemented semantic retrieval using FAISS to fetch contextually relevant answers from internal FAQs and documentation, enhancing response accuracy.",
      tags: ["LLM", "Chatbot", "Customer Support", "NLP"],
      techStack: ["React", "Node.js", "Python", "AWS"],
      imageUrl: ChatbotImage,
      github: "https://github.com/NikhilOO7/nexusChatbot",
      demo: "https://nexus-demo.com",
      achievements: [
        "Reduced average query handling time by 45% through advanced NLP techniques for intent recognition",
        "Orchestrated prompt templates, system instructions, and fallback logic using LangChain agents",
        "Integrated with enterprise support systems, improving customer satisfaction scores and automation efficiency"
      ],
      featured: true
    },
    {
      id: "financial-risk-analyzer",
      title: "AI Financial Risk Analyzer",
      description: "AI-driven financial risk assessment platform analyzing SEC filings and earnings reports.",
      longDescription: "Developed an AI-driven financial risk assessment platform using GPT-4o, FAISS, and AWS Bedrock to analyze earnings reports and SEC filings. The system can parse complex financial documents and extract key risk factors, with a custom FastAPI backend for real-time financial query resolution.",
      tags: ["Fintech", "Risk Analysis", "LLM", "RAG"],
      techStack: ["Python", "FastAPI", "AWS", "React"],
      imageUrl: "/images/risk-analyzer-thumb.jpg",
      github: "https://github.com/nikhilbindal/financial-risk-analyzer",
      demo: "https://risk-analyzer-demo.com",
      achievements: [
        "Improved risk factor identification by 35% using fine-tuned RAG models",
        "Reduced report processing time by 50% through efficient AWS Lambda deployment",
        "Enhanced investment decision-making accuracy through AI-driven insights"
      ],
      featured: true
    },
    {
      id: "collabhub",
      title: "CollabHub",
      description: "Real-time team collaboration platform integrating chat, task management, and video conferencing.",
      longDescription: "Developed a team collaboration platform with real-time chat, task management, and video conferencing features. Built with a microservices architecture to ensure scalability and reliability, the platform offers seamless integration between different collaboration tools in one unified interface.",
      tags: ["Collaboration", "Real-time", "WebRTC", "SaaS"],
      techStack: ["React", "Node.js", "MongoDB", "AWS"],
      imageUrl: CollabHubImage,
      github: "https://github.com/NikhilOO7/collabhub",
      demo: "https://collabhub-demo.com",
      achievements: [
        "Implemented WebRTC and Socket.IO for real-time communication and data synchronization",
        "Designed a responsive UI with React.js, Material-UI, and Apollo Client",
        "Built a scalable backend with Node.js, MongoDB, and GraphQL"
      ],
      featured: false
    },
    {
      id: "loan-originating-system",
      title: "LoanPro System",
      description: "ERP-integrated financial automation system for loan origination and management.",
      longDescription: "Built and launched a Loan Originating System from scratch using Java Spring Boot and React JS, improving loan processing efficiency and user experience. The system integrates with various ERPs and features automated workflows for credit assessment, disbursal and repayment tracking.",
      tags: ["Fintech", "Automation", "Microservices"],
      techStack: ["React", "Java", "MongoDB", "AWS"],
      imageUrl: "/images/loanpro-thumb.jpg",
      github: "https://github.com/nikhilbindal/loanpro",
      demo: "https://loanpro-demo.com",
      achievements: [
        "Cut operational errors by 90% through robust validation and automated workflows",
        "Engineered high-throughput APIs with sub-100ms latency for real-time transactions",
        "Increased system scalability through containerized microservices deployment"
      ],
      featured: false
    }
  ];
  
  export const featuredProjects = projects.filter(project => project.featured);