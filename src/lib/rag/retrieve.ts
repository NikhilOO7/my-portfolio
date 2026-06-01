/**
 * Cosine-similarity retrieval over the static embedding index.
 *
 * Loads `index.json` (written by `scripts/build-rag-index.ts`) at module
 * init and caches it. `retrieveTopK` embeds the query via OpenAI, scores
 * every chunk in-memory, and returns the top-K with score above a floor.
 *
 * 150 × 1536 dot-products ≈ microseconds; the only meaningful cost is the
 * one OpenAI embedding call (~50–80ms typical).
 */
import fs from 'node:fs';
import path from 'node:path';
import type { EmbeddedChunk, RagIndex, Chunk } from './types';

const INDEX_PATH = path.join(process.cwd(), 'src/lib/rag/index.json');
const EMBED_MODEL = 'text-embedding-3-small';

let cachedIndex: RagIndex | null = null;
let cacheTried = false;

function loadIndex(): RagIndex | null {
  if (cacheTried) return cachedIndex;
  cacheTried = true;
  try {
    if (!fs.existsSync(INDEX_PATH)) return null;
    const raw = fs.readFileSync(INDEX_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as RagIndex;
    if (!parsed?.chunks?.length) return null;
    cachedIndex = parsed;
    return cachedIndex;
  } catch (err) {
    console.error('[rag] failed to load index.json', err);
    return null;
  }
}

export function isIndexReady(): boolean {
  return loadIndex() != null;
}

export function getIndexStats(): { ready: boolean; chunks: number; model?: string; builtAt?: string } {
  const idx = loadIndex();
  if (!idx) return { ready: false, chunks: 0 };
  return { ready: true, chunks: idx.chunks.length, model: idx.model, builtAt: idx.builtAt };
}

function cosine(a: number[], b: number[]): number {
  // OpenAI embeddings are L2-normalized, so the dot product *is* cosine.
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot;
}

export interface RetrievalResult {
  chunk: Chunk;
  score: number;
}

export interface RetrieveOptions {
  k?: number;
  /** Drop chunks with similarity below this floor. */
  minScore?: number;
}

/**
 * Embed a single string with the same model the index was built with.
 * Returns null on failure (network / no key) so callers can fall through.
 */
export async function embedQuery(text: string, apiKey: string | undefined): Promise<number[] | null> {
  if (!apiKey) return null;
  try {
    const res = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ input: text, model: EMBED_MODEL }),
    });
    if (!res.ok) {
      console.error('[rag] embedQuery failed', res.status, await res.text().catch(() => ''));
      return null;
    }
    const json = (await res.json()) as { data: { embedding: number[] }[] };
    return json.data[0]?.embedding ?? null;
  } catch (err) {
    console.error('[rag] embedQuery error', err);
    return null;
  }
}

export async function retrieveTopK(
  query: string,
  apiKey: string | undefined,
  opts: RetrieveOptions = {}
): Promise<RetrievalResult[]> {
  const { k = 7, minScore = 0.25 } = opts;
  const idx = loadIndex();
  if (!idx) return [];
  const qvec = await embedQuery(query, apiKey);
  if (!qvec) return [];

  const scored: RetrievalResult[] = idx.chunks.map((c: EmbeddedChunk) => ({
    chunk: { id: c.id, title: c.title, body: c.body, source: c.source, tags: c.tags, href: c.href },
    score: cosine(qvec, c.embedding),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.filter(r => r.score >= minScore).slice(0, k);
}

/** Render retrieved chunks for injection into the system prompt. */
export function renderRetrieved(results: RetrievalResult[]): string {
  if (!results.length) return '';
  const blocks = results.map((r, i) =>
    `[${i + 1}] ${r.chunk.title}  (relevance ${r.score.toFixed(2)}; source: ${r.chunk.source})\n${r.chunk.body}`
  );
  return blocks.join('\n\n');
}
