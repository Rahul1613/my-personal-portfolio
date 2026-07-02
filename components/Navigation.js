'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'About',    id: 'hero' },
  { label: 'Path',     id: 'path-select' },
  { label: 'Projects', id: 'dev-zone' },
  { label: 'Education',id: 'education' },
  { label: 'Contact',  id: 'contact' },
];

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

export default function Navigation({ activePath }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const accentMap = { developer: '#3B82F6', marketing: '#F59E0B', security: '#10B981', all: '#6366F1' };
  const accent = accentMap[activePath] || '#6366F1';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: '0 5vw',
          height: scrolled ? '56px' : '68px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(10,11,13,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'height 0.3s, background 0.3s, border-color 0.3s',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}
        >
          <div style={{
            width: '28px', height: '28px', borderRadius: '8px',
            background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.4s',
          }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: '#000', fontWeight: '700', lineHeight: 1 }}>R</span>
          </div>
          <span style={{ fontFamily: 'var(--font-grotesk, var(--font-body))', fontSize: '14px', fontWeight: '600', color: '#F2F3F5' }}>
            Rahul Sisode
          </span>
        </button>

        {/* Desktop nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: '500',
                color: '#6B7280', padding: '6px 12px', borderRadius: '8px',
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#F2F3F5'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.background = 'none'; }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href="https://github.com/Rahul1613"
            target="_blank" rel="noopener noreferrer"
            style={{
              color: '#6B7280', textDecoration: 'none',
              padding: '6px', borderRadius: '8px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#F2F3F5'}
            onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}
            aria-label="GitHub Profile"
          >
            <GithubIcon />
          </a>
          <a
            href="mailto:sisoderahul643@gmail.com"
            style={{
              fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: '600',
              padding: '7px 16px', borderRadius: '8px',
              background: accent, color: '#000',
              textDecoration: 'none', transition: 'opacity 0.2s, background 0.4s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Hire Me
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(p => !p)}
            style={{
              display: 'none', background: 'none', border: 'none', cursor: 'pointer',
              color: '#9CA3AF', padding: '6px',
            }}
            className="mobile-menu-btn"
            aria-label="Menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed', top: '56px', left: 0, right: 0, zIndex: 999,
              background: 'rgba(10,11,13,0.97)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '16px 5vw 24px',
              display: 'flex', flexDirection: 'column', gap: '4px',
            }}
          >
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                  fontFamily: 'var(--font-body)', fontSize: '15px',
                  color: '#9CA3AF', padding: '10px 12px', borderRadius: '8px',
                }}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 680px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
