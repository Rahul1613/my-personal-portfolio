'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const STATS = [
  { num: 6,    suffix: '',   label: 'Live Projects'   },
  { num: 2,    suffix: '',   label: 'Internships'      },
  { num: 7,    suffix: '',   label: 'Certifications'   },
  { num: 6.57, suffix: '',   label: 'CGPA · AI & ML'  },
];

const ORBITS = [
  { label: 'React.js',  r: 140, speed: 18, startDeg: 0   },
  { label: 'Python',    r: 140, speed: 18, startDeg: 72  },
  { label: 'Django',    r: 140, speed: 18, startDeg: 144 },
  { label: 'AI / ML',  r: 140, speed: 18, startDeg: 216 },
  { label: 'Three.js', r: 140, speed: 18, startDeg: 288 },
  { label: 'MongoDB',   r: 190, speed: 28, startDeg: 36  },
  { label: 'Node.js',   r: 190, speed: 28, startDeg: 108 },
  { label: 'NLP',       r: 190, speed: 28, startDeg: 180 },
  { label: 'JWT',       r: 190, speed: 28, startDeg: 252 },
  { label: 'Vercel',    r: 190, speed: 28, startDeg: 324 },
];

function StatCircle({ num, suffix, label, animate }) {
  const [displayed, setDisplayed] = useState(0);
  const circleRef = useRef(null);

  useEffect(() => {
    if (!animate) return;
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplayed(+(num * ease).toFixed(num % 1 === 0 ? 0 : 2));
      if (t < 1) requestAnimationFrame(tick);
      else setDisplayed(num);
    };
    requestAnimationFrame(tick);
  }, [animate, num]);

  const pct = animate ? 100 : 0;
  const r = 36, circ = 2 * Math.PI * r;

  return (
    <div className="stat-circle">
      <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden="true">
        {/* Track */}
        <circle cx="44" cy="44" r={r} fill="none" stroke="#111" strokeWidth="2" />
        {/* Progress */}
        <circle
          ref={circleRef}
          cx="44" cy="44" r={r}
          fill="none"
          stroke="#E8FF00"
          strokeWidth="1.5"
          strokeLinecap="butt"
          strokeDasharray={`${circ}`}
          strokeDashoffset={animate ? 0 : circ}
          style={{
            transition: 'stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)',
            transformOrigin: 'center',
            transform: 'rotate(-90deg)',
          }}
        />
        <text x="44" y="44" textAnchor="middle" dominantBaseline="middle"
          fontFamily="var(--font-display,'Bebas Neue',sans-serif)"
          fontSize="22" fill="#fff">
          {displayed}{suffix}
        </text>
      </svg>
      <span className="stat-circle__label">{label}</span>
    </div>
  );
}

export default function Identity() {
  const sectionRef  = useRef(null);
  const photoRef    = useRef(null);
  const glitchRef   = useRef(null);
  const textRef     = useRef(null);
  const [statsAnim, setStatsAnim] = useState(false);
  const [glitching, setGlitching] = useState(false);

  // Scroll-triggered animations
  useEffect(() => {
    let cancelled = false;
    const setup = async () => {
      const { gsap }         = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const text    = textRef.current;
      if (!section || !text) return;

      // Stagger text children
      const words = text.querySelectorAll('.word');
      if (words.length > 0) {
        gsap.fromTo(words,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 72%', once: true } }
        );
      } else {
        // Fallback — animate label/headline/body
        const els = section.querySelectorAll('.identity__label, .identity__headline, .identity__body');
        gsap.fromTo(els,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 72%', once: true } }
        );
      }

      // Trigger stat circles
      ScrollTrigger.create({
        trigger: section,
        start: 'top 65%',
        once: true,
        onEnter: () => { if (!cancelled) setStatsAnim(true); },
      });

      // Photo reveal
      ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        once: true,
        onEnter: () => {
          if (photoRef.current && !cancelled) {
            photoRef.current.classList.add('revealed');
          }
        },
      });
    };
    const t = setTimeout(setup, 400);
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  // Periodic glitch bursts on photo
  useEffect(() => {
    const glitch = () => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 400 + Math.random() * 300);
    };
    const id = setInterval(glitch, 4000 + Math.random() * 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={sectionRef} className="scene identity" id="scene-identity" aria-label="About Rahul Sisode">

      {/* ── LEFT — Text ── */}
      <div ref={textRef}>
        <span className="identity__label">
          <span className="word">002</span>
          <span className="word"> / </span>
          <span className="word">IDENTITY</span>
        </span>

        <h2 className="identity__headline">
          <span className="word">NOT</span><br />
          <span className="word">JUST</span><br />
          <span className="word">CODE.</span>
        </h2>

        <blockquote className="identity__quote">
          <span className="word">AI &amp; Full Stack —</span>{' '}
          <span className="word">every layer,</span>{' '}
          <span className="word">end to end.</span>
        </blockquote>

        <p className="identity__body">
          <span className="word">I&apos;m Rahul Sisode —</span>{' '}
          <span className="word">building complete systems</span>{' '}
          <span className="word">from database to deployment.</span>{' '}
          <span className="word">B.E. AI &amp; ML graduate,</span>{' '}
          <span className="word">Gharda Institute of Technology.</span>{' '}
          <span className="word">I ship production</span>{' '}
          <span className="word">software.</span>
        </p>

        {/* Stat Circles */}
        <div className="identity__stats" role="list">
          {STATS.map((s) => (
            <div key={s.label} role="listitem">
              <StatCircle {...s} animate={statsAnim} />
            </div>
          ))}
        </div>

        {/* Education quick-view */}
        <div className="identity__edu">
          <div className="identity__edu-item">
            <div className="identity__edu-dot" aria-hidden="true" />
            B.E. AI &amp; ML &nbsp;·&nbsp; Gharda Institute &nbsp;·&nbsp; CGPA 6.57 &nbsp;·&nbsp; 2026
          </div>
          <div className="identity__edu-item">
            <div className="identity__edu-dot" aria-hidden="true" />
            Diploma CSE &nbsp;·&nbsp; Rajendra Mane Poly &nbsp;·&nbsp; 72.57% &nbsp;·&nbsp; 2023
          </div>
        </div>
      </div>

      {/* ── RIGHT — Photo with orbit + glitch ── */}
      <div className="identity__photo-col">
        {/* Orbit ring */}
        <div className="orbit-system" aria-hidden="true">
          {ORBITS.map((o, i) => (
            <div
              key={i}
              className="orbit-tag"
              style={{
                '--orbit-r':        `${o.r}px`,
                '--orbit-speed':    `${o.speed}s`,
                '--orbit-start':    `${o.startDeg}deg`,
                '--orbit-dir':      i % 2 === 0 ? '1' : '-1',
              }}
            >
              <span className="orbit-tag__label">{o.label}</span>
            </div>
          ))}

          {/* Photo in center */}
          <div
            ref={photoRef}
            className={`identity__photo-wrap${glitching ? ' glitch' : ''}`}
          >
            <Image
              src="/rahul-photo.jpg"
              alt="Rahul Sisode — AI & Full Stack Developer"
              fill
              sizes="(max-width: 768px) 200px, 240px"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              priority={false}
            />
            {/* Glitch layers */}
            {glitching && (
              <>
                <div className="glitch-layer glitch-r" />
                <div className="glitch-layer glitch-b" />
                <div className="glitch-scanline" />
              </>
            )}
            <div className="photo-grain" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
