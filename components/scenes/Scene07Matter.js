'use client';
import { useRef, useEffect, useState } from 'react';

const EVENTS = [
  { year: '2020', title: 'Diploma Started', sub: 'Computer Engineering', org: 'Rajendra Mane Poly' },
  { year: '2022', title: 'Web Design Intern', sub: 'UI/UX & Frontend Dev', org: 'Gadre Infotech' },
  { year: '2023', title: 'Python Dev Intern', sub: 'Backend & Web Systems', org: 'PHP Web World' },
  { year: '2023', title: 'B.E. AI & ML', sub: 'Started Degree', org: 'Gharda Institute of Technology', active: true },
  { year: '2024', title: 'Projects Shipped', sub: 'Scalnex · Phishing AI · SecurePass', org: 'Independent Dev' },
  { year: '2025', title: 'Voice AI & Steg', sub: 'Advanced AI Systems', org: 'R&D Projects' },
  { year: '2026', title: 'B.E. Ongoing', sub: 'CGPA 6.57 · Final Year', org: 'Gharda Institute', active: true },
];

const CERTS = [
  { name: 'Python Essentials', rot: '-1.5deg' },
  { name: 'Machine Learning',  rot: '1.8deg'  },
  { name: 'Web Development',   rot: '-.8deg'  },
  { name: 'Django Framework',  rot: '2.2deg'  },
  { name: 'Data Science',      rot: '-2deg'   },
  { name: 'React.js',          rot: '1deg'    },
];

export default function Scene07Matter({ activeScene }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const ref = useRef(null);
  const [active, setActive] = useState(3);

  useEffect(() => {
    if (activeScene !== 6) return;
    const run = async () => {
      const gsap = (await import('gsap')).gsap;
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el.querySelectorAll('.s07__headline, .film-frame, .cert'),
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: .9, ease: 'power4.out', stagger: .06 }
      );
    };
    run();
  }, [activeScene]);

  // Drag to scroll
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let down = false, startX = 0, sl = 0;
    const onDown = (e) => { down = true; startX = e.pageX - wrap.offsetLeft; sl = wrap.scrollLeft; };
    const onUp   = () => { down = false; };
    const onMove = (e) => { if (!down) return; e.preventDefault(); wrap.scrollLeft = sl - (e.pageX - wrap.offsetLeft - startX) * 1.4; };
    wrap.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    wrap.addEventListener('mousemove', onMove);
    return () => {
      wrap.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      wrap.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section ref={ref} className="scene s07" id="scene-07" aria-label="Experience — Matter">
      <h2 className="s07__headline">Every step<br />was deliberate.</h2>

      <div ref={wrapRef} className="timeline-wrap" role="region" aria-label="Career timeline — drag to scroll">
        <div ref={trackRef} className="timeline-track">
          {EVENTS.map((ev, i) => (
            <div
              key={i}
              className={`film-frame ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
              tabIndex={0}
              role="button"
              aria-pressed={i === active}
              aria-label={`${ev.year}: ${ev.title}`}
              onKeyDown={(e) => e.key === 'Enter' && setActive(i)}
            >
              <div className="film-sprocket-row film-sprocket-row--top">
                {[0,1,2].map(j => <div key={j} className="sprocket" />)}
              </div>
              <div className="film-sprocket-row film-sprocket-row--bot">
                {[0,1,2].map(j => <div key={j} className="sprocket" />)}
              </div>
              <p className="film-year">{ev.year}</p>
              <h3 className="film-title">{ev.title}</h3>
              <p className="film-sub">{ev.sub}</p>
              <p className="film-org">{ev.org}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="certs" role="list" aria-label="Certifications">
        {CERTS.map((c, i) => (
          <div key={i} className="cert" role="listitem"
            style={{ transform: `rotate(${c.rot})` }}
            aria-label={`Certification: ${c.name}`}>
            {c.name}
          </div>
        ))}
      </div>
    </section>
  );
}
