'use client';
import { useState, useEffect, useRef } from 'react';

const ITEMS = [
  { label: 'WORK',     id: 'scene-work',     num: '003' },
  { label: 'IDENTITY', id: 'scene-identity', num: '002' },
  { label: 'SKILLS',   id: 'scene-skills',   num: '004' },
  { label: 'TIMELINE', id: 'scene-timeline', num: '005' },
  { label: 'CONTACT',  id: 'scene-contact',  num: '006' },
];

/* SVG icons — each unique */
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
  </svg>
);

export default function Navigation() {
  const [open, setOpen]       = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const progressRef = useRef(null);

  // Scroll progress bar
  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrolled = window.scrollY;
      const total    = doc.scrollHeight - doc.clientHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      setScrollPct(pct);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  // Close on Escape
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el && window.__lenis) {
        window.__lenis.scrollTo(el, { offset: 0, duration: 1.4 });
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 700);
  };

  return (
    <>
      <nav className="nav" aria-label="Site navigation">
        {/* Logo */}
        <button
          className="nav__logo"
          onClick={() => window.__lenis?.scrollTo(0)}
          aria-label="Back to top"
          id="nav-logo"
        >
          <span className="nav__logo-rs">RS</span>
          <span className="nav__logo-dot" aria-hidden="true" />
        </button>

        {/* Right cluster */}
        <div className="nav__right">
          {/* Social icons — inline in nav */}
          <div className="nav__socials" aria-label="Quick links">
            <a
              href="https://github.com/Rahul1613"
              target="_blank"
              rel="noopener noreferrer"
              className="nav__social-icon nav__social-icon--github"
              aria-label="GitHub profile"
              id="nav-github"
            >
              <GithubIcon />
              <span className="nav__social-tooltip">github.com/Rahul1613</span>
            </a>
            <a
              href="https://linkedin.com/in/rahul-sisode"
              target="_blank"
              rel="noopener noreferrer"
              className="nav__social-icon nav__social-icon--linkedin"
              aria-label="LinkedIn profile"
              id="nav-linkedin"
            >
              <LinkedinIcon />
              <span className="nav__social-tooltip">linkedin.com/in/rahul-sisode</span>
            </a>
            <a
              href="mailto:sisoderahul643@gmail.com"
              className="nav__social-icon nav__social-icon--mail"
              aria-label="Email Rahul"
              id="nav-email"
            >
              <MailIcon />
              <span className="nav__social-tooltip">sisoderahul643@gmail.com</span>
            </a>
          </div>

          <button
            className="nav__menu-btn"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-label="Open menu"
            id="nav-menu-btn"
          >
            <span className="nav__menu-bar" />
            <span className="nav__menu-bar" />
          </button>
        </div>
      </nav>

      {/* Scroll progress line */}
      <div
        className="nav__progress"
        role="progressbar"
        aria-valuenow={Math.round(scrollPct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      >
        <div
          className="nav__progress-fill"
          style={{ width: `${scrollPct}%` }}
        />
      </div>

      {/* Full-screen menu overlay */}
      <div
        className={`menu-overlay${open ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!open}
      >
        {/* Close */}
        <button
          className="menu-overlay__close"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          id="nav-close-btn"
        >
          <span className="menu-close__x" aria-hidden="true">✕</span>
          CLOSE
        </button>

        {/* Nav items */}
        <ul className="menu-nav-list" role="list">
          {ITEMS.map((item, i) => (
            <li key={item.id} className="menu-nav-item">
              <button
                className="menu-nav-btn"
                onClick={() => scrollTo(item.id)}
                tabIndex={open ? 0 : -1}
                id={`nav-item-${item.id}`}
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <span className="menu-nav-btn__num">{item.num}</span>
                <span className="menu-nav-btn__label">{item.label}</span>
                <span className="menu-nav-btn__arrow" aria-hidden="true">→</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Aside: contact + social */}
        <aside className="menu-side" aria-label="Contact quick-links">
          <p className="menu-side__label">CONNECT</p>

          <div className="menu-side__socials">
            <a
              href="mailto:sisoderahul643@gmail.com"
              className="menu-side__social"
              tabIndex={open ? 0 : -1}
            >
              <MailIcon />
              <span>sisoderahul643@gmail.com</span>
            </a>
            <a
              href="https://github.com/Rahul1613"
              target="_blank"
              rel="noopener noreferrer"
              className="menu-side__social"
              tabIndex={open ? 0 : -1}
            >
              <GithubIcon />
              <span>github.com/Rahul1613</span>
            </a>
            <a
              href="https://linkedin.com/in/rahul-sisode"
              target="_blank"
              rel="noopener noreferrer"
              className="menu-side__social"
              tabIndex={open ? 0 : -1}
            >
              <LinkedinIcon />
              <span>linkedin.com/in/rahul-sisode</span>
            </a>
          </div>

          <p className="menu-side__copy">
            Rahul Sisode · B.E. AI &amp; ML · 2026
          </p>
        </aside>
      </div>
    </>
  );
}
