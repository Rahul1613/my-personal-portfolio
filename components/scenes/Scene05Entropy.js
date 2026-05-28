'use client';
import { useEffect, useRef } from 'react';
import { ProjectCard } from '../ProjectCard';

const PROJECTS = [
  {
    name: 'SECUREPASS AI',
    desc: 'Intelligent Password Security — AI-driven entropy analysis with cryptographic strength recommendations.',
    tags: ['Python', 'AI', 'React', 'Cryptography'],
    link: 'https://securepass-ai.netlify.app',
    mockupClass: 'm-secure',
    mockupContent: <div className="m-secure__icon">🔒</div>,
  },
  {
    name: 'ASSESSMENT PLATFORM',
    desc: 'Smart Testing at Scale — automated aptitude evaluation with chatbot assistance and real-time analytics.',
    tags: ['Django', 'SQLite', 'Chatbot', 'Excel'],
    link: 'https://quizprojectapp.onrender.com',
    mockupClass: 'm-quiz',
    mockupContent: <div className="m-quiz__timer">02:47</div>,
  },
];

export default function Scene05Entropy({ activeScene }) {
  const ref = useRef(null);

  useEffect(() => {
    if (activeScene !== 4) return;
    const run = async () => {
      const gsap = (await import('gsap')).gsap;
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el.querySelectorAll('.proj-label, .proj-headline, .pcard'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: .95, ease: 'power4.out', stagger: .1 }
      );
    };
    run();
  }, [activeScene]);

  return (
    <section ref={ref} className="scene s-projects s-projects--light" id="scene-05" aria-label="Work — Entropy">
      <div className="proj-header">
        <p className="proj-label proj-label--light">Selected Work &nbsp;&nbsp; 03 / 06</p>
        <h2 className="proj-headline proj-headline--light">Secure.<br />Scalable.</h2>
      </div>
      <div className="proj-grid">
        {PROJECTS.map((p) => <ProjectCard key={p.name} p={p} dark={false} />)}
      </div>
    </section>
  );
}
