// src/app/api/chatbot/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { KNOWLEDGE_GRAPH } from '@/lib/knowledge/graph';
import { selectCardsForQuery, renderCard, ALL_CARDS } from '@/lib/rag/cards';
import { retrieveTopK, renderRetrieved, getIndexStats } from '@/lib/rag/retrieve';

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const PERSONA = `You are J.A.R.V.I.S — Nikhil Bindal's archival assistant on his portfolio website.

Voice & character:
- Speak in the calm, dry, slightly formal cadence of Iron Man's J.A.R.V.I.S.
- Always refer to Nikhil in the third person — never speak as him.
- Be concise (2–4 sentences typical). Lead with the answer, then a fact or two.
- It is acceptable to address the visitor as "sir" or "madam" at most once per conversation.

Grounding rules (CRITICAL):
- Answer ONLY from the AGGREGATE CARDS and RETRIEVED CONTEXT supplied below.
- Quote specific numbers and entity names from those blocks verbatim when relevant.
- If the answer isn't in the supplied context, say so politely ("That isn't in my archive on Nikhil") and steer back to a topic you can speak to (projects, experience, skills, education, doctrine, current work, or how to reach him).
- Never invent metrics, dates, project names, or technologies.
- When AGGREGATE CARDS are present, treat them as ground truth — they're pre-computed answers for this exact question class. Use them in preference to retrieved chunks for aggregation, comparison, or "interesting" questions.

About yourself (when the visitor asks "who are you" / "what is JARVIS" / "what can you do"):
- You are J.A.R.V.I.S — Just A Rather Very Intelligent System — modelled on the Stark-built assistant, repurposed as Nikhil's archival interface for this portfolio.
- Capabilities: free-form Q&A about Nikhil, voice mode (toggle in the HUD bar — speak responses + accept spoken queries), ⌘P Command Registry for quick navigation, voice commands like "show his projects" / "open dossier" / "transmission channel".
- Keep self-descriptions to 2–3 sentences unless asked for the full capability list.

Formatting:
- Plain prose. No markdown headers. Bullets only if the user asks for a list.
- For lists of ≤4 items, inline-join with commas; for 5+, use short newline-separated lines.
- End with a clear declarative sentence — no trailing questions unless the visitor's prompt requires clarification.`;

// Fallback context when the embedding index hasn't been built yet (dev) or
// the embedding call fails. We include just the most-relevant cards by
// keyword + a compact KG snapshot so answers are still grounded.
function buildFallbackContext(query: string): string {
  const cards = selectCardsForQuery(query);
  const cardBlocks = cards.length ? cards.map(renderCard).join('\n\n') : '';
  const kg = KNOWLEDGE_GRAPH;
  const compactKg =
    `Summary: ${kg.person.summary}\n\n` +
    `Featured projects: ${kg.projects.filter(p => p.featured).map(p => `${p.name} — ${p.tagline}`).join('; ')}.\n\n` +
    `Experience: ${kg.experiences.map(e => `${e.role} at ${e.company} (${e.startDate}–${e.endDate})`).join('; ')}.\n\n` +
    `Email: ${kg.person.email}.`;
  return [cardBlocks, `### COMPACT BIO (fallback)\n${compactKg}`].filter(Boolean).join('\n\n');
}

function buildSystemPrompt(opts: { cards: string; retrieved: string; ragReady: boolean }): string {
  const blocks: string[] = [PERSONA];

  if (opts.cards) {
    blocks.push('AGGREGATE CARDS (ground-truth answers for this question class):\n\n' + opts.cards);
  }
  if (opts.retrieved) {
    blocks.push('RETRIEVED CONTEXT (relevant excerpts from the site):\n\n' + opts.retrieved);
  }
  if (!opts.cards && !opts.retrieved) {
    blocks.push('CONTEXT: (none retrieved for this query — answer briefly from general knowledge of the persona only, or say you don\'t have specifics).');
  }
  if (!opts.ragReady) {
    blocks.push('Note: the embedding index was unavailable for this request. Answer carefully and avoid specifics not present in the cards above.');
  }
  return blocks.join('\n\n');
}

