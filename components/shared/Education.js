'use client';
import { motion } from 'framer-motion';
import { EDUCATION } from '../../lib/resumeData';

export default function Education({ activePath }) {
  const accentColors = {
    developer: '#3B82F6', marketing: '#F59E0B', security: '#10B981', all: '#E8FF00',
  };
  const accent = accentColors[activePath] || '#E8FF00';

  return (
    <section id="education" style={{ background: '#0A0B0D', padding: '100px 5vw', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '60px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: accent, letterSpacing: '0.2em', marginBottom: '8px' }}>
            // EDUCATION
          </p>
          <h2 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: '700', color: '#F2F3F5', letterSpacing: '-0.03em', lineHeight: 1 }}>
            ACADEMIC<br />
            <span style={{ color: accent }}>BACKGROUND.</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: '#111318', border: `1px solid ${accent}22`,
                borderRadius: '16px', padding: '32px', position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${accent}, transparent)` }} />
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{edu.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: '600', color: '#F2F3F5', marginBottom: '8px', lineHeight: 1.4 }}>
                {edu.degree}
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>{edu.institute}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4B5563' }}>{edu.period}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: accent }}>{edu.result}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
