'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const ROLES = ['Full-Stack Developer', 'Growth Marketer', 'Security Analyst', 'Builder of 3 Live Products'];

export default function Hero({ activePath }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  // Typewriter
  useEffect(() => {
    const target = ROLES[roleIndex];
    let i = 0;
    setDisplayed('');
    setTyping(true);
    const type = setInterval(() => {
      i++;
      setDisplayed(target.slice(0, i));
      if (i === target.length) {
        clearInterval(type);
        setTyping(false);
        setTimeout(() => {
          // erase
          let j = target.length;
          const erase = setInterval(() => {
            j--;
            setDisplayed(target.slice(0, j));
            if (j === 0) {
              clearInterval(erase);
              setRoleIndex(prev => (prev + 1) % ROLES.length);
            }
          }, 35);
        }, 1800);
      }
    }, 55);
    return () => clearInterval(type);
  }, [roleIndex]);

  const accentMap = {
    developer: '#3B82F6',
    marketing: '#F59E0B',
    security:  '#10B981',
    all:       '#6366F1',
  };
  const accent = accentMap[activePath] || '#6366F1';

  const STATS = [
    { label: 'Projects Shipped', value: '6+', icon: '⚡', accent: '#3B82F6' },
    { label: 'Internships', value: '4', icon: '💼', accent: '#F59E0B' },
    { label: 'Live Products', value: '3', icon: '🚀', accent: '#10B981' },
    { label: 'Years Building', value: '3+', icon: '🧠', accent: '#8B5CF6' },
  ];

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        background: '#0A0B0D',
        display: 'flex',
        alignItems: 'center',
        padding: '80px 5vw 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Video background ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 20%',
          zIndex: 0,
          opacity: 0.38,
          filter: 'saturate(1.2) brightness(0.85)',
        }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* ── Dark overlay so text stays readable ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.68) 100%)',
      }} />

      {/* Subtle radial gradient background */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 70%)',
      }} />

      {/* Grid lines */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
        `,
        backgroundSize: '72px 72px',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 3 }}>
        {/* TOP ROW: Text + Photo */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '40px', alignItems: 'flex-start', marginBottom: '48px' }}>
          {/* Left: Name + Role + CTA */}
          <div>
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '28px', padding: '6px 14px', borderRadius: '100px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#10B981', letterSpacing: '0.12em' }}>
                OPEN TO WORK
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{
                fontFamily: 'var(--font-grotesk, var(--font-display))',
                fontSize: 'clamp(44px, 7vw, 96px)',
                fontWeight: '800',
                color: '#F8F9FA',
                letterSpacing: '-0.035em',
                lineHeight: 0.92,
                marginBottom: '24px',
              }}
            >
              RAHUL<br />
              HIRATSINGH<br />
              <span style={{
                background: `linear-gradient(135deg, ${accent}, ${accent}aa)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transition: 'all 0.4s ease',
              }}>
                SISODE.
              </span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ marginBottom: '32px', height: '28px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <span style={{ fontFamily: 'var(--font-grotesk, var(--font-body))', fontSize: 'clamp(16px, 2vw, 22px)', color: '#9CA3AF', fontWeight: '400' }}>
                {displayed}
              </span>
              <span style={{
                display: 'inline-block', width: '2px', height: '22px',
                background: accent, borderRadius: '2px',
                animation: 'blink 1s step-end infinite',
              }} />
            </motion.div>

            {/* Proof point */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: '#4B5563',
                letterSpacing: '0.06em',
                marginBottom: '36px',
              }}
            >
              3 self-shipped products · 4 real internships · Zero fluff.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
            >
              <a
                href="#path-select"
                style={{
                  fontFamily: 'var(--font-grotesk, var(--font-body))',
                  fontSize: '14px', fontWeight: '600',
                  padding: '12px 24px', borderRadius: '10px',
                  background: accent, color: '#000',
                  textDecoration: 'none', transition: 'opacity 0.2s, transform 0.2s',
                  display: 'inline-block',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Choose Your Path →
              </a>
              <a
                href="https://github.com/Rahul1613"
                target="_blank" rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-grotesk, var(--font-body))',
                  fontSize: '14px', fontWeight: '500',
                  padding: '12px 24px', borderRadius: '10px',
                  background: 'rgba(255,255,255,0.05)', color: '#D1D5DB',
                  textDecoration: 'none', border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'background 0.2s', display: 'inline-block',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.09)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                GitHub ↗
              </a>
            </motion.div>
          </div>

          {/* Right: Photo card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            style={{ position: 'relative' }}
          >
            {/* Glow behind card */}
            <div style={{
              position: 'absolute', inset: '-20px',
              background: `radial-gradient(ellipse at 50% 50%, ${accent}20, transparent 70%)`,
              borderRadius: '28px',
              pointerEvents: 'none',
              transition: 'background 0.4s',
            }} />
            {/* Card */}
            <div style={{
              width: 'clamp(180px, 20vw, 280px)',
              aspectRatio: '3/4',
              borderRadius: '20px',
              overflow: 'hidden',
              border: `1px solid ${accent}30`,
              boxShadow: `0 0 40px ${accent}15, 0 24px 60px rgba(0,0,0,0.5)`,
              background: '#111318',
              position: 'relative',
              transition: 'border-color 0.4s, box-shadow 0.4s',
            }}>
              <Image
                src="/rahul-photo.jpg"
                alt="Rahul Hiratsingh Sisode"
                fill
                sizes="280px"
                style={{ objectFit: 'cover', objectPosition: 'center 10%' }}
                priority
              />
              {/* Glass overlay at bottom */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '16px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
              }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6B7280', letterSpacing: '0.15em' }}>
                  Ratnagiri, Maharashtra
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* BENTO STATS GRID */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
          }}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -3, scale: 1.02 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '14px',
                padding: '20px',
                display: 'flex', flexDirection: 'column', gap: '6px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                transition: 'border-color 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${stat.accent}35`}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
            >
              <span style={{ fontSize: '18px' }}>{stat.icon}</span>
              <p style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: '700', color: '#F2F3F5', lineHeight: 1 }}>
                {stat.value}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#6B7280' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CSS for cursor blink and status pulse */}
      <style>{`
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes pulse { 0%,100% { opacity:1; box-shadow: 0 0 8px #10B981; } 50% { opacity:0.7; box-shadow: 0 0 16px #10B981; } }
      `}</style>
    </section>
  );
}
