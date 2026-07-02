'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, EXPERIENCE, MARKETING_SKILLS, CERTIFICATIONS } from '../../lib/resumeData';

const ACCENT = '#F59E0B';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const stagger = { show: { transition: { staggerChildren: 0.06 } } };

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

// ── Skill Pills ──────────────────────────────────────────────────
function SkillPills() {
  const catConfig = {
    digital_marketing: { label: '📊 Digital Marketing', color: '#F59E0B' },
    social_content:    { label: '📱 Social & Content',  color: '#F97316' },
    product_growth:    { label: '🚀 Product & Growth',  color: '#FBBF24' },
    ai_marketing:      { label: '🤖 AI Marketing',      color: '#FCD34D' },
  };

  return (
    <motion.div variants={fadeUp} style={{ marginBottom: '60px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4B5563', letterSpacing: '0.18em', marginBottom: '8px' }}>CAPABILITIES</p>
      <h3 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: '700', color: '#F2F3F5', letterSpacing: '-0.02em', marginBottom: '32px' }}>Skills</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
        {Object.entries(MARKETING_SKILLS).map(([cat, skills]) => {
          const cfg = catConfig[cat];
          return (
            <GlassCard key={cat} style={{ padding: '20px' }} hoverAccent={cfg.color}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: cfg.color, letterSpacing: '0.15em', marginBottom: '12px' }}>{cfg.label}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skills.map(s => (
                  <span key={s} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', padding: '5px 12px', borderRadius: '100px', background: `${cfg.color}10`, border: `1px solid ${cfg.color}25`, color: cfg.color }}>
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

// ── Case Study Cards ──────────────────────────────────────────────────
const CASES = [
  {
    product: 'VICTARC',
    url: 'https://victarc.in',
    steps: [
      { icon: '❓', label: 'PROBLEM', text: 'No structured SaaS with tiered subscriptions or user onboarding for productivity teams.' },
      { icon: '⚡', label: 'THE MOVE', text: 'Built subscription tiers, JWT auth flow, role-based dashboards from scratch.' },
      { icon: '✅', label: 'RESULT', text: 'Live in production at victarc.in — real users, real subscription flows.' },
    ],
  },
  {
    product: 'HYRINX',
    url: 'https://hyrinx.in',
    steps: [
      { icon: '❓', label: 'PROBLEM', text: 'Local businesses lacked affordable, dedicated advertising platforms with campaign management.' },
      { icon: '⚡', label: 'THE MOVE', text: 'Built full advertising platform with business listings, campaign tools, and lead gen workflows.' },
      { icon: '✅', label: 'RESULT', text: 'Live at hyrinx.in — self-shipped with real business users.' },
    ],
  },
  {
    product: 'SCALNEX',
    url: 'https://scalnex-businessgrowthplatform.netlify.app',
    steps: [
      { icon: '❓', label: 'PROBLEM', text: 'SMBs lacked integrated growth tooling: job discovery, listings, and lead gen in one place.' },
      { icon: '⚡', label: 'THE MOVE', text: 'Architected SaaS with role dashboards, RESTful APIs, real-time notifications.' },
      { icon: '✅', label: 'RESULT', text: 'Production-ready business growth platform — live on Netlify.' },
    ],
  },
];

// ── Certification Wall ──────────────────────────────────────────────────
const CERT_EMOJI = ['☁️','🐍','🤖','📊','📣','🔐','🎨','🧪','📈','💼','🧠','💬','👁️','🔬','🛡️'];

// ── Experience (horizontal card row) ──────────────────────────────────────────────────
function ExpRow() {
  const mktExp = EXPERIENCE.filter(e => e.tags.includes('marketing'));
  return (
    <motion.div variants={fadeUp} style={{ marginBottom: '60px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4B5563', letterSpacing: '0.18em', marginBottom: '8px' }}>EXPERIENCE</p>
      <h3 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: '700', color: '#F2F3F5', letterSpacing: '-0.02em', marginBottom: '28px' }}>Roles</h3>
      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'thin', scrollbarColor: 'rgba(245,158,11,0.2) transparent' }}>
        {mktExp.map(exp => (
          <GlassCard key={exp.hash} style={{ padding: '20px', minWidth: '220px', flexShrink: 0 }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>{exp.icon}</div>
            <h4 style={{ fontFamily: 'var(--font-grotesk, var(--font-body))', fontSize: '14px', fontWeight: '600', color: '#F2F3F5', marginBottom: '4px' }}>{exp.role}</h4>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: ACCENT, marginBottom: '4px' }}>{exp.company}</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#4B5563' }}>{exp.period}</p>
          </GlassCard>
        ))}
      </div>
    </motion.div>
  );
}

// ── Content initiative grid ──────────────────────────────────────────────────
const CONTENT_TILES = [
  { label: 'AI Productivity', emoji: '🤖' }, { label: 'Mindset Shifts', emoji: '🧠' },
  { label: 'Money Systems',   emoji: '💰' }, { label: 'Build in Public', emoji: '🏗️' },
  { label: 'Side Income',     emoji: '📈' }, { label: 'AI Tools 101',  emoji: '⚡' },
  { label: 'Focus Hacks',     emoji: '🎯' }, { label: 'SaaS Teardowns', emoji: '🔍' },
  { label: 'Daily Rituals',   emoji: '🌅' },
];

export default function MarketerZone({ highlighted }) {
  return (
    <section
      id="marketing-zone"
      style={{
        background: '#08090A',
        padding: '80px 5vw',
        borderTop: `1px solid ${highlighted ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.04)'}`,
        position: 'relative',
      }}
    >
      {highlighted && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}66, transparent)` }} />}

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '52px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: ACCENT, letterSpacing: '0.2em' }}>PATH 02 — MARKETER</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: '800', color: '#F2F3F5', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '64px' }}>
          Marketer<br /><span style={{ color: '#374151' }}>Dashboard.</span>
        </motion.h2>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SkillPills />
        </motion.div>

        {/* Case Studies */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '60px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4B5563', letterSpacing: '0.18em', marginBottom: '8px' }}>CASE STUDIES</p>
          <h3 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: '700', color: '#F2F3F5', letterSpacing: '-0.02em', marginBottom: '28px' }}>Problem → Move → Result</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {CASES.map(cs => (
              <GlassCard key={cs.product} style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: `${ACCENT}08` }}>
                  <h4 style={{ fontFamily: 'var(--font-grotesk, var(--font-body))', fontSize: '16px', fontWeight: '700', color: '#F2F3F5' }}>{cs.product}</h4>
                  <a href={cs.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: ACCENT, textDecoration: 'none', padding: '4px 10px', border: `1px solid ${ACCENT}30`, borderRadius: '5px' }}>LIVE ↗</a>
                </div>
                <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  {cs.steps.map(step => (
                    <div key={step.label} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', marginBottom: '6px' }}>{step.icon}</div>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: ACCENT, letterSpacing: '0.15em', marginBottom: '6px' }}>{step.label}</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', lineHeight: 1.5 }}>{step.text}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Content initiative bento */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '60px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4B5563', letterSpacing: '0.18em', marginBottom: '8px' }}>CONTENT INITIATIVE</p>
          <h3 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: '700', color: '#F2F3F5', letterSpacing: '-0.02em', marginBottom: '16px' }}>AI + Money + Mindset</h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280', marginBottom: '24px', maxWidth: '480px', lineHeight: 1.6 }}>
            Content strategy framework bridging AI productivity, financial systems, and mindset for builders.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', maxWidth: '360px' }}>
            {CONTENT_TILES.map(tile => (
              <GlassCard key={tile.label} style={{ aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8px', textAlign: 'center' }}>
                <span style={{ fontSize: '18px', marginBottom: '4px' }}>{tile.emoji}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#6B7280', lineHeight: 1.3 }}>{tile.label}</span>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '60px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4B5563', letterSpacing: '0.18em', marginBottom: '8px' }}>CREDENTIALS</p>
          <h3 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: '700', color: '#F2F3F5', letterSpacing: '-0.02em', marginBottom: '24px' }}>Certifications</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
            {CERTIFICATIONS.map((cert, i) => (
              <GlassCard key={cert.name} style={{ padding: '16px 14px' }}>
                <div style={{ fontSize: '18px', marginBottom: '8px' }}>{CERT_EMOJI[i % CERT_EMOJI.length]}</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: '500', color: '#D1D5DB', marginBottom: '2px', lineHeight: 1.3 }}>{cert.name}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#4B5563' }}>{cert.issuer}</p>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <ExpRow />
        </motion.div>
      </div>
    </section>
  );
}
