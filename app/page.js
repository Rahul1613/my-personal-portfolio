'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports — all client-only
const LoadingScreen = dynamic(() => import('../components/LoadingScreen'),           { ssr: false });
const Cursor        = dynamic(() => import('../components/Cursor'),                  { ssr: false });
const Navigation    = dynamic(() => import('../components/Navigation'),              { ssr: false });
const Hero          = dynamic(() => import('../components/scenes/Hero'),             { ssr: false });
const Identity      = dynamic(() => import('../components/scenes/Identity'),         { ssr: false });
const Work          = dynamic(() => import('../components/scenes/Work'),             { ssr: false });
const Skills        = dynamic(() => import('../components/scenes/Skills'),           { ssr: false });
const Timeline      = dynamic(() => import('../components/scenes/Timeline'),         { ssr: false });
const Contact       = dynamic(() => import('../components/scenes/Contact'),          { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  // Initialize Lenis + GSAP ScrollTrigger bridge
  useEffect(() => {
    if (!loaded) return;

    let lenis;

    const init = async () => {
      const LenisModule  = await import('@studio-freight/lenis');
      const { gsap }     = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);

      const Lenis = LenisModule.default || LenisModule.Lenis;

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      // Store globally so scenes can use lenis.scrollTo()
      window.__lenis = lenis;

      // Bridge Lenis → GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.refresh();
    };

    init();

    return () => {
      if (lenis) {
        lenis.destroy();
        delete window.__lenis;
      }
    };
  }, [loaded]);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      <Cursor />
      {loaded && (
        <>
          <Navigation />
          <main id="main-content">
            <Hero />
            <Identity />
            <Work />
            <Skills />
            <Timeline />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}
