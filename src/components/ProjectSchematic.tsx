'use client';
import type { SchematicType } from '@/lib/projectDomain';

interface Props {
  type: SchematicType;
  accent: string;
}

/**
 * JARVIS-style mini-dashboard schematic rendered in place of a project's
 * hero image. Each variant is a multi-panel composition (2–4 sub-panels
 * with connecting lines and mock UI) that conveys the project's essence.
 */
export default function ProjectSchematic({ type, accent }: Props) {
  const Schematic = SCHEMATIC_MAP[type];
  return (
    <div className="relative w-full h-full bg-jarvis-dark-900/60 overflow-hidden">
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${accent}1a 1px, transparent 1px), linear-gradient(90deg, ${accent}1a 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      {/* Soft radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${accent}22 0%, transparent 70%)`,
        }}
      />

      {/* The schematic itself — each variant self-labels its internal panels,
          so we don't render any external overlay text here (avoids collision
          with the SVG's own headers like "BIAS SCORE", "LLM RESPONSE · TAGGED",
          etc.). */}
      <Schematic accent={accent} />
    </div>
  );
}

interface SubProps {
  accent: string;
}

const SCHEMATIC_MAP: Record<SchematicType, React.ComponentType<SubProps>> = {
  voice: VoiceSchematic,
  recommend: RecommendSchematic,
  graph: GraphSchematic,
  manifold: ManifoldSchematic,
  'multi-agent-3': MultiAgent3Schematic,
  'chat-sentiment': ChatSentimentSchematic,
  trading: TradingSchematic,
  anomaly: AnomalySchematic,
  collab: CollabSchematic,
  bias: BiasSchematic,
  saas: SaasSchematic,
  pipeline: PipelineSchematic,
  weather: WeatherSchematic,
  // Generic fallbacks (kept for safety; rarely used now)
  agentic: MultiAgent3Schematic,
  ml: PipelineSchematic,
  fintech: TradingSchematic,
  realtime: CollabSchematic,
  fullstack: DefaultSchematic,
  default: DefaultSchematic,
};

// Shorthand for mono font props used everywhere
const MONO = { fontFamily: 'ui-monospace, monospace' } as const;

