'use client';

interface ArcReactorProps {
  size?: number;
  className?: string;
  intensity?: number;
  showHexCore?: boolean;
  showDegrees?: boolean;
  showCrosshair?: boolean;
}

const ACCENT = '#00d4ff';
const GOLD = '#fbbf24';

export default function ArcReactor({
  size = 320,
  className = '',
  intensity = 0.7,
  showHexCore = true,
  showDegrees = true,
  showCrosshair = true,
}: ArcReactorProps) {
  const half = size / 2;

  // Build hexagon path
  const hexRadius = size * 0.13;
  const hexPath = Array.from({ length: 6 })
    .map((_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const x = half + Math.cos(angle) * hexRadius;
      const y = half + Math.sin(angle) * hexRadius;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ') + ' Z';

  return (
    <div
      className={`relative pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Outer dashed scan ring */}
      <div className="absolute inset-0 animate-rotate-slow" style={{ animationDuration: '46s' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <circle
            cx={half}
            cy={half}
            r={half - 4}
            stroke={ACCENT}
            strokeOpacity={0.28 * intensity}
            strokeWidth="0.8"
            strokeDasharray="4 10"
          />
          {/* Heavy active arc segment */}
          <circle
            cx={half}
            cy={half}
            r={half - 4}
            stroke={ACCENT}
            strokeOpacity={0.6 * intensity}
            strokeWidth="1.5"
            strokeDasharray="80 280"
            style={{ filter: `drop-shadow(0 0 8px ${ACCENT})` }}
          />
        </svg>
      </div>

      {/* Outer cardinal degree marks (0°, 90°, 180°, 270°) */}
      {showDegrees && (
        <div className="absolute inset-0">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
            <g stroke={ACCENT} strokeOpacity={0.65 * intensity} strokeWidth="1.4">
              {[0, 90, 180, 270].map(deg => {
                const rad = ((deg - 90) * Math.PI) / 180;
                const inner = half - 18;
                const outer = half - 8;
                const x1 = half + Math.cos(rad) * inner;
                const y1 = half + Math.sin(rad) * inner;
                const x2 = half + Math.cos(rad) * outer;
                const y2 = half + Math.sin(rad) * outer;
                return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} />;
              })}
            </g>
            {/* Cardinal labels */}
            <g
              fill={ACCENT}
              fillOpacity={0.7 * intensity}
              fontSize={size > 280 ? 9 : 7}
              fontFamily="'Courier New', monospace"
              textAnchor="middle"
            >
              <text x={half} y={20}>000</text>
              <text x={size - 10} y={half + 3}>090</text>
              <text x={half} y={size - 8}>180</text>
              <text x={10} y={half + 3}>270</text>
            </g>
          </svg>
        </div>
      )}

      {/* Tick marks ring (36 marks every 10°) */}
      <div className="absolute inset-0">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <g stroke={ACCENT} strokeOpacity={0.55 * intensity}>
            {Array.from({ length: 72 }).map((_, i) => {
              const angle = (i * 5 * Math.PI) / 180;
              const isMajor = i % 6 === 0;
              const inner = half - (isMajor ? 36 : 32);
              const outer = half - 26;
              const x1 = half + Math.cos(angle) * inner;
              const y1 = half + Math.sin(angle) * inner;
              const x2 = half + Math.cos(angle) * outer;
              const y2 = half + Math.sin(angle) * outer;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  strokeWidth={isMajor ? 1.4 : 0.6}
                  strokeOpacity={(isMajor ? 0.9 : 0.4) * intensity}
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* Reverse rotating dashed inner ring */}
      <div className="absolute inset-0 animate-rotate-slow-reverse" style={{ animationDuration: '22s' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <circle
            cx={half}
            cy={half}
            r={half - 48}
            stroke={ACCENT}
            strokeOpacity={0.55 * intensity}
            strokeWidth="0.8"
            strokeDasharray="2 14"
          />
        </svg>
      </div>

      {/* Gold accent arcs (intensity highlight) */}
      <div className="absolute inset-0 animate-rotate-slow" style={{ animationDuration: '14s' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <circle
            cx={half}
            cy={half}
            r={half - 60}
            stroke={GOLD}
            strokeOpacity={0.6 * intensity}
            strokeWidth="1.4"
            strokeDasharray="36 220"
            style={{ filter: `drop-shadow(0 0 6px ${GOLD})` }}
          />
          <circle
            cx={half}
            cy={half}
            r={half - 60}
            stroke={GOLD}
            strokeOpacity={0.5 * intensity}
            strokeWidth="1.2"
            strokeDasharray="36 220"
            strokeDashoffset="-160"
          />
        </svg>
      </div>

      {/* Orbiting data dots (3 dots on the outer ring) */}
      <div className="absolute inset-0 animate-rotate-slow" style={{ animationDuration: '20s' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <g>
            {[0, 120, 240].map(deg => {
              const rad = ((deg - 90) * Math.PI) / 180;
              const r = half - 4;
              const cx = half + Math.cos(rad) * r;
              const cy = half + Math.sin(rad) * r;
              return (
                <circle
                  key={deg}
                  cx={cx}
                  cy={cy}
                  r={2.5}
                  fill={ACCENT}
                  fillOpacity={0.95 * intensity}
                  style={{ filter: `drop-shadow(0 0 6px ${ACCENT})` }}
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* Orbiting gold dot on accent ring */}
      <div className="absolute inset-0 animate-rotate-slow-reverse" style={{ animationDuration: '11s' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <circle
            cx={half}
            cy={half - (half - 60)}
            r={3}
            fill={GOLD}
            fillOpacity={0.9 * intensity}
            style={{ filter: `drop-shadow(0 0 8px ${GOLD})` }}
          />
        </svg>
      </div>

      {/* Cross-hair guides */}
      {showCrosshair && (
        <div className="absolute inset-0">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
            <g stroke={ACCENT} strokeOpacity={0.18 * intensity} strokeWidth="0.5" strokeDasharray="2 6">
              <line x1={0} y1={half} x2={half - 70} y2={half} />
              <line x1={half + 70} y1={half} x2={size} y2={half} />
              <line x1={half} y1={0} x2={half} y2={half - 70} />
              <line x1={half} y1={half + 70} x2={half} y2={size} />
            </g>
          </svg>
        </div>
      )}

      {/* Inner solid power ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="rounded-full"
          style={{
            width: size * 0.42,
            height: size * 0.42,
            border: `1px solid ${ACCENT}99`,
            boxShadow: `inset 0 0 28px ${ACCENT}55, 0 0 32px ${ACCENT}55`,
          }}
        />
      </div>

      {/* Hex core */}
      {showHexCore && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
            <path
              d={hexPath}
              stroke={ACCENT}
              strokeOpacity={0.5 * intensity}
              strokeWidth="1"
              fill={`${ACCENT}10`}
              style={{ filter: `drop-shadow(0 0 4px ${ACCENT})` }}
            />
          </svg>
        </div>
      )}

      {/* Central glowing core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="rounded-full animate-pulse-glow"
          style={{
            width: size * 0.16,
            height: size * 0.16,
            background: `radial-gradient(circle, #ffffff 0%, ${ACCENT} 40%, transparent 80%)`,
            filter: `blur(1.5px)`,
          }}
        />
      </div>
    </div>
  );
}
