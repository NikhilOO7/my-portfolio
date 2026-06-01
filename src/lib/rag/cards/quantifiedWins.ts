/**
 * Derived "quantified wins" aggregate card.
 *
 * Pulls every numeric metric off experiences (.highlights), projects
 * (.achievements regex), specialties (.metric), and headline stats —
 * so when a visitor asks "what numbers can he point to?" or "impact?"
 * the bot has one consolidated list.
 */
import { KNOWLEDGE_GRAPH } from '@/lib/knowledge/graph';
import type { AggregateCard } from '../types';

// Loose pattern that captures "73%", "8.7s → 890ms", "~$0.10/user/day", "22K TPS", "10K+", "~92/100", "<200ms"
const METRIC_RE = /(?:[~<>↓↑]?\s*\$?\d[\d,.\s]*\s*(?:[a-zA-Z%+×x/]+(?:\s*\/\s*[a-zA-Z]+)?)?(?:\s*→\s*[~<>]?\s*\$?\d[\d,.\s]*\s*[a-zA-Z%+×x/]*)?)/g;

function buildQuantifiedWinsBody(): string {
  const kg = KNOWLEDGE_GRAPH;
  const wins: { metric: string; context: string }[] = [];

  // Experiences — both highlights and inline-in-bullets numbers.
  for (const exp of kg.experiences) {
    if (exp.highlights?.length) {
      for (const h of exp.highlights) {
        wins.push({ metric: h.value, context: `${h.label} — ${exp.role} at ${exp.company}` });
      }
    }
    const bullets = exp.subRoles
      ? exp.subRoles.flatMap(s => s.bullets)
      : exp.bullets;
    for (const b of bullets) {
      const matches = b.match(METRIC_RE);
      if (!matches) continue;
      for (const m of matches) {
        const trimmed = m.trim().replace(/\s+/g, ' ');
        // Skip raw-looking digits like "1," or "9," (year fragments)
        if (trimmed.length < 2) continue;
        if (/^[12]\d{3}$/.test(trimmed)) continue; // year only
        wins.push({ metric: trimmed, context: short(b, 90) });
      }
    }
  }

  // Project achievements
  for (const pr of kg.projects) {
    for (const a of pr.achievements) {
      const matches = a.match(METRIC_RE);
      if (!matches) continue;
      for (const m of matches) {
        const trimmed = m.trim().replace(/\s+/g, ' ');
        if (trimmed.length < 2 || /^[12]\d{3}$/.test(trimmed)) continue;
        wins.push({ metric: trimmed, context: `${pr.name} — ${short(a, 90)}` });
      }
    }
  }

  // Specialty metrics
  for (const sp of kg.specialties) {
    if (sp.metric) wins.push({ metric: sp.metric.value, context: `${sp.label} — ${sp.metric.label}` });
  }

  // Dedup by (metric + first 60 chars of context) to keep the most-distinct entries
  const seen = new Set<string>();
  const dedup: typeof wins = [];
  for (const w of wins) {
    const key = `${w.metric}|${w.context.slice(0, 60)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    dedup.push(w);
  }

  const lines: string[] = [];
  lines.push(`${kg.person.shortName}'s quantified wins (every metric extracted from his work, deduped):`);
  for (const w of dedup) {
    lines.push(`• ${w.metric} — ${w.context}.`);
  }
  // Headline stats appended at the end for completeness
  lines.push('Headline stats: ' + kg.stats.map(s => `${s.value} ${s.label}`).join('; ') + '.');
  return lines.join('\n');
}

function short(s: string, n: number) {
  return s.length <= n ? s : s.slice(0, n - 1).trim() + '…';
}

export const quantifiedWinsCard: AggregateCard = {
  id: 'quantified_wins',
  title: 'QUANTIFIED WINS (every metric, deduped)',
  body: buildQuantifiedWinsBody(),
  triggers: [
    /\b(metrics?|numbers?|stats?|results?|impact|achievements?|kpis?|outcomes?)\b/i,
    /\b(most|best|biggest|highest|greatest|fastest|largest)\b/i,
    /\b(how (?:much|many|fast))\b/i,
    /\b(performance|throughput|latency|scale|reduce[d]?|cut)\b/i,
    /\b(record|measur(e|ed|able))\b/i,
  ],
};
