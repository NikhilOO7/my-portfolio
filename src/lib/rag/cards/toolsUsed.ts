/**
 * Derived "tools used" aggregate card.
 *
 * Walks every experience.tech, project.tech, and skill group, unions them,
 * counts frequency, and groups by category — so when a visitor asks
 * "what tools has he used?" the LLM gets a single ground-truth answer
 * instead of whatever 3 chunks happened to retrieve highest.
 */
import { KNOWLEDGE_GRAPH } from '@/lib/knowledge/graph';
import type { AggregateCard } from '../types';

function buildToolsUsedBody(): string {
  const kg = KNOWLEDGE_GRAPH;
  const freq = new Map<string, number>();
  const groupByName = new Map<string, string>(); // name -> group id

  for (const exp of kg.experiences) {
    for (const t of exp.tech) bump(freq, t);
  }
  for (const pr of kg.projects) {
    for (const t of pr.tech) bump(freq, t);
  }
  for (const g of kg.skills) {
    for (const s of g.skills) {
      bump(freq, s.name);
      groupByName.set(s.name.toLowerCase(), g.id);
    }
  }

  // Sort by frequency (most-used first) within each KG-defined category,
  // with anything that appears in projects/experience but not skills bucketed
  // under "other".
  const grouped: Record<string, string[]> = {
    development: [],
    infrastructure: [],
    ai: [],
    tools: [],
    other: [],
  };
  const sorted = [...freq.entries()].sort((a, b) => b[1] - a[1]);
  for (const [name] of sorted) {
    const g = groupByName.get(name.toLowerCase());
    if (g && grouped[g]) grouped[g].push(name);
    else grouped.other.push(name);
  }

  const lines: string[] = [];
  lines.push(`${kg.person.shortName}'s full tool & technology surface, deduped across every role, project, and skill section:`);
  if (grouped.development.length) lines.push(`Development & languages: ${grouped.development.join(', ')}.`);
  if (grouped.ai.length) lines.push(`AI / LLM stack: ${grouped.ai.join(', ')}.`);
  if (grouped.infrastructure.length) lines.push(`Infrastructure & data: ${grouped.infrastructure.join(', ')}.`);
  if (grouped.tools.length) lines.push(`Daily-driver tools: ${grouped.tools.join(', ')}.`);
  if (grouped.other.length) lines.push(`Also worked with: ${grouped.other.join(', ')}.`);
  lines.push(`Total distinct tools / technologies: ${freq.size}.`);
  return lines.join(' ');
}

function bump(m: Map<string, number>, k: string) {
  m.set(k, (m.get(k) ?? 0) + 1);
}

export const toolsUsedCard: AggregateCard = {
  id: 'tools_used',
  title: 'TOOLS & TECHNOLOGIES (full union)',
  body: buildToolsUsedBody(),
  triggers: [
    /\btools?\b/i,
    /\btech(nolog(y|ies))?\b/i,
    /\bstack\b/i,
    /\blanguages?\b/i,
    /\bframeworks?\b/i,
    /\blibrar(y|ies)\b/i,
    /\bwhat (?:does|do) (?:he|nikhil|they) (?:use|work)/i,
    /\bskills?\b/i,
    /\bplatforms?\b/i,
  ],
};
