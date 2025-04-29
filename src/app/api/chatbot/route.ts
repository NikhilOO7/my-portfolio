// src/app/api/chatbot/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Add this to your .env.local
});

// Portfolio information for context
const portfolioInfo = `
Name: Nikhil Bindal
Role: Software Engineer & AI/ML Practitioner
Location: Boston, Massachusetts

EDUCATION:
- Master of Science in Artificial Intelligence, University of the Cumberlands (2024-Present)
- Master of Science in Information Systems, Northeastern University (2022-2024)
- Bachelor of Technology in Computer Science, Kurukshetra University (2012-2016)

SKILLS:
Frontend: React, Next.js, JavaScript, TypeScript
Backend: Node.js, FastAPI, Python, Java, Spring Boot, GraphQL
Databases: MongoDB, PostgreSQL
AI/ML: Machine Learning, TensorFlow, LLMs & RAG, NLP
Cloud & DevOps: AWS, GCP, Docker, Kubernetes

EXPERIENCE:
- Full Stack Developer at Northeastern University (May 2023 - Sep 2023): Built ReactJS components for research portal, developed LLM-driven chatbot for Natural Language to SQL queries, built FastAPI microservices for AI models on GCP.
- Software Engineer at Times Internet (Apr 2021 - Jul 2022): Developed scalable web applications, built RESTful APIs, developed AI-powered personalization engine.
- Software Engineer at Progcap (Jan 2019 - Mar 2021): Developed financial automation modules, engineered data transformation layer, built credit risk scoring pipeline.
- Software Engineer at Livemedia (Aug 2017 - May 2018): Developed microservices-based applications, built rule-based vehicle inspection engine, orchestrated deployments.

PROJECTS:
1. AI-Powered Blog Generator: Blog content generator using Llama 3.1 and RAG. Built with React, FastAPI, Python, AWS.
2. Nexus AI Chatbot: Enterprise-grade chatbot using GPT-4o for customer support. Built with React, Node.js, Python, AWS.
3. AI Financial Risk Analyzer: Platform analyzing SEC filings and earnings reports. Built with Python, FastAPI, AWS, React.
4. CollabHub: Real-time team collaboration platform with chat, task management, and video conferencing. Built with React, Node.js, MongoDB, AWS.

CONTACT:
Email: nikhil.bindal@outlook.com
Phone: (857) 313-5445
GitHub: https://github.com/NikhilOO7
LinkedIn: https://linkedin.com/in/nikhil-bindal
Buy Me a Coffee: https://www.buymeacoffee.com/nikhil007
`;

// Function to generate AI response
async function generateAIResponse(userMessage: string): Promise<string> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      // Fallback if no API key is set
      return fallbackResponse(userMessage);
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // You can upgrade to gpt-4 for better results
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

// Fallback response function using predefined rules
function fallbackResponse(input: string): string {
  const lowercaseInput = input.toLowerCase();
  
  if (lowercaseInput.includes('skill') || lowercaseInput.includes('what can you do')) {
    return 'Nikhil is proficient in React, Next.js, Node.js, Python, and AI technologies like LLMs and NLP. He has experience with cloud platforms including AWS and GCP, and is skilled in both frontend and backend development.';
  } else if (lowercaseInput.includes('project')) {
    return 'Nikhil has built several impressive projects including AI-Powered Blog Generator, Nexus AI Chatbot, and Financial Risk Analyzer. You can check them out on the Projects page or ask me for specific details about any of them!';
  } else if (lowercaseInput.includes('experience') || lowercaseInput.includes('work')) {
    return 'Nikhil has worked as a Full Stack Developer at Northeastern University, Software Engineer at Times Internet and Progcap, and more. His experience spans full stack development, AI implementation, and backend architecture.';
  } else if (lowercaseInput.includes('education') || lowercaseInput.includes('study')) {
    return 'Nikhil has a Master of Science in Information Systems from Northeastern University and is currently pursuing another Master\'s in Artificial Intelligence from University of the Cumberlands. He also holds a Bachelor of Technology in Computer Science from Kurukshetra University.';
  } else if (lowercaseInput.includes('contact') || lowercaseInput.includes('hire') || lowercaseInput.includes('email')) {
    return 'You can contact Nikhil at nikhil.bindal@outlook.com, call at (857) 313-5445, or use the contact form on the Contact page. He\'s based in Boston, Massachusetts.';
  } else if (lowercaseInput.includes('buy me a coffee') || lowercaseInput.includes('donation') || lowercaseInput.includes('support')) {
    return 'You can support Nikhil\'s work by visiting his Buy Me a Coffee page at https://www.buymeacoffee.com/nikhil007. Your support helps him continue creating projects and content!';
  } else if (lowercaseInput.includes('hi') || lowercaseInput.includes('hello')) {
    return 'Hey there! How can I help you learn about Nikhil today?';
  } else {
    return 'I can tell you about Nikhil\'s skills, projects, work experience, education, or how to contact him. What would you like to know?';
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