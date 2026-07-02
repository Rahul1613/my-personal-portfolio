'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, EXPERIENCE, MARKETING_SKILLS, CERTIFICATIONS } from '../../lib/resumeData';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const stagger = { show: { transition: { staggerChildren: 0.07 } } };

// ── Marketing Skill Pills ──────────────────────────────────────
function PillCloud() {
  const categoryColors = {
    digital_marketing: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)', text: '#FCD34D' },
    social_content:    { bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.35)', text: '#FCA678' },
    product_growth:    { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.35)', text: '#FDE68A' },
    ai_marketing:      { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', text: '#F59E0B' },
  };

  const labels = {
    digital_marketing: '📊 Digital Marketing',
    social_content:    '📱 Social & Content',
    product_growth:    '🚀 Product & Growth',
    ai_marketing:      '🤖 AI-Driven Marketing',
  };

  return (
    <motion.div variants={fadeUp} style={{ marginBottom: '80px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#F59E0B', letterSpacing: '0.2em', marginBottom: '8px' }}>
        // CAPABILITIES
      </p>
      <h3 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(28px, 4vw, 48px)', color: '#F2F3F5', marginBottom: '40px', fontWeight: '700' }}>
        Marketing Stack
      </h3>
      <div style={{ display: 'grid', gap: '28px' }}>
        {Object.entries(MARKETING_SKILLS).map(([cat, skills]) => {
          const color = categoryColors[cat];
          return (
            <div key={cat}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: color.text, letterSpacing: '0.15em', marginBottom: '12px' }}>
                {labels[cat]}
              </p>
              <motion.div
                variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
              >
                {skills.map(s => (
                  <motion.span
                    key={s} variants={fadeUp}
                    style={{
                      fontFamily: 'var(--font-body)', fontSize: '13px',
                      padding: '6px 16px', borderRadius: '100px',
                      background: color.bg, border: `1px solid ${color.border}`,
                      color: color.text, cursor: 'default',
                    }}
                  >
                    {s}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Case Study Cards ──────────────────────────────────────────────────
const CASE_STUDIES = [
  {
    product: 'VICTARC',
    url: 'https://victarc.in',
    color: '#F59E0B',
    steps: [
      { icon: '❓', label: 'PROBLEM', text: 'No structured SaaS with tiered subscriptions or user onboarding for productivity teams.' },
      { icon: '⚡', label: 'THE MOVE', text: 'Built subscription tiers, JWT auth flow, and role-based dashboards from scratch.' },
      { icon: '✅', label: 'RESULT', text: 'Live in production at victarc.in — real users, real subscription flows.' },
    ],
  },
  {
    product: 'HYRINX',
    url: 'https://hyrinx.in',
    color: '#F97316',
    steps: [
      { icon: '❓', label: 'PROBLEM', text: 'Local businesses lacked affordable, dedicated advertising platforms with campaign management.' },
      { icon: '⚡', label: 'THE MOVE', text: 'Built full advertising platform with business listings, campaign tools, and lead gen workflows.' },
      { icon: '✅', label: 'RESULT', text: 'Live at hyrinx.in — self-shipped product with real business users.' },
    ],
  },
  {
    product: 'SCALNEX',
    url: 'https://scalnex-businessgrowthplatform.netlify.app',
    color: '#FBBF24',
    steps: [
      { icon: '❓', label: 'PROBLEM', text: 'SMBs lacked integrated tooling for growth: job discovery, business listings, and lead gen in one place.' },
      { icon: '⚡', label: 'THE MOVE', text: 'Architected SaaS with role dashboards, RESTful APIs, real-time notifications, and MongoDB/PostgreSQL schemas.' },
      { icon: '✅', label: 'RESULT', text: 'Production-ready business growth platform — live on Netlify.' },
    ],
  },
];

function CaseStudyCard({ cs }) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        background: '#111318', borderRadius: '16px',
        border: `1px solid rgba(245,158,11,0.15)`, overflow: 'hidden',
        transition: 'box-shadow 0.2s',
      }}
      whileHover={{ boxShadow: `0 0 32px rgba(245,158,11,0.1)` }}
    >
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${cs.color}22, transparent)`, padding: '20px 24px', borderBottom: `1px solid ${cs.color}22`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: '20px', fontWeight: '700', color: '#F2F3F5' }}>
          {cs.product}
        </h4>
        <a href={cs.url} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: cs.color, textDecoration: 'none', padding: '4px 10px', border: `1px solid ${cs.color}44`, borderRadius: '4px' }}>
          LIVE ↗
        </a>
      </div>

      {/* 3 Steps */}
      <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        {cs.steps.map((step) => (
          <div key={step.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{step.icon}</div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: cs.color, letterSpacing: '0.2em', marginBottom: '8px' }}>{step.label}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', lineHeight: 1.5 }}>{step.text}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Content Strategy Grid ──────────────────────────────────────────────────
const CONTENT_TILES = [
  { label: 'AI Productivity', emoji: '🤖' },
  { label: 'Mindset Shifts', emoji: '🧠' },
  { label: 'Money Systems', emoji: '💰' },
  { label: 'Build in Public', emoji: '🏗️' },
  { label: 'Side Income', emoji: '📈' },
  { label: 'AI Tools 101', emoji: '⚡' },
  { label: 'Focus Hacks', emoji: '🎯' },
  { label: 'SaaS Teardowns', emoji: '🔍' },
  { label: 'Daily Rituals', emoji: '🌅' },
];

function ContentGrid() {
  return (
    <motion.div variants={fadeUp} style={{ marginBottom: '80px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#F59E0B', letterSpacing: '0.2em', marginBottom: '8px' }}>
        // CONTENT INITIATIVE
      </p>
      <h3 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(28px, 4vw, 48px)', color: '#F2F3F5', marginBottom: '12px', fontWeight: '700' }}>
        AI + Money + Mindset
      </h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280', marginBottom: '32px', maxWidth: '500px' }}>
        Content strategy framework bridging AI productivity, financial systems, and mindset for builders.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', maxWidth: '380px' }}>
        {CONTENT_TILES.map((tile) => (
          <div key={tile.label} style={{
            aspectRatio: '1', background: 'rgba(245,158,11,0.06)',
            border: '1px solid rgba(245,158,11,0.15)', borderRadius: '12px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '8px', textAlign: 'center',
          }}>
            <span style={{ fontSize: '20px', marginBottom: '4px' }}>{tile.emoji}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#9CA3AF', letterSpacing: '0.05em' }}>{tile.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Certification Badge Wall ──────────────────────────────────────────────────
const BADGE_EMOJIS = ['☁️','🐍','🤖','📊','📣','🔐','🎨','🧪','📈','💼','🔬','💬','🧠','👁️','🛡️'];

function CertBadgeWall() {
  return (
    <motion.div variants={fadeUp} style={{ marginBottom: '80px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#F59E0B', letterSpacing: '0.2em', marginBottom: '8px' }}>
        // CREDENTIALS
      </p>
      <h3 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(28px, 4vw, 48px)', color: '#F2F3F5', marginBottom: '32px', fontWeight: '700' }}>
        Certifications
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
        {CERTIFICATIONS.map((cert, i) => (
          <div key={cert.name} style={{
            background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)',
            borderRadius: '12px', padding: '16px 12px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '22px', marginBottom: '8px' }}>{BADGE_EMOJIS[i % BADGE_EMOJIS.length]}</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#D1D5DB', marginBottom: '4px', lineHeight: 1.3 }}>{cert.name}</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#6B7280' }}>{cert.issuer}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Experience Timeline (horizontal) ──────────────────────────────────────────────────
function ExpTimeline() {
  const mktExp = EXPERIENCE.filter(e => e.tags.includes('marketing'));
  return (
    <motion.div variants={fadeUp} style={{ marginBottom: '80px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#F59E0B', letterSpacing: '0.2em', marginBottom: '8px' }}>
        // EXPERIENCE
      </p>
      <h3 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(28px, 4vw, 48px)', color: '#F2F3F5', marginBottom: '32px', fontWeight: '700' }}>
        Roles
      </h3>
      <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '12px' }}>
        {mktExp.map((exp) => (
          <div key={exp.hash} style={{
            minWidth: '240px', background: 'rgba(245,158,11,0.05)',
            border: '1px solid rgba(245,158,11,0.15)', borderRadius: '12px', padding: '20px',
          }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>{exp.icon}</div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: '600', color: '#F2F3F5', marginBottom: '4px' }}>{exp.role}</h4>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#F59E0B', marginBottom: '4px' }}>{exp.company}</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6B7280' }}>{exp.period}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function MarketerZone({ highlighted }) {
  return (
    <section
      id="marketing-zone"
      style={{
        background: '#0B0A0D',
        padding: '100px 5vw',
        borderTop: highlighted ? '1px solid rgba(245,158,11,0.3)' : '1px solid rgba(255,255,255,0.04)',
        position: 'relative',
      }}
    >
      {highlighted && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #F59E0B, #F97316, transparent)' }} />
      )}

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '60px', display: 'flex', alignItems: 'center', gap: '16px' }}
        >
          <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, #F59E0B, #F97316)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#F59E0B', letterSpacing: '0.2em' }}>PATH 02</span>
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
          MARKETER<br />
          <span style={{ background: 'linear-gradient(135deg, #F59E0B, #F97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            DASHBOARD.
          </span>
        </motion.h2>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <PillCloud />
        </motion.div>

        {/* Case Studies */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '80px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#F59E0B', letterSpacing: '0.2em', marginBottom: '8px' }}>
            // CASE STUDIES
          </p>
          <h3 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(28px, 4vw, 48px)', color: '#F2F3F5', marginBottom: '32px', fontWeight: '700' }}>
            Problem → Move → Result
          </h3>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {CASE_STUDIES.map(cs => <CaseStudyCard key={cs.product} cs={cs} />)}
          </motion.div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <ContentGrid />
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <CertBadgeWall />
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <ExpTimeline />
        </motion.div>
      </div>
    </section>
  );
}
