'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SECURITY_SKILLS, SECURITY_LEARNING } from '../../lib/resumeData';

const ACCENT = '#10B981';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function GlassCard({ children, style = {}, hoverAccent = ACCENT }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
        transition: 'border-color 0.25s, box-shadow 0.25s',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${hoverAccent}30`;
        e.currentTarget.style.boxShadow = `0 0 30px ${hoverAccent}10`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {children}
    </div>
  );
}

// ── SVG Radar Chart ──────────────────────────────────────────────────
function RadarChart() {
  const AXES = [
    { label: 'Security Fundamentals', value: 75 },
    { label: 'AI for Security', value: 85 },
    { label: 'Systems & Networking', value: 60 },
    { label: 'Programming', value: 80 },
  ];

  const SIZE = 240;
  const CENTER = SIZE / 2;
  const RADIUS = 88;
  const n = AXES.length;
  const angleStep = (2 * Math.PI) / n;
  const startAngle = -Math.PI / 2;

  const getPoint = (i, r) => {
    const angle = startAngle + i * angleStep;
    return [CENTER + r * Math.cos(angle), CENTER + r * Math.sin(angle)];
  };

  const gridLevels = [25, 50, 75, 100];
  const dataPoints = AXES.map((a, i) => getPoint(i, (a.value / 100) * RADIUS));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ') + ' Z';

  return (
    <GlassCard style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: ACCENT, letterSpacing: '0.15em', marginBottom: '20px', alignSelf: 'flex-start' }}>COMPETENCY MAP</p>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ overflow: 'visible' }}>
        {gridLevels.map(level => (
          <polygon
            key={level}
            points={Array.from({ length: n }, (_, i) => {
              const [x, y] = getPoint(i, (level / 100) * RADIUS);
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke="rgba(16,185,129,0.12)"
            strokeWidth="1"
          />
        ))}
        {AXES.map((_, i) => {
          const [x, y] = getPoint(i, RADIUS);
          return <line key={i} x1={CENTER} y1={CENTER} x2={x} y2={y} stroke="rgba(16,185,129,0.15)" strokeWidth="1" />;
        })}
        <motion.path
          d={dataPath}
          fill="rgba(16,185,129,0.15)"
          stroke={ACCENT}
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        {dataPoints.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" fill={ACCENT} style={{ filter: `drop-shadow(0 0 4px ${ACCENT})` }} />
        ))}
        {AXES.map((a, i) => {
          const [x, y] = getPoint(i, RADIUS + 22);
          return (
            <text key={i} x={x} y={y} textAnchor={x < CENTER - 5 ? 'end' : x > CENTER + 5 ? 'start' : 'middle'} dominantBaseline="middle"
              style={{ fontFamily: 'monospace', fontSize: '10px', fill: '#6B7280' }}>
              {a.label}
            </text>
          );
        })}
      </svg>
    </GlassCard>
  );
}

// ── Incident cards ──────────────────────────────────────────────────
const SEV_COLORS = {
  HIGH:   { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', text: '#EF4444' },
  MEDIUM: { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', text: '#FBBF24' },
};

const SEC_PROJECTS = [
  { name: 'AI Phishing Detection Engine', severity: 'HIGH', cat: 'THREAT DETECTION', tech: 'Python · ML · NLP · React.js', desc: 'ML+NLP classifier for real-time phishing URL detection. Enterprise REST API + React threat dashboard.', github: 'https://github.com/Rahul1613/AI-POWERED-PHISHING-DETECTION-ENGINE-ENTERPRISE-ACTIVE', live: 'https://phishing-detection-ai-powered.netlify.app' },
  { name: 'SecurePass AI', severity: 'MEDIUM', cat: 'CREDENTIAL SECURITY', tech: 'Python · AI · Cryptography', desc: 'AI password strength analyzer with entropy scoring and client-side cryptography.', github: 'https://github.com/Rahul1613/SecurePass-AI-', live: 'https://securepass-ai.netlify.app' },
  { name: 'Image Steganography Tool', severity: 'MEDIUM', cat: 'COVERT CHANNEL', tech: 'Python · Image Processing', desc: 'LSB-based data hiding in images with zero visual degradation of carrier images.', github: 'https://github.com/Rahul1613', live: null },
];

function IncidentCard({ project }) {
  const sev = SEV_COLORS[project.severity];
  return (
    <GlassCard style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
      {/* Scan line animation */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', borderRadius: 'inherit' }}>
        <style>{`@keyframes scanCard { 0% { top: -2px; } 100% { top: 102%; } }`}</style>
        <div style={{ position: 'absolute', left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${ACCENT}50, transparent)`, animation: 'scanCard 3s linear infinite' }} />
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', padding: '3px 8px', borderRadius: '4px', background: sev.bg, border: `1px solid ${sev.border}`, color: sev.text }}>{project.severity}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.18)', color: ACCENT }}>{project.cat}</span>
      </div>

      <h4 style={{ fontFamily: 'var(--font-grotesk, var(--font-body))', fontSize: '15px', fontWeight: '600', color: '#F2F3F5', marginBottom: '4px' }}>{project.name}</h4>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#4B5563', marginBottom: '10px' }}>{project.tech}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginBottom: '14px', lineHeight: 1.6 }}>{project.desc}</p>

      <div style={{ display: 'flex', gap: '8px' }}>
        <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: ACCENT, textDecoration: 'none', padding: '4px 10px', border: `1px solid ${ACCENT}30`, borderRadius: '5px' }}>GitHub ↗</a>
        {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#34D399', textDecoration: 'none', padding: '4px 10px', border: '1px solid rgba(52,211,153,0.25)', borderRadius: '5px' }}>Live ↗</a>}
      </div>
    </GlassCard>
  );
}

