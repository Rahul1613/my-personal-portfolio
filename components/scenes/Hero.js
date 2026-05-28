'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Hero() {
  const canvasRef    = useRef(null);
  const sectionRef   = useRef(null);
  const contentRef   = useRef(null);
  // Holographic card refs
  const cardWrapRef  = useRef(null);  // outer container — tilts
  const cardInnerRef = useRef(null);  // inner photo — counter-translates (depth)
  const glareRef     = useRef(null);  // specular highlight
  const holoPrismRef = useRef(null);  // rainbow shimmer
  const rimRef       = useRef(null);  // edge rim light

  const stateRef  = useRef({ scrollProgress: 0, targetX: 0, targetY: 0 });
  const cardState = useRef({
    // current (lerped)
    rx: 0, ry: 0,
    // target
    tx: 0, ty: 0,
    // glare position
    gx: 50, gy: 50,
    // holo shift
    hx: 0, hy: 0,
    inside: false,
  });
  const rafRef      = useRef(null);
  const rendererRef = useRef(null);
  const composerRef = useRef(null);
  const groupRef    = useRef(null);
  const bloomRef    = useRef(null);
  const cardRafRef  = useRef(null);

  // ── Three.js helix (left side background) ──────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let THREE, renderer, composer, scene, camera, group, bloomPass;

    const init = async () => {
      THREE = (await import('three')).default || await import('three');
      const { EffectComposer } = await import('three/examples/jsm/postprocessing/EffectComposer.js');
      const { RenderPass }     = await import('three/examples/jsm/postprocessing/RenderPass.js');
      const { UnrealBloomPass }= await import('three/examples/jsm/postprocessing/UnrealBloomPass.js');

      const W = window.innerWidth, H = window.innerHeight;
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 1);
      renderer.toneMapping = THREE.ReinhardToneMapping;
      renderer.toneMappingExposure = 1.2;
      rendererRef.current = renderer;

      scene  = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
      camera.position.set(0, 0, 8);
      const light = new THREE.PointLight(0xffffff, 1.2);
      light.position.set(2, 3, 4);
      scene.add(light);

      group = new THREE.Group();
      group.position.set(-2.2, 0, 0);
      scene.add(group);
      groupRef.current = group;

      const makeHelix = (phase) => {
        const pts = [];
        for (let i = 0; i <= 200; i++) {
          const t = i / 200;
          const a = t * Math.PI * 2 * 6 + phase;
          pts.push(new THREE.Vector3(Math.sin(a) * 0.5, t * 4 - 2, Math.cos(a) * 0.5));
        }
        return new THREE.CatmullRomCurve3(pts);
      };

      const mat1 = new THREE.MeshPhongMaterial({ color: 0x222222, emissive: 0x0a0a0a, emissiveIntensity: 0.5 });
      const mat2 = new THREE.MeshPhongMaterial({ color: 0x111111 });
      group.add(new THREE.Mesh(new THREE.TubeGeometry(makeHelix(0),       200, 0.035, 8, false), mat1));
      group.add(new THREE.Mesh(new THREE.TubeGeometry(makeHelix(Math.PI), 200, 0.035, 8, false), mat2));

      const rungMat = new THREE.MeshPhongMaterial({ color: 0xE8FF00, emissive: 0xE8FF00, emissiveIntensity: 0.7 });
      for (let i = 0; i < 24; i++) {
        const t = i / 24;
        const a = t * Math.PI * 2 * 6;
        const y = t * 4 - 2;
        const p1 = new THREE.Vector3(Math.sin(a) * 0.5, y, Math.cos(a) * 0.5);
        const p2 = new THREE.Vector3(-Math.sin(a) * 0.5, y, -Math.cos(a) * 0.5);
        const len = p1.distanceTo(p2);
        const mid = p1.clone().add(p2).multiplyScalar(0.5);
        const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, len, 6), rungMat);
        rung.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), p2.clone().sub(p1).normalize());
        rung.position.copy(mid);
        group.add(rung);
      }

      bloomPass = new UnrealBloomPass(new THREE.Vector2(W, H), 0.6, 0.4, 0.7);
      bloomRef.current = bloomPass;
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(bloomPass);
      composerRef.current = composer;

      const onResize = () => {
        const w = window.innerWidth, h = window.innerHeight;
        camera.aspect = w / h; camera.updateProjectionMatrix();
        renderer.setSize(w, h); composer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);

      const st = stateRef.current;
      const tick = () => {
        rafRef.current = requestAnimationFrame(tick);
        const p = st.scrollProgress;
        group.rotation.y += 0.003 + p * 0.01;
        group.scale.setScalar(1 - p * 0.5);
        group.position.x = -2.2 - p * 2;
        if (bloomRef.current) bloomRef.current.strength = 0.6 * (1 - p);
        composer.render();
      };
      tick();
      return () => window.removeEventListener('resize', onResize);
    };

    init();
    return () => { cancelAnimationFrame(rafRef.current); rendererRef.current?.dispose(); };
  }, []);

  // ── Holographic card — mouse interaction ───────────────────
  useEffect(() => {
    const wrap  = cardWrapRef.current;
    const inner = cardInnerRef.current;
    const glare = glareRef.current;
    const holo  = holoPrismRef.current;
    const rim   = rimRef.current;
    if (!wrap || !inner || !glare) return;

    const cs = cardState.current;
    const LERP = 0.09;
    const MAX_TILT = 22; // degrees

    // Lerp loop — runs at 60fps
    const lerpLoop = () => {
      cardRafRef.current = requestAnimationFrame(lerpLoop);

      // Smooth lerp toward target (or back to 0 when mouse leaves)
      cs.rx += (cs.tx - cs.rx) * LERP;
      cs.ry += (cs.ty - cs.ry) * LERP;
      cs.gx += (cs.hx - cs.gx) * LERP;
      cs.gy += (cs.hy - cs.gy) * LERP;

      // Apply tilt to the wrap
      wrap.style.transform = `perspective(900px) rotateX(${cs.rx}deg) rotateY(${cs.ry}deg)`;

      // Photo moves OPPOSITE — creates window/depth illusion
      const px = cs.ry * -0.55;
      const py = cs.rx * 0.55;
      inner.style.transform = `translate(${px}px, ${py}px) scale(1.06)`;

      // Specular glare follows mouse exactly
      if (glare) {
        glare.style.setProperty('--gx', `${cs.gx}%`);
        glare.style.setProperty('--gy', `${cs.gy}%`);
        const gOpacity = cs.inside ? 1 : 0;
        glare.style.opacity = String(gOpacity);
      }

      // Holographic shimmer: hue rotates based on tilt angle
      if (holo) {
        const hue = (cs.ry * 4 + cs.rx * 3 + 200) % 360;
        const hue2 = (hue + 90) % 360;
        holo.style.backgroundImage = `
          linear-gradient(
            ${115 + cs.ry * 2}deg,
            hsla(${hue},100%,60%,0) 0%,
            hsla(${hue},100%,60%,0.06) 25%,
            hsla(${hue2},100%,60%,0.12) 50%,
            hsla(${hue2 + 60},100%,60%,0.06) 75%,
            hsla(${hue2 + 120},100%,60%,0) 100%
          )
        `;
        holo.style.opacity = cs.inside ? '1' : '0';
      }

      // Rim light: edge glows based on direction
      if (rim) {
        const rimX = cs.ry * -1.5;
        const rimY = cs.rx * 1.5;
        const rimIntensity = Math.sqrt(cs.rx * cs.rx + cs.ry * cs.ry) / MAX_TILT;
        rim.style.boxShadow = cs.inside
          ? `inset ${rimX}px ${rimY}px 20px rgba(232,255,0,${rimIntensity * 0.25}),
             ${-rimX * 0.4}px ${-rimY * 0.4}px 40px rgba(0,0,0,0.7)`
          : '0 20px 60px rgba(0,0,0,0.5)';
      }
    };
    lerpLoop();

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      // Normalized -1 to 1
      const nx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      const ny = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
      // Clamp
      const cx = Math.max(-1, Math.min(1, nx));
      const cy = Math.max(-1, Math.min(1, ny));

      cs.tx = cy * -MAX_TILT;
      cs.ty = cx *  MAX_TILT;
      // Glare position as percentage
      cs.hx = ((e.clientX - rect.left) / rect.width)  * 100;
      cs.hy = ((e.clientY - rect.top)  / rect.height) * 100;
      cs.inside = true;
    };

    const onLeave = () => {
      cs.tx = 0; cs.ty = 0;
      cs.hx = 50; cs.hy = 50;
      cs.inside = false;
    };

    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(cardRafRef.current);
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // ── GSAP ScrollTrigger pin ─────────────────────────────────
  useEffect(() => {
    const setup = async () => {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const content = contentRef.current;
      const card    = cardWrapRef.current;
      if (!section) return;

      const waitForLenis = () => new Promise((res) => {
        const t = setInterval(() => { if (window.__lenis) { clearInterval(t); res(); } }, 50);
      });
      await waitForLenis();

      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(val) {
          if (window.__lenis) {
            if (val !== undefined) window.__lenis.scrollTo(val, { immediate: true });
            return window.__lenis.scroll;
          }
          return document.body.scrollTop;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
      });

      window.__lenis?.on('scroll', ScrollTrigger.update);

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=220%',
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          stateRef.current.scrollProgress = self.progress;

          if (content) {
            const t = Math.max(0, (self.progress - 0.35) / 0.65);
            content.style.opacity = String(Math.max(0, 1 - t * 1.6));
            content.style.transform = `translateY(${-50 * t}px)`;
          }

          // Card drifts upward on scroll
          if (card) {
            const y = self.progress * -160;
            const sc = 1 - self.progress * 0.2;
            const op = Math.max(0, 1 - self.progress * 2.4);
            card.style.marginTop   = `${y}px`;
            card.style.scale       = String(sc);
            card.style.opacity     = String(op);
          }
        },
      });

      ScrollTrigger.refresh();
    };
    const t = setTimeout(setup, 450);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={sectionRef} className="scene hero" id="scene-hero" aria-label="Rahul Sisode — Portfolio">
      {/* Helix canvas */}
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />

      {/* ── Holographic photo card ── */}
      <div className="hero__card-zone" aria-hidden="true">
        {/* Outer wrap — tilts with mouse */}
        <div
          ref={cardWrapRef}
          className="holo-card"
          style={{ willChange: 'transform, opacity, margin-top, scale' }}
          role="img"
          aria-label="Rahul Sisode portrait"
        >
          {/* Inner — counter-moves for depth parallax */}
          <div ref={cardInnerRef} className="holo-card__inner" style={{ willChange: 'transform' }}>
            <Image
              src="/rahul-photo.jpg"
              alt="Rahul Sisode"
              fill
              sizes="380px"
              style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
              priority
            />
          </div>

          {/* Specular glare — follows mouse */}
          <div ref={glareRef} className="holo-card__glare" style={{ opacity: 0 }} aria-hidden="true" />

          {/* Holographic prism shimmer */}
          <div ref={holoPrismRef} className="holo-card__prism" style={{ opacity: 0 }} aria-hidden="true" />

          {/* Rim light border */}
          <div ref={rimRef} className="holo-card__rim" aria-hidden="true" />

          {/* Static grain */}
          <div className="holo-card__grain" aria-hidden="true" />

          {/* Bottom info tag — floats in 3D */}
          <div className="holo-card__tag" aria-hidden="true">
            <span className="holo-card__tag-name">RAHUL SISODE</span>
            <span className="holo-card__tag-role">AI &amp; FULL STACK DEVELOPER</span>
          </div>
        </div>
      </div>

      {/* ── Text content ── */}
      <div ref={contentRef} className="hero__content" style={{ willChange: 'opacity, transform' }}>
        <span className="hero__eyebrow">001 &nbsp;/&nbsp; AI &amp; FULL STACK DEVELOPER</span>

        <h1 className="hero__headline" aria-label="Rahul Sisode — AI and Full Stack Developer">
          RAHUL<br />
          <span className="accent">SISODE.</span>
        </h1>

        <p className="hero__sub">
          B.E. AI &amp; ML &nbsp;·&nbsp; CGPA 6.57<br />
          Django · React · Python · Full Stack
        </p>

        <div className="hero__badges">
          <span className="hero__badge">Open to work</span>
          <span className="hero__badge-dot" />
          <span className="hero__badge">Ratnagiri, India</span>
        </div>

        <p className="hero__card-hint" aria-hidden="true">↗ hover the card</p>
      </div>

      {/* Scroll cue */}
      <div className="scroll-cue" aria-hidden="true">
        <span className="scroll-cue__text">SCROLL</span>
        <div className="scroll-cue__line"><div className="scroll-cue__dot" /></div>
      </div>
    </section>
  );
}
