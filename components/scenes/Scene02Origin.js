'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Scene02Origin({ activeScene }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const photoRef  = useRef(null);
  const contentRef = useRef(null);

  // Entrance animation
  useEffect(() => {
    if (activeScene !== 1) return;
    const run = async () => {
      const gsap = (await import('gsap')).gsap;
      const el = contentRef.current;
      if (!el) return;

      // Photo ghost fade in
      if (photoRef.current?.querySelector('img')) {
        photoRef.current.querySelector('img').classList.add('visible');
      }

      gsap.fromTo(el.querySelectorAll('.s02__label, .s02__headline, .s02__body, .stat'),
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 1, ease: 'power4.out', stagger: 0.1 }
      );
    };
    run();
  }, [activeScene]);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const particles = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 180; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.3,
        s: Math.random() * 0.35 + 0.08,
        o: Math.random() * 0.4 + 0.05,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.o})`;
        ctx.fill();
        p.y -= p.s;
        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <section className="scene s02" id="scene-02" aria-label="About — Origin">
      <canvas ref={canvasRef} className="s02__particles" aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      {/* Ghost photo */}
      <div ref={photoRef} className="s02__photo" aria-hidden="true">
        <Image src="/rahul-photo.jpg" alt="" fill sizes="40vw" priority={false}
          style={{ objectFit: 'cover', objectPosition: 'center top' }} />
      </div>

      <div ref={contentRef} className="s02__grid">
        <div>
          <span className="s02__label">About</span>
          <h2 className="s02__headline">Not just<br />code.</h2>
        </div>

        <div>
          <p className="s02__body">
            I&apos;m Rahul Hiratsingh Sisode — an AI &amp; Full Stack Developer from Ratnagiri,
            Maharashtra. Currently pursuing B.E. in AI &amp; Machine Learning at Gharda Institute
            of Technology.
          </p>
          <p className="s02__body">
            I build complete systems — database to deployment. Production SaaS. Security tools.
            Voice interfaces. I care about the craft at every layer.
          </p>

          <div className="s02__stats" role="list">
            {[
              { num: '06', label: 'Live Projects' },
              { num: '03+', label: 'Years Coding' },
              { num: '2023', label: 'Started Building' },
            ].map((s) => (
              <div key={s.label} className="stat" role="listitem">
                <span className="stat__num">{s.num}</span>
                <span className="stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
