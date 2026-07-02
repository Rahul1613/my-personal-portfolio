'use client';
import { motion } from 'framer-motion';
import { CONTACT } from '../../lib/resumeData';

const LINKS = [
  { label: 'EMAIL', href: `mailto:${CONTACT.email}`, value: CONTACT.email, icon: '✉️' },
  { label: 'PHONE', href: `tel:${CONTACT.phone}`, value: CONTACT.phone, icon: '📞' },
  { label: 'LINKEDIN', href: CONTACT.linkedin, value: 'linkedin.com/in/rahul-sisode', icon: '💼' },
  { label: 'GITHUB', href: CONTACT.github, value: 'github.com/Rahul1613', icon: '🐙' },
  { label: 'VICTARC', href: CONTACT.victarc, value: 'victarc.in', icon: '🚀' },
  { label: 'HYRINX', href: CONTACT.hyrinx, value: 'hyrinx.in', icon: '📣' },
];

const stagger = { show: { transition: { staggerChildren: 0.07 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ContactSection() {
  return (
    <section id="contact" style={{ background: '#0A0B0D', padding: '100px 5vw 80px', borderTop: '1px solid rgba(255,255,255,0.04)', position: 'relative', overflow: 'hidden' }}>
      {/* Large background text */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-40px', right: '-20px',
        fontFamily: 'var(--font-display)', fontSize: 'clamp(120px, 20vw, 200px)',
        color: 'rgba(255,255,255,0.015)', fontWeight: '900', lineHeight: 1,
        pointerEvents: 'none', userSelect: 'none',
      }}>
        CONNECT
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '60px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#E8FF00', letterSpacing: '0.2em', marginBottom: '8px' }}>
            // CONTACT
          </p>
          <h2 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(48px, 8vw, 100px)', fontWeight: '700', color: '#F2F3F5', letterSpacing: '-0.03em', lineHeight: 0.95, marginBottom: '20px' }}>
            LET'S BUILD<br />
            <span style={{ color: '#E8FF00' }}>SOMETHING REAL.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#6B7280', maxWidth: '440px' }}>
            3 self-shipped products. 4 real internships. Zero fluff.
          </p>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px', marginBottom: '60px' }}
        >
          {LINKS.map(link => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              variants={fadeUp}
              style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                background: '#111318', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px', padding: '20px 24px', textDecoration: 'none',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              whileHover={{ scale: 1.02, borderColor: 'rgba(232,255,0,0.25)', backgroundColor: 'rgba(232,255,0,0.04)' }}
            >
              <span style={{ fontSize: '20px' }}>{link.icon}</span>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#4B5563', letterSpacing: '0.15em', marginBottom: '2px' }}>{link.label}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#D1D5DB' }}>{link.value}</p>
              </div>
              <span style={{ marginLeft: 'auto', color: '#4B5563', fontSize: '14px' }}>↗</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Footer */}
        <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#374151' }}>
            © 2026 Rahul Hiratsingh Sisode. Built end to end.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#374151' }}>
            {CONTACT.location}
          </p>
        </div>
      </div>
    </section>
  );
}
