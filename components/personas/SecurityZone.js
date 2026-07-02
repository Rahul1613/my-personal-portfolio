'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, SECURITY_SKILLS, SECURITY_LEARNING } from '../../lib/resumeData';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ── Radar / Spider Chart (pure SVG) ──────────────────────────────────────────────────
function RadarChart() {
  const canvasRef = useRef(null);
  const AXES = [
    { label: 'Security Fundamentals', value: 75 },
    { label: 'AI for Security',        value: 85 },
    { label: 'Systems & Networking',   value: 60 },
    { label: 'Programming',            value: 80 },
  ];

  const SIZE = 220;
  const CENTER = SIZE / 2;
  const RADIUS = 80;
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
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '80px' }}
    >
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#10B981', letterSpacing: '0.2em', marginBottom: '8px' }}>
        // SKILL RADAR
      </p>
      <h3 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(28px, 4vw, 48px)', color: '#F2F3F5', marginBottom: '32px', fontWeight: '700' }}>
        Competency Map
      </h3>

      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ overflow: 'visible' }}>
        {/* Grid circles */}
        {gridLevels.map(level => (
          <polygon
            key={level}
            points={Array.from({ length: n }, (_, i) => {
              const [x, y] = getPoint(i, (level / 100) * RADIUS);
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke="rgba(16,185,129,0.15)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {AXES.map((_, i) => {
          const [x, y] = getPoint(i, RADIUS);
          return <line key={i} x1={CENTER} y1={CENTER} x2={x} y2={y} stroke="rgba(16,185,129,0.2)" strokeWidth="1" />;
        })}

        {/* Data polygon */}
        <motion.path
          d={dataPath}
          fill="rgba(16,185,129,0.2)"
          stroke="#10B981"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        {/* Data points */}
        {dataPoints.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" fill="#10B981" style={{ filter: 'drop-shadow(0 0 4px #10B981)' }} />
        ))}

        {/* Labels */}
        {AXES.map((a, i) => {
          const [x, y] = getPoint(i, RADIUS + 24);
          const anchor = x < CENTER - 5 ? 'end' : x > CENTER + 5 ? 'start' : 'middle';
          return (
            <text key={i} x={x} y={y} textAnchor={anchor} dominantBaseline="middle"
              style={{ fontFamily: 'monospace', fontSize: '10px', fill: '#6B7280' }}>
              {a.label}
            </text>
          );
        })}
      </svg>
    </motion.div>
  );
}

// ── Incident Report Cards ──────────────────────────────────────────────────
const SEVERITY_COLORS = {
  HIGH:     { bg: 'rgba(239,68,68,0.15)',   border: 'rgba(239,68,68,0.4)',   text: '#EF4444' },
  MEDIUM:   { bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.35)', text: '#FBBF24' },
  CRITICAL: { bg: 'rgba(239,68,68,0.2)',    border: 'rgba(239,68,68,0.6)',   text: '#FF4444' },
};

const SEC_PROJECTS = [
  {
    id: 'phishing',
    name: 'AI Phishing Detection Engine',
    severity: 'HIGH',
    category: 'THREAT DETECTION',
    desc: 'Enterprise-grade ML+NLP classifier for real-time phishing URL detection. REST API inference pipeline + React.js threat dashboard.',
    github: 'https://github.com/Rahul1613/AI-POWERED-PHISHING-DETECTION-ENGINE-ENTERPRISE-ACTIVE',
    live: 'https://phishing-detection-ai-powered.netlify.app',
    tech: 'Python · ML · NLP · React.js',
  },
  {
    id: 'securepass',
    name: 'SecurePass AI',
    severity: 'MEDIUM',
    category: 'CREDENTIAL SECURITY',
    desc: 'AI-driven password strength analyzer with real-time entropy scoring, client-side cryptography, and ML-generated hardened suggestions.',
    github: 'https://github.com/Rahul1613/SecurePass-AI-',
    live: 'https://securepass-ai.netlify.app',
    tech: 'Python · AI · Cryptography · React.js',
  },
  {
    id: 'stego',
    name: 'Image Steganography Tool',
    severity: 'MEDIUM',
    category: 'COVERT CHANNEL',
    desc: 'LSB-based data hiding in images demonstrating information concealment techniques with zero visual degradation of carrier images.',
    github: 'https://github.com/Rahul1613',
    live: null,
    tech: 'Python · Image Processing · Cryptography',
  },
];