// ── Mission HUD ──────────────────────────────────────────────────
function MissionHUD() {
  return (
    <GlassCard style={{ padding: '28px', marginBottom: '48px', position: 'relative' }} hoverAccent={ACCENT}>
      {/* Corner brackets */}
      {[['top:10px','left:10px','borderTop','borderLeft'], ['top:10px','right:10px','borderTop','borderRight'], ['bottom:10px','left:10px','borderBottom','borderLeft'], ['bottom:10px','right:10px','borderBottom','borderRight']].map(([a, b, c, d], i) => (
        <div key={i} style={{ position: 'absolute', [a.split(':')[0]]: a.split(':')[1], [b.split(':')[0]]: b.split(':')[1], width: '12px', height: '12px', [c]: `1px solid ${ACCENT}`, [d]: `1px solid ${ACCENT}` }} />
      ))}
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: ACCENT, letterSpacing: '0.18em', marginBottom: '20px' }}>// MISSION OBJECTIVE</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[
          { priority: 'PRIMARY', label: 'SOC Analyst L1 (Entry Level)', sub: 'Threat monitoring · Incident response · Security ops', color: '#EF4444' },
          { priority: 'SECONDARY', label: "Master's in Cybersecurity — Japan", sub: 'Planned: 2026–2028 · Advanced specialization', color: '#FBBF24' },
        ].map(obj => (
          <div key={obj.priority} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: obj.color, minWidth: '72px', paddingTop: '3px', letterSpacing: '0.1em' }}>{obj.priority}</span>
            <div>
              <p style={{ fontFamily: 'var(--font-grotesk, var(--font-body))', fontSize: '15px', fontWeight: '600', color: '#F2F3F5' }}>{obj.label}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#4B5563', marginTop: '2px' }}>{obj.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Currently learning */}
      <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#4B5563', letterSpacing: '0.15em', marginBottom: '10px' }}>CURRENTLY STUDYING</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {[
            { label: 'Network Security Basics', done: false },
            { label: 'TryHackMe SOC Level 1', done: false },
            { label: 'OPSWAT Academy', done: true },
          ].map(item => (
            <span key={item.label} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '4px 10px', borderRadius: '5px', background: item.done ? 'rgba(16,185,129,0.1)' : 'rgba(251,191,36,0.08)', color: item.done ? ACCENT : '#FBBF24', border: `1px solid ${item.done ? ACCENT + '25' : 'rgba(251,191,36,0.2)'}` }}>
              {item.done ? '✓ ' : '⏳ '}{item.label}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

