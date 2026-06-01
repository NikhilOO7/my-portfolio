/**
 * Builds the full Chunk[] for the site from every prose source we have:
 *   • knowledge graph (person summary, experiences, projects, specialties,
 *     education, philosophy, skills, headline stats)
 *   • About page doctrines + vital stats + tech highlights
 *   • Services section
 *   • Contact FAQs + channels
 *   • Live Mission section (Neurologyca subsystems + stats + stack)
 *
 * Pure function — no I/O, no embeddings yet. Called by the build script
 * (to embed) and could also be used at runtime for keyword fallback.
 */
import { KNOWLEDGE_GRAPH } from '@/lib/knowledge/graph';
import {
  DOCTRINES,
  VITAL_STATS,
  TECH_HIGHLIGHTS,
  SERVICES_CONTENT,
  FAQS,
  CHANNELS_CONTENT,
  MISSION_STATS_CONTENT,
  MISSION_SUBSYSTEMS_CONTENT,
  MISSION_STACK,
} from './sources';
import type { Chunk } from './types';

export function buildAllChunks(): Chunk[] {
  const out: Chunk[] = [];
  const kg = KNOWLEDGE_GRAPH;

  // ── Person summary ─────────────────────────────────────────────────────
  out.push({
    id: 'person:summary',
    title: `${kg.person.name} — overview`,
    body:
      `${kg.person.name}, ${kg.person.title}. Based in ${kg.person.location}. ` +
      `${kg.person.yearsExperience}+ years of production experience. ${kg.person.availability}. ` +
      `Contact: ${kg.person.email}. ${kg.person.summary}`,
    source: 'person',
    tags: ['summary', 'bio'],
    href: '/about',
  });

  // ── Headline stats (one chunk, comma-joined) ──────────────────────────
  out.push({
    id: 'stat:headline',
    title: 'Headline numbers',
    body: kg.stats.map(s => `${s.value} — ${s.label}`).join('. ') + '.',
    source: 'stat',
    tags: ['stats', 'metrics', 'numbers'],
    href: '/',
  });

  // ── Specialties ────────────────────────────────────────────────────────
  for (const sp of kg.specialties) {
    out.push({
      id: `specialty:${sp.id}`,
      title: sp.label,
      body:
        `${sp.label}. ${sp.blurb}` +
        (sp.metric ? ` Headline metric: ${sp.metric.value} ${sp.metric.label}.` : '') +
        ` Focus areas: ${sp.bullets.join(', ')}.`,
      source: 'specialty',
      tags: ['specialty', sp.id],
      href: '/services',
    });
  }

  // ── Experiences (split by sub-role when present so each is its own chunk) ─
  for (const exp of kg.experiences) {
    if (exp.subRoles?.length) {
      for (const sub of exp.subRoles) {
        out.push({
          id: `experience:${exp.id}:${slug(sub.company)}`,
          title: `${exp.role} — ${sub.company} (${exp.startDate} – ${exp.endDate})`,
          body:
            `${sub.company}. ${exp.role} at ${exp.company}, ${exp.location}, ${exp.startDate} to ${exp.endDate}. ` +
            sub.bullets.join(' ') +
            ` Tech: ${exp.tech.join(', ')}.`,
          source: 'experience',
          tags: ['experience', exp.category, exp.id],
          href: '/resume',
        });
      }
    } else {
      out.push({
        id: `experience:${exp.id}`,
        title: `${exp.role} — ${exp.company} (${exp.startDate} – ${exp.endDate})`,
        body:
          `${exp.role} at ${exp.company}, ${exp.location}, ${exp.startDate} to ${exp.endDate}. ` +
          exp.bullets.join(' ') +
          (exp.highlights?.length ? ' Highlights: ' + exp.highlights.map(h => `${h.value} ${h.label}`).join(', ') + '.' : '') +
          ` Tech: ${exp.tech.join(', ')}.`,
        source: 'experience',
        tags: ['experience', exp.category, exp.id],
        href: '/resume',
      });
    }
  }

  // ── Projects ───────────────────────────────────────────────────────────
  for (const pr of kg.projects) {
    out.push({
      id: `project:${pr.id}`,
      title: `${pr.name}${pr.featured ? ' (featured)' : ''}`,
      body:
        `${pr.name}. Tagline: ${pr.tagline}. ${pr.description} ` +
        `Achievements: ${pr.achievements.join(' ')} ` +
        `Tech: ${pr.tech.join(', ')}.` +
        (pr.github ? ` GitHub: ${pr.github}.` : ''),
      source: 'project',
      tags: ['project', ...pr.domain, pr.featured ? 'featured' : 'archive'],
      href: '/projects',
    });
  }

  // ── Education ──────────────────────────────────────────────────────────
  for (const ed of kg.education) {
    out.push({
      id: `education:${ed.id}`,
      title: `${ed.degree} — ${ed.field}`,
      body:
        `${ed.degree} in ${ed.field} from ${ed.school}, ${ed.location} (${ed.start}–${ed.end}).` +
        (ed.notes ? ` ${ed.notes}` : ''),
      source: 'education',
      tags: ['education'],
      href: '/about',
    });
  }

  // ── Philosophy (graph version — short) ─────────────────────────────────
  for (let i = 0; i < kg.philosophy.length; i++) {
    out.push({
      id: `philosophy:kg-${i}`,
      title: `Philosophy — point ${i + 1}`,
      body: kg.philosophy[i],
      source: 'philosophy',
      tags: ['philosophy', 'kg'],
      href: '/about',
    });
  }

  // ── Skill groups (one chunk per group) ─────────────────────────────────
  for (const g of kg.skills) {
    out.push({
      id: `skills:${g.id}`,
      title: `Skills — ${g.label}`,
      body:
        `${g.label}. ${g.blurb} ` +
        `Skills: ${g.skills.map(s => `${s.name} (${s.tier})`).join(', ')}.`,
      source: 'skills',
      tags: ['skills', g.id],
      href: '/skills',
    });
  }

  // ── About: doctrine principles (richer prose than KG philosophy) ──────
  for (const card of DOCTRINES) {
    out.push({
      id: `doctrine:${card.id}`,
      title: `Doctrine — ${card.title}`,
      body: `${card.title}. ${card.doctrine}. ${card.body}`,
      source: 'doctrine',
      tags: ['doctrine', 'philosophy', 'principle'],
      href: '/about#doctrine',
    });
  }

  // ── About: vital stats (one rolled chunk) ─────────────────────────────
  out.push({
    id: 'about:vital-stats',
    title: 'About — vital stats',
    body: VITAL_STATS.map(s => `${s.value} ${s.label}`).join('. ') + '.',
    source: 'stat',
    tags: ['stats', 'about'],
    href: '/about',
  });

  // ── About: tech highlights ─────────────────────────────────────────────
  out.push({
    id: 'about:tech-highlights',
    title: 'About — tech highlights',
    body: 'Tech highlighted on the About page: ' + TECH_HIGHLIGHTS.join(', ') + '.',
    source: 'skills',
    tags: ['tech', 'about'],
    href: '/about',
  });

  // ── Services (4 modules) ───────────────────────────────────────────────
  for (const s of SERVICES_CONTENT) {
    out.push({
      id: `service:${s.id}`,
      title: `Service — ${s.title}`,
      body:
        `${s.title}. ${s.blurb} ` +
        `Headline metric: ${s.metric.value} ${s.metric.label}. ` +
        `Capabilities: ${s.capabilities.join(', ')}. ` +
        `Stack: ${s.stack.join(', ')}. ` +
        `Status: ${s.status}. Tier: ${s.tier}. ` +
        `Driven by: ${s.principles.join(', ')}.`,
      source: 'service',
      tags: ['service', s.id, s.visual],
      href: '/#services',
    });
  }

  // ── Contact FAQs (10 q/a pairs) ───────────────────────────────────────
  for (const p of FAQS) {
    out.push({
      id: `faq:${slug(p.q)}`,
      title: `FAQ — ${p.q}`,
      body: `Q: ${p.q} A: ${p.a}`,
      source: 'faq',
      tags: ['faq', 'contact'],
      href: '/contact#faq',
    });
  }

  // ── Contact channels ──────────────────────────────────────────────────
  out.push({
    id: 'contact:channels',
    title: 'Contact — channels & uplinks',
    body:
      `How to reach ${kg.person.shortName}: ` +
      CHANNELS_CONTENT.map(c => `${c.label} (${c.href})`).join(', ') +
      `. Email: ${kg.person.email}. Phone: ${kg.person.phone}.`,
    source: 'channel',
    tags: ['contact'],
    href: '/contact',
  });

  // ── Live Mission (Neurologyca) — overview + each subsystem ─────────────
  out.push({
    id: 'mission:neurologyca-overview',
    title: 'Live Mission — Neurologyca (current engagement)',
    body:
      `Currently engaged at Neurologyca, San Francisco (Contract, Jan 2026 → Present). ` +
      `Architecting a production multi-agent AI coaching platform that fuses biometric / HCI signal ` +
      `processing with a six-agent orchestration pipeline and a persistent personal-memory system (Mnemosyne). ` +
      `Headline numbers: ` +
      MISSION_STATS_CONTENT.map(s => `${s.value}${s.unit ? ' ' + s.unit : ''} ${s.label} (${s.sub})`).join('; ') + '.',
    source: 'mission',
    tags: ['mission', 'neurologyca', 'current', 'ai-infra'],
    href: '/',
  });

  for (const sub of MISSION_SUBSYSTEMS_CONTENT) {
    out.push({
      id: `mission:subsystem:${sub.id}`,
      title: `Neurologyca subsystem — ${sub.label}`,
      body: `${sub.label} (Neurologyca live mission). ${sub.detail}`,
      source: 'subsystem',
      tags: ['mission', 'neurologyca', sub.id],
      href: '/',
    });
  }

  out.push({
    id: 'mission:stack',
    title: 'Live Mission — stack',
    body: 'Stack on the current Neurologyca engagement: ' + MISSION_STACK.join(', ') + '.',
    source: 'skills',
    tags: ['mission', 'neurologyca', 'stack'],
    href: '/',
  });

  return out;
}

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48);
}
