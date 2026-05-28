'use client';
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef  = useRef(null);
  const textRef = useRef(null);
  const pos  = useRef({ x: 0, y: 0 });
  const cur  = useRef({ x: 0, y: 0 });
  const raf  = useRef(null);
  const [state, setState] = useState('default');
  const [label, setLabel] = useState('');

  useEffect(() => {
    const ring = ringRef.current;
    const dot  = dotRef.current;
    const txt  = textRef.current;
    if (!ring) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;

      if (el.closest('.three-canvas')) {
        setState('three'); setLabel('');
      } else if (el.closest('.pcard')) {
        setState('card'); setLabel('VIEW ↗');
      } else if (el.closest('a') || el.closest('button')) {
        setState('link'); setLabel('');
      } else {
        setState('default'); setLabel('');
      }
    };

    const loop = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.1;
      cur.current.y += (pos.current.y - cur.current.y) * 0.1;

      const x = cur.current.x;
      const y = cur.current.y;

      if (ring) { ring.style.left = `${x}px`; ring.style.top = `${y}px`; }
      if (dot)  { dot.style.left  = `${x}px`; dot.style.top  = `${y}px`; }
      if (txt)  { txt.style.left  = `${x}px`; txt.style.top  = `${y}px`; }

      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={`cursor__ring ${state}`} aria-hidden="true" />
      <div ref={dotRef}  className={`cursor__dot  ${state}`} aria-hidden="true" />
      <div ref={textRef} className={`cursor__text ${label ? 'show' : ''}`} aria-hidden="true">{label}</div>
    </>
  );
}
