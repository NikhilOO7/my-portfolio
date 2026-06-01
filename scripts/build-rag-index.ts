/**
 * Generate the static RAG embedding index.
 *
 * Reads every prose source on the site via the chunker, calls OpenAI's
 * `text-embedding-3-small` (1536 dims) once per chunk, and writes
 * `src/lib/rag/index.json` so the chatbot route can do in-memory
 * cosine similarity at query time.
 *
 * Cost: ~$0.001 to embed the whole site (under 50K tokens total).
 * Latency: ~10–20 seconds with batched calls.
 *
 * Run:  npm run build-rag
 * Pre:  OPENAI_API_KEY in env (or `.env.local`)
 */
import fs from 'node:fs';
import path from 'node:path';
import { buildAllChunks } from '../src/lib/rag/chunker';
import type { EmbeddedChunk, RagIndex } from '../src/lib/rag/types';

const MODEL = 'text-embedding-3-small';
const BATCH = 64; // OpenAI accepts up to 2048 inputs / req; 64 is a safe chunk
const OUT = path.join(process.cwd(), 'src/lib/rag/index.json');

function loadEnv() {
  // Minimal .env.local loader so the script works without a wrapper.
  for (const f of ['.env.local', '.env']) {
    const p = path.join(process.cwd(), f);
    if (!fs.existsSync(p)) continue;
    const text = fs.readFileSync(p, 'utf-8');
    for (const line of text.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+)\s*$/i);
      if (!m) continue;
      const k = m[1];
      let v = m[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      if (!process.env[k]) process.env[k] = v;
    }
  }
}

async function embedBatch(inputs: string[], apiKey: string): Promise<number[][]> {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ input: inputs, model: MODEL }),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`OpenAI embeddings failed (${res.status}): ${txt}`);
  }
  const json = (await res.json()) as { data: { index: number; embedding: number[] }[] };
  // Re-order by index to be safe.
  const out: number[][] = new Array(inputs.length);
  for (const row of json.data) out[row.index] = row.embedding;
  return out;
}

async function main() {
  loadEnv();
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('OPENAI_API_KEY missing. Add it to .env.local and re-run.');
    process.exit(1);
  }

  console.log('[rag] chunking site content…');
  const chunks = buildAllChunks();
  console.log(`[rag] built ${chunks.length} chunks. Embedding with ${MODEL}…`);

  const embedded: EmbeddedChunk[] = [];
  const t0 = Date.now();
  for (let i = 0; i < chunks.length; i += BATCH) {
    const slice = chunks.slice(i, i + BATCH);
    const inputs = slice.map(c => `${c.title}\n\n${c.body}`);
    process.stdout.write(`  · batch ${Math.floor(i / BATCH) + 1}/${Math.ceil(chunks.length / BATCH)} (${slice.length} chunks)… `);
    const vecs = await embedBatch(inputs, apiKey);
    for (let j = 0; j < slice.length; j++) {
      embedded.push({ ...slice[j], embedding: vecs[j] });
    }
    console.log('ok');
  }
  const dt = ((Date.now() - t0) / 1000).toFixed(1);

  const index: RagIndex = {
    model: MODEL,
    builtAt: new Date().toISOString(),
    chunks: embedded,
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(index));
  const sizeMb = (fs.statSync(OUT).size / 1024 / 1024).toFixed(2);
  console.log(`[rag] wrote ${OUT} — ${embedded.length} chunks, ${sizeMb} MB, ${dt}s.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
