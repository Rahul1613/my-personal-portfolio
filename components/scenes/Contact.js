'use client';
import { useEffect, useRef, useState } from 'react';

const LINES = [
  { delay: 0,    text: '$ whoami',                         type: 'cmd'  },
  { delay: 600,  text: 'rahul_sisode — AI & Full Stack Dev', type: 'out'  },
  { delay: 1000, text: '$ cat contact.json',               type: 'cmd'  },
  { delay: 1600, text: '{',                                type: 'json' },
  { delay: 1800, text: '  "email":    "sisoderahul643@gmail.com",', type: 'json' },
  { delay: 2000, text: '  "phone":    "+91-9730213645",',  type: 'json' },
  { delay: 2200, text: '  "location": "Ratnagiri, MH, IN",', type: 'json' },
  { delay: 2400, text: '  "github":   "github.com/Rahul1613",', type: 'json' },
  { delay: 2600, text: '  "linkedin": "linkedin.com/in/rahul-sisode"', type: 'json' },
  { delay: 2800, text: '}',                                type: 'json' },
  { delay: 3200, text: '$ ls ./open-for/',                 type: 'cmd'  },
  { delay: 3800, text: 'full-time-roles/  internships/  open-source/', type: 'out' },
  { delay: 4400, text: '$ _',                              type: 'cursor'},
];

const SOCIAL = [
  {
    id: 'github',
    label: 'GITHUB',
    href: 'https://github.com/Rahul1613',
    cmd: './github',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    href: 'https://linkedin.com/in/rahul-sisode',
    cmd: './linkedin',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'EMAIL',
    href: 'mailto:sisoderahul643@gmail.com',
    cmd: './send-email',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef    = useRef(null);
  const terminalRef   = useRef(null);
  const [visibleLines, setVisibleLines] = useState([]);
  const [started, setStarted]           = useState(false);

  // Start terminal typing when section enters view
  useEffect(() => {
    let cancelled = false;
    const setup = async () => {
      const { gsap }         = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      // Header entrance
      const header = section.querySelector('.contact__headline');
      if (header) {
        gsap.fromTo(header,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out',
            scrollTrigger: { trigger: section, start: 'top 76%', once: true } }
        );
      }

      ScrollTrigger.create({
        trigger: section,
        start: 'top 68%',
        once: true,
        onEnter: () => { if (!cancelled) setStarted(true); },
      });
    };
    const t = setTimeout(setup, 400);
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  // Type lines one by one
  useEffect(() => {
    if (!started) return;
    const timers = [];
    LINES.forEach((line, i) => {
      const id = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
        // Auto-scroll terminal
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, line.delay);
      timers.push(id);
    });
    return () => timers.forEach(clearTimeout);
  }, [started]);

  return (
    <section ref={sectionRef} className="scene contact" id="scene-contact" aria-label="Contact Rahul Sisode">

      {/* Big headline */}
      <h2 className="contact__headline" style={{ opacity: 0 }} aria-label="Let's build something">
        LET&apos;S BUILD<br />SOMETHING.
      </h2>

      {/* Terminal window */}
      <div className="terminal" role="region" aria-label="Contact terminal">
        {/* Terminal chrome */}
        <div className="terminal__chrome" aria-hidden="true">
          <span className="terminal__dot terminal__dot--r" />
          <span className="terminal__dot terminal__dot--y" />
          <span className="terminal__dot terminal__dot--g" />
          <span className="terminal__title">rahul@portfolio:~</span>
        </div>

        {/* Terminal body */}
        <div ref={terminalRef} className="terminal__body">
          {LINES.map((line, i) => (
            visibleLines.includes(i) && (
              <div key={i} className={`terminal__line terminal__line--${line.type}`}>
                {line.type === 'cmd' && <span className="terminal__prompt" aria-hidden="true">❯ </span>}
                <span className={line.type === 'cursor' ? 'terminal__cursor-line' : ''}>
                  {line.text === '$ _' ? (
                    <>$ <span className="terminal__blink">▋</span></>
                  ) : (
                    line.text
                  )}
                </span>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Social links — icon + command style */}
      <nav className="contact__socials" aria-label="Social profiles">
        {SOCIAL.map((s) => (
          <a
            key={s.id}
            href={s.href}
            target={s.id !== 'email' ? '_blank' : undefined}
            rel={s.id !== 'email' ? 'noopener noreferrer' : undefined}
            className={`social-link social-link--${s.id}`}
            id={`contact-${s.id}`}
            aria-label={`${s.label} — ${s.href}`}
          >
            <span className="social-link__icon">{s.icon}</span>
            <span className="social-link__cmd">{s.cmd}</span>
            <span className="social-link__label">{s.label} ↗</span>
            {/* Animated pulse ring */}
            <span className="social-link__ring" aria-hidden="true" />
          </a>
        ))}
      </nav>

      {/* THE CTA */}
      <a
        href="mailto:sisoderahul643@gmail.com"
        className="contact__cta"
        id="contact-cta"
        aria-label="Send Rahul an email"
      >
        SEND AN EMAIL →
      </a>

      {/* Contact details grid */}
      <address className="contact__details-grid" style={{ marginTop: '48px' }}>
        <div className="contact__detail-cell">
          <span className="contact__detail-label">Email</span>
          <span className="contact__detail-value">sisoderahul643@gmail.com</span>
        </div>
        <div className="contact__detail-cell">
          <span className="contact__detail-label">Phone</span>
          <span className="contact__detail-value">+91-9730213645</span>
        </div>
        <div className="contact__detail-cell">
          <span className="contact__detail-label">Location</span>
          <span className="contact__detail-value">Ratnagiri, MH, India</span>
        </div>
      </address>

      {/* Footer */}
      <footer className="contact__footer">
        <p className="contact__footer-text">
          Rahul Sisode &nbsp;·&nbsp; B.E. AI &amp; ML &nbsp;·&nbsp; Gharda Institute of Technology &nbsp;·&nbsp; 2026
        </p>
      </footer>
    </section>
  );
}
