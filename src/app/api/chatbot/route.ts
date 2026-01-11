// src/app/api/chatbot/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Load portfolio information from knowledge base file
let portfolioInfo = '';
try {
  const knowledgeBasePath = path.join(process.cwd(), 'chatbot-knowledge-base.md');
  portfolioInfo = fs.readFileSync(knowledgeBasePath, 'utf-8');
} catch (error) {
  console.error('Error loading knowledge base:', error);
  // Fallback to basic info if file can't be read
  portfolioInfo = `
PERSONAL INFORMATION:
Name: Nikhil Bindal
Title: Backend Engineer & AI Infrastructure Specialist
Location: San Francisco, CA

PROFESSIONAL SUMMARY:
Backend and AI engineer with 6+ years of experience building scalable, distributed systems and AI-powered applications.
`;
}

// Function to generate AI response
async function generateAIResponse(userMessage: string): Promise<string> {
  try {
    // Use fallback if no API key is set
    if (!openai) {
      return fallbackResponse(userMessage);
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are JARVIS, an AI assistant for Nikhil Bindal's portfolio website. 
          Your purpose is to answer questions about Nikhil's skills, experience, projects, education, and contact information.
          Only answer questions related to the portfolio information provided.
          For other questions, politely redirect the conversation back to Nikhil's professional information.
          Be helpful, concise, and friendly. Keep responses under 3 sentences unless elaboration is necessary.
          Here is Nikhil's portfolio information: ${portfolioInfo}`
        },
        { role: "user", content: userMessage }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    return completion.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error('OpenAI API error:', error);
    return fallbackResponse(userMessage);
  }
}

