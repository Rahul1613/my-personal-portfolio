'use client';
import { useRef, useEffect } from 'react';

export function ProjectCard({ p, dark = true }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const rx = ((e.clientY - rect.top)  / rect.height - 0.5) * -8;
      const ry = ((e.clientX - rect.left) / rect.width  - 0.5) *  8;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      card.style.transition = 'transform .1s linear, box-shadow .4s, border-color .3s';
    };
    const onLeave = () => {
      card.style.transition = 'transform .6s cubic-bezier(0.16,1,0.3,1), box-shadow .4s, border-color .3s';
      card.style.transform = '';
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const d = dark;

  return (
    <article ref={cardRef} className={`pcard ${d ? 'pcard--dark' : 'pcard--light'}`}>
      {/* Browser mockup */}
      <div className="mockup">
        <div className={`mockup__bar ${d ? 'mockup__bar--dark' : 'mockup__bar--light'}`}>
          <div className="mockup__dot" />
          <div className="mockup__dot" />
          <div className="mockup__dot" />
        </div>
        <div className={`mockup__screen ${p.mockupClass}`}>
          {p.mockupContent}
        </div>
      </div>

      <h3 className={`pcard__name pcard__name--${d ? 'dark' : 'light'}`}>{p.name}</h3>
      <p  className={`pcard__desc pcard__desc--${d ? 'dark' : 'light'}`}>{p.desc}</p>

      <div className="pcard__tags">
        {p.tags.map((t) => (
          <span key={t} className={`tag tag--${d ? 'dark' : 'light'}`}>{t}</span>
        ))}
      </div>

      <div className={`pcard__foot pcard__foot--${d ? 'dark' : 'light'}`}>
        <a href={p.link} target="_blank" rel="noopener noreferrer"
          className={`pcard__link pcard__link--${d ? 'dark' : 'light'}`}
          aria-label={`View ${p.name}`}>
          View Project ↗
        </a>
        <a href="https://github.com/Rahul1613" target="_blank" rel="noopener noreferrer"
          className={`pcard__link pcard__link--${d ? 'dark' : 'light'}`}
          aria-label="GitHub"
          style={{ fontSize: '16px', opacity: .6 }}>
          GitHub ↗
        </a>
      </div>
    </article>
  );
}
