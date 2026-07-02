'use client';
import { motion } from 'framer-motion';
import { CERTIFICATIONS } from '../../lib/resumeData';

const PATH_TAGS = { developer: 'dev', marketing: 'marketing', security: 'security', all: null };

const CERT_EMOJIS = { dev: '💻', marketing: '📊', security: '🔐' };

export default function Certifications({ activePath }) {
  const filterTag = PATH_TAGS[activePath];
  const accentColors = { developer: '#3B82F6', marketing: '#F59E0B', security: '#10B981', all: '#E8FF00' };
  const accent = accentColors[activePath] || '#E8FF00';

  return (
    <section id="certifications" style={{ background: '#090A0C', padding: '100px 5vw', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '20px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: accent, letterSpacing: '0.2em', marginBottom: '8px' }}>
            // CERTIFICATIONS
          </p>
          <h2 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: '700', color: '#F2F3F5', letterSpacing: '-0.03em', lineHeight: 1 }}>
            CREDENTIALS.<br />
          </h2>
          {filterTag && (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#6B7280', marginTop: '12px' }}>
              Showing <span style={{ color: accent }}>{activePath.toUpperCase()}</span> relevant certs highlighted. Others dimmed.
            </p>
          )}
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', marginTop: '40px' }}>
          {CERTIFICATIONS.map((cert, i) => {
            const isHighlighted = !filterTag || cert.tags.includes(filterTag);
            const primaryTag = cert.tags[0];

            return (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: isHighlighted ? 1 : 0.3, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                style={{
                  background: isHighlighted ? `${accent}0A` : '#111318',
                  border: `1px solid ${isHighlighted ? accent + '30' : 'rgba(255,255,255,0.04)'}`,
                  borderRadius: '12px', padding: '20px 16px',
                  transition: 'opacity 0.4s, border-color 0.4s',
                }}
              >
                <div style={{ fontSize: '20px', marginBottom: '10px' }}>
                  {CERT_EMOJIS[primaryTag] || '🏅'}
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: '500', color: isHighlighted ? '#F2F3F5' : '#4B5563', marginBottom: '4px', lineHeight: 1.3 }}>
                  {cert.name}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: isHighlighted ? '#6B7280' : '#374151' }}>
                  {cert.issuer}
                </p>
                {isHighlighted && filterTag && (
                  <div style={{ marginTop: '8px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {cert.tags.map(t => (
                      <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', padding: '2px 6px', borderRadius: '3px', background: `${accent}15`, color: accent, border: `1px solid ${accent}25` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
