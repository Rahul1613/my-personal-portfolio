'use client';
import { motion } from 'framer-motion';
import { EDUCATION } from '../../lib/resumeData';

export default function Education({ activePath }) {
  const accentMap = { developer: '#3B82F6', marketing: '#F59E0B', security: '#10B981', all: '#6366F1' };
  const accent = accentMap[activePath] || '#6366F1';

  return (
    <section id="education" style={{ background: '#0A0B0D', padding: '80px 5vw', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '40px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4B5563', letterSpacing: '0.18em', marginBottom: '8px' }}>ACADEMIC BACKGROUND</p>
          <h2 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: '700', color: '#F2F3F5', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Education
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px',
                padding: '28px', position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.25s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${accent}30`}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${accent}, transparent)` }} />
              <div style={{ fontSize: '28px', marginBottom: '14px' }}>{edu.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-grotesk, var(--font-body))', fontSize: '16px', fontWeight: '600', color: '#F2F3F5', marginBottom: '6px', lineHeight: 1.4 }}>{edu.degree}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}>{edu.institute}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#4B5563' }}>{edu.period}</span>
                <span style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: '18px', fontWeight: '700', color: accent }}>{edu.result}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