function ScanLine() {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: 'inherit',
    }}>
      <style>{`
        @keyframes scan { 0% { top: -2px; } 100% { top: 100%; } }
        .scan-line { position: absolute; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent); animation: scan 2s linear infinite; }
      `}</style>
      <div className="scan-line" />
    </div>
  );
}

function IncidentCard({ project }) {
  const sev = SEVERITY_COLORS[project.severity];

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ borderColor: 'rgba(16,185,129,0.4)', boxShadow: '0 0 28px rgba(16,185,129,0.1)' }}
      style={{
        background: '#0E1512', border: '1px solid rgba(16,185,129,0.15)',
        borderRadius: '12px', padding: '24px', position: 'relative', overflow: 'hidden',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      className="incident-card"
    >
      <ScanLine />

      {/* Header tags */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '3px 10px', borderRadius: '4px', background: sev.bg, border: `1px solid ${sev.border}`, color: sev.text }}>
          {project.severity}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '3px 10px', borderRadius: '4px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#10B981' }}>
          {project.category}
        </span>
      </div>

      <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', color: '#F2F3F5', marginBottom: '8px', fontWeight: '600' }}>
        {project.name}
      </h4>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#6B7280', marginBottom: '12px' }}>
        {project.tech}
      </p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9CA3AF', marginBottom: '16px', lineHeight: 1.6 }}>
        {project.desc}
      </p>

      <div style={{ display: 'flex', gap: '8px' }}>
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#10B981', textDecoration: 'none', padding: '4px 10px', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '4px' }}>
          GitHub ↗
        </a>
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#34D399', textDecoration: 'none', padding: '4px 10px', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '4px' }}>
            Live ↗
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ── Mission Objective Callout ──────────────────────────────────────────────────
function MissionObjective() {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.25)',
        borderRadius: '16px', padding: '32px', marginBottom: '80px',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Corner brackets HUD style */}
      <div style={{ position: 'absolute', top: '12px', left: '12px', width: '16px', height: '16px', borderTop: '2px solid #10B981', borderLeft: '2px solid #10B981' }} />
      <div style={{ position: 'absolute', top: '12px', right: '12px', width: '16px', height: '16px', borderTop: '2px solid #10B981', borderRight: '2px solid #10B981' }} />
      <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '16px', height: '16px', borderBottom: '2px solid #10B981', borderLeft: '2px solid #10B981' }} />
      <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '16px', height: '16px', borderBottom: '2px solid #10B981', borderRight: '2px solid #10B981' }} />

      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#10B981', letterSpacing: '0.2em', marginBottom: '20px' }}>
        // MISSION OBJECTIVE
      </p>

      <div style={{ display: 'grid', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#EF4444', minWidth: '80px', paddingTop: '2px' }}>PRIMARY</span>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: '600', color: '#F2F3F5' }}>SOC Analyst L1 (Entry Level)</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#6B7280', marginTop: '4px' }}>Threat monitoring · Incident response · Security operations</p>
          </div>
        </div>
        <div style={{ height: '1px', background: 'rgba(16,185,129,0.1)' }} />
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#FBBF24', minWidth: '80px', paddingTop: '2px' }}>SECONDARY</span>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: '600', color: '#F2F3F5' }}>Master's in Cybersecurity — Japan</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#6B7280', marginTop: '4px' }}>Planned: 2026–2028 · Advanced specialization</p>
          </div>
        </div>
        <div style={{ height: '1px', background: 'rgba(16,185,129,0.1)' }} />
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#10B981', minWidth: '80px', paddingTop: '2px' }}>STATUS</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {[
              { label: 'Network Security Basics', status: 'STUDYING' },
              { label: 'TryHackMe SOC Level 1', status: 'IN PROGRESS' },
              { label: 'OPSWAT Academy Portal', status: 'COMPLETED' },
            ].map(item => (
              <span key={item.label} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '4px 10px', borderRadius: '4px', background: item.status === 'COMPLETED' ? 'rgba(16,185,129,0.15)' : 'rgba(251,191,36,0.1)', color: item.status === 'COMPLETED' ? '#10B981' : '#FBBF24', border: `1px solid ${item.status === 'COMPLETED' ? 'rgba(16,185,129,0.3)' : 'rgba(251,191,36,0.25)'}` }}>
                {item.label} · {item.status}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Currently Learning Ticker ──────────────────────────────────────────────────
function LearningTicker() {
  const items = SECURITY_LEARNING;
  const doubled = [...items, ...items]; // seamless loop

  return (
    <div style={{ overflow: 'hidden', marginBottom: '80px', padding: '16px 0', borderTop: '1px solid rgba(16,185,129,0.1)', borderBottom: '1px solid rgba(16,185,129,0.1)' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#10B981', letterSpacing: '0.2em', marginBottom: '12px', paddingLeft: '0' }}>
        {'>'} CURRENTLY LEARNING
      </p>
      <style>{`
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
      <div style={{ display: 'flex', animation: 'ticker 20s linear infinite', width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px',
            color: '#34D399', marginRight: '40px', whiteSpace: 'nowrap',
          }}>
            {'/'} {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Security Skills ──────────────────────────────────────────────────
function SecuritySkillGrid() {
  const catColors = {
    tools:          { text: '#10B981', border: 'rgba(16,185,129,0.3)', bg: 'rgba(16,185,129,0.06)' },
    programming:    { text: '#34D399', border: 'rgba(52,211,153,0.3)', bg: 'rgba(52,211,153,0.06)' },
    ai_security:    { text: '#6EE7B7', border: 'rgba(110,231,183,0.3)', bg: 'rgba(110,231,183,0.06)' },
    certifications: { text: '#FBBF24', border: 'rgba(251,191,36,0.3)', bg: 'rgba(251,191,36,0.06)' },
  };

  const labels = { tools: '🔧 Tools', programming: '💻 Programming', ai_security: '🤖 AI/Security', certifications: '📜 Certifications' };

  return (
    <motion.div variants={fadeUp} style={{ marginBottom: '80px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#10B981', letterSpacing: '0.2em', marginBottom: '8px' }}>
        // CAPABILITIES
      </p>
      <h3 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(28px, 4vw, 48px)', color: '#F2F3F5', marginBottom: '32px', fontWeight: '700' }}>
        Security Stack
      </h3>
      <div style={{ display: 'grid', gap: '24px' }}>
        {Object.entries(SECURITY_SKILLS).map(([cat, skills]) => {
          const c = catColors[cat];
          return (
            <div key={cat}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: c.text, letterSpacing: '0.15em', marginBottom: '10px' }}>{labels[cat]}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skills.map(s => (
                  <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', padding: '5px 12px', borderRadius: '4px', background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
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
        background: '#080A0C',
        padding: '100px 5vw',
        borderTop: highlighted ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.04)',
        position: 'relative',
      }}
    >
      {/* Subtle scan-line texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(16,185,129,0.012) 0px, transparent 1px, transparent 3px)',
        backgroundSize: '100% 4px',
      }} />

      {highlighted && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #10B981, #059669, transparent)' }} />
      )}

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '60px', display: 'flex', alignItems: 'center', gap: '16px' }}
        >
          <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, #10B981, #059669)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#10B981', letterSpacing: '0.2em' }}>PATH 03</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-grotesk, var(--font-display))',
            fontSize: 'clamp(48px, 8vw, 100px)', fontWeight: '700',
            color: '#F2F3F5', letterSpacing: '-0.03em',
            lineHeight: 0.95, marginBottom: '80px',
          }}
        >
          SECURITY<br />
          <span style={{ background: 'linear-gradient(135deg, #10B981, #34D399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ANALYST.
          </span>
        </motion.h2>

        <RadarChart />
        <LearningTicker />

        {/* Incident Cards */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '80px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#10B981', letterSpacing: '0.2em', marginBottom: '8px' }}>
            // INCIDENT REPORTS
          </p>
          <h3 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(28px, 4vw, 48px)', color: '#F2F3F5', marginBottom: '32px', fontWeight: '700' }}>
            Security Projects
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {SEC_PROJECTS.map(p => <IncidentCard key={p.id} project={p} />)}
          </div>
        </motion.div>

        <MissionObjective />

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SecuritySkillGrid />
        </motion.div>
      </div>
    </section>
  );
}
