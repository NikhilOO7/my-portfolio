/**
 * Aggregate-card registry + query router.
 *
 * Cards are always-included context for query *classes* (aggregation /
 * comparison / superlative / "interesting"), the things plain top-K
 * retrieval can't answer well. The router pattern-matches the query
 * and returns the cards whose triggers fire.
 *
 * If multiple cards match, ALL are included (they're small, ~600 tokens
 * combined max). A query that matches none falls through to pure RAG.
 */
import type { AggregateCard } from '../types';
import { toolsUsedCard } from './toolsUsed';
import { aiExperienceCard } from './aiExperience';
import { quantifiedWinsCard } from './quantifiedWins';
import { complexityRankingCard } from './complexityRanking';
import { highlightsCard } from './highlights';

export const ALL_CARDS: AggregateCard[] = [
  toolsUsedCard,
  aiExperienceCard,
  quantifiedWinsCard,
  complexityRankingCard,
  highlightsCard,
];

const CARD_BY_ID: Record<string, AggregateCard> = Object.fromEntries(ALL_CARDS.map(c => [c.id, c]));

/** Route a user query → array of relevant aggregate cards. */
export function selectCardsForQuery(query: string): AggregateCard[] {
  const matched: AggregateCard[] = [];
  for (const card of ALL_CARDS) {
    if (card.triggers.some(re => re.test(query))) matched.push(card);
  }
  return matched;
}

/** Look up a card by id (for hard-wiring from the route if needed). */
export function getCard(id: string): AggregateCard | undefined {
  return CARD_BY_ID[id];
}

/** Render a card to the markdown-ish form we inject into the system prompt. */
export function renderCard(card: AggregateCard): string {
  return `### ${card.title}\n${card.body}`;
}
