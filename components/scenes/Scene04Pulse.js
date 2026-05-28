'use client';
import { useEffect, useRef } from 'react';
import { ProjectCard } from '../ProjectCard';

const PROJECTS = [
  {
    name: 'SCALNEX',
    desc: 'Business Growth SaaS Platform — analytics, CRM, and growth tools for modern businesses at scale.',
    tags: ['React.js', 'Django', 'MongoDB', 'JWT'],
    link: 'https://scalnex-businessgrowthplatform.netlify.app',
    mockupClass: 'm-scalnex',
    mockupContent: (
      <div className="m-scalnex__scan">
        <div className="m-scalnex__bars" style={{ position: 'relative', zIndex: 1 }}>
          {[0,1,2,3,4].map(i => <div key={i} className="m-scalnex__bar" />)}
        </div>
      </div>
    ),
  },
  {
    name: 'PHISHING DETECTION',
    desc: 'Enterprise AI Security Tool — real-time NLP-powered threat analysis and URL classification.',
    tags: ['Python', 'ML', 'React', 'NLP'],
    link: 'https://phishing-detection-ai-powered.netlify.app',
    mockupClass: 'm-phish',
    mockupContent: (
      <>
        <div className="m-phish__ring" />
        <div className="m-phish__ring" />
        <div className="m-phish__ring" />
      </>
    ),
  },
];

export default function Scene04Pulse({ activeScene }) {
  const ref = useRef(null);

  useEffect(() => {
    if (activeScene !== 3) return;
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
    <section ref={ref} className="scene s-projects s-projects--dark" id="scene-04" aria-label="Work — Pulse">
      <div className="proj-header">
        <p className="proj-label proj-label--dark">Selected Work &nbsp;&nbsp; 01 / 06</p>
        <h2 className="proj-headline proj-headline--dark">Things I&apos;ve<br />shipped.</h2>
      </div>
      <div className="proj-grid">
        {PROJECTS.map((p) => <ProjectCard key={p.name} p={p} dark={true} />)}
      </div>
    </section>
  );
}
