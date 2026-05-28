'use client';
import { useEffect, useRef } from 'react';

export default function Scene01Signal({ activeScene }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const initiated = useRef(false);
  const contentRef = useRef(null);

  // GSAP entrance animation when this scene becomes active
  useEffect(() => {
    if (activeScene !== 0) return;
    const run = async () => {
      const gsap = (await import('gsap')).gsap;
      const el = contentRef.current;
      if (!el) return;

      gsap.killTweensOf(el.querySelectorAll('.s01__eyebrow, .s01__headline .line, .s01__desc, .s01__ctas, .scroll-cue'));

      const tl = gsap.timeline();
      tl.to(el.querySelector('.s01__eyebrow'), { opacity: 1, y: 0, duration: .8, ease: 'power3.out' }, 0.1)
        .to(el.querySelectorAll('.s01__headline .line'), { opacity: 1, y: 0, duration: 1, ease: 'power4.out', stagger: .12 }, 0.25)
        .to(el.querySelector('.s01__desc'),  { opacity: 1, y: 0, duration: .8, ease: 'power3.out' }, 0.7)
        .to(el.querySelector('.s01__ctas'), { opacity: 1, y: 0, duration: .8, ease: 'power3.out' }, 0.85)
        .to(el.querySelector('.scroll-cue'), { opacity: 1, duration: .6, ease: 'power2.out' }, 1.2);
    };
    run();
  }, [activeScene]);

  // Three.js
  useEffect(() => {
    if (initiated.current) return;
    initiated.current = true;

    let THREE, renderer, scene, camera, sphere, photoPlane, planeMat;
    let mouse = { x: 0, y: 0 };
    let rotX = 0, rotY = 0;

    const init = async () => {
      THREE = await import('three');
      const canvas = canvasRef.current;
      if (!canvas) return;

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      renderer.setClearColor(0x000000, 0);

      scene  = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
      camera.position.set(0, 0, 6);

      // ── Wireframe sphere ──────────────────────────────────────
      const geo = new THREE.IcosahedronGeometry(1.7, 3);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xC4B49A,
        wireframe: true,
        opacity: 0.45,
        transparent: true,
      });
      sphere = new THREE.Mesh(geo, mat);
      sphere.position.set(0.3, 0, 0);
      scene.add(sphere);

      const basePos = geo.attributes.position.array.slice();
      const posCount = geo.attributes.position.count;

      // ── Photo plane with duotone shader ──────────────────────
      const loader = new THREE.TextureLoader();
      loader.load('/rahul-photo.jpg', (tex) => {
        const planeGeo = new THREE.PlaneGeometry(2.4, 3.2, 24, 24);
        planeMat = new THREE.ShaderMaterial({
          uniforms: {
            uTex:   { value: tex },
            uTime:  { value: 0 },
            uWarm:  { value: new THREE.Color(0xC4B49A) },
            uDark:  { value: new THREE.Color(0x0A0A0B) },
          },
          vertexShader: `
            uniform float uTime;
            varying vec2 vUv;
            void main() {
              vUv = uv;
              vec3 p = position;
              p.z += sin(p.x * 1.8 + uTime * 0.6) * 0.05
                   + sin(p.y * 2.4 + uTime * 0.5) * 0.04;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D uTex;
            uniform vec3 uWarm;
            uniform vec3 uDark;
            varying vec2 vUv;
            void main() {
              vec4 c = texture2D(uTex, vUv);
              float lum = dot(c.rgb, vec3(0.299, 0.587, 0.114));
              vec3 duo = mix(uDark, uWarm, lum * 1.2);
              gl_FragColor = vec4(duo, c.a * 0.88);
            }
          `,
          transparent: true,
          side: THREE.DoubleSide,
        });

        photoPlane = new THREE.Mesh(planeGeo, planeMat);
        photoPlane.position.set(0.9, 0, -1.0);
        scene.add(photoPlane);
      });

      // ── Animate ───────────────────────────────────────────────
      const tick = () => {
        animRef.current = requestAnimationFrame(tick);
        const t = Date.now() * 0.001;

        // Morph sphere
        const arr = geo.attributes.position.array;
        for (let i = 0; i < posCount; i++) {
          const ix = i * 3;
          const n = Math.sin(basePos[ix] * 2.5 + t * 0.35) * 0.12;
          arr[ix]   = basePos[ix]   * (1 + n);
          arr[ix+1] = basePos[ix+1] * (1 + n * 0.9);
          arr[ix+2] = basePos[ix+2] * (1 + n);
        }
        geo.attributes.position.needsUpdate = true;

        // Parallax
        rotY += (mouse.x * 0.06 - rotY) * 0.04;
        rotX += (-mouse.y * 0.04 - rotX) * 0.04;
        camera.position.x = Math.sin(rotY) * 6;
        camera.position.y = rotX * 2.5;
        camera.lookAt(0, 0, 0);

        sphere.rotation.y = t * 0.1;
        sphere.rotation.x = Math.sin(t * 0.06) * 0.15;

        if (photoPlane) {
          photoPlane.rotation.y = -rotY * 0.35;
          photoPlane.position.x = 0.9 + rotY * 0.25;
        }
        if (planeMat) planeMat.uniforms.uTime.value = t;

        renderer.render(scene, camera);
      };
      tick();

      const onResize = () => {
        if (!canvas || !renderer) return;
        const w = canvas.offsetWidth, h = canvas.offsetHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);
    };

    const onMouse = (e) => {
      mouse.x = (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouse);
    init();

    return () => {
      window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(animRef.current);
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <section className="scene s01" id="scene-01" aria-label="Hero — Signal">
      <div ref={contentRef} className="s01__left">
        <p className="s01__eyebrow">Rahul Sisode &nbsp;·&nbsp; AI &amp; Full Stack Developer</p>

        <h1 className="s01__headline" aria-label="Building Intelligent Systems.">
          <span className="line">Building</span>
          <span className="line">Intelligent</span>
          <span className="line">Systems.</span>
        </h1>

        <p className="s01__desc">
          From neural networks to production SaaS — end to end.
        </p>

        <div className="s01__ctas">
          <a href="#scene-04" className="cta" id="explore-work" onClick={(e) => { e.preventDefault(); }}>
            Explore Work ↓
          </a>
          <a href="#scene-08" className="cta" id="get-in-touch" onClick={(e) => { e.preventDefault(); }}>
            Get in Touch →
          </a>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <div className="scroll-cue__line">
            <div className="scroll-cue__dot" />
          </div>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="s01__canvas three-canvas"
        aria-hidden="true"
        aria-label="3D wireframe sphere with portrait"
      />
    </section>
  );
}