// ── Ticker ──────────────────────────────────────────────────
function Ticker() {
  const doubled = [...SECURITY_LEARNING, ...SECURITY_LEARNING];
  return (
    <div style={{ overflow: 'hidden', marginBottom: '48px', padding: '14px 0', borderTop: '1px solid rgba(16,185,129,0.08)', borderBottom: '1px solid rgba(16,185,129,0.08)' }}>
      <style>{`@keyframes tickerRun { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      <div style={{ display: 'flex', animation: 'tickerRun 22s linear infinite', width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#34D399', marginRight: '48px', whiteSpace: 'nowrap' }}>
            {'/'} {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Security Skills ──────────────────────────────────────────────────
function SecuritySkills() {
  const catConfig = {
    tools:          { label: '🔧 Tools',          color: ACCENT },
    programming:    { label: '💻 Programming',    color: '#34D399' },
    ai_security:    { label: '🤖 AI / Security',  color: '#6EE7B7' },
    certifications: { label: '📜 Certifications', color: '#FBBF24' },
  };
  return (
    <motion.div variants={fadeUp} style={{ marginBottom: '60px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4B5563', letterSpacing: '0.18em', marginBottom: '8px' }}>CAPABILITIES</p>
      <h3 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: '700', color: '#F2F3F5', letterSpacing: '-0.02em', marginBottom: '28px' }}>Security Stack</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
        {Object.entries(SECURITY_SKILLS).map(([cat, skills]) => {
          const cfg = catConfig[cat];
          return (
            <GlassCard key={cat} style={{ padding: '18px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: cfg.color, letterSpacing: '0.15em', marginBottom: '12px' }}>{cfg.label}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skills.map(s => (
                  <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '4px 10px', borderRadius: '5px', background: `${cfg.color}08`, border: `1px solid ${cfg.color}20`, color: cfg.color }}>
                    {s}
                  </span>
                ))}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function SecurityZone({ highlighted }) {
  return (
    <section
      id="security-zone"
      style={{
        background: '#070809',
        padding: '80px 5vw',
        borderTop: `1px solid ${highlighted ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.04)'}`,
        position: 'relative',
      }}
    >
      {/* Subtle scanline texture */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, rgba(16,185,129,0.008) 0px, transparent 1px, transparent 3px)', backgroundSize: '100% 4px', pointerEvents: 'none' }} />
      {highlighted && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}66, transparent)` }} />}

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '52px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: ACCENT, letterSpacing: '0.2em' }}>PATH 03 — SECURITY ANALYST</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: '800', color: '#F2F3F5', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '64px' }}>
          Security<br /><span style={{ color: '#374151' }}>Analyst.</span>
        </motion.h2>

        {/* Bento top row: Radar + Mission */}
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '16px', marginBottom: '48px' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <RadarChart />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <MissionHUD />
          </motion.div>
        </div>

        <Ticker />

        {/* Incident cards */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '48px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4B5563', letterSpacing: '0.18em', marginBottom: '8px' }}>INCIDENT REPORTS</p>
          <h3 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: '700', color: '#F2F3F5', letterSpacing: '-0.02em', marginBottom: '24px' }}>Security Projects</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {SEC_PROJECTS.map(p => <IncidentCard key={p.name} project={p} />)}
          </div>
        </motion.div>

        <SecuritySkills />
      </div>
    </section>
  );
}
