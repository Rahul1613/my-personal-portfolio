'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const PATHS = [
  {
    id: 'developer',
    label: 'Developer',
    number: '01',
    teaser: 'React · Django · Python · 6 shipped projects',
    desc: 'Full-stack architect. Every layer, end to end.',
    emoji: '💻',
    accent: '#3B82F6',
    glow: 'rgba(59,130,246,0.15)',
    border: 'rgba(59,130,246,0.3)',
  },
  {
    id: 'marketing',
    label: 'Marketer',
    number: '02',
    teaser: 'GTM · Content · 2 live products · Digital Marketing',
    desc: 'Builder who thinks in growth loops and acquisition.',
    emoji: '📈',
    accent: '#F59E0B',
    glow: 'rgba(245,158,11,0.15)',
    border: 'rgba(245,158,11,0.3)',
  },
  {
    id: 'security',
    label: 'Security Analyst',
    number: '03',
    teaser: 'Phishing detection · Cryptography · SOC path',
    desc: 'Building defences before attackers do.',
    emoji: '🔐',
    accent: '#10B981',
    glow: 'rgba(16,185,129,0.15)',
    border: 'rgba(16,185,129,0.3)',
  },
];

export default function PathSelect({ onSelect, activePath }) {
  const [hovered, setHovered] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleClick = (id) => {
    if (loading) return;
    setLoading(id);
    setTimeout(() => {
      setLoading(null);
      onSelect(id);
    }, 500);
  };

  return (
    <section
      id="path-select"
      style={{
        background: '#080909',
        padding: '80px 5vw',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle gradient top */}
      <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '48px' }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4B5563', letterSpacing: '0.2em', marginBottom: '12px' }}>
            CHOOSE YOUR PATH
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{
              fontFamily: 'var(--font-grotesk, var(--font-display))',
              fontSize: 'clamp(28px, 5vw, 52px)',
              fontWeight: '700',
              color: '#F2F3F5',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
            }}>
              Same person.<br />
              <span style={{ color: '#6B7280', fontWeight: '400' }}>Different lens.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#4B5563', maxWidth: '300px', lineHeight: 1.6 }}>
              Select a path to see skills, projects, and experience tailored to what you're hiring for.
            </p>
          </div>
        </motion.div>

        {/* Path cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {PATHS.map((path, i) => {
            const isActive = activePath === path.id;
            const isHov    = hovered === path.id;
            const isLoad   = loading === path.id;
            const show     = isActive || isHov;

            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleClick(path.id)}
                onMouseEnter={() => setHovered(path.id)}
                onMouseLeave={() => setHovered(null)}
                role="button"
                tabIndex={0}
                aria-label={`Select ${path.label} path`}
                onKeyDown={e => e.key === 'Enter' && handleClick(path.id)}
                style={{
                  borderRadius: '18px',
                  border: `1px solid ${show ? path.border : 'rgba(255,255,255,0.06)'}`,
                  background: show ? `rgba(${path.accent === '#3B82F6' ? '59,130,246' : path.accent === '#F59E0B' ? '245,158,11' : '16,185,129'},0.05)` : 'rgba(255,255,255,0.025)',
                  backdropFilter: 'blur(12px)',
                  padding: '32px 28px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: show ? `0 0 40px ${path.glow}, 0 8px 32px rgba(0,0,0,0.4)` : '0 4px 20px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Top accent bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg, ${path.accent}, ${path.accent}44, transparent)`,
                  opacity: show ? 1 : 0, transition: 'opacity 0.3s',
                }} />

                {/* Active dot */}
                {isActive && (
                  <div style={{
                    position: 'absolute', top: '20px', right: '20px',
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: path.accent,
                    boxShadow: `0 0 10px ${path.accent}`,
                  }} />
                )}

                {/* Loading shimmer */}
                {isLoad && (
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: '18px',
                    background: `linear-gradient(135deg, ${path.glow}, transparent)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(4px)', zIndex: 10,
                  }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: path.accent, letterSpacing: '0.12em' }}>
                      Loading...
                    </p>
                  </div>
                )}

                {/* Number */}
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#374151', letterSpacing: '0.2em', marginBottom: '20px' }}>
                  {path.number}
                </p>

                {/* Emoji icon */}
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{path.emoji}</div>

                {/* Label */}
                <h3 style={{
                  fontFamily: 'var(--font-grotesk, var(--font-display))',
                  fontSize: '22px', fontWeight: '700',
                  color: '#F2F3F5', marginBottom: '8px', letterSpacing: '-0.015em',
                }}>
                  {path.label}
                </h3>

                {/* Desc */}
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280', marginBottom: '20px', lineHeight: 1.5 }}>
                  {path.desc}
                </p>

                {/* Teaser skills */}
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  color: show ? path.accent : '#374151',
                  letterSpacing: '0.06em',
                  transition: 'color 0.3s',
                  lineHeight: 1.6,
                }}>
                  {path.teaser}
                </p>

                {/* Arrow */}
                <div style={{
                  marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em',
                    color: show ? path.accent : '#374151',
                    transition: 'color 0.3s',
                  }}>
                    {isActive ? '● ACTIVE' : 'SELECT'}
                  </span>
                  <span style={{
                    fontSize: '18px', color: show ? path.accent : '#374151',
                    transition: 'color 0.3s, transform 0.3s',
                    transform: show ? 'translateX(4px)' : 'none',
                    display: 'inline-block',
                  }}>→</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reset to all */}
        {activePath !== 'all' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginTop: '24px', textAlign: 'center' }}
          >
            <button
              onClick={() => onSelect('all')}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px',
                color: '#4B5563', background: 'none', border: 'none',
                cursor: 'pointer', letterSpacing: '0.12em',
                padding: '8px 16px', borderRadius: '6px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#9CA3AF'}
              onMouseLeave={e => e.currentTarget.style.color = '#4B5563'}
            >
              ← SHOW ALL PATHS
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
