'use client';
import { useEffect, useRef } from 'react';

/* ── Marquee rows — skills scroll left, categories scroll right ── */
const ROWS = [
  {
    dir: 'left',
    speed: 35,
    items: [
      { text: 'Python', tag: true },
      { text: 'JavaScript', tag: true },
      { text: 'Java', tag: true },
      { text: 'C', tag: true },
      { text: 'ES6+', tag: true },
      { text: 'LANGUAGES', cat: true },
      { text: 'TypeScript', tag: true },
      { text: 'Bash', tag: true },
    ],
  },
  {
    dir: 'right',
    speed: 45,
    items: [
      { text: 'FRONTEND', cat: true },
      { text: 'React.js', tag: true },
      { text: 'HTML5', tag: true },
      { text: 'CSS3', tag: true },
      { text: 'Tailwind CSS', tag: true },
      { text: 'Three.js', tag: true },
      { text: 'Next.js', tag: true },
      { text: 'FRONTEND', cat: true },
    ],
  },
  {
    dir: 'left',
    speed: 40,
    items: [
      { text: 'Django', tag: true },
      { text: 'Node.js', tag: true },
      { text: 'BACKEND', cat: true },
      { text: 'REST API', tag: true },
      { text: 'JWT Auth', tag: true },
      { text: 'Django REST', tag: true },
      { text: 'BACKEND', cat: true },
      { text: 'GraphQL', tag: true },
    ],
  },
  {
    dir: 'right',
    speed: 38,
    items: [
      { text: 'DATABASES', cat: true },
      { text: 'MongoDB', tag: true },
      { text: 'PostgreSQL', tag: true },
      { text: 'SQLite', tag: true },
      { text: 'DATABASES', cat: true },
      { text: 'Redis', tag: true },
      { text: 'MySQL', tag: true },
      { text: 'Schema Design', tag: true },
    ],
  },
  {
    dir: 'left',
    speed: 50,
    items: [
      { text: 'Supervised ML', tag: true },
      { text: 'AI / ML', cat: true },
      { text: 'Unsupervised ML', tag: true },
      { text: 'NLP', tag: true },
      { text: 'Prompt Engineering', tag: true },
      { text: 'Scikit-learn', tag: true },
      { text: 'AI / ML', cat: true },
      { text: 'OpenCV', tag: true },
    ],
  },
  {
    dir: 'right',
    speed: 42,
    items: [
      { text: 'TOOLS', cat: true },
      { text: 'Git', tag: true },
      { text: 'GitHub', tag: true },
      { text: 'VS Code', tag: true },
      { text: 'Linux', tag: true },
      { text: 'AWS', tag: true },
      { text: 'Vercel', tag: true },
      { text: 'TOOLS', cat: true },
    ],
  },
];

/* Certifications for bottom strip */
const CERTS = [
  '⬡ AWS CLOUD FOUNDATIONS',
  '⬡ PYTHON — IIT BOMBAY (NPTEL)',
  '⬡ AI PRIMER — INFOSYS SPRINGBOARD',
  '⬡ DATA SCIENCE — INFOSYS SPRINGBOARD',
  '⬡ DIGITAL MARKETING — GOOGLE',
  '⬡ ETHICAL HACKING — SIMPLILEARN',
  '⬡ UI/UX DESIGN — CODEC TECHNOLOGIES',
];

export default function Skills() {
  const sectionRef   = useRef(null);
  const headlineRef  = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const setup = async () => {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const section  = sectionRef.current;
      const headline = headlineRef.current;
      if (!section || !headline) return;

      // Headline + label entrance
      const label = section.querySelector('.skills__label');
      gsap.fromTo([label, headline],
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: section, start: 'top 78%', once: true } }
      );

      // Marquee rows fade in with stagger
      const rows = section.querySelectorAll('.marquee-row');
      gsap.fromTo(rows,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08,
          scrollTrigger: { trigger: section, start: 'top 70%', once: true } }
      );
    };
    const t = setTimeout(setup, 300);
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  const certTicker = [...CERTS, ...CERTS];

  return (
    <section
      ref={sectionRef}
      className="scene skills-v2"
      id="scene-skills"
      aria-label="Skills — The Arsenal"
    >
      {/* Header */}
      <div className="skills-v2__header">
        <span className="skills__label">004 / SKILLS</span>
        <h2 ref={headlineRef} className="skills-v2__headline">
          THE<br />ARSENAL.
        </h2>
        <p className="skills-v2__sub">
          30+ technologies across the full stack
        </p>
      </div>

      {/* Marquee rows */}
      <div className="skills-v2__marquees" aria-label="Skills list">
        {ROWS.map((row, ri) => {
          const doubled = [...row.items, ...row.items];
          return (
            <div
              key={ri}
              className="marquee-row"
              style={{ opacity: 0 }}
              aria-hidden="true"
            >
              <div
                className="marquee-row__track"
                style={{
                  animationDuration: `${row.speed}s`,
                  animationDirection: row.dir === 'right' ? 'reverse' : 'normal',
                }}
              >
                {doubled.map((item, ii) => (
                  <span
                    key={ii}
                    className={`marquee-item${item.cat ? ' marquee-item--cat' : ''}`}
                  >
                    {item.text}
                    {!item.cat && <span className="marquee-item__dot" aria-hidden="true" />}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Certifications strip */}
      <div className="skills-v2__certs" role="region" aria-label="Certifications">
        <span className="skills-v2__certs-label">7 CERTIFICATIONS</span>
        <div className="skills-v2__certs-ticker" aria-hidden="true">
          <div className="skills-v2__certs-track">
            {certTicker.map((c, i) => (
              <span key={i} className="skills-v2__cert-item">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
