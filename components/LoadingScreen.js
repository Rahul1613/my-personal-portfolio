'use client';
import { useEffect, useRef, useState } from 'react';

/* ─── Cinematic movie intro ────────────────────────────────────
   Timeline (≈10 seconds):
   0.0s  Black + film grain alive
   0.2s  Letterbox bars slide in (top + bottom, widescreen 2.39:1)
   0.8s  Film code flickers in   (RSDEV · 2026 · INDIA)
   1.4s  "PRESENTED BY" label    (DM Mono, tiny)
   2.0s  "A RAHUL SISODE"        (clip-path wipe left→right)
   3.0s  "PRODUCTION"            (same wipe)
   4.2s  HR separator line draws
   4.8s  Role title wipes in     (AI & FULL STACK DEVELOPER)
   5.8s  Institution line fades  (GHARDA INSTITUTE · MUMBAI UNIVERSITY)
   6.8s  B.E. badge appears      (B.E. AI & ML — COMPLETED 2026)
   7.8s  Everything holds…
   8.6s  Text block fades out
   9.0s  Letterbox bars retract
   9.4s  Film grain fades
   9.8s  Black fades → portfolio
  10.0s  onComplete()
──────────────────────────────────────────────────────────────── */

export default function LoadingScreen({ onComplete }) {
  const screenRef   = useRef(null);
  const topBarRef   = useRef(null);
  const botBarRef   = useRef(null);
  const grainRef    = useRef(null);
  const codeRef     = useRef(null);
  const labelRef    = useRef(null);
  const name1Ref    = useRef(null);
  const name2Ref    = useRef(null);
  const hrRef       = useRef(null);
  const roleRef     = useRef(null);
  const instRef     = useRef(null);
  const badgeRef    = useRef(null);
  const frameRef    = useRef(null); // frame counter
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!screenRef.current) return;
    let cancelled = false;
    let rafId;
    let frame = 0;

    // Film grain frame counter
    const animateGrain = () => {
      if (cancelled) return;
      frame++;
      if (frameRef.current) frameRef.current.textContent = String(frame).padStart(4, '0');
      rafId = requestAnimationFrame(animateGrain);
    };
    animateGrain();

    const run = async () => {
      const mod  = await import('gsap');
      if (cancelled) return;
      const gsap = mod.gsap || mod.default;

      // Double-check refs
      const els = [screenRef, topBarRef, botBarRef, name1Ref, name2Ref, hrRef, roleRef];
      if (els.some((r) => !r.current)) return;

      const tl = gsap.timeline({
        onComplete: () => {
          if (!cancelled) { setDone(true); onComplete?.(); }
        },
      });

      // 0.2 — letterbox bars slam in
      tl.to(topBarRef.current, { y: '0%', duration: 0.35, ease: 'power4.out' }, 0.2);
      tl.to(botBarRef.current, { y: '0%', duration: 0.35, ease: 'power4.out' }, 0.2);

      // 0.8 — film code flickers in
      if (codeRef.current) {
        tl.fromTo(codeRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.05, repeat: 5, yoyo: true, ease: 'none', repeatDelay: 0.04 },
          0.8
        );
        tl.to(codeRef.current, { opacity: 0.55, duration: 0.1 }, 1.1);
      }

      // 1.4 — "PRESENTED BY" fades in
      if (labelRef.current) {
        tl.fromTo(labelRef.current,
          { opacity: 0 },
          { opacity: 0.4, duration: 0.5, ease: 'power2.out' },
          1.4
        );
      }

      // 2.0 — "A RAHUL SISODE" wipes left→right
      tl.fromTo(name1Ref.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power4.inOut' },
        2.0
      );

      // 3.0 — "PRODUCTION" wipes
      tl.fromTo(name2Ref.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power4.inOut' },
        3.0
      );

      // 4.2 — horizontal rule draws
      tl.fromTo(hrRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.6, ease: 'power3.out' },
        4.2
      );

      // 4.8 — role wipes in
      tl.fromTo(roleRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.75, ease: 'power3.inOut' },
        4.8
      );

      // 5.8 — institution fades
      if (instRef.current) {
        tl.fromTo(instRef.current,
          { opacity: 0, y: 4 },
          { opacity: 0.5, y: 0, duration: 0.5, ease: 'power2.out' },
          5.8
        );
      }

      // 6.8 — B.E. badge slides in
      if (badgeRef.current) {
        tl.fromTo(badgeRef.current,
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' },
          6.8
        );
      }

      // 8.6 — central content fades out
      const centerEls = [
        labelRef.current, name1Ref.current, name2Ref.current,
        hrRef.current, roleRef.current, instRef.current, badgeRef.current,
        codeRef.current,
      ].filter(Boolean);
      tl.to(centerEls, { opacity: 0, y: -8, duration: 0.5, ease: 'power2.in', stagger: 0.02 }, 8.6);

      // 9.0 — letterbox bars retract
      tl.to(topBarRef.current, { y: '-100%', duration: 0.5, ease: 'power4.in' }, 9.0);
      tl.to(botBarRef.current, { y: '100%',  duration: 0.5, ease: 'power4.in' }, 9.0);

      // 9.4 — grain fades
      if (grainRef.current) {
        tl.to(grainRef.current, { opacity: 0, duration: 0.4 }, 9.4);
      }

      // 9.6 — screen to black
      tl.to(screenRef.current, { opacity: 0, duration: 0.4, ease: 'power2.in' }, 9.6);
    };

    run();
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (done) return null;

  return (
    <div ref={screenRef} className="intro" role="status" aria-label="Loading — Rahul Sisode Portfolio">

      {/* ── Film grain overlay ── */}
      <div ref={grainRef} className="intro__grain" aria-hidden="true" />

      {/* ── Vignette ── */}
      <div className="intro__vignette" aria-hidden="true" />

      {/* ── Scanlines ── */}
      <div className="intro__scanlines" aria-hidden="true" />

      {/* ── Letterbox bars ── */}
      <div ref={topBarRef} className="intro__bar intro__bar--top" aria-hidden="true">
        {/* Aspect ratio text */}
        <span className="intro__bar-text">2.39 : 1</span>
        {/* Frame counter */}
        <span ref={frameRef} className="intro__bar-frame">0000</span>
      </div>
      <div ref={botBarRef} className="intro__bar intro__bar--bot" aria-hidden="true">
        <span className="intro__bar-text">DOLBY DIGITAL · COLOR · 4K</span>
        <span className="intro__bar-text">© 2026 RAHUL SISODE</span>
      </div>

      {/* ── Film code (top-left) ── */}
      <span ref={codeRef} className="intro__code" aria-hidden="true" style={{ opacity: 0 }}>
        RSDEV · 2026 · INDIA · FRAME /001
      </span>

      {/* ── Center content ── */}
      <div className="intro__center" aria-label="Rahul Sisode — AI and Full Stack Developer">

        {/* "PRESENTED BY" */}
        <p ref={labelRef} className="intro__presented" aria-hidden="true" style={{ opacity: 0 }}>
          PRESENTED BY
        </p>

        {/* Name — two lines, each clips left→right */}
        <div className="intro__name-wrap" aria-hidden="true">
          <div
            ref={name1Ref}
            className="intro__name-line"
            style={{ clipPath: 'inset(0 100% 0 0)' }}
          >
            A RAHUL SISODE
          </div>
          <div
            ref={name2Ref}
            className="intro__name-line intro__name-line--dim"
            style={{ clipPath: 'inset(0 100% 0 0)' }}
          >
            PRODUCTION
          </div>
        </div>

        {/* HR */}
        <div
          ref={hrRef}
          className="intro__hr"
          style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
          aria-hidden="true"
        />

        {/* Role */}
        <p
          ref={roleRef}
          className="intro__role"
          style={{ clipPath: 'inset(0 100% 0 0)' }}
          aria-hidden="true"
        >
          AI &amp; FULL STACK DEVELOPER
        </p>

        {/* Institution */}
        <p ref={instRef} className="intro__inst" aria-hidden="true" style={{ opacity: 0 }}>
          GHARDA INSTITUTE OF TECHNOLOGY &nbsp;·&nbsp; MUMBAI UNIVERSITY
        </p>

        {/* B.E. completed badge */}
        <div ref={badgeRef} className="intro__badge" aria-hidden="true" style={{ opacity: 0 }}>
          <span className="intro__badge-dot" />
          B.E. AI &amp; ML — COMPLETED 2026
        </div>
      </div>
    </div>
  );
}
