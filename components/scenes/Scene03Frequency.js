'use client';
import { useEffect, useRef } from 'react';

const COLS = [
  { label: 'Languages', bars: [85, 70, 58, 52, 42], techs: ['Python', 'JavaScript', 'Java', 'C', 'SQL'] },
  { label: 'Backend',   bars: [80, 75, 65, 58, 50], techs: ['Django', 'Node.js', 'REST API', 'JWT', 'PostgreSQL'] },
  { label: 'Frontend',  bars: [82, 72, 64, 58, 52], techs: ['React.js', 'HTML/CSS', 'Tailwind', 'Three.js', 'GSAP'] },
  { label: 'AI / ML',   bars: [74, 64, 58, 52, 46], techs: ['ML Models', 'NLP', 'Prompt Eng', 'Sklearn', 'OpenCV'] },
];

const TICKER = ['PYTHON','REACT','DJANGO','MONGODB','NODE.JS','POSTGRESQL','JWT','GSAP','THREE.JS','LINUX','VERCEL','AWS','TENSORFLOW','SKLEARN','HTML5','CSS3','GIT','REST API','NEXT.JS','FASTAPI'];

export default function Scene03Frequency({ activeScene }) {
  const ref = useRef(null);

  useEffect(() => {
    if (activeScene !== 2) return;
    const run = async () => {
      const gsap = (await import('gsap')).gsap;
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el.querySelectorAll('.s03__headline, .spec-col, .marquee'),
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .08 }
      );
    };
    run();
  }, [activeScene]);

  return (
    <section className="scene s03" id="scene-03" ref={ref} aria-label="Skills — Frequency">
      <h2 className="s03__headline">Every tool<br />is a language.</h2>

      <div className="spectrum" role="img" aria-label="Skills spectrum visualization">
        {COLS.map((col) => (
          <div key={col.label} className="spec-col" tabIndex={0} aria-label={`${col.label}: ${col.techs.join(', ')}`}>
            <div className="spec-techs" aria-hidden="true">
              {col.techs.map((t) => <span key={t} className="spec-tech">{t}</span>)}
            </div>
            <div className="spec-bars">
              {col.bars.map((h, i) => (
                <div key={i} className="spec-bar" aria-hidden="true"
                  style={{ height: `${h}%`, animationDelay: `${i * 0.35}s`, animationDuration: `${2.8 + i * 0.25}s` }} />
              ))}
            </div>
            <p className="spec-label">{col.label}</p>
          </div>
        ))}
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="marquee__item">{t} ·</span>
          ))}
        </div>
      </div>
    </section>
  );
}
