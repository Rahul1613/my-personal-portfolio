'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const PATHS = [
  {
    id: 'developer',
    label: 'DEVELOPER',
    number: '01',
    teaser: 'React · Django · GSAP · 6 shipped projects',
    desc: 'Full-stack architect. Every layer, end to end.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M8 9l-4 4 4 4M16 9l4 4-4 4M12 5l-2 14" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    accent: 'from-[#3B82F6] to-[#22D3EE]',
    accentBg: 'rgba(59,130,246,0.08)',
    accentBorder: 'rgba(59,130,246,0.4)',
    accentGlow: '0 0 40px rgba(59,130,246,0.25)',
    dotColor: '#3B82F6',
  },
  {
    id: 'marketing',
    label: 'MARKETER',
    number: '02',
    teaser: 'GTM · Content · 2 live products shipped',
    desc: 'Builder who thinks in growth loops.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M16 8v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2v-2M20 12H10m6-4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    accent: 'from-[#F59E0B] to-[#F97316]',
    accentBg: 'rgba(245,158,11,0.08)',
    accentBorder: 'rgba(245,158,11,0.4)',
    accentGlow: '0 0 40px rgba(245,158,11,0.25)',
    dotColor: '#F59E0B',
  },
  {
    id: 'security',
    label: 'SECURITY',
    number: '03',
    teaser: 'Phishing detection · Cryptography · Threat analysis',
    desc: 'Building defences before attackers do.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    accent: 'from-[#10B981] to-[#059669]',
    accentBg: 'rgba(16,185,129,0.08)',
    accentBorder: 'rgba(16,185,129,0.4)',
    accentGlow: '0 0 40px rgba(16,185,129,0.25)',
    dotColor: '#10B981',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function PathSelect({ onSelect, activePath }) {
  const [hovered, setHovered] = useState(null);
  const [compiling, setCompiling] = useState(null);

  const handleClick = (pathId) => {
    if (compiling) return;
    setCompiling(pathId);
    setTimeout(() => {
      setCompiling(null);
      onSelect(pathId);
    }, 650);
  };

  return (
    <section
      id="path-select"
      style={{
        background: '#0A0B0D',
        padding: '100px 5vw',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '60px', textAlign: 'center' }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.2em', color: '#6B7280', marginBottom: '16px' }}>
            SELECT YOUR PATH
          </p>
          <h2 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: '700', color: '#F2F3F5', letterSpacing: '-0.02em', lineHeight: 1 }}>
            CHOOSE YOUR<br />
            <span style={{ background: 'linear-gradient(135deg, var(--accent-from, #E8FF00), var(--accent-to, #C4B49A))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              CLASS.
            </span>
          </h2>
          <p style={{ marginTop: '20px', color: '#6B7280', fontFamily: 'var(--font-body)', fontSize: '16px', maxWidth: '480px', margin: '20px auto 0' }}>
            Same person. Same real experience. Presented through the lens that matters to you.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {PATHS.map((path) => {
            const isActive = activePath === path.id;
            const isHovered = hovered === path.id;
            const isCompiling = compiling === path.id;

            return (
              <motion.div
                key={path.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                onClick={() => handleClick(path.id)}
                onMouseEnter={() => setHovered(path.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHovered || isActive ? path.accentBg : '#111318',
                  border: `1px solid ${isHovered || isActive ? path.accentBorder : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: '16px',
                  padding: '36px 32px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: isHovered || isActive ? path.accentGlow : 'none',
                  transition: 'all 0.3s ease',
                }}
                role="button"
                tabIndex={0}
                aria-label={`Select ${path.label} path`}
                onKeyDown={(e) => e.key === 'Enter' && handleClick(path.id)}
              >
                {/* Active indicator */}
                {isActive && (
                  <div style={{
                    position: 'absolute', top: '16px', right: '16px',
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: path.dotColor,
                    boxShadow: `0 0 10px ${path.dotColor}`,
                  }} />
                )}

                {/* Compiling overlay */}
                {isCompiling && (
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: '16px',
                    background: `linear-gradient(135deg, ${path.accentBg}, transparent)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(2px)', zIndex: 10,
                  }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: path.dotColor, letterSpacing: '0.15em' }}>
                      COMPILING PROFILE...
                    </p>
                  </div>
                )}

                {/* Number */}
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4B5563', letterSpacing: '0.2em', marginBottom: '20px' }}>
                  {path.number}
                </p>

                {/* Icon */}
                <div style={{ color: isHovered || isActive ? path.dotColor : '#4B5563', marginBottom: '24px', transition: 'color 0.3s' }}>
                  {path.icon}
                </div>

                {/* Label */}
                <h3 style={{
                  fontFamily: 'var(--font-grotesk, var(--font-display))',
                  fontSize: '28px', fontWeight: '700',
                  color: '#F2F3F5', letterSpacing: '-0.02em',
                  marginBottom: '8px',
                }}>
                  {path.label}
                </h3>

                {/* Desc */}
                <p style={{ color: '#9CA3AF', fontFamily: 'var(--font-body)', fontSize: '15px', marginBottom: '20px' }}>
                  {path.desc}
                </p>

                {/* Teaser — appears on hover */}
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={isHovered || isActive ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                    color: path.dotColor, letterSpacing: '0.12em',
                    overflow: 'hidden',
                  }}
                >
                  {path.teaser}
                </motion.p>

                {/* Bottom CTA */}
                <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    height: '1px',
                    background: `linear-gradient(90deg, ${path.dotColor}, transparent)`,
                    flex: 1, opacity: isHovered || isActive ? 1 : 0,
                    transition: 'opacity 0.3s',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                    color: isHovered || isActive ? path.dotColor : '#4B5563',
                    letterSpacing: '0.15em', transition: 'color 0.3s',
                  }}>
                    {isActive ? 'ACTIVE' : 'SELECT →'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Default note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center', marginTop: '40px',
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            color: '#374151', letterSpacing: '0.15em',
          }}
        >
          ALL PATHS SHOWN BY DEFAULT — SELECT ONE TO FILTER
        </motion.p>
      </div>
    </section>
  );
}
