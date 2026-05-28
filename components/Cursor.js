'use client';
import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef   = useRef(null);
  const labelRef = useRef(null);
  const pos  = useRef({ x: -100, y: -100 });
  const curr = useRef({ x: -100, y: -100 });
  const raf  = useRef(null);
  const [state, setState] = useState('default'); // default | expanded | hidden
  const [label, setLabel] = useState('');

  useEffect(() => {
    const isTouchDevice = () => window.matchMedia('(hover: none)').matches;
    if (isTouchDevice()) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;

      if (el.closest('.hero__canvas')) {
        setState('hidden'); setLabel('');
      } else if (el.closest('.pcard')) {
        setState('expanded'); setLabel('VIEW');
      } else if (el.closest('.d3-node')) {
        setState('expanded'); setLabel('');
      } else if (el.closest('[data-drag]')) {
        setState('expanded'); setLabel('DRAG');
      } else if (el.closest('a') || el.closest('button')) {
        setState('expanded'); setLabel('');
      } else {
        setState('default'); setLabel('');
      }
    };

    // Lerp loop — 80ms weighted follow
    const tick = () => {
      const lx = curr.current.x + (pos.current.x - curr.current.x) * 0.13;
      const ly = curr.current.y + (pos.current.y - curr.current.y) * 0.13;
      curr.current = { x: lx, y: ly };

      const dot = dotRef.current;
      const lbl = labelRef.current;
      if (dot) { dot.style.left = `${lx}px`; dot.style.top = `${ly}px`; }
      if (lbl) { lbl.style.left = `${lx}px`; lbl.style.top = `${ly}px`; }

      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${state === 'expanded' ? 'expanded' : ''} ${state === 'hidden' ? 'hidden' : ''}`}
        aria-hidden="true"
      />
      <div
        ref={labelRef}
        className={`cursor-label ${label ? 'show' : ''}`}
        aria-hidden="true"
      >
        {label}
      </div>
    </>
  );
}