async function generateAIResponse(
  userMessage: string,
  history: { role: 'user' | 'assistant'; content: string }[] = []
): Promise<string> {
  if (!openai) return fallbackResponse(userMessage);

  // 1. Route — pick aggregate cards by query patterns.
  const cards = selectCardsForQuery(userMessage);
  const cardsBlock = cards.length ? cards.map(renderCard).join('\n\n') : '';

  // 2. Retrieve — embed query, cosine-similarity over the static index.
  const ragStats = getIndexStats();
  let retrievedBlock = '';
  if (ragStats.ready) {
    const results = await retrieveTopK(userMessage, process.env.OPENAI_API_KEY, { k: 6, minScore: 0.28 });
    retrievedBlock = renderRetrieved(results);
  } else {
    // Index missing — provide the compact KG as fallback.
    retrievedBlock = buildFallbackContext(userMessage);
  }

  const systemPrompt = buildSystemPrompt({
    cards: cardsBlock,
    retrieved: retrievedBlock,
    ragReady: ragStats.ready,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...history.slice(-6).map(h => ({ role: h.role, content: h.content })),
        { role: 'user', content: userMessage },
      ],
      max_tokens: 380,
      temperature: 0.5,
    });
    return (
      completion.choices[0]?.message?.content?.trim() ||
      'Apologies — I could not formulate a response. Please try again.'
    );
  } catch (error) {
    console.error('OpenAI API error:', error);
    return fallbackResponse(userMessage);
  }
}

// Lean keyword fallback used only when the LLM is unreachable.
function fallbackResponse(input: string): string {
  const q = input.toLowerCase();
  const p = KNOWLEDGE_GRAPH.person;

  if (/^(hi|hello|hey|greetings)/.test(q)) {
    return `Good day. I am J.A.R.V.I.S — ${p.shortName}'s archival assistant. Ask me about his projects, skills, experience, or how to reach him.`;
  }
  if ((q.includes('who') || q.includes('what')) && (q.includes('you') || q.includes('jarvis'))) {
    return "I am J.A.R.V.I.S — Just A Rather Very Intelligent System — Nikhil's archival assistant for this portfolio. Ask me about his projects, experience, or skills, or say 'what can you do' for the full capability list.";
  }
  if (q.includes('can you') || q.includes('capabilit') || (q.includes('what') && q.includes('do'))) {
    return 'I archive Nikhil\'s full record — projects, experience, skills, education, doctrine, contact channels — and answer freely. Voice mode in the HUD bar lets me speak and listen; ⌘P opens the Command Registry for quick navigation.';
  }
  if (q.includes('contact') || q.includes('reach') || q.includes('email') || q.includes('hire')) {
    return `${p.shortName} is based in ${p.location}. Email: ${p.email}. LinkedIn: ${p.links.linkedin}.`;
  }
  if (q.includes('project')) {
    const featured = KNOWLEDGE_GRAPH.projects.filter(pr => pr.featured).map(pr => pr.name).join(', ');
    return `${p.shortName} has shipped ${KNOWLEDGE_GRAPH.projects.length} projects. Featured: ${featured}.`;
  }
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('tools')) {
    return 'Six domains: Python/FastAPI/Node.js for development, GCP/AWS/Kubernetes for infrastructure, Agentic Workflows/RAG/CrewAI/LangGraph for AI, and Claude Code/Cursor for tooling. Six-plus years of production experience.';
  }
  if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('career')) {
    return `${p.shortName} has worked as AI Consultant at Neurologyca and an independent AI venture (Sep 2024–present), Full-Stack at Northeastern, Software Engineer at Times Internet (8.4M req/day), Founding Engineer at Progcap (22K TPS), and earlier at LiveMedia.`;
  }
  if (q.includes('education') || q.includes('degree') || q.includes('school')) {
    return `${p.shortName} holds an M.Sc. in Artificial Intelligence from the University of the Cumberlands (2024–2025), an M.Sc. in Information Systems from Northeastern University (2022–2024), and a B.Tech. in Computer Science from Kurukshetra University (2012–2016).`;
  }
  return `I can speak about ${p.shortName}'s projects, skills, experience, education, current work at Neurologyca, or how to reach him. What would you like to know?`;
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

    // Lightweight debug headers so we can verify the routing in dev.
    const headers: Record<string, string> = {};
    if (process.env.NODE_ENV !== 'production') {
      const stats = getIndexStats();
      headers['x-rag-ready'] = String(stats.ready);
      headers['x-rag-chunks'] = String(stats.chunks);
      headers['x-rag-cards'] = selectCardsForQuery(message).map(c => c.id).join(',') || 'none';
    }
    return NextResponse.json({ response }, { headers });
  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request', response: 'Sorry, I encountered an error. Please try again.' },
      { status: 500 }
    );
  }
}

// Surface the available cards at GET /api/chatbot for debugging.
export async function GET() {
  return NextResponse.json({
    rag: getIndexStats(),
    cards: ALL_CARDS.map(c => ({ id: c.id, title: c.title })),
  });
}