// ─────────────────────────────────────────────────────────────────────────
// 1. Voice Document Intelligence — doc stack + waveforms + service callouts
// ─────────────────────────────────────────────────────────────────────────
function VoiceSchematic({ accent }: SubProps) {
  return (
    <svg viewBox="0 0 300 180" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Document stack (left) */}
      <g transform="translate(34 64)">
        {[0, 1, 2].map(i => (
          <g key={i} transform={`translate(${i * 5} ${-i * 4})`}>
            <rect x="0" y="0" width="42" height="56" fill={accent} fillOpacity={0.04 + i * 0.05} stroke={accent} strokeOpacity="0.75" strokeWidth="0.8" />
            {/* Text lines */}
            {[0, 1, 2, 3].map(j => (
              <line key={j} x1="5" y1={10 + j * 9} x2={5 + 30 - j * 4} y2={10 + j * 9} stroke={accent} strokeOpacity="0.45" strokeWidth="0.7" />
            ))}
          </g>
        ))}
        <text x="22" y="74" textAnchor="middle" fill={accent} fontSize="7" letterSpacing="1.5" opacity="0.7" {...MONO}>DOCS · 47</text>
      </g>

      {/* Waveform passing through center */}
      <g>
        {(() => {
          const pts = Array.from({ length: 48 }).map((_, i) => {
            const x = 100 + i * 2.7;
            const y = 90 + Math.sin(i * 0.4) * 18 * Math.sin(i * 0.13 + 1);
            return `${x},${y.toFixed(2)}`;
          }).join(' ');
          return (
            <>
              <polyline points={pts} fill="none" stroke={accent} strokeWidth="1.4" strokeOpacity="0.9" style={{ filter: `drop-shadow(0 0 3px ${accent})` }} />
              <polyline points={pts} fill="none" stroke={accent} strokeWidth="0.5" strokeOpacity="0.35" transform="translate(0 8)" />
              <polyline points={pts} fill="none" stroke={accent} strokeWidth="0.5" strokeOpacity="0.35" transform="translate(0 -8)" />
            </>
          );
        })()}
        {/* Live mic indicator */}
        <g transform="translate(106 60)">
          <rect width="42" height="14" rx="2" fill={accent} fillOpacity="0.18" stroke={accent} strokeOpacity="0.85" strokeWidth="0.8" />
          <circle cx="6" cy="7" r="2" fill={accent}>
            <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <text x="22" y="10" textAnchor="middle" fill={accent} fontSize="6" letterSpacing="1.5" {...MONO}>LIVE · WEBRTC</text>
        </g>
      </g>

      {/* Cloud + server (right) */}
      <g transform="translate(238 50)">
        {/* Cloud */}
        <path d="M 8 16 C 0 16 0 4 8 4 C 12 -2 26 -2 30 6 C 38 4 42 14 36 18 Z" fill={accent} fillOpacity="0.18" stroke={accent} strokeOpacity="0.85" strokeWidth="0.8" />
        <text x="22" y="14" textAnchor="middle" fill={accent} fontSize="7" letterSpacing="1.5" {...MONO}>GCP</text>
        {/* DB stack */}
        <g transform="translate(0 38)">
          {[0, 1, 2].map(i => (
            <ellipse key={i} cx="22" cy={i * 8} rx="20" ry="3.5" fill={accent} fillOpacity={0.18 - i * 0.04} stroke={accent} strokeOpacity="0.75" strokeWidth="0.8" />
          ))}
          <text x="22" y="30" textAnchor="middle" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.85" {...MONO}>POSTGRES</text>
        </g>
      </g>

      {/* Bottom pipeline */}
      <g transform="translate(34 132)">
        {['STT', 'RAG', 'TTS'].map((tag, i) => (
          <g key={tag} transform={`translate(${i * 78} 0)`}>
            <rect width="48" height="22" fill={accent} fillOpacity="0.1" stroke={accent} strokeOpacity="0.9" strokeWidth="0.9" />
            <text x="24" y="14" textAnchor="middle" fill={accent} fontSize="9" letterSpacing="2" {...MONO}>{tag}</text>
            {i < 2 && (
              <g>
                <line x1="48" y1="11" x2="78" y2="11" stroke={accent} strokeOpacity="0.7" strokeDasharray="2 3">
                  <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="1.4s" repeatCount="indefinite" />
                </line>
                <polygon points="73,8 78,11 73,14" fill={accent} fillOpacity="0.85" />
              </g>
            )}
          </g>
        ))}
      </g>

      {/* Floating callout */}
      <g transform="translate(206 18)">
        <rect width="62" height="14" rx="2" fill={accent} fillOpacity="0.2" stroke={accent} strokeOpacity="0.85" strokeWidth="0.7" />
        <text x="31" y="10" textAnchor="middle" fill={accent} fontSize="7" letterSpacing="1.5" {...MONO}>&lt;50MS · 95%</text>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 2. RecoMe — user signals → ranker → personalized feed (with mini panels)
// ─────────────────────────────────────────────────────────────────────────
function RecommendSchematic({ accent }: SubProps) {
  return (
    <svg viewBox="0 0 300 180" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* User signals panel (left) */}
      <g transform="translate(14 22)">
        <rect width="86" height="58" fill={accent} fillOpacity="0.08" stroke={accent} strokeOpacity="0.85" strokeWidth="0.8" />
        <text x="6" y="12" fill={accent} fontSize="7" letterSpacing="1.5" {...MONO}>› USER SIGNALS</text>
        <line x1="6" y1="16" x2="80" y2="16" stroke={accent} strokeOpacity="0.35" />
        {[
          { label: 'clicks', val: 4 },
          { label: 'watches', val: 3 },
          { label: 'likes', val: 2 },
          { label: 'session', val: 3 },
        ].map((s, i) => (
          <g key={i} transform={`translate(6 ${22 + i * 9})`}>
            <text fill={accent} fontSize="6" letterSpacing="1" opacity="0.8" {...MONO}>{s.label.toUpperCase()}</text>
            <rect x="38" y="-4" width="40" height="4" fill={accent} fillOpacity="0.1" />
            <rect x="38" y="-4" width={s.val * 10} height="4" fill={accent} fillOpacity="0.8" />
          </g>
        ))}
      </g>
      {/* User avatar above */}
      <g transform="translate(45 86)">
        <circle r="10" fill={accent} fillOpacity="0.2" stroke={accent} strokeOpacity="0.9" strokeWidth="0.9" />
        <circle cy="-2" r="3" fill={accent} fillOpacity="0.75" />
        <path d="M -6 6 Q 0 1 6 6" fill="none" stroke={accent} strokeOpacity="0.75" />
      </g>

      {/* Arrow to engine */}
      <g>
        <line x1="100" y1="55" x2="124" y2="55" stroke={accent} strokeOpacity="0.7" strokeDasharray="3 3">
          <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.4s" repeatCount="indefinite" />
        </line>
        <polygon points="119,52 124,55 119,58" fill={accent} fillOpacity="0.85" />
      </g>

      {/* Engine box (center) */}
      <g transform="translate(124 22)">
        <rect width="70" height="76" fill={accent} fillOpacity="0.14" stroke={accent} strokeOpacity="0.95" strokeWidth="0.9" />
        <text x="35" y="14" textAnchor="middle" fill={accent} fontSize="9" letterSpacing="2" {...MONO}>RANK</text>
        <line x1="6" y1="20" x2="64" y2="20" stroke={accent} strokeOpacity="0.5" />
        {['collab', 'content', 'behavioral'].map((l, i) => (
          <g key={l} transform={`translate(6 ${28 + i * 14})`}>
            <circle cx="3" cy="0" r="2" fill={accent}>
              <animate attributeName="opacity" values="1;0.3;1" dur={`${1.4 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <text x="10" y="3" fill={accent} fontSize="6" letterSpacing="1.2" opacity="0.85" {...MONO}>{l.toUpperCase()}</text>
            <rect x="38" y="-3" width="22" height="2" fill={accent} fillOpacity="0.15" />
            <rect x="38" y="-3" width={[18, 14, 20][i]} height="2" fill={accent} fillOpacity="0.85" />
          </g>
        ))}
        <text x="35" y="72" textAnchor="middle" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.65" {...MONO}>HYBRID</text>
      </g>

      {/* Arrow to feed */}
      <g>
        <line x1="196" y1="55" x2="220" y2="55" stroke={accent} strokeOpacity="0.7" strokeDasharray="3 3">
          <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.4s" repeatCount="indefinite" />
        </line>
        <polygon points="215,52 220,55 215,58" fill={accent} fillOpacity="0.85" />
      </g>

      {/* Ranked feed (right) */}
      <g transform="translate(220 22)">
        <text x="0" y="-4" fill={accent} fontSize="7" letterSpacing="1.5" opacity="0.75" {...MONO}>› FEED</text>
        {[
          { score: '9.4', glow: true },
          { score: '8.7' },
          { score: '7.9' },
          { score: '7.1' },
        ].map((item, i) => (
          <g key={i} transform={`translate(0 ${i * 20})`}>
            <rect width="66" height="16" fill={accent} fillOpacity={item.glow ? '0.34' : '0.12'} stroke={accent} strokeOpacity={item.glow ? '0.95' : '0.55'} strokeWidth="0.8" />
            <text x="4" y="11" fill={accent} fontSize="7" letterSpacing="1" {...MONO} opacity={item.glow ? '1' : '0.75'}>
              #{i + 1}  ITEM-{`${1024 + i * 17}`}
            </text>
            <text x="62" y="11" textAnchor="end" fill={accent} fontSize="7" letterSpacing="1" {...MONO} opacity={item.glow ? '1' : '0.7'}>{item.score}</text>
            {item.glow && (
              <rect x="-2" y="0" width="2" height="16" fill={accent}>
                <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
              </rect>
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 3. Gaussian Splatting KG — 3-agent pipeline + knowledge graph
// ─────────────────────────────────────────────────────────────────────────
function GraphSchematic({ accent }: SubProps) {
  return (
    <svg viewBox="0 0 300 180" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Document stack (left) */}
      <g transform="translate(14 50)">
        {[0, 1, 2, 3].map(i => (
          <g key={i} transform={`translate(${i * 3} ${-i * 4})`}>
            <rect width="38" height="50" fill={accent} fillOpacity={0.06 + i * 0.04} stroke={accent} strokeOpacity="0.75" strokeWidth="0.7" />
            {[0, 1, 2].map(j => (
              <line key={j} x1="4" y1={10 + j * 12} x2={4 + 26 - j * 4} y2={10 + j * 12} stroke={accent} strokeOpacity="0.4" strokeWidth="0.6" />
            ))}
          </g>
        ))}
        <text x="22" y="64" textAnchor="middle" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.7" {...MONO}>40+ CHUNKS</text>
      </g>

      {/* Arrows in (3 lines from docs to agents) */}
      {[0, 1, 2].map(i => (
        <line
          key={i}
          x1="62"
          y1={48 + i * 22}
          x2="98"
          y2={48 + i * 22}
          stroke={accent}
          strokeOpacity="0.65"
          strokeDasharray="2 3"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-10" dur={`${1.4 + i * 0.2}s`} repeatCount="indefinite" />
        </line>
      ))}

      {/* 3 agent boxes (center) */}
      {[
        { label: 'EXTRACTOR', y: 38 },
        { label: 'RESOLVER', y: 60 },
        { label: 'VALIDATOR', y: 82 },
      ].map((a, i) => (
        <g key={a.label} transform={`translate(98 ${a.y})`}>
          <rect width="64" height="16" rx="2" fill={accent} fillOpacity="0.18" stroke={accent} strokeOpacity="0.95" strokeWidth="0.9" />
          <text x="32" y="11" textAnchor="middle" fill={accent} fontSize="7" letterSpacing="2" {...MONO}>{a.label}</text>
          {/* Mini progress bar inside box right edge */}
          <rect x="50" y="13" width="12" height="2" fill={accent} fillOpacity="0.2" />
          <rect x="50" y="13" width={[10, 8, 11][i]} height="2" fill={accent} fillOpacity="0.95" />
        </g>
      ))}
      <text x="130" y="32" textAnchor="middle" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.7" {...MONO}>GPT-4o</text>

      {/* Arrows out to graph */}
      {[0, 1, 2].map(i => (
        <line
          key={i}
          x1="162"
          y1={46 + i * 22}
          x2={198 + i * 6}
          y2={48 + i * 20}
          stroke={accent}
          strokeOpacity="0.6"
          strokeDasharray="2 3"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-10" dur={`${1.6 + i * 0.2}s`} repeatCount="indefinite" />
        </line>
      ))}

      {/* Knowledge graph (right) */}
      <g>
        {[
          { x: 210, y: 40, label: 'ENT' },
          { x: 240, y: 60, label: 'REL' },
          { x: 268, y: 44, label: 'ENT' },
          { x: 268, y: 86, label: 'PRV' },
          { x: 222, y: 96, label: 'ENT' },
          { x: 252, y: 110, label: 'REL' },
        ].map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="7" fill={accent} fillOpacity="0.22" stroke={accent} strokeOpacity="0.95" strokeWidth="0.9" />
            <text x={n.x} y={n.y + 2} textAnchor="middle" fill={accent} fontSize="5" letterSpacing="1" {...MONO}>{n.label}</text>
          </g>
        ))}
        {/* Edges */}
        {[
          [210, 40, 240, 60], [240, 60, 268, 44], [240, 60, 268, 86], [240, 60, 222, 96], [222, 96, 252, 110], [268, 86, 252, 110],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeOpacity="0.4" strokeWidth="0.7" />
        ))}
        {/* Pulse on one node */}
        <circle cx="240" cy="60" r="11" fill="none" stroke={accent} strokeWidth="0.6">
          <animate attributeName="r" values="7;14;7" dur="2.3s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.8;0;0.8" dur="2.3s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Bottom-right meta */}
      <text x="285" y="155" textAnchor="end" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.65" {...MONO}>REACT-FLOW · HONO · DRIZZLE</text>
      <text x="285" y="20" textAnchor="end" fill={accent} fontSize="7" letterSpacing="2" opacity="0.85" {...MONO}>NODES · 6 · EDGES · 6</text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 3b. Manifold Strata — Poincaré disk (hyperbolic geometry) + LLM-call savings
// ─────────────────────────────────────────────────────────────────────────
function ManifoldSchematic({ accent }: SubProps) {
  // Disk center & radius for the Poincaré model in the SVG viewBox.
  const dx = 150, dy = 92, R = 52;
  // Hyperbolic concept nodes. Parents (low r) live near the centre; their
  // children fan out near the boundary. Positions use (radius, angleDeg).
  const nodes = [
    { id: 'GS',   r: 4,  a: 0,    label: 'GS' },           // root (hyperbolic origin)
    { id: '3DGS', r: 22, a: 35,   label: '3DGS' },
    { id: 'NERF', r: 22, a: 130,  label: 'NERF' },
    { id: 'RAD',  r: 22, a: 240,  label: 'RAD' },
    { id: 'MIP',  r: 40, a: 20,   label: 'MIP' },
    { id: 'SPLT', r: 42, a: 60,   label: 'SPLT' },
    { id: 'PLN',  r: 41, a: 115,  label: 'PLN' },
    { id: 'INST', r: 40, a: 155,  label: 'INST' },
    { id: 'VOX',  r: 41, a: 225,  label: 'VOX' },
    { id: 'OCC',  r: 42, a: 260,  label: 'OCC' },
  ];
  // Project polar → cartesian.
  const cart = (rad: number, angDeg: number) => {
    const ang = (angDeg * Math.PI) / 180;
    return [
      +(dx + Math.cos(ang) * rad).toFixed(2),
      +(dy + Math.sin(ang) * rad).toFixed(2),
    ] as const;
  };
  const pos: Record<string, readonly [number, number]> = {};
  nodes.forEach(n => { pos[n.id] = cart(n.r, n.a); });
  // Edges — parent → children (hierarchy). Drawn as hyperbolic geodesics:
  // approximated by quadratic Béziers with a control point bent toward the
  // disk centre, which is visually correct for a Poincaré disk.
  const edges: [string, string][] = [
    ['GS', '3DGS'], ['GS', 'NERF'], ['GS', 'RAD'],
    ['3DGS', 'MIP'], ['3DGS', 'SPLT'],
    ['NERF', 'PLN'], ['NERF', 'INST'],
    ['RAD', 'VOX'], ['RAD', 'OCC'],
  ];

  return (
    <svg viewBox="0 0 300 180" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* arXiv paper queue (left) — animated marching toward the disk */}
      <g transform="translate(8 30)">
        <text x="0" y="-2" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.7" {...MONO}>› ARXIV QUEUE</text>
        {[0, 1, 2, 3].map(i => (
          <g key={i} transform={`translate(${i * 3} ${i * 14})`}>
            <rect width="36" height="12" fill={accent} fillOpacity={0.08 + i * 0.05} stroke={accent} strokeOpacity="0.7" strokeWidth="0.6" />
            <text x="4" y="8.5" fill={accent} fontSize="6" letterSpacing="1" opacity="0.85" {...MONO}>2406.0{i + 1}</text>
            {i === 0 && (
              <rect width="36" height="12" fill="none" stroke={accent} strokeOpacity="0.95" strokeWidth="0.9">
                <animate attributeName="stroke-opacity" values="0.95;0.3;0.95" dur="1.6s" repeatCount="indefinite" />
              </rect>
            )}
          </g>
        ))}
        <text x="0" y="80" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.55" {...MONO}>EXTRACT · RESOLVE</text>
      </g>

      {/* Pipeline arrow into the disk */}
      <line x1="56" y1="56" x2="92" y2="80" stroke={accent} strokeOpacity="0.65" strokeDasharray="2 3">
        <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.4s" repeatCount="indefinite" />
      </line>
      <polygon points="89,76 92,80 87,80" fill={accent} fillOpacity="0.9" />

      {/* ── POINCARÉ DISK ─────────────────────────────────────────────── */}
      {/* Outer boundary */}
      <circle cx={dx} cy={dy} r={R} fill="none" stroke={accent} strokeOpacity="0.85" strokeWidth="1" />
      {/* Soft inner fill */}
      <circle cx={dx} cy={dy} r={R} fill={accent} fillOpacity="0.05" />
      {/* Concentric hyperbolic radii (visual cue: equal hyperbolic distance) */}
      {[14, 28, 42].map(r => (
        <circle key={r} cx={dx} cy={dy} r={r} fill="none" stroke={accent} strokeOpacity="0.18" strokeDasharray="1 3" />
      ))}
      {/* Cross-hair at the disk centre */}
      <line x1={dx - 3} y1={dy} x2={dx + 3} y2={dy} stroke={accent} strokeOpacity="0.6" strokeWidth="0.6" />
      <line x1={dx} y1={dy - 3} x2={dx} y2={dy + 3} stroke={accent} strokeOpacity="0.6" strokeWidth="0.6" />

      {/* Hyperbolic edges (quadratic curve bent toward disk centre) */}
      {edges.map(([a, b], i) => {
        const [x1, y1] = pos[a];
        const [x2, y2] = pos[b];
        // Bend the control point toward the centre — that's the curvature
        // signature of a hyperbolic geodesic in the Poincaré disk.
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const tx = +(mx + (dx - mx) * 0.35).toFixed(2);
        const ty = +(my + (dy - my) * 0.35).toFixed(2);
        return (
          <path
            key={i}
            d={`M ${x1} ${y1} Q ${tx} ${ty} ${x2} ${y2}`}
            fill="none"
            stroke={accent}
            strokeOpacity="0.55"
            strokeWidth="0.7"
          />
        );
      })}

      {/* PageRank pulse — a token traversing one edge */}
      <circle r="1.6" fill={accent} style={{ filter: `drop-shadow(0 0 3px ${accent})` }}>
        <animateMotion dur="2.6s" repeatCount="indefinite" path={`M ${pos['GS'][0]} ${pos['GS'][1]} Q ${dx + (pos['3DGS'][0] - dx) * 0.3} ${dy + (pos['3DGS'][1] - dy) * 0.3} ${pos['3DGS'][0]} ${pos['3DGS'][1]}`} />
      </circle>

      {/* Nodes — radius shrinks as r → R (the canonical Poincaré-disk
          visual: more points crowd near the boundary at decreasing sizes). */}
      {nodes.map(n => {
        const [x, y] = pos[n.id];
        const isRoot = n.id === 'GS';
        const nodeR = isRoot ? 4.5 : 3.4 - (n.r / R) * 1.2;
        return (
          <g key={n.id}>
            <circle
              cx={x}
              cy={y}
              r={+nodeR.toFixed(2)}
              fill={accent}
              fillOpacity={isRoot ? '0.9' : '0.55'}
              stroke={accent}
              strokeOpacity="0.95"
              strokeWidth="0.6"
            />
            <text
              x={x}
              y={y - nodeR - 1.5}
              textAnchor="middle"
              fill={accent}
              fontSize={isRoot ? '5.5' : '4.5'}
              letterSpacing="1"
              opacity={isRoot ? '1' : '0.85'}
              {...MONO}
            >
              {n.label}
            </text>
          </g>
        );
      })}

      {/* Disk header */}
      <text x={dx} y={dy - R - 5} textAnchor="middle" fill={accent} fontSize="6.5" letterSpacing="2" opacity="0.85" {...MONO}>POINCARÉ · HYPERBOLIC</text>

      {/* Right panels — LLM savings, MCP status, pipeline mode */}
      <g transform="translate(220 24)">
        {/* LLM call savings (the project's hero number) */}
        <rect width="74" height="36" fill={accent} fillOpacity="0.14" stroke={accent} strokeOpacity="0.95" strokeWidth="0.9" />
        <text x="6" y="9" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.7" {...MONO}>› LLM CALLS</text>
        <text x="37" y="24" textAnchor="middle" fill={accent} fontSize="14" letterSpacing="1" {...MONO} style={{ filter: `drop-shadow(0 0 4px ${accent})` }}>−68%</text>
        <text x="37" y="32" textAnchor="middle" fill={accent} fontSize="5" letterSpacing="1.5" opacity="0.65" {...MONO}>vs LEGACY</text>

        {/* Entity dedup metric (~60 → ~42) */}
        <g transform="translate(0 44)">
          <rect width="74" height="22" fill={accent} fillOpacity="0.08" stroke={accent} strokeOpacity="0.55" strokeWidth="0.7" />
          <text x="6" y="9" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.7" {...MONO}>› DEDUP / PAPER</text>
          <text x="6" y="18" fill={accent} fontSize="8" letterSpacing="1.5" opacity="0.95" {...MONO}>~60 → ~42</text>
        </g>

        {/* Pipeline mode switch */}
        <g transform="translate(0 72)">
          <rect width="74" height="22" fill={accent} fillOpacity="0.08" stroke={accent} strokeOpacity="0.55" strokeWidth="0.7" />
          <text x="6" y="9" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.7" {...MONO}>› PIPELINE_MODE</text>
          <rect x="6" y="13" width="28" height="6" fill={accent} fillOpacity="0.55" />
          <text x="20" y="18" textAnchor="middle" fill="#000" fontSize="5" letterSpacing="1.5" {...MONO}>FIELD</text>
          <rect x="36" y="13" width="32" height="6" fill="none" stroke={accent} strokeOpacity="0.45" />
          <text x="52" y="18" textAnchor="middle" fill={accent} fontSize="5" letterSpacing="1.5" opacity="0.55" {...MONO}>LEGACY</text>
        </g>

        {/* MCP status */}
        <g transform="translate(0 100)">
          <circle cx="5" cy="5" r="2" fill={accent}>
            <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <text x="12" y="7.5" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.85" {...MONO}>MCP · READY</text>
        </g>
      </g>

      {/* Bottom-left: PageRank micro caption */}
      <text x="14" y="170" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.6" {...MONO}>HIPPO-RAG · PERSONALIZED PAGERANK</text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 4. NexusChatbot — orchestrator + 3 specialized agents with outputs
// ─────────────────────────────────────────────────────────────────────────
function MultiAgent3Schematic({ accent }: SubProps) {
  const cx = 150, cy = 78;
  const agents = [
    { angle: -90, label: 'RESEARCH', glyph: '⟁', output: ['• arxiv 2406.01...', '• cite extracted'] },
    { angle: 30, label: 'CODER', glyph: '⌨', output: ['def merge(a,b):', '  return [...]'] },
    { angle: 150, label: 'TASKS', glyph: '✓', output: ['☑ ingest', '☐ benchmark'] },
  ];
  return (
    <svg viewBox="0 0 300 180" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Connections */}
      {agents.map((a, i) => {
        const rad = (a.angle * Math.PI) / 180;
        const x = +(cx + Math.cos(rad) * 50).toFixed(2);
        const y = +(cy + Math.sin(rad) * 50).toFixed(2);
        return (
          <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={accent} strokeOpacity="0.6" strokeWidth="1" strokeDasharray="3 3">
            <animate attributeName="stroke-dashoffset" from="0" to={i % 2 === 0 ? '-12' : '12'} dur={`${1.4 + i * 0.3}s`} repeatCount="indefinite" />
          </line>
        );
      })}
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r="58" fill="none" stroke={accent} strokeOpacity="0.2" strokeDasharray="2 6" />

      {/* Agent nodes */}
      {agents.map((a, i) => {
        const rad = (a.angle * Math.PI) / 180;
        const x = +(cx + Math.cos(rad) * 50).toFixed(2);
        const y = +(cy + Math.sin(rad) * 50).toFixed(2);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="14" fill={accent} fillOpacity="0.2" stroke={accent} strokeOpacity="0.95" strokeWidth="1" />
            <text x={x} y={y - 1} textAnchor="middle" fill={accent} fontSize="11" {...MONO}>{a.glyph}</text>
            <text x={x} y={y + 24} textAnchor="middle" fill={accent} fontSize="7" letterSpacing="2" opacity="0.85" {...MONO}>{a.label}</text>
          </g>
        );
      })}

      {/* Central hub */}
      <circle cx={cx} cy={cy} r="14" fill={accent} fillOpacity="0.32" stroke={accent} strokeWidth="1.4" style={{ filter: `drop-shadow(0 0 5px ${accent})` }} />
      <text x={cx} y={cy + 3} textAnchor="middle" fill={accent} fontSize="9" letterSpacing="2" {...MONO}>CTRL</text>

      {/* Output preview panel (bottom) */}
      <g transform="translate(14 138)">
        <rect width="272" height="32" fill={accent} fillOpacity="0.08" stroke={accent} strokeOpacity="0.5" strokeWidth="0.7" />
        <text x="6" y="10" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.6" {...MONO}>› CODER · OUTPUT</text>
        <text x="6" y="20" fill={accent} fontSize="7" letterSpacing="0.5" opacity="0.85" {...MONO}>def merge(a, b):</text>
        <text x="6" y="28" fill={accent} fontSize="7" letterSpacing="0.5" opacity="0.85" {...MONO}>  return sorted([*a, *b])</text>
        {/* Cursor */}
        <rect x="120" y="22" width="4" height="7" fill={accent}>
          <animate attributeName="opacity" values="1;0;1" dur="0.9s" repeatCount="indefinite" />
        </rect>
      </g>

      <text x="290" y="18" textAnchor="end" fill={accent} fontSize="7" letterSpacing="2" opacity="0.7" {...MONO}>AGENTS · 3 SPECIALIZED</text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 5. Gennie — 3 chat panels + sentiment trend + user count
// ─────────────────────────────────────────────────────────────────────────
function ChatSentimentSchematic({ accent }: SubProps) {
  // Three small phone-style chat panels, each with 3 bubbles in different sentiment colors
  // sentiments expressed as opacity differences only (the accent color carries the whole card)
  return (
    <svg viewBox="0 0 300 180" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* 3 phone-style chat panels */}
      {[0, 1, 2].map(panel => {
        const x = 22 + panel * 60;
        return (
          <g key={panel} transform={`translate(${x} 18)`}>
            <rect width="50" height="92" rx="3" fill={accent} fillOpacity="0.08" stroke={accent} strokeOpacity="0.85" strokeWidth="0.8" />
            {/* Phone notch */}
            <rect x="20" y="2" width="10" height="3" rx="1" fill={accent} fillOpacity="0.5" />
            {/* Chat bubbles inside */}
            {[
              { side: 'left', op: 0.4 + panel * 0.2 },
              { side: 'right', op: 0.5 + panel * 0.15 },
              { side: 'left', op: 0.6 + panel * 0.15 },
            ].map((b, i) => (
              <g key={i} transform={`translate(${b.side === 'left' ? 4 : 22} ${14 + i * 14})`}>
                <rect width="24" height="10" rx="2" fill={accent} fillOpacity={b.op} stroke={accent} strokeOpacity="0.7" strokeWidth="0.5" />
                <line x1="3" y1="5" x2="20" y2="5" stroke={accent} strokeOpacity="0.4" strokeWidth="0.6" />
              </g>
            ))}
            {/* Sentiment dot */}
            <circle cx="44" cy="86" r="3" fill={accent} fillOpacity={0.4 + panel * 0.3}>
              <animate attributeName="opacity" values="1;0.4;1" dur={`${1.5 + panel * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <text x="25" y="106" textAnchor="middle" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.7" {...MONO}>
              CHAT-{panel + 1}
            </text>
          </g>
        );
      })}

      {/* Sentiment trend panel (bottom-left) */}
      <g transform="translate(14 132)">
        <rect width="100" height="36" fill={accent} fillOpacity="0.06" stroke={accent} strokeOpacity="0.7" strokeWidth="0.7" />
        <text x="6" y="10" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.85" {...MONO}>SENTIMENT TREND</text>
        {/* Mini curve */}
        <polyline
          points="6,30 18,24 30,28 42,18 54,22 66,14 78,16 92,10"
          fill="none"
          stroke={accent}
          strokeWidth="1.2"
          style={{ filter: `drop-shadow(0 0 2px ${accent})` }}
        />
        <text x="94" y="30" textAnchor="end" fill={accent} fontSize="7" letterSpacing="0.5" {...MONO}>+0.74</text>
      </g>

      {/* User count circle (right) */}
      <g transform="translate(232 138)">
        <circle r="20" fill="none" stroke={accent} strokeOpacity="0.2" strokeWidth="3" />
        <circle r="20" fill="none" stroke={accent} strokeWidth="3" strokeDasharray="98 30" transform="rotate(-90)" style={{ filter: `drop-shadow(0 0 3px ${accent})` }} />
        <text y="-2" textAnchor="middle" fill={accent} fontSize="11" letterSpacing="1" fontWeight="bold" {...MONO}>7.8K</text>
        <text y="8" textAnchor="middle" fill={accent} fontSize="5" letterSpacing="1.5" opacity="0.7" {...MONO}>USERS</text>
      </g>

      <text x="290" y="18" textAnchor="end" fill={accent} fontSize="7" letterSpacing="2" opacity="0.75" {...MONO}>GEMINI · LIVE</text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 6. Trading — candlestick chart + portfolio donut + alert panel + ticker
// ─────────────────────────────────────────────────────────────────────────
function TradingSchematic({ accent }: SubProps) {
  const candles = Array.from({ length: 14 }).map((_, i) => ({
    h: 8 + ((Math.sin(i * 0.9) + 1) * 22 + i * 2),
    up: (i % 3 !== 0) && (i % 5 !== 4),
  }));
  return (
    <svg viewBox="0 0 300 180" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Portfolio donut (left) */}
      <g transform="translate(38 50)">
        <text x="0" y="-22" textAnchor="middle" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.7" {...MONO}>PORTFOLIO</text>
        <circle r="18" fill="none" stroke={accent} strokeOpacity="0.2" strokeWidth="4" />
        {/* Donut segments */}
        <circle r="18" fill="none" stroke={accent} strokeWidth="4" strokeDasharray="40 73" transform="rotate(-90)" opacity="0.9" />
        <circle r="18" fill="none" stroke={accent} strokeWidth="4" strokeDasharray="28 85" strokeDashoffset="-40" transform="rotate(-90)" opacity="0.6" />
        <circle r="18" fill="none" stroke={accent} strokeWidth="4" strokeDasharray="18 95" strokeDashoffset="-68" transform="rotate(-90)" opacity="0.35" />
        <text y="3" textAnchor="middle" fill={accent} fontSize="7" letterSpacing="0.5" fontWeight="bold" {...MONO}>+2.5%</text>
        {/* Mini legend */}
        <g transform="translate(-28 26)">
          {['TSLA 35%', 'GOOGL 28%', 'AMZN 18%'].map((l, i) => (
            <g key={i} transform={`translate(0 ${i * 7})`}>
              <rect width="4" height="4" fill={accent} fillOpacity={0.9 - i * 0.25} />
              <text x="8" y="4" fill={accent} fontSize="5" letterSpacing="1" opacity="0.85" {...MONO}>{l}</text>
            </g>
          ))}
        </g>
      </g>

      {/* Trading workspace — candlestick chart (center) */}
      <g transform="translate(78 18)">
        <rect width="148" height="86" fill={accent} fillOpacity="0.04" stroke={accent} strokeOpacity="0.75" strokeWidth="0.7" />
        <text x="6" y="10" fill={accent} fontSize="6" letterSpacing="1.5" {...MONO}>TRADING · LIVE</text>
        <text x="142" y="10" textAnchor="end" fill={accent} fontSize="6" letterSpacing="1" opacity="0.7" {...MONO}>+3.0%</text>
        {/* Y grid */}
        {[24, 44, 64].map(y => (
          <line key={y} x1="6" y1={y} x2="142" y2={y} stroke={accent} strokeOpacity="0.12" strokeDasharray="2 4" />
        ))}
        {/* Candles */}
        {candles.map((c, i) => {
          const cx = 12 + i * 9.6;
          const top = 78 - c.h;
          return (
            <g key={i}>
              <rect x={cx - 3} y={top} width="6" height={c.h} fill={accent} fillOpacity={c.up ? '0.6' : '0.2'} stroke={accent} strokeOpacity={c.up ? '0.95' : '0.5'} strokeWidth="0.6" />
              <line x1={cx} y1={top - 4} x2={cx} y2={top - 10} stroke={accent} strokeOpacity="0.7" strokeWidth="0.5" />
              <line x1={cx} y1={78} x2={cx} y2={84} stroke={accent} strokeOpacity="0.7" strokeWidth="0.5" />
            </g>
          );
        })}
        {/* Trend line */}
        <polyline
          points={candles.map((c, i) => `${12 + i * 9.6},${78 - c.h - 4}`).join(' ')}
          fill="none"
          stroke={accent}
          strokeWidth="1.4"
          strokeOpacity="0.95"
          style={{ filter: `drop-shadow(0 0 3px ${accent})` }}
        />
      </g>

      {/* Alerts panel (right) */}
      <g transform="translate(232 18)">
        <rect width="56" height="86" fill={accent} fillOpacity="0.08" stroke={accent} strokeOpacity="0.85" strokeWidth="0.7" />
        <text x="28" y="10" textAnchor="middle" fill={accent} fontSize="6" letterSpacing="1.5" {...MONO}>ALERTS</text>
        {[
          { type: 'SELL', sym: 'AMZN', price: '180' },
          { type: 'BUY', sym: 'NVDA', price: '900' },
          { type: 'HOLD', sym: 'AAPL', price: '210' },
        ].map((a, i) => (
          <g key={i} transform={`translate(4 ${18 + i * 22})`}>
            <rect width="48" height="18" rx="2" fill={accent} fillOpacity={i === 1 ? '0.3' : '0.12'} stroke={accent} strokeOpacity={i === 1 ? '0.95' : '0.55'} strokeWidth="0.7" />
            <text x="4" y="11" fill={accent} fontSize="6" letterSpacing="1" fontWeight="bold" {...MONO}>{a.type}</text>
            <text x="44" y="11" textAnchor="end" fill={accent} fontSize="5" letterSpacing="1" opacity="0.85" {...MONO}>{a.sym} @{a.price}</text>
            {i === 1 && (
              <circle cx="46" cy="3" r="1.5" fill={accent}>
                <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        ))}
      </g>

      {/* Markets ticker (bottom) */}
      <g transform="translate(14 132)">
        <rect width="272" height="34" fill={accent} fillOpacity="0.05" stroke={accent} strokeOpacity="0.55" strokeWidth="0.6" />
        <text x="6" y="11" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.7" {...MONO}>MARKETS · REAL-TIME WS</text>
        {[
          { sym: 'AAPL', price: '210.4', up: true },
          { sym: 'MSFT', price: '430.1', up: false },
          { sym: 'BTC', price: '68.9K', up: true },
          { sym: 'TSLA', price: '241.2', up: true },
        ].map((t, i) => (
          <g key={i} transform={`translate(${6 + i * 66} 18)`}>
            <text x="0" y="9" fill={accent} fontSize="7" letterSpacing="1" fontWeight="bold" {...MONO}>{t.sym}</text>
            <text x="32" y="9" fill={accent} fontSize="7" letterSpacing="0.5" opacity="0.85" {...MONO}>{t.price}</text>
            <text x="58" y="9" fill={accent} fontSize="6" {...MONO} opacity="0.85">{t.up ? '▲' : '▼'}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 7. Anomaly Detection — trend + transaction monitor + cluster + counters
// ─────────────────────────────────────────────────────────────────────────
function AnomalySchematic({ accent }: SubProps) {
  return (
    <svg viewBox="0 0 300 180" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Anomaly trend (left) */}
      <g transform="translate(14 16)">
        <rect width="98" height="62" fill={accent} fillOpacity="0.05" stroke={accent} strokeOpacity="0.75" strokeWidth="0.7" />
        <text x="6" y="10" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.85" {...MONO}>ANOMALY SCORE</text>
        {/* Threshold */}
        <line x1="6" y1="36" x2="92" y2="36" stroke={accent} strokeOpacity="0.3" strokeDasharray="2 3" />
        {/* Mini chart with peaks */}
        {(() => {
          const pts = [
            [6, 50], [12, 48], [18, 46], [24, 30], [28, 22], [32, 46], [38, 50],
            [44, 48], [50, 42], [56, 18], [60, 14], [66, 44], [72, 48], [78, 50],
            [84, 22], [88, 16], [92, 46],
          ];
          return (
            <>
              <polyline
                points={pts.map(p => p.join(',')).join(' ')}
                fill="none"
                stroke={accent}
                strokeWidth="1.2"
                strokeOpacity="0.9"
              />
              {/* Spike markers */}
              {[[28, 22], [60, 14], [88, 16]].map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="3" fill={accent}>
                    <animate attributeName="r" values="3;5;3" dur="1.3s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                  </circle>
                </g>
              ))}
            </>
          );
        })()}
      </g>

      {/* Transaction monitor table (center) */}
      <g transform="translate(118 16)">
        <rect width="120" height="100" fill={accent} fillOpacity="0.04" stroke={accent} strokeOpacity="0.85" strokeWidth="0.7" />
        <text x="6" y="10" fill={accent} fontSize="6" letterSpacing="1.5" {...MONO}>TXN MONITOR</text>
        {/* Header */}
        <line x1="6" y1="14" x2="114" y2="14" stroke={accent} strokeOpacity="0.4" />
        {[
          { id: 'TX-1283', amt: '$420', status: 'FLAGGED', flagged: true },
          { id: 'TX-1284', amt: '$45', status: 'OK', flagged: false },
          { id: 'TX-1285', amt: '$2.1K', status: 'FLAGGED', flagged: true },
          { id: 'TX-1286', amt: '$12', status: 'OK', flagged: false },
          { id: 'TX-1287', amt: '$890', status: 'REVIEW', flagged: false },
          { id: 'TX-1288', amt: '$3.4K', status: 'FLAGGED', flagged: true },
        ].map((r, i) => (
          <g key={i} transform={`translate(6 ${22 + i * 12})`}>
            <text x="0" y="6" fill={accent} fontSize="6" letterSpacing="0.8" opacity="0.85" {...MONO}>{r.id}</text>
            <text x="46" y="6" fill={accent} fontSize="6" letterSpacing="0.8" opacity="0.85" {...MONO}>{r.amt}</text>
            <rect x="74" y="-1" width="34" height="9" rx="1" fill={accent} fillOpacity={r.flagged ? '0.45' : '0.12'} stroke={accent} strokeOpacity={r.flagged ? '0.95' : '0.45'} strokeWidth="0.6" />
            <text x="91" y="6" textAnchor="middle" fill={accent} fontSize="5" letterSpacing="1" fontWeight="bold" {...MONO}>{r.status}</text>
          </g>
        ))}
      </g>

      {/* Fraud cluster (right) */}
      <g transform="translate(244 16)">
        <text x="22" y="10" textAnchor="middle" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.85" {...MONO}>CLUSTER</text>
        {/* Normal nodes (top) */}
        {[[10, 22], [22, 18], [34, 24]].map(([x, y], i) => (
          <circle key={`n${i}`} cx={x} cy={y} r="2.5" fill={accent} fillOpacity="0.55" />
        ))}
        {/* Connections normal */}
        <line x1="10" y1="22" x2="22" y2="18" stroke={accent} strokeOpacity="0.5" strokeWidth="0.6" />
        <line x1="22" y1="18" x2="34" y2="24" stroke={accent} strokeOpacity="0.5" strokeWidth="0.6" />
        <text x="22" y="32" textAnchor="middle" fill={accent} fontSize="5" letterSpacing="1" opacity="0.65" {...MONO}>NORMAL</text>

        {/* Fraud cluster (bottom) — denser red-ish but in accent */}
        {[[8, 56], [22, 60], [16, 70], [30, 70], [22, 78]].map(([x, y], i) => (
          <circle key={`f${i}`} cx={x} cy={y} r="3" fill={accent} stroke={accent} strokeWidth="0.8" style={{ filter: `drop-shadow(0 0 3px ${accent})` }}>
            {i === 2 && <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />}
          </circle>
        ))}
        {/* Fraud connections */}
        {[[8, 56, 22, 60], [22, 60, 16, 70], [22, 60, 30, 70], [16, 70, 22, 78], [30, 70, 22, 78]].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeOpacity="0.85" strokeWidth="0.7" />
        ))}
        <text x="22" y="92" textAnchor="middle" fill={accent} fontSize="5" letterSpacing="1" {...MONO}>FRAUD</text>
      </g>

      {/* Bottom counters */}
      <g transform="translate(14 124)">
        <rect width="98" height="44" fill={accent} fillOpacity="0.05" stroke={accent} strokeOpacity="0.55" strokeWidth="0.6" />
        <text x="6" y="11" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.7" {...MONO}>ALERTS</text>
        <text x="6" y="34" fill={accent} fontSize="18" letterSpacing="1" fontWeight="bold" {...MONO} style={{ filter: `drop-shadow(0 0 3px ${accent})` }}>47</text>
      </g>
      <g transform="translate(118 124)">
        <rect width="120" height="44" fill={accent} fillOpacity="0.05" stroke={accent} strokeOpacity="0.55" strokeWidth="0.6" />
        <text x="6" y="11" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.7" {...MONO}>RESOLVED CASES</text>
        <text x="6" y="34" fill={accent} fontSize="18" letterSpacing="1" fontWeight="bold" {...MONO}>1283</text>
        <text x="114" y="34" textAnchor="end" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.6" {...MONO}>95% ACC</text>
      </g>
      <g transform="translate(244 124)">
        <rect width="42" height="44" fill={accent} fillOpacity="0.05" stroke={accent} strokeOpacity="0.55" strokeWidth="0.6" />
        <text x="6" y="11" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.7" {...MONO}>TPM</text>
        <text x="6" y="34" fill={accent} fontSize="11" letterSpacing="0.5" fontWeight="bold" {...MONO}>10K+</text>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 8. CollabHub — workspace + cursors + side pane + presence
// ─────────────────────────────────────────────────────────────────────────
function CollabSchematic({ accent }: SubProps) {
  const users = [
    { x: 90, y: 56, label: 'NB', live: true },
    { x: 170, y: 86, label: 'SK', live: true },
    { x: 220, y: 60, label: 'AR', live: false },
  ];
  return (
    <svg viewBox="0 0 300 180" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Left panel — file list */}
      <g transform="translate(14 18)">
        <rect width="58" height="120" fill={accent} fillOpacity="0.05" stroke={accent} strokeOpacity="0.7" strokeWidth="0.7" />
        <text x="6" y="10" fill={accent} fontSize="5" letterSpacing="1.5" opacity="0.85" {...MONO}>FILES</text>
        {['design.md', 'specs.md', 'todo.md', 'arch.md', 'notes.md'].map((f, i) => (
          <g key={f} transform={`translate(4 ${18 + i * 18})`}>
            <rect width="50" height="14" fill={accent} fillOpacity={i === 0 ? '0.22' : '0.06'} stroke={accent} strokeOpacity={i === 0 ? '0.85' : '0.35'} strokeWidth="0.5" />
            <text x="4" y="10" fill={accent} fontSize="6" letterSpacing="0.5" opacity={i === 0 ? '1' : '0.7'} {...MONO}>{f}</text>
            {i === 0 && (
              <circle cx="46" cy="7" r="1.5" fill={accent}>
                <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        ))}
      </g>

      {/* Main workspace (center) */}
      <g transform="translate(78 18)">
        <rect width="148" height="100" fill={accent} fillOpacity="0.04" stroke={accent} strokeOpacity="0.85" strokeWidth="0.8" />
        <text x="6" y="10" fill={accent} fontSize="5" letterSpacing="1.5" opacity="0.85" {...MONO}>DESIGN.MD · LIVE EDIT</text>
        {/* Document text lines */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={i}
            x1="6"
            y1={20 + i * 9}
            x2={6 + 80 + ((i * 13) % 50)}
            y2={20 + i * 9}
            stroke={accent}
            strokeOpacity="0.32"
            strokeWidth="0.7"
          />
        ))}
        {/* Selection highlight */}
        <rect x="6" y="35" width="72" height="9" fill={accent} fillOpacity="0.22" stroke={accent} strokeOpacity="0.6" strokeWidth="0.6" />

        {/* User cursors */}
        {users.map((u, i) => (
          <g key={i} transform={`translate(${u.x - 78} ${u.y - 18})`}>
            <path d={`M 0 0 L 8 10 L 3 10 L 5 16 L 2 17 L 0 11 Z`} fill={accent} fillOpacity={u.live ? '1' : '0.5'} stroke={accent} strokeWidth="0.5" />
            <rect x="10" y="-2" width="18" height="10" fill={accent} fillOpacity={u.live ? '0.95' : '0.55'} />
            <text x="19" y="6" textAnchor="middle" fill="#0b0e1a" fontSize="6" letterSpacing="1.2" fontWeight="bold" {...MONO}>{u.label}</text>
          </g>
        ))}
      </g>

      {/* Right panel — presence + video tiles */}
      <g transform="translate(232 18)">
        <rect width="56" height="100" fill={accent} fillOpacity="0.05" stroke={accent} strokeOpacity="0.7" strokeWidth="0.7" />
        <text x="6" y="10" fill={accent} fontSize="5" letterSpacing="1.5" opacity="0.85" {...MONO}>PRESENCE</text>
        {[
          { label: 'NB', live: true },
          { label: 'SK', live: true },
          { label: 'AR', live: false },
          { label: 'JP', live: true },
        ].map((u, i) => (
          <g key={i} transform={`translate(4 ${18 + i * 20})`}>
            <rect width="48" height="16" fill={accent} fillOpacity={u.live ? '0.16' : '0.06'} stroke={accent} strokeOpacity={u.live ? '0.85' : '0.4'} strokeWidth="0.5" />
            <circle cx="10" cy="8" r="4" fill={accent} fillOpacity={u.live ? '0.85' : '0.4'} />
            <text x="10" y="10" textAnchor="middle" fill="#0b0e1a" fontSize="5" fontWeight="bold" {...MONO}>{u.label}</text>
            {u.live && (
              <circle cx="14" cy="4" r="1.5" fill={accent}>
                <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
              </circle>
            )}
            <text x="20" y="11" fill={accent} fontSize="5" letterSpacing="1" {...MONO}>{u.label === 'NB' ? 'NIKHIL' : u.label === 'SK' ? 'SARA' : u.label === 'AR' ? 'AMAR' : 'JON'}</text>
          </g>
        ))}
      </g>

      {/* Bottom status bar */}
      <g transform="translate(14 132)">
        <rect width="272" height="36" fill={accent} fillOpacity="0.05" stroke={accent} strokeOpacity="0.55" strokeWidth="0.6" />
        <g transform="translate(8 14)">
          <circle r="3" fill={accent}>
            <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <text x="8" y="3" fill={accent} fontSize="6" letterSpacing="2" opacity="0.85" {...MONO}>LIVE · 3 USERS</text>
        </g>
        <text x="8" y="30" fill={accent} fontSize="5" letterSpacing="1.5" opacity="0.6" {...MONO}>WEBRTC · SOCKET.IO · OPS/SEC 142</text>
        <text x="264" y="14" textAnchor="end" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.85" {...MONO}>SYNC · 12MS</text>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 9. LLM Bias Analyzer — radar + sentiment bars + heatmap + chat
// ─────────────────────────────────────────────────────────────────────────
function BiasSchematic({ accent }: SubProps) {
  // Radar polygon points for 6 axes
  const axes = ['GEND', 'RACE', 'AGE', 'GEO', 'SOC', 'POL'];
  const values = [0.85, 0.45, 0.7, 0.6, 0.55, 0.4]; // 0..1
  const cx = 56, cy = 50, r = 30;
  const radarPts = axes.map((_, i) => {
    const a = (i / axes.length) * Math.PI * 2 - Math.PI / 2;
    const v = values[i];
    return `${(cx + Math.cos(a) * r * v).toFixed(2)},${(cy + Math.sin(a) * r * v).toFixed(2)}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 300 180" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Radar (top-left) */}
      <g>
        {/* Rings */}
        {[0.33, 0.66, 1].map((s, i) => {
          const pts = axes.map((_, j) => {
            const a = (j / axes.length) * Math.PI * 2 - Math.PI / 2;
            return `${(cx + Math.cos(a) * r * s).toFixed(2)},${(cy + Math.sin(a) * r * s).toFixed(2)}`;
          }).join(' ');
          return <polygon key={i} points={pts} fill="none" stroke={accent} strokeOpacity={0.15 + i * 0.1} strokeWidth="0.6" />;
        })}
        {/* Axis lines */}
        {axes.map((_, i) => {
          const a = (i / axes.length) * Math.PI * 2 - Math.PI / 2;
          return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r} stroke={accent} strokeOpacity="0.25" strokeWidth="0.5" />;
        })}
        {/* Data polygon */}
        <polygon points={radarPts} fill={accent} fillOpacity="0.3" stroke={accent} strokeWidth="1.2" strokeOpacity="0.95" style={{ filter: `drop-shadow(0 0 3px ${accent})` }} />
        {/* Axis labels */}
        {axes.map((label, i) => {
          const a = (i / axes.length) * Math.PI * 2 - Math.PI / 2;
          const lx = cx + Math.cos(a) * (r + 8);
          const ly = cy + Math.sin(a) * (r + 8) + 2;
          return <text key={i} x={lx.toFixed(2)} y={ly.toFixed(2)} textAnchor="middle" fill={accent} fontSize="5" letterSpacing="1" opacity="0.85" {...MONO}>{label}</text>;
        })}
        <text x={cx} y="12" textAnchor="middle" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.85" {...MONO}>BIAS SCORE</text>
      </g>

      {/* Sentiment bars (top-right) */}
      <g transform="translate(124 14)">
        <rect width="78" height="76" fill={accent} fillOpacity="0.04" stroke={accent} strokeOpacity="0.7" strokeWidth="0.6" />
        <text x="6" y="10" fill={accent} fontSize="5" letterSpacing="1.5" opacity="0.85" {...MONO}>SENTIMENT COMP</text>
        {['POS', 'NEU', 'NEG'].map((l, i) => (
          <g key={l} transform={`translate(${10 + i * 22} 18)`}>
            {/* Two bars — model vs baseline */}
            <rect x="0" y={[26, 38, 30][i]} width="6" height={[26, 14, 22][i]} fill={accent} fillOpacity="0.55" stroke={accent} strokeOpacity="0.85" strokeWidth="0.5" />
            <rect x="8" y={[18, 32, 22][i]} width="6" height={[34, 20, 30][i]} fill={accent} fillOpacity="0.95" stroke={accent} strokeOpacity="0.85" strokeWidth="0.5" style={{ filter: `drop-shadow(0 0 1.5px ${accent})` }} />
            <text x="7" y="62" textAnchor="middle" fill={accent} fontSize="5" letterSpacing="1" opacity="0.75" {...MONO}>{l}</text>
          </g>
        ))}
      </g>

      {/* Similarity heatmap (top-right edge / bottom-right) */}
      <g transform="translate(212 14)">
        <rect width="76" height="76" fill={accent} fillOpacity="0.04" stroke={accent} strokeOpacity="0.7" strokeWidth="0.6" />
        <text x="6" y="10" fill={accent} fontSize="5" letterSpacing="1.5" opacity="0.85" {...MONO}>SEM·SIM MATRIX</text>
        {/* 6x6 heatmap */}
        {Array.from({ length: 6 }).map((_, r) => (
          Array.from({ length: 6 }).map((_, c) => {
            // intensity diagonal-symmetric
            const v = r === c ? 1 : Math.abs(Math.sin((r + 1) * (c + 1)));
            return (
              <rect
                key={`${r}-${c}`}
                x={6 + c * 11}
                y={18 + r * 9}
                width="10"
                height="8"
                fill={accent}
                fillOpacity={0.1 + v * 0.7}
              />
            );
          })
        ))}
      </g>

      {/* Bottom chat panel with bias tags */}
      <g transform="translate(14 100)">
        <rect width="274" height="68" fill={accent} fillOpacity="0.05" stroke={accent} strokeOpacity="0.7" strokeWidth="0.7" />
        <text x="6" y="10" fill={accent} fontSize="5" letterSpacing="1.5" opacity="0.85" {...MONO}>LLM RESPONSE · TAGGED</text>
        {/* Bubble 1 */}
        <g transform="translate(6 14)">
          <rect width="180" height="14" rx="2" fill={accent} fillOpacity="0.12" stroke={accent} strokeOpacity="0.5" strokeWidth="0.5" />
          <line x1="4" y1="7" x2="170" y2="7" stroke={accent} strokeOpacity="0.5" strokeWidth="0.7" />
          {/* Bias tag */}
          <rect x="185" y="0" width="34" height="14" rx="2" fill={accent} fillOpacity="0.6" />
          <text x="202" y="9" textAnchor="middle" fill="#0b0e1a" fontSize="5" letterSpacing="1.2" fontWeight="bold" {...MONO}>GENDER</text>
        </g>
        {/* Bubble 2 */}
        <g transform="translate(6 34)">
          <rect width="200" height="14" rx="2" fill={accent} fillOpacity="0.12" stroke={accent} strokeOpacity="0.5" strokeWidth="0.5" />
          <line x1="4" y1="7" x2="190" y2="7" stroke={accent} strokeOpacity="0.5" strokeWidth="0.7" />
          <rect x="205" y="0" width="26" height="14" rx="2" fill={accent} fillOpacity="0.75" />
          <text x="218" y="9" textAnchor="middle" fill="#0b0e1a" fontSize="5" letterSpacing="1.2" fontWeight="bold" {...MONO}>RACE</text>
        </g>
        {/* Bubble 3 */}
        <g transform="translate(6 52)">
          <rect width="160" height="11" rx="2" fill={accent} fillOpacity="0.12" stroke={accent} strokeOpacity="0.5" strokeWidth="0.5" />
          <line x1="4" y1="5.5" x2="150" y2="5.5" stroke={accent} strokeOpacity="0.5" strokeWidth="0.7" />
          <rect x="165" y="0" width="20" height="11" rx="2" fill={accent} fillOpacity="0.5" />
          <text x="175" y="8" textAnchor="middle" fill="#0b0e1a" fontSize="5" letterSpacing="1.2" fontWeight="bold" {...MONO}>AGE</text>
        </g>
        {/* Right-side score */}
        <g transform="translate(244 22)">
          <text x="0" y="0" textAnchor="middle" fill={accent} fontSize="5" letterSpacing="1.5" opacity="0.7" {...MONO}>FAIRNESS</text>
          <text x="0" y="16" textAnchor="middle" fill={accent} fontSize="12" letterSpacing="0.5" fontWeight="bold" {...MONO} style={{ filter: `drop-shadow(0 0 2px ${accent})` }}>0.62</text>
          <text x="0" y="30" textAnchor="middle" fill={accent} fontSize="5" letterSpacing="1.5" opacity="0.6" {...MONO}>BIASED</text>
        </g>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 10. AI-SaaS Chatbot — tenant grid + usage trend + quota meter + billing
// ─────────────────────────────────────────────────────────────────────────
function SaasSchematic({ accent }: SubProps) {
  const tenants = [
    { name: 'TENANT-001', msgs: 2840, status: 'ACTIVE' },
    { name: 'TENANT-002', msgs: 1207, status: 'ACTIVE' },
    { name: 'TENANT-003', msgs: 5132, status: 'ACTIVE' },
    { name: 'TENANT-004', msgs: 642, status: 'IDLE' },
  ];
  return (
    <svg viewBox="0 0 300 180" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Tenant grid (left 2x2) */}
      {tenants.map((t, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 14 + col * 84;
        const y = 16 + row * 56;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <rect width="78" height="48" fill={accent} fillOpacity="0.08" stroke={accent} strokeOpacity="0.85" strokeWidth="0.7" />
            <text x="6" y="11" fill={accent} fontSize="6" letterSpacing="1.5" {...MONO}>{t.name}</text>
            <text x="6" y="28" fill={accent} fontSize="11" letterSpacing="0.5" fontWeight="bold" {...MONO}>{t.msgs.toLocaleString()}</text>
            <text x="6" y="38" fill={accent} fontSize="5" letterSpacing="1.5" opacity="0.7" {...MONO}>MSG / 30D</text>
            <circle cx="70" cy="9" r="2.5" fill={accent} opacity={t.status === 'ACTIVE' ? '1' : '0.4'}>
              {t.status === 'ACTIVE' && <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" begin={`${i * 0.2}s`} />}
            </circle>
            {/* Mini sparkline */}
            <polyline
              points={`44,38 50,32 56,36 62,30 68,34 74,28`}
              fill="none"
              stroke={accent}
              strokeOpacity="0.8"
              strokeWidth="0.8"
            />
          </g>
        );
      })}

      {/* Usage trend chart (right) */}
      <g transform="translate(184 16)">
        <rect width="104" height="70" fill={accent} fillOpacity="0.05" stroke={accent} strokeOpacity="0.8" strokeWidth="0.7" />
        <text x="6" y="11" fill={accent} fontSize="6" letterSpacing="1.5" {...MONO}>USAGE · 30D</text>
        <text x="98" y="11" textAnchor="end" fill={accent} fontSize="6" letterSpacing="1" opacity="0.85" {...MONO}>+24.7%</text>
        {/* Y grid */}
        {[20, 36, 52].map(y => <line key={y} x1="6" y1={y} x2="98" y2={y} stroke={accent} strokeOpacity="0.1" strokeDasharray="2 4" />)}
        {/* Curve */}
        <polyline
          points="6,52 16,46 26,48 36,40 46,42 56,32 66,30 76,20 86,22 96,14"
          fill="none"
          stroke={accent}
          strokeWidth="1.4"
          strokeOpacity="0.95"
          style={{ filter: `drop-shadow(0 0 3px ${accent})` }}
        />
        {/* Filled area */}
        <polyline
          points="6,52 16,46 26,48 36,40 46,42 56,32 66,30 76,20 86,22 96,14 96,62 6,62"
          fill={accent}
          fillOpacity="0.15"
          stroke="none"
        />
        {/* Latest point glow */}
        <circle cx="96" cy="14" r="3" fill={accent}>
          <animate attributeName="opacity" values="1;0.4;1" dur="1.3s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Bottom usage meter + billing */}
      <g transform="translate(14 132)">
        <rect width="274" height="36" fill={accent} fillOpacity="0.06" stroke={accent} strokeOpacity="0.55" strokeWidth="0.6" />
        <text x="6" y="11" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.85" {...MONO}>QUOTA · STRIPE BILLING</text>
        <text x="268" y="11" textAnchor="end" fill={accent} fontSize="6" letterSpacing="1" opacity="0.85" {...MONO}>$4,247 MRR</text>
        <rect x="6" y="18" width="262" height="6" fill={accent} fillOpacity="0.1" stroke={accent} strokeOpacity="0.5" strokeWidth="0.5" />
        <rect x="6" y="18" width="167" height="6" fill={accent} fillOpacity="0.9" style={{ filter: `drop-shadow(0 0 3px ${accent})` }} />
        <text x="6" y="32" fill={accent} fontSize="5" letterSpacing="1.5" opacity="0.7" {...MONO}>63.7% CONSUMED · 9.5K MSG/MO LIMIT</text>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 11. ML Data Cleaning — data sources → pipeline → feature column → model
// ─────────────────────────────────────────────────────────────────────────
function PipelineSchematic({ accent }: SubProps) {
  return (
    <svg viewBox="0 0 300 180" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Header */}
      <text x="14" y="14" fill={accent} fontSize="6" letterSpacing="2" opacity="0.85" {...MONO}>AUTOMATED ML PIPELINE</text>

      {/* Data sources (left) — cluttered cubes */}
      <g transform="translate(14 22)">
        {[
          [0, 0], [12, 4], [24, 0], [6, 14], [18, 18], [30, 14],
          [4, 28], [18, 32], [28, 30], [10, 42], [22, 46], [32, 42],
        ].map(([x, y], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width="8"
            height="8"
            fill={accent}
            fillOpacity={0.18 + (i % 4) * 0.15}
            stroke={accent}
            strokeOpacity="0.55"
            strokeWidth="0.4"
          />
        ))}
        <text x="22" y="68" textAnchor="middle" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.75" {...MONO}>RAW · 14.2K</text>
      </g>

      {/* Process arrows + labels (center) */}
      <g transform="translate(64 22)">
        {['CLEAN', 'IMPUTE', 'OUTLIERS', 'DEDUPE'].map((step, i) => (
          <g key={step} transform={`translate(0 ${i * 14})`}>
            <line x1="0" y1="6" x2="58" y2="6" stroke={accent} strokeOpacity="0.7" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" from="0" to="-12" dur={`${1.4 + i * 0.2}s`} repeatCount="indefinite" />
            </line>
            <polygon points="54,3 58,6 54,9" fill={accent} fillOpacity="0.85" />
            <text x="29" y="4" textAnchor="middle" fill={accent} fontSize="6" letterSpacing="1.5" {...MONO}>{step}</text>
          </g>
        ))}
      </g>

      {/* Feature selection column (center-right) — neural network */}
      <g transform="translate(132 14)">
        <text x="14" y="6" textAnchor="middle" fill={accent} fontSize="5" letterSpacing="1.5" opacity="0.85" {...MONO}>FEATURES</text>
        {Array.from({ length: 8 }).map((_, i) => {
          const y = 12 + i * 9;
          const active = i === 1 || i === 3 || i === 5;
          return (
            <g key={i}>
              <circle cx="14" cy={y} r="3.5" fill={accent} fillOpacity={active ? '0.95' : '0.18'} stroke={accent} strokeOpacity="0.85" strokeWidth="0.5" style={active ? { filter: `drop-shadow(0 0 2px ${accent})` } : undefined} />
              {active && (
                <circle cx="14" cy={y} r="6" fill="none" stroke={accent} strokeWidth="0.6">
                  <animate attributeName="r" values="3.5;7;3.5" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.8;0;0.8" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}
        {/* RFE / LASSO labels */}
        <text x="14" y="98" textAnchor="middle" fill={accent} fontSize="5" letterSpacing="1.5" opacity="0.7" {...MONO}>RFE</text>
        <text x="14" y="108" textAnchor="middle" fill={accent} fontSize="5" letterSpacing="1.5" opacity="0.7" {...MONO}>LASSO</text>
      </g>

      {/* Connecting lines from process to features */}
      {[12, 26, 40, 54, 68].map((y, i) => (
        <line
          key={i}
          x1="124"
          y1={y + 22}
          x2="146"
          y2={20 + i * 14}
          stroke={accent}
          strokeOpacity="0.4"
          strokeWidth="0.5"
          strokeDasharray="1 2"
        />
      ))}

      {/* Model training (right) */}
      <g transform="translate(184 22)">
        <rect width="100" height="86" fill={accent} fillOpacity="0.06" stroke={accent} strokeOpacity="0.85" strokeWidth="0.7" />
        <text x="6" y="11" fill={accent} fontSize="6" letterSpacing="1.5" {...MONO}>MODEL TRAINING</text>
        {/* Training loss curve */}
        <polyline
          points="6,30 14,32 22,28 30,22 38,24 46,18 54,20 62,14 70,16 78,12 86,14 92,10"
          fill="none"
          stroke={accent}
          strokeWidth="1.4"
          strokeOpacity="0.95"
          style={{ filter: `drop-shadow(0 0 3px ${accent})` }}
        />
        {/* Accuracy line below */}
        <polyline
          points="6,68 14,66 22,62 30,58 38,56 46,52 54,50 62,46 70,44 78,42 86,40 92,38"
          fill="none"
          stroke={accent}
          strokeWidth="1"
          strokeOpacity="0.55"
          strokeDasharray="2 2"
        />
        <text x="6" y="46" fill={accent} fontSize="5" letterSpacing="1" opacity="0.7" {...MONO}>LOSS ↓</text>
        <text x="92" y="80" textAnchor="end" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.85" {...MONO}>XGB · 94.2%</text>
      </g>

      <text x="14" y="170" fill={accent} fontSize="6" letterSpacing="2" opacity="0.7" {...MONO}>TRAIN TIME ↓ 50% · ACCURACY MAINTAINED</text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 12. Weather — 7-day strip + current card + historical graph + alert + map
// ─────────────────────────────────────────────────────────────────────────
function WeatherSchematic({ accent }: SubProps) {
  const days = [
    { d: 'TODAY', t: 72, icon: 'sun' },
    { d: 'MON', t: 75, icon: 'sun' },
    { d: 'TUE', t: 78, icon: 'cloud' },
    { d: 'WED', t: 73, icon: 'cloud' },
    { d: 'THU', t: 70, icon: 'rain' },
    { d: 'FRI', t: 76, icon: 'sun' },
    { d: 'SAT', t: 79, icon: 'sun' },
  ];
  return (
    <svg viewBox="0 0 300 180" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Top: 7-day forecast strip */}
      <g transform="translate(14 14)">
        <rect width="272" height="32" rx="3" fill={accent} fillOpacity="0.08" stroke={accent} strokeOpacity="0.8" strokeWidth="0.7" />
        {days.map((d, i) => {
          const x = 6 + i * 38;
          const active = i === 1; // MON highlighted
          return (
            <g key={d.d} transform={`translate(${x} 4)`}>
              {active && <rect width="34" height="24" rx="3" fill={accent} fillOpacity="0.32" stroke={accent} strokeOpacity="0.95" strokeWidth="0.6" />}
              <text x="17" y="8" textAnchor="middle" fill={accent} fontSize="5" letterSpacing="1.5" opacity={active ? '1' : '0.7'} {...MONO}>{d.d}</text>
              {/* Icon glyph */}
              <g transform={`translate(17 14)`}>
                {d.icon === 'sun' && <circle r="2.4" fill={accent} fillOpacity={active ? '0.95' : '0.65'} />}
                {d.icon === 'cloud' && <ellipse rx="3.2" ry="1.6" fill={accent} fillOpacity={active ? '0.95' : '0.65'} />}
                {d.icon === 'rain' && (
                  <>
                    <ellipse rx="3" ry="1.4" fill={accent} fillOpacity={active ? '0.85' : '0.5'} />
                    <line x1="-1" y1="2" x2="-1" y2="5" stroke={accent} strokeWidth="0.5" />
                    <line x1="1" y1="2" x2="1" y2="5" stroke={accent} strokeWidth="0.5" />
                  </>
                )}
              </g>
              <text x="17" y="23" textAnchor="middle" fill={accent} fontSize="6" letterSpacing="0.5" fontWeight={active ? 'bold' : 'normal'} {...MONO} opacity={active ? '1' : '0.85'}>{d.t}°</text>
            </g>
          );
        })}
      </g>

      {/* Left: phone mockup with historical temp curve */}
      <g transform="translate(14 56)">
        <rect width="58" height="80" rx="6" fill={accent} fillOpacity="0.05" stroke={accent} strokeOpacity="0.85" strokeWidth="0.8" />
        {/* Notch */}
        <rect x="23" y="3" width="12" height="2" rx="1" fill={accent} fillOpacity="0.5" />
        <text x="29" y="14" textAnchor="middle" fill={accent} fontSize="5" letterSpacing="1.5" opacity="0.85" {...MONO}>HIST · TEMP</text>
        {/* Curve */}
        <polyline
          points="6,40 14,36 22,42 30,30 38,34 46,26 52,30"
          fill="none"
          stroke={accent}
          strokeWidth="1.2"
          strokeOpacity="0.95"
          style={{ filter: `drop-shadow(0 0 2px ${accent})` }}
        />
        {/* Points */}
        {[[6, 40], [14, 36], [22, 42], [30, 30], [38, 34], [46, 26], [52, 30]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill={accent} />
        ))}
        {/* Mini bars at bottom */}
        {[0, 1, 2, 3, 4, 5, 6].map(i => (
          <rect key={i} x={6 + i * 7} y={56 + (i % 3)} width="4" height={8 - (i % 3) * 2} fill={accent} fillOpacity="0.55" />
        ))}
        <text x="29" y="72" textAnchor="middle" fill={accent} fontSize="5" letterSpacing="1" opacity="0.7" {...MONO}>7-DAY</text>
      </g>

      {/* Center: current temperature card */}
      <g transform="translate(80 56)">
        <rect width="124" height="80" rx="4" fill={accent} fillOpacity="0.1" stroke={accent} strokeOpacity="0.95" strokeWidth="0.8" />
        <text x="8" y="14" fill={accent} fontSize="5" letterSpacing="1.5" opacity="0.75" {...MONO}>SAN FRANCISCO · NOW</text>
        <text x="8" y="44" fill={accent} fontSize="26" letterSpacing="0.5" fontWeight="bold" {...MONO} style={{ filter: `drop-shadow(0 0 4px ${accent})` }}>72°</text>
        <text x="8" y="56" fill={accent} fontSize="6" letterSpacing="1.5" opacity="0.85" {...MONO}>PARTLY CLOUDY</text>
        <text x="8" y="68" fill={accent} fontSize="5" letterSpacing="1" opacity="0.65" {...MONO}>H:78°  L:64°  WIND 8MPH</text>

        {/* Sun + cloud glyph (right of card) */}
        <g transform="translate(98 22)">
          <circle r="9" fill={accent} fillOpacity="0.3" stroke={accent} strokeOpacity="0.95" strokeWidth="0.8" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * Math.PI) / 4;
            const x1 = +(Math.cos(a) * 11).toFixed(2);
            const y1 = +(Math.sin(a) * 11).toFixed(2);
            const x2 = +(Math.cos(a) * 14).toFixed(2);
            const y2 = +(Math.sin(a) * 14).toFixed(2);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeOpacity="0.85" strokeWidth="0.7" />;
          })}
          <ellipse cx="14" cy="6" rx="10" ry="4" fill={accent} fillOpacity="0.55" />
        </g>
      </g>

      {/* Right: map preview + alert */}
      <g transform="translate(212 56)">
        <rect width="76" height="44" fill={accent} fillOpacity="0.06" stroke={accent} strokeOpacity="0.8" strokeWidth="0.7" />
        <text x="6" y="10" fill={accent} fontSize="5" letterSpacing="1.5" opacity="0.85" {...MONO}>LOCATION</text>
        {/* Faux streets */}
        <g stroke={accent} strokeOpacity="0.35" strokeWidth="0.6">
          <line x1="6" y1="20" x2="70" y2="20" />
          <line x1="6" y1="28" x2="70" y2="28" />
          <line x1="6" y1="36" x2="70" y2="36" />
          <line x1="20" y1="14" x2="20" y2="42" />
          <line x1="40" y1="14" x2="40" y2="42" />
          <line x1="58" y1="14" x2="58" y2="42" />
        </g>
        {/* Pin */}
        <g transform="translate(40 30)">
          <circle r="4" fill={accent} stroke={accent} strokeWidth="0.5" style={{ filter: `drop-shadow(0 0 3px ${accent})` }} />
          <circle r="1.5" fill="#0b0e1a" />
          <circle r="7" fill="none" stroke={accent} strokeWidth="0.5">
            <animate attributeName="r" values="4;10;4" dur="2s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>
      {/* Alert badge */}
      <g transform="translate(212 106)">
        <rect width="76" height="30" rx="3" fill={accent} fillOpacity="0.18" stroke={accent} strokeOpacity="0.95" strokeWidth="0.7" />
        <g transform="translate(6 7)">
          <polygon points="0,12 6,0 12,12" fill={accent} fillOpacity="0.85" />
          <text x="6" y="10" textAnchor="middle" fill="#0b0e1a" fontSize="8" fontWeight="bold" {...MONO}>!</text>
        </g>
        <text x="24" y="12" fill={accent} fontSize="5" letterSpacing="1.5" {...MONO}>SEVERE</text>
        <text x="24" y="22" fill={accent} fontSize="5" letterSpacing="1" opacity="0.85" {...MONO}>THUNDERSTORM</text>
      </g>

      {/* OpenWeather meta bottom */}
      <text x="14" y="170" fill={accent} fontSize="6" letterSpacing="2" opacity="0.55" {...MONO}>OPENWEATHER · CHART.JS · 99.9% UPTIME</text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Default fallback
// ─────────────────────────────────────────────────────────────────────────
function DefaultSchematic({ accent }: SubProps) {
  return (
    <svg viewBox="0 0 300 180" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
      <g transform="translate(150 90)">
        {[60, 45, 30, 18].map((r, i) => (
          <circle
            key={r}
            cx="0"
            cy="0"
            r={r}
            fill="none"
            stroke={accent}
            strokeOpacity={0.55 - i * 0.1}
            strokeWidth={0.8}
            strokeDasharray={i % 2 === 0 ? '4 4' : '2 6'}
          />
        ))}
        <polygon points="0,-22 19,11 -19,11" fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.85" />
        <circle cx="0" cy="0" r="4" fill={accent}>
          <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}
