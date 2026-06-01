/** Quick smoke test for the card router — no LLM call, no API key needed. */
import { selectCardsForQuery } from '../src/lib/rag/cards';

const QUESTIONS = [
  'tell me something interesting about Nikhil',
  'which is the most complex project that nikhil has worked on',
  'what tools nikhil has used',
  'how much experience he has in AI',
  'who is nikhil',                          // factual lookup — should fall through to RAG only
  'tell me about Donna',                    // factual lookup
  'what is his fastest latency cut',        // numeric — should match quantified_wins
];

for (const q of QUESTIONS) {
  const cards = selectCardsForQuery(q);
  const ids = cards.map(c => c.id).join(', ') || '(none — RAG-only)';
  console.log(`Q: "${q}"\n  → cards: ${ids}\n`);
}
