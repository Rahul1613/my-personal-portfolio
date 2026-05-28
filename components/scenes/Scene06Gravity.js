'use client';
import { useEffect, useRef } from 'react';
import { ProjectCard } from '../ProjectCard';

const PROJECTS = [
  {
    name: 'AI VOICE ASSISTANT',
    desc: 'Conversational AI interface — voice-activated commands with NLP intent recognition and speech synthesis.',
    tags: ['Python', 'NLP', 'TTS', 'AI'],
    link: 'https://github.com/Rahul1613',
    mockupClass: 'm-voice',
    mockupContent: (
      <div className="m-voice__wave">
        {[0,1,2,3,4].map(i => <div key={i} className="m-voice__bar" />)}
      </div>
    ),
  },
  {
    name: 'IMAGE STEGANOGRAPHY',
    desc: 'Hidden message encoding — pixel-level LSB steganography with detection-resistant encryption layers.',
    tags: ['Python', 'OpenCV', 'Cryptography', 'PIL'],
    link: 'https://github.com/Rahul1613',
    mockupClass: 'm-steg',
    mockupContent: (
      <div className="m-steg__grid">
        {Array.from({ length: 21 }).map((_, i) => <div key={i} className="m-steg__px" />)}
      </div>
    ),
  },
];

export default function Scene06Gravity({ activeScene }) {
  const ref = useRef(null);

  useEffect(() => {
    if (activeScene !== 5) return;
    const run = async () => {
      const gsap = (await import('gsap')).gsap;
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el.querySelectorAll('.proj-label, .proj-headline, .pcard, .gravity-cta'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: .95, ease: 'power4.out', stagger: .09 }
      );
    };
    run();
  }, [activeScene]);

  return (
    <section ref={ref} className="scene s-projects s-projects--dark" id="scene-06" aria-label="Work — Gravity">
      <div className="proj-header">
        <p className="proj-label proj-label--dark">Selected Work &nbsp;&nbsp; 05 / 06</p>
        <h2 className="proj-headline proj-headline--dark">Intelligence<br />everywhere.</h2>
      </div>
      <div className="proj-grid">
        {PROJECTS.map((p) => <ProjectCard key={p.name} p={p} dark={true} />)}
      </div>
      <div className="gravity-cta">
        <p className="gravity-cta__text">Six projects. More coming.</p>
        <a href="https://github.com/Rahul1613" target="_blank" rel="noopener noreferrer" className="gravity-cta__link">
          View all on GitHub →
        </a>
      </div>
    </section>
  );
}
