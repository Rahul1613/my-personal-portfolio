'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Shared shell
const LoadingScreen = dynamic(() => import('../components/LoadingScreen'),           { ssr: false });
const Cursor        = dynamic(() => import('../components/Cursor'),                  { ssr: false });
const Navigation    = dynamic(() => import('../components/Navigation'),              { ssr: false });
const Hero          = dynamic(() => import('../components/scenes/Hero'),             { ssr: false });
const PathSelect    = dynamic(() => import('../components/PathSelect'),              { ssr: false });
const Education     = dynamic(() => import('../components/shared/Education'),        { ssr: false });
const Certifications = dynamic(() => import('../components/shared/Certifications'), { ssr: false });
const Contact       = dynamic(() => import('../components/shared/ContactSection'),   { ssr: false });

// Persona zones
const DeveloperZone  = dynamic(() => import('../components/personas/DeveloperZone'),  { ssr: false });
const MarketerZone   = dynamic(() => import('../components/personas/MarketerZone'),   { ssr: false });
const SecurityZone   = dynamic(() => import('../components/personas/SecurityZone'),   { ssr: false });

function PortfolioContent() {
  const [loaded, setLoaded] = useState(false);
  const [activePath, setActivePath] = useState('all'); // 'all' | 'developer' | 'marketing' | 'security'
  const [transitioning, setTransitioning] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read path from URL on mount
  useEffect(() => {
    const path = searchParams.get('path');
    if (path && ['developer', 'marketing', 'security'].includes(path)) {
      setActivePath(path);
    }
  }, [searchParams]);

  // Apply accent CSS variable on path change
  useEffect(() => {
    const accents = {
      developer: { from: '#3B82F6', to: '#22D3EE', mid: '#60A5FA' },
      marketing:  { from: '#F59E0B', to: '#F97316', mid: '#FBBF24' },
      security:   { from: '#10B981', to: '#059669', mid: '#34D399' },
      all:        { from: '#E8FF00', to: '#C4B49A', mid: '#E8FF00' },
    };
    const a = accents[activePath] || accents.all;
    document.documentElement.style.setProperty('--accent-from', a.from);
    document.documentElement.style.setProperty('--accent-to', a.to);
    document.documentElement.style.setProperty('--accent-mid', a.mid);
  }, [activePath]);

  // Lenis + GSAP init
  useEffect(() => {
    if (!loaded) return;
    let lenis;
    const init = async () => {
      const LenisModule  = await import('@studio-freight/lenis');
      const { gsap }     = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      const Lenis = LenisModule.default || LenisModule.Lenis;
      lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true, smoothTouch: false });
      window.__lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();
    };
    init();
    return () => { if (lenis) { lenis.destroy(); delete window.__lenis; } };
  }, [loaded]);

  const handleSelectPath = (path) => {
    setTransitioning(true);
    setTimeout(() => {
      setActivePath(path);
      router.push(`/?path=${path}`, { scroll: false });
      setTransitioning(false);
      // Scroll to persona zone
      setTimeout(() => {
        const el = document.getElementById('persona-zone');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 600);
  };

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      <Cursor />

      {/* Path transition overlay */}
      {transitioning && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'var(--accent-from, #3B82F6)',
            opacity: 0.15,
            pointerEvents: 'none',
            transition: 'opacity 0.3s',
          }}
        />
      )}

      {loaded && (
        <>
          <Navigation activePath={activePath} />
          <main id="main-content">
            {/* Always shown */}
            <Hero activePath={activePath} />
            <PathSelect onSelect={handleSelectPath} activePath={activePath} />

            {/* Persona Zone — content swaps based on selection */}
            <section id="persona-zone">
              {(activePath === 'all' || activePath === 'developer') && (
                <DeveloperZone highlighted={activePath === 'developer'} />
              )}
              {(activePath === 'all' || activePath === 'marketing') && (
                <MarketerZone highlighted={activePath === 'marketing'} />
              )}
              {(activePath === 'all' || activePath === 'security') && (
                <SecurityZone highlighted={activePath === 'security'} />
              )}
            </section>

            {/* Shared sections */}
            <Education activePath={activePath} />
            <Certifications activePath={activePath} />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div style={{ background: '#0A0B0D', minHeight: '100vh' }} />}>
      <PortfolioContent />
    </Suspense>
  );
}
