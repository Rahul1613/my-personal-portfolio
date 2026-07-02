'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Clean, fast loading screen — 2.5 seconds, no cinematic dramatics
export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0=loading, 1=ready, 2=done
  const [done, setDone] = useState(false);

  const STEPS = [
    'Initialising workspace...',
    'Loading projects...',
    'Preparing personas...',
    'Ready.',
  ];

  useEffect(() => {
    const intervals = [
      setTimeout(() => setProgress(30),  200),
      setTimeout(() => setProgress(60),  600),
      setTimeout(() => setProgress(85),  1100),
      setTimeout(() => setProgress(100), 1600),
      setTimeout(() => setPhase(1),      1700),
      setTimeout(() => setDone(true),    2400),
    ];
    return () => intervals.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (done) onComplete?.();
  }, [done, onComplete]);

  const currentStep = Math.floor((progress / 100) * (STEPS.length - 1));

  if (done) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#060709',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Logo mark */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              width: '52px', height: '52px', borderRadius: '14px',
              background: '#6366F1',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '28px',
              boxShadow: '0 0 40px rgba(99,102,241,0.4)',
            }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#fff', fontWeight: '700', lineHeight: 1 }}>R</span>
          </motion.div>

          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: 'var(--font-grotesk, var(--font-body))', fontSize: '18px', fontWeight: '700', color: '#F2F3F5', letterSpacing: '-0.02em', marginBottom: '6px' }}
          >
            Rahul Sisode
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4B5563', letterSpacing: '0.12em', marginBottom: '36px' }}
          >
            Developer · Marketer · Security
          </motion.p>

          {/* Progress bar */}
          <div style={{ width: '200px', height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '1px', overflow: 'hidden', marginBottom: '16px' }}>
            <motion.div
              style={{ height: '100%', borderRadius: '1px', background: 'linear-gradient(90deg, #6366F1, #818CF8)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>

          {/* Status text */}
          <motion.p
            key={currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#374151', letterSpacing: '0.1em' }}
          >
            {STEPS[currentStep]}
          </motion.p>

          {/* Ready state */}
          {phase === 1 && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#10B981', letterSpacing: '0.15em', marginTop: '12px' }}
            >
              ✓ READY
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
