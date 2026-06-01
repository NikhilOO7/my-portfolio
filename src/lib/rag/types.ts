/**
 * Types for the site-content RAG layer.
 *
 * A Chunk is one atomic piece of content (a project, a doctrine principle,
 * an FAQ answer, etc.) that gets embedded and retrieved.
 *
 * An AggregateCard is a pre-computed answer to a *class* of questions
 * (all tools used, all quantified wins, complexity ranking, highlights).
 * Cards are always injected when their routing pattern matches the query.
 */

export type ChunkSource =
  | 'person'
  | 'experience'
  | 'project'
  | 'specialty'
  | 'education'
  | 'philosophy'
  | 'skills'
  | 'stat'
  | 'service'
  | 'doctrine'
  | 'faq'
  | 'channel'
  | 'mission'
  | 'subsystem';

export interface Chunk {
  /** Stable id, used for cache keys and citations. */
  id: string;
  /** Human-readable heading for the chunk (shown to the LLM). */
  title: string;
  /** The actual text content to embed and retrieve. */
  body: string;
  /** Where this content lives on the site (typed source). */
  source: ChunkSource;
  /** Categorical tags for coarse filtering / boosting. */
  tags: string[];
  /** Optional page anchor for citation (e.g., "/projects#donna"). */
  href?: string;
}

export interface EmbeddedChunk extends Chunk {
  /** OpenAI text-embedding-3-small vector, 1536 dims. */
  embedding: number[];
}

export interface RagIndex {
  /** Embedding model used (so the route can verify match at load). */
  model: string;
  /** When the index was built (ISO). */
  builtAt: string;
  chunks: EmbeddedChunk[];
}

/** A pre-computed aggregate answer always injected when relevant. */
export interface AggregateCard {
  id: string;
  /** Heading the LLM sees when this card is included. */
  title: string;
  /** Pre-rendered markdown-ish body. */
  body: string;
  /** Lowercased keywords/regex tokens that trigger this card. */
  triggers: RegExp[];
}