// Enhanced fallback response function with comprehensive information
function fallbackResponse(input: string): string {
  const lowercaseInput = input.toLowerCase();

  // Skills queries
  if (lowercaseInput.includes('skill') || lowercaseInput.includes('technologies') || lowercaseInput.includes('tech stack')) {
    if (lowercaseInput.includes('ai') || lowercaseInput.includes('ml') || lowercaseInput.includes('machine learning')) {
      return 'Nikhil has extensive AI/ML expertise including PyTorch, TensorFlow, Scikit-learn, XGBoost, LangChain, LlamaIndex, CrewAI, GPT-4o, Google Gemini, and RAG systems. He has built multi-agent AI systems and voice AI platforms.';
    } else if (lowercaseInput.includes('backend') || lowercaseInput.includes('api')) {
      return 'Nikhil is highly skilled in backend development with Python (FastAPI, Django), Node.js, Java (Spring Boot), and TypeScript. He works with PostgreSQL, MongoDB, Redis, and Qdrant, and has built systems handling 8.4M daily requests.';
    } else if (lowercaseInput.includes('cloud') || lowercaseInput.includes('devops')) {
      return 'Nikhil has strong cloud and DevOps skills including AWS (EKS, Batch, Lambda), GCP, Docker, Kubernetes, Jenkins, Prometheus, and Grafana. He has reduced infrastructure costs by 35% through optimization.';
    } else {
      return 'Nikhil has 6+ years of experience with Backend (Python, Node.js, Java), AI/ML (PyTorch, LangChain, RAG systems), Cloud (AWS, GCP, Kubernetes), and Frontend (React, Next.js). He specializes in distributed systems and AI infrastructure.';
    }
  }

  // Project queries
  else if (lowercaseInput.includes('project')) {
    if (lowercaseInput.includes('voice') || lowercaseInput.includes('document intelligence')) {
      return 'Voice Document Intelligence Platform is Nikhil\'s most advanced project - a real-time voice-based platform with multi-agent RAG pipeline supporting 1,000+ concurrent sessions with sub-50ms latency and 95%+ transcription accuracy. Built with Python, FastAPI, WebRTC, LiveKit, and CrewAI.';
    } else if (lowercaseInput.includes('knowledge graph') || lowercaseInput.includes('gaussian')) {
      return 'Gaussian Splatting Knowledge Graph uses a 3-agent pipeline (Extractor → Resolver → Validator) with GPT-4o to ingest academic papers and construct queryable knowledge graphs. Built with PostgreSQL, Hono, and React Flow.';
    } else if (lowercaseInput.includes('fraud') || lowercaseInput.includes('anomaly') || lowercaseInput.includes('financial')) {
      return 'Anomaly Detection in Financial Data achieves 95%+ accuracy in fraud detection using Isolation Forest and One-Class SVM, processing 10K+ transactions per minute with interactive Plotly dashboards.';
    } else {
      return 'Nikhil has built 11 impressive projects including Voice Document Intelligence (1,000+ concurrent sessions), Gaussian Splatting Knowledge Graph (multi-agent LLM), Anomaly Detection (95%+ accuracy), Trading Platform (MERN stack), CollabHub, and more. Check the Projects page for details!';
    }
  }

  // Experience queries
  else if (lowercaseInput.includes('experience') || lowercaseInput.includes('work') || lowercaseInput.includes('job')) {
    if (lowercaseInput.includes('times') || lowercaseInput.includes('internet')) {
      return 'At Times Internet, Nikhil scaled backend services to handle 8.4M daily requests supporting 120K+ subscribers ($150M+ revenue). He built a Kafka-based personalization pipeline achieving 9.7% CTR increase and reduced infrastructure costs by 35%.';
    } else if (lowercaseInput.includes('northeastern') || lowercaseInput.includes('university')) {
      return 'At Northeastern University, Nikhil designed a FastAPI + PostgreSQL pipeline for semantic search across 10K+ biomedical articles, built AWS Batch pipeline reducing compute costs by 40%, and created React + D3.js visualization tools.';
    } else if (lowercaseInput.includes('progcap') || lowercaseInput.includes('loan')) {
      return 'At ProgCap, Nikhil built a Loan Originating System from scratch, cutting operational errors by 90% and engineering APIs with sub-100ms latency using Java Spring Boot and React.';
    } else {
      return 'Nikhil has 6+ years of experience as AI Solutions Consultant (current), Full-Stack + AI Developer at Northeastern, Software Engineer at Times Internet (8.4M requests/day), and ProgCap (90% error reduction). He has expertise across fintech, media, research, and health tech.';
    }
  }

  // Education queries
  else if (lowercaseInput.includes('education') || lowercaseInput.includes('study') || lowercaseInput.includes('degree') || lowercaseInput.includes('university')) {
    return 'Nikhil holds a Master of Science in Information Systems from Northeastern University (2022-2023, GPA: 3.9/4.0) and a Bachelor of Technology in Computer Science from SRM Institute (2015-2019, GPA: 9.0/10.0). He studied courses in AI, cloud computing, web design, and data science.';
  }

  // Contact queries
  else if (lowercaseInput.includes('contact') || lowercaseInput.includes('hire') || lowercaseInput.includes('email') || lowercaseInput.includes('reach')) {
    return 'Nikhil is based in San Francisco, CA. You can reach him through the Contact form on this website, connect on LinkedIn (linkedin.com/in/nikhil-bindal), GitHub (github.com/NikhilOO7), or X (@NikhilBindal2). He offers consulting services in Backend, AI Solutions, and Technical Strategy.';
  }

  // Services queries
  else if (lowercaseInput.includes('service') || lowercaseInput.includes('consulting') || lowercaseInput.includes('offer')) {
    return 'Nikhil offers 3 main services: 1) Full-Stack Development (React, Next.js, Node.js, APIs), 2) AI Solutions (RAG systems, Multi-agent AI, Chatbots, ML models), and 3) Consulting & Strategy (Architecture design, AI/ML integration, System scalability). Visit the Services section for more details!';
  }

  // Achievement queries
  else if (lowercaseInput.includes('achievement') || lowercaseInput.includes('metric') || lowercaseInput.includes('result')) {
    return 'Key achievements: 1,000+ concurrent sessions with sub-50ms latency, 95%+ accuracy in fraud detection, 8.4M daily requests handled, $150M+ revenue contribution, 40% search improvement, 90% error reduction, 60% API call reduction, and 35% infrastructure cost savings.';
  }

  // Greeting
  else if (lowercaseInput.includes('hi') || lowercaseInput.includes('hello') || lowercaseInput.includes('hey')) {
    return 'Hello! I\'m JARVIS, Nikhil\'s AI assistant. I can tell you about his 6+ years of experience in Backend & AI engineering, 11 impressive projects, technical skills, work history, or how to get in touch. What would you like to know?';
  }

  // Default
  else {
    return 'I\'m here to help you learn about Nikhil Bindal! I can share details about his skills (Backend, AI/ML, Cloud), projects (Voice AI, Knowledge Graphs, Trading Platform), 6+ years of work experience (Times Internet, Northeastern, ProgCap), education (MS from Northeastern), or how to contact him. What interests you?';
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Generate AI response
    const response = await generateAIResponse(message);
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chatbot API error:', error);
    
    return NextResponse.json(
      { error: 'Failed to process your request', response: 'Sorry, I encountered an error. Please try again.' },
      { status: 500 }
    );
  }
}