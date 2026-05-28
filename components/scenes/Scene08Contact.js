'use client';
import { useEffect, useRef } from 'react';

export default function Scene08Contact({ activeScene }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const mouseRef  = useRef({ x: 0.5, y: 0.5 });
  const initiated = useRef(false);
  const ref = useRef(null);

  // Entrance animation
  useEffect(() => {
    if (activeScene !== 7) return;
    const run = async () => {
      const gsap = (await import('gsap')).gsap;
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el.querySelectorAll('.s08__eyebrow, .s08__headline, .s08__body, .s08__details, .s08__links'),
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 1, ease: 'power4.out', stagger: .1 }
      );
    };
    run();
  }, [activeScene]);

  // Three.js ∞
  useEffect(() => {
    if (initiated.current) return;
    initiated.current = true;

    let THREE, renderer, scene, camera, mesh, glowMesh;

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
      camera.position.set(0, 0, 5.5);

      // Lemniscate (∞ curve)
      class Lemniscate extends THREE.Curve {
        getPoint(t) {
          const a = t * Math.PI * 2;
          const d = 1 + Math.sin(a) ** 2;
          const x = 1.9 * Math.cos(a) / d;
          const y = 1.9 * Math.sin(a) * Math.cos(a) / d;
          return new THREE.Vector3(x, y, 0);
        }
      }

      const curve = new Lemniscate();
      const tubeGeo = new THREE.TubeGeometry(curve, 240, 0.035, 10, true);
      mesh = new THREE.Mesh(tubeGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: .92, transparent: true }));
      scene.add(mesh);

      // Glow layer
      const glowGeo = new THREE.TubeGeometry(curve, 240, 0.09, 10, true);
      glowMesh = new THREE.Mesh(glowGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: .1, transparent: true }));
      scene.add(glowMesh);

      const tick = () => {
        animRef.current = requestAnimationFrame(tick);
        const t = Date.now() * 0.001;
        const dx = mouseRef.current.x - 0.5;
        const dy = mouseRef.current.y - 0.5;
        const prox = Math.sqrt(dx * dx + dy * dy);
        const spd = 0.005 + prox * 0.025;

        mesh.rotation.z += spd;
        glowMesh.rotation.z += spd;
        mesh.rotation.x = Math.sin(t * 0.7) * 0.18;
        glowMesh.rotation.x = mesh.rotation.x;

        renderer.render(scene, camera);
      };
      tick();

      const onResize = () => {
        if (!canvas) return;
        camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      };
      window.addEventListener('resize', onResize);
    };

    const onMove = (e) => {
      const c = canvasRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top)  / rect.height,
      };
    };
    window.addEventListener('mousemove', onMove);

    init();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animRef.current);
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <section ref={ref} className="scene s08" id="scene-08" aria-label="Contact — Final Transmission">
      <div className="s08__left">
        <p className="s08__eyebrow">Let&apos;s Connect</p>

        <h2 className="s08__headline">
          Let&apos;s build<br />
          something<br />
          real.
        </h2>

        <p className="s08__body">
          Available for full-time roles, freelance projects,<br />
          and open-source collaboration.
        </p>

        <address className="s08__details" style={{ fontStyle: 'normal' }}>
          <span className="s08__detail">sisoderahul643@gmail.com</span>
          <span className="s08__detail">+91-9730213645</span>
          <span className="s08__detail">Ratnagiri, Maharashtra, India</span>
        </address>

        <nav className="s08__links" aria-label="Social links">
          <a href="https://linkedin.com/in/rahul-sisode"  target="_blank" rel="noopener noreferrer" className="s08__link" id="linkedin-link">LinkedIn ↗</a>
          <a href="https://github.com/Rahul1613"           target="_blank" rel="noopener noreferrer" className="s08__link" id="github-link">GitHub ↗</a>
          <a href="https://linkedin.com/in/rahul-sisode"  target="_blank" rel="noopener noreferrer" className="s08__link" id="resume-link">Resume ↗</a>
        </nav>
      </div>

      <canvas ref={canvasRef} className="s08__canvas three-canvas" aria-hidden="true" />

      <footer className="s08__footer">
        <p className="s08__footer-text">
          Rahul Sisode &nbsp;·&nbsp; Built with Next.js + Three.js + GSAP &nbsp;·&nbsp; 2025
        </p>
      </footer>
    </section>
  );
}
