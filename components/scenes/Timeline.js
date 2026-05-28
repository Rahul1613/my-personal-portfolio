'use client';
import { useState, useRef, useEffect } from 'react';

const EVENTS = [
  {
    idx: '01',
    year: '2020',
    role: 'EDUCATION — COMPLETED',
    company: 'DIPLOMA — COMPUTER ENGINEERING',
    org: 'Rajendra Mane Polytechnic College, Ratnagiri',
    duration: '2020 – 2023',
    desc: 'Three-year computer engineering programme. Foundational skills in programming, networking, and systems design.',
    pills: ['C', 'Python', 'HTML', 'CSS', 'Networking'],
    result: '72.57% — COMPLETED',
  },
  {
    idx: '02',
    year: '2022',
    role: 'INTERNSHIP',
    company: 'WEB DESIGN INTERN',
    org: 'Gadre Infotech Pvt. Ltd.',
    duration: 'June 2022',
    desc: 'Designed and built responsive web pages using HTML5 and CSS3. First professional client exposure.',
    pills: ['HTML5', 'CSS3', 'Responsive Design'],
    result: 'Completed',
  },
  {
    idx: '03',
    year: '2023',
    role: 'INTERNSHIP',
    company: 'PYTHON DEVELOPER INTERN',
    org: 'PHP Web World',
    duration: 'February 2023',
    desc: 'Enhanced backend of a Library Management System. Improved database queries and performance with Python & Django.',
    pills: ['Python', 'Django', 'MySQL'],
    result: 'Completed',
  },
  {
    idx: '04',
    year: '2024',
    role: 'INDEPENDENT DEV',
    company: 'SHIPPED 6 LIVE PROJECTS',
    org: 'Open Source & Independent',
    duration: '2023 – 2025',
    desc: 'Built and deployed six production projects: SaaS platform, AI security tools, ML models, voice interfaces. All live.',
    pills: ['React', 'Django', 'MongoDB', 'Python', 'ML', 'NLP'],
    result: '6 Projects Live',
  },
  {
    idx: '05',
    year: '2026',
    role: 'EDUCATION — COMPLETED',
    company: 'B.E. — AI & MACHINE LEARNING',
    org: 'Gharda Institute of Technology, Mumbai University',
    duration: '2023 – 2026',
    desc: 'Specialisation in Artificial Intelligence and Machine Learning. Research on applied AI systems and full-stack deployment.',
    pills: ['AI', 'ML', 'NLP', 'Deep Learning', 'Full Stack'],
    result: 'CGPA 6.57 — COMPLETED',
  },
];

const CERTS = [
  'AWS CLOUD FOUNDATIONS',
  'PYTHON — IIT BOMBAY (NPTEL)',
  'AI PRIMER — INFOSYS SPRINGBOARD',
  'DATA SCIENCE — INFOSYS SPRINGBOARD',
  'DIGITAL MARKETING — GOOGLE',
  'ETHICAL HACKING — SIMPLILEARN',
  'UI/UX DESIGN — CODEC TECHNOLOGIES',
];

export default function Timeline() {
  const [activeIdx, setActiveIdx] = useState(null);
  const sectionRef  = useRef(null);
  const rowRefs     = useRef([]);

  useEffect(() => {
    let cancelled = false;
    const setup = async () => {
      const { gsap }         = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      const rows = rowRefs.current.filter(Boolean);
      rows.forEach((row, i) => {
        gsap.fromTo(row,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.08,
            scrollTrigger: { trigger: section, start: 'top 72%', once: true } }
        );
      });
    };
    const t = setTimeout(setup, 300);
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  const ticker = [...CERTS, ...CERTS];

  return (
    <section
      ref={sectionRef}
      className="scene timeline"
      id="scene-timeline"
      aria-label="Experience & Education Timeline"
    >
      {/* Section header */}
      <div className="tl__header">
        <span className="tl__section-label">005 / TIMELINE</span>
        <h2 className="tl__headline">THE<br />JOURNEY.</h2>
      </div>

      {/* Event rows — all visible, click to expand */}
      <div className="tl__rows" role="list">
        {EVENTS.map((ev, i) => {
          const isOpen = activeIdx === i;
          return (
            <div
              key={ev.idx}
              ref={(el) => { rowRefs.current[i] = el; }}
              className={`tl__row${isOpen ? ' open' : ''}`}
              role="listitem"
              style={{ opacity: 0 }}
            >
              {/* Top bar — always visible */}
              <button
                className="tl__row-bar"
                onClick={() => setActiveIdx(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`tl-panel-${ev.idx}`}
                aria-label={`${ev.company} — click to ${isOpen ? 'collapse' : 'expand'}`}
              >
                {/* Left: index + year */}
                <div className="tl__row-left">
                  <span className="tl__row-idx" aria-hidden="true">{ev.idx}</span>
                  <span className="tl__row-year">{ev.year}</span>
                </div>

                {/* Center divider */}
                <div className="tl__row-line" aria-hidden="true">
                  <div className="tl__row-line-inner" />
                </div>

                {/* Right: role + company */}
                <div className="tl__row-right">
                  <span className="tl__row-role">{ev.role}</span>
                  <span className="tl__row-company">{ev.company}</span>
                </div>

                {/* Far right: result + duration */}
                <div className="tl__row-meta">
                  <span className="tl__row-result">{ev.result}</span>
                  <span className="tl__row-duration">{ev.duration}</span>
                </div>

                {/* Toggle arrow */}
                <span className="tl__row-toggle" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {/* Expanded panel */}
              <div
                id={`tl-panel-${ev.idx}`}
                className="tl__panel"
                hidden={!isOpen}
                aria-hidden={!isOpen}
              >
                <p className="tl__panel-org">{ev.org}</p>
                <p className="tl__panel-desc">{ev.desc}</p>
                <div className="tl__panel-pills" role="list">
                  {ev.pills.map((p) => (
                    <span key={p} className="tl__pill" role="listitem">{p}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Certs ticker */}
      <div className="tl__ticker" role="marquee" aria-label="Certifications">
        <div className="tl__ticker-track" aria-hidden="true">
          {ticker.map((c, i) => (
            <span key={i} className="tl__ticker-item">{c} &nbsp;·&nbsp;</span>
          ))}
        </div>
      </div>
    </section>
  );
}
