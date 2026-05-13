// src/app/api/chatbot/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { KNOWLEDGE_GRAPH, serializeForLLM } from '@/lib/knowledge/graph';

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// Compile the JARVIS knowledge graph into a deterministic system context.
// Cached at module load — change the KG, redeploy, get the new context.
const KG_CONTEXT = serializeForLLM(KNOWLEDGE_GRAPH);

const SYSTEM_PROMPT = `You are J.A.R.V.I.S — Nikhil Bindal's archival assistant on his portfolio website.

Voice & character:
- Speak in the calm, dry, slightly formal cadence of Iron Man's J.A.R.V.I.S.
- Always refer to Nikhil in the third person — never speak as Nikhil. You are his AI assistant, not him.
- Be concise (2–4 sentences typical). Lead with the answer, then a fact or two.
- Use specific numbers and entity names from the knowledge base when relevant.
- It is acceptable (and on-brand) to occasionally address the visitor as "sir" or "madam" once per conversation — do not overdo it.
- When asked about something not in the knowledge base, say so politely and steer back to Nikhil's experience, projects, skills, education, or how to reach him.
- When asked who YOU are: "I am J.A.R.V.I.S — Nikhil's archival assistant for this portfolio."

Knowledge base (single source of truth):
${KG_CONTEXT}

Formatting:
- Plain text only — no markdown headers, no bullets unless the user asks for a list. Short paragraphs.
- If listing projects/experiences, use a comma-separated inline list when there are <= 4 items; only use line breaks for 5+.
- Always finish with a clear, declarative sentence — no trailing questions unless the user asked a question that requires clarification.
`;

async function generateAIResponse(userMessage: string, history: { role: 'user' | 'assistant'; content: string }[] = []): Promise<string> {
  if (!openai) {
    return fallbackResponse(userMessage);
  }
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history.slice(-6).map(h => ({ role: h.role, content: h.content })),
        { role: 'user', content: userMessage },
      ],
      max_tokens: 380,
      temperature: 0.6,
    });
    return (
      completion.choices[0]?.message?.content?.trim() ||
      "Apologies — I could not formulate a response. Please try again."
    );
  } catch (error) {
    console.error('OpenAI API error:', error);
    return fallbackResponse(userMessage);
  }
}

// Lean keyword fallback used only if the LLM is unavailable.
function fallbackResponse(input: string): string {
  const q = input.toLowerCase();
  const p = KNOWLEDGE_GRAPH.person;

  if (/^(hi|hello|hey|greetings)/.test(q)) {
    return `Good day. I am J.A.R.V.I.S — ${p.shortName}'s archival assistant. Ask me about his projects, skills, experience, or how to reach him.`;
  }
  if (q.includes('who') && (q.includes('you') || q.includes('jarvis'))) {
    return "I am J.A.R.V.I.S — Nikhil's archival assistant for this portfolio.";
  }
  if (q.includes('contact') || q.includes('reach') || q.includes('email') || q.includes('hire')) {
    return `${p.shortName} is based in ${p.location}. Email: ${p.email}. LinkedIn: ${p.links.linkedin}.`;
  }
  if (q.includes('project')) {
    const featured = KNOWLEDGE_GRAPH.projects.filter(pr => pr.featured).map(pr => pr.name).join(', ');
    return `${p.shortName} has shipped ${KNOWLEDGE_GRAPH.projects.length} projects. Featured: ${featured}.`;
  }
  if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
    return `Six domains: Python/FastAPI/Node.js for development, GCP/AWS/Kubernetes for infrastructure, Agentic Workflows/RAG/CrewAI/LangGraph for AI, and Claude Code/Cursor for tooling. Six-plus years of production experience.`;
  }
  if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('career')) {
    return `${p.shortName} has worked as AI Consultant (Sep 2024–present) at Neurologica and a stealth AI startup, Full-Stack Developer at Northeastern University, Software Engineer at Times Internet (8.4M req/day), Founding Engineer at Progcap (22K TPS), and earlier at LiveMedia.`;
  }
  if (q.includes('education') || q.includes('degree') || q.includes('school')) {
    return `${p.shortName} holds an M.Sc. in Artificial Intelligence from the University of the Cumberlands (2024–2025), an M.Sc. in Information Systems from Northeastern University (2022–2024), and a B.Tech. in Computer Science from Kurukshetra University (2012–2016).`;
  }
  return `I can speak about ${p.shortName}'s projects, skills, experience, education, or how to reach him. What would you like to know?`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body as {
      message?: string;
      history?: { role: 'user' | 'assistant'; content: string }[];
    };

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const response = await generateAIResponse(message, history ?? []);
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request', response: 'Sorry, I encountered an error. Please try again.' },
      { status: 500 }
    );
  }
}
