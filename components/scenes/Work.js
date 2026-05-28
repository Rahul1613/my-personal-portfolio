'use client';
import { useEffect, useRef } from 'react';

const PROJECTS = [
  {
    num: '001',
    name: 'SCALNEX',
    tagline: 'Business Growth SaaS Platform',
    desc: 'Full-stack B2B platform with JWT auth, MongoDB data layer, and React dashboard. Connects businesses to growth tools in one interface.',
    tags: ['React.js', 'Django', 'MongoDB', 'JWT'],
    grad: 'grad-scalnex',
    live: 'https://scalnex-businessgrowthplatform.netlify.app',
    github: 'https://github.com/Rahul1613/Scalnex',
    year: '2024',
  },
  {
    num: '002',
    name: 'PHISHING AI',
    tagline: 'Enterprise Phishing Detection Engine',
    desc: 'ML + NLP pipeline detecting phishing in real time. Trained classifier with feature extraction on URL patterns and email content.',
    tags: ['Python', 'ML', 'NLP', 'React.js'],
    grad: 'grad-phishing',
    live: 'https://phishing-detection-ai-powered.netlify.app',
    github: 'https://github.com/Rahul1613/AI-POWERED-PHISHING-DETECTION-ENGINE-ENTERPRISE-ACTIVE',
    year: '2024',
  },
  {
    num: '003',
    name: 'SECUREPASS AI',
    tagline: 'Password Security Analysis Tool',
    desc: 'AI-powered password analyser with entropy scoring, breach-check integration, and real-time suggestions for stronger credentials.',
    tags: ['Python', 'AI', 'Security'],
    grad: 'grad-securepass',
    live: 'https://6a180ac64e3b0d248384c52d--securepass-ai.netlify.app',
    github: 'https://github.com/Rahul1613/SecurePass-AI-',
    year: '2024',
  },
  {
    num: '004',
    name: 'ASSESSMENT HUB',
    tagline: 'Automated Aptitude Testing + Chatbot',
    desc: 'Django quiz system with role-based access, chatbot assistant, Excel report export, and SQLite persistence for test results.',
    tags: ['Django', 'SQLite', 'Chatbot', 'Python'],
    grad: 'grad-assessment',
    live: 'https://quizprojectapp.onrender.com',
    github: 'https://github.com/Rahul1613',
    year: '2024',
  },
  {
    num: '005',
    name: 'VOICE ASSIST',
    tagline: 'AI Voice Command Interface',
    desc: 'Python NLP voice assistant with TTS output, intent recognition, and module-based command execution for productivity tasks.',
    tags: ['Python', 'NLP', 'TTS', 'Speech Rec'],
    grad: 'grad-voice',
    live: null,
    github: 'https://github.com/Rahul1613',
    year: '2025',
  },
  {
    num: '006',
    name: 'STEGANOGRAPHY',
    tagline: 'LSB Image Encryption + Cryptography',
    desc: 'Hides encrypted messages inside images using Least Significant Bit pixel manipulation. Combines OpenCV, PIL and cryptographic encoding.',
    tags: ['Python', 'OpenCV', 'PIL', 'Cryptography'],
    grad: 'grad-steg',
    live: null,
    github: 'https://github.com/Rahul1613',
    year: '2025',
  },
];

export default function Work() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const fillRef    = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const setup = async () => {
      const { gsap }         = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const track   = trackRef.current;
      const fill    = fillRef.current;
      if (!section || !track) return;

      const scrollWidth = track.scrollWidth - window.innerWidth + 96;

      gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (fill) fill.style.height = `${self.progress * 100}%`;
          },
        },
      });
    };
    const t = setTimeout(setup, 800);
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  return (
    <section ref={sectionRef} className="scene work" id="scene-work" aria-label="Projects — Selected Work">

      {/* Left progress strip */}
      <aside className="work__label-side" aria-hidden="true">
        <span className="work__label-text">003 / WORK</span>
        <div className="work__progress-line">
          <div ref={fillRef} className="work__progress-fill" />
        </div>
        <span className="work__label-text">{PROJECTS.length} projects</span>
      </aside>

      {/* Horizontal track */}
      <div ref={trackRef} className="work__track" role="list">
        {PROJECTS.map((p) => (
          <article key={p.num} className="pcard" role="listitem" aria-label={`Project: ${p.name}`}>

            {/* Top — gradient mockup with browser chrome */}
            <div className="pcard__mockup">
              {/* Browser chrome bar */}
              <div className="pcard__chrome" aria-hidden="true">
                <span className="pcard__chrome-dot" />
                <span className="pcard__chrome-dot" />
                <span className="pcard__chrome-dot" />
                <span className="pcard__chrome-bar" />
              </div>

              {/* Gradient background */}
              <div className={`pcard__mockup-grad ${p.grad}`} aria-hidden="true">
                {/* Geometric shapes inside mockup */}
                <div className="pcard__geo pcard__geo--1" aria-hidden="true" />
                <div className="pcard__geo pcard__geo--2" aria-hidden="true" />
                <div className="pcard__geo pcard__geo--3" aria-hidden="true" />
              </div>

              {/* Ghost number */}
              <span className="pcard__ghost-num" aria-hidden="true">{p.num}</span>

              {/* Hover overlay — slides up */}
              <div className="pcard__overlay" aria-hidden="true">
                <p className="pcard__overlay-desc">{p.desc}</p>
                <div className="pcard__overlay-links">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="pcard__overlay-link" tabIndex={-1}>
                      VISIT LIVE ↗
                    </a>
                  )}
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="pcard__overlay-link" tabIndex={-1}>
                    GITHUB ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="pcard__body">
              <div className="pcard__body-top">
                <span className="pcard__num">{p.num} &nbsp;·&nbsp; {p.year}</span>
                <span className="pcard__tagline">{p.tagline}</span>
              </div>

              <h3 className="pcard__name">{p.name}</h3>

              <div className="pcard__tags" role="list">
                {p.tags.map((t) => (
                  <span key={t} className="pcard__tag" role="listitem">{t}</span>
                ))}
              </div>

              <div className="pcard__links">
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer"
                     className="pcard__link" id={`live-${p.num}`}>
                    LIVE ↗
                  </a>
                )}
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                   className="pcard__link" id={`gh-${p.num}`}>
                  GITHUB ↗
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
