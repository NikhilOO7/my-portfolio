/**
 * Derived "AI experience" aggregate card.
 *
 * Computes total years in AI by summing the durations of AI-category roles,
 * then enumerates AI-specific projects, headline wins, and the AI stack —
 * so questions like "how much AI experience does he have?" get a grounded
 * numeric answer instead of a vague summary.
 *
 * Date parsing is intentionally lightweight (months only, no Date.now since
 * the build is deterministic): we anchor "Present" to the next month after
 * the most-recent dated event in the KG. Good enough for portfolio prose.
 */
import { KNOWLEDGE_GRAPH } from '@/lib/knowledge/graph';
import type { AggregateCard, AggregateCard as _ } from '../types';

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

function parseMonthYear(s: string): number | null {
  // "Sep 2024" → unix-ish month-index (year*12 + month).
  const m = s.trim().match(/([A-Za-z]{3})\.?\s+(\d{4})/);
  if (!m) return null;
  const month = MONTHS[m[1].toLowerCase().slice(0, 3)];
  if (month === undefined) return null;
  return parseInt(m[2], 10) * 12 + month;
}

function buildAiExperienceBody(): string {
  const kg = KNOWLEDGE_GRAPH;

  // "Present" anchor — the latest *startable* date found in the KG plus 0.
  // Avoids non-determinism in the build output.
  const allStarts = kg.experiences
    .map(e => parseMonthYear(e.startDate))
    .filter((v): v is number => v != null);
  const presentAnchor = Math.max(...allStarts) + 0; // no extrapolation
  // Add a small floor so an empty list doesn't blow up (won't happen here).
  const presentMonth = isFinite(presentAnchor) ? presentAnchor : 0;

  const aiRoles = kg.experiences.filter(e => e.category === 'ai');
  let totalMonths = 0;
  const rangeLines: string[] = [];
  for (const e of aiRoles) {
    const start = parseMonthYear(e.startDate);
    const end = /present/i.test(e.endDate) ? presentMonth : parseMonthYear(e.endDate);
    if (start == null || end == null) continue;
    const months = Math.max(0, end - start);
    totalMonths += months;
    rangeLines.push(`${e.role} at ${e.company} (${e.startDate} → ${e.endDate}, ${months} months)`);
  }

  // Also count Northeastern's AI/research work as partial AI (it's labelled
  // "fullstack" but was AI/ML research). Add a manual half-credit so the
  // visitor doesn't get a low-balled answer.
  const ne = kg.experiences.find(e => e.id === 'northeastern');
  let neBonusMonths = 0;
  if (ne) {
    const start = parseMonthYear(ne.startDate);
    const end = parseMonthYear(ne.endDate);
    if (start != null && end != null) {
      // Half-credit for the AI/ML side of the role.
      neBonusMonths = Math.round((end - start) / 2);
    }
  }

  const totalAiMonths = totalMonths + neBonusMonths;
  const totalAiYears = (totalAiMonths / 12).toFixed(1);

  const aiProjects = kg.projects.filter(p => p.domain.includes('ai') || p.domain.includes('rag'));
  const aiSpecialty = kg.specialties.find(s => s.id === 'ai-infra');
  const voiceSpecialty = kg.specialties.find(s => s.id === 'voice-rag');

  const lines: string[] = [];
  lines.push(
    `${kg.person.shortName}'s AI / agentic-systems experience: approximately ${totalAiYears} years of direct AI work ` +
    `(${aiRoles.length} dedicated AI roles${neBonusMonths > 0 ? ' plus partial credit for the Northeastern computational-lab AI/ML research' : ''}). ` +
    `Total production engineering experience: ${kg.person.yearsExperience}+ years.`
  );
  if (rangeLines.length) {
    lines.push('Dedicated AI roles: ' + rangeLines.join('; ') + '.');
  }
  if (aiSpecialty) {
    lines.push(
      `Specialty — ${aiSpecialty.label}: ${aiSpecialty.blurb} ` +
      (aiSpecialty.metric ? `(${aiSpecialty.metric.value} ${aiSpecialty.metric.label}).` : '')
    );
  }
  if (voiceSpecialty) {
    lines.push(
      `Specialty — ${voiceSpecialty.label}: ${voiceSpecialty.blurb} ` +
      (voiceSpecialty.metric ? `(${voiceSpecialty.metric.value} ${voiceSpecialty.metric.label}).` : '')
    );
  }
  if (aiProjects.length) {
    lines.push(
      `AI / RAG / agentic projects: ` +
      aiProjects.map(p => p.name).join(', ') + '.'
    );
  }

  // AI-specific tool surface (intersection with the AI skill group).
  const aiSkillGroup = kg.skills.find(g => g.id === 'ai');
  if (aiSkillGroup) {
    lines.push(`AI stack: ${aiSkillGroup.skills.map(s => s.name).join(', ')}.`);
  }
  return lines.join(' ');
}

export const aiExperienceCard: AggregateCard = {
  id: 'ai_experience',
  title: 'AI EXPERIENCE (derived from role dates + AI projects)',
  body: buildAiExperienceBody(),
  triggers: [
    /\b(ai|artificial intelligence|ml|machine learning|llm|agentic|rag)\b.*\b(experience|years|expertise|background)\b/i,
    /\b(experience|years|expertise|background)\b.*\b(ai|llm|agentic|rag|machine learning)\b/i,
    /\bhow (?:much|long|many).*\b(ai|ml|llm|agentic)\b/i,
    /\b(ai|llm|agentic)\b.*\bwork(ed)?\b/i,
    /\bspecializ(es|ed|ation)\b/i,
    /\bdeep(?: dive)?\b.*\b(ai|ml)\b/i,
  ],
};
