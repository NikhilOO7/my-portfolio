/** End-to-end RAG check — calls OpenAI for embeddings + chat. */
import { retrieveTopK } from '../src/lib/rag/retrieve';
import { selectCardsForQuery, renderCard } from '../src/lib/rag/cards';
import fs from 'node:fs';
import path from 'node:path';

// Minimal .env.local loader.
for (const f of ['.env.local', '.env']) {
  const p = path.join(process.cwd(), f);
  if (!fs.existsSync(p)) continue;
  for (const line of fs.readFileSync(p, 'utf-8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+)\s*$/i);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (!process.env[m[1]]) process.env[m[1]] = v;
  }
}

const QUESTIONS = [
  'tell me something interesting about Nikhil',
  'which is the most complex project that nikhil has worked on',
  'what tools nikhil has used',
  'how much experience he has in AI',
  'tell me about Donna',
];

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) { console.error('OPENAI_API_KEY missing'); process.exit(1); }

  for (const q of QUESTIONS) {
    const cards = selectCardsForQuery(q);
    const results = await retrieveTopK(q, apiKey, { k: 5, minScore: 0.25 });
    console.log('━'.repeat(70));
    console.log(`Q: "${q}"`);
    console.log(`  cards (${cards.length}): ${cards.map(c => c.id).join(', ') || '(none)'}`);
    console.log(`  retrieved (${results.length}):`);
    for (const r of results) console.log(`    ${r.score.toFixed(3)}  ${r.chunk.title}`);
    console.log('');
  }
}

main().catch(err => { console.error(err); process.exit(1); });
