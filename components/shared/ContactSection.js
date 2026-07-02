'use client';
import { motion } from 'framer-motion';
import { CONTACT } from '../../lib/resumeData';

const LINKS = [
  { label: 'EMAIL', href: `mailto:${CONTACT.email}`, value: CONTACT.email, icon: '✉️', cta: true },
  { label: 'PHONE', href: `tel:${CONTACT.phone}`, value: CONTACT.phone, icon: '📞' },
  { label: 'LINKEDIN', href: CONTACT.linkedin, value: 'linkedin.com/in/rahul-sisode', icon: '💼' },
  { label: 'GITHUB', href: CONTACT.github, value: 'github.com/Rahul1613', icon: '🐙' },
  { label: 'VICTARC', href: CONTACT.victarc, value: 'victarc.in', icon: '🚀' },
  { label: 'HYRINX', href: CONTACT.hyrinx, value: 'hyrinx.in', icon: '📣' },
];

export default function ContactSection() {
  return (
    <section id="contact" style={{ background: '#080909', padding: '80px 5vw 60px', borderTop: '1px solid rgba(255,255,255,0.04)', position: 'relative', overflow: 'hidden' }}>
      {/* Background text */}
      <div aria-hidden style={{ position: 'absolute', bottom: '-20px', right: '-10px', fontFamily: 'var(--font-display)', fontSize: 'clamp(80px, 15vw, 160px)', color: 'rgba(255,255,255,0.012)', fontWeight: '900', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
        CONNECT
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '52px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4B5563', letterSpacing: '0.18em', marginBottom: '12px' }}>CONTACT</p>
          <h2 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(32px, 6vw, 68px)', fontWeight: '800', color: '#F2F3F5', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '16px' }}>
            Let's build<br />
            <span style={{ color: '#374151' }}>something real.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7280', maxWidth: '360px', lineHeight: 1.6 }}>
            Available for full-time roles, internships, and open-source collaboration.
          </p>
        </motion.div>

        {/* Contact grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '10px', marginBottom: '52px' }}>
          {LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.02 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                background: link.cta ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.025)',
                backdropFilter: 'blur(12px)',
                border: link.cta ? '1px solid rgba(99,102,241,0.25)' : '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px', padding: '18px 20px', textDecoration: 'none',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(232,255,0,0.2)';
                e.currentTarget.style.background = 'rgba(232,255,0,0.03)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = link.cta ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.06)';
                e.currentTarget.style.background = link.cta ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.025)';
              }}
            >
              <span style={{ fontSize: '18px' }}>{link.icon}</span>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#4B5563', letterSpacing: '0.15em', marginBottom: '2px' }}>{link.label}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#D1D5DB' }}>{link.value}</p>
              </div>
              <span style={{ marginLeft: 'auto', color: '#374151', fontSize: '14px' }}>↗</span>
            </motion.a>
          ))}
        </div>

        {/* Big CTA button */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '52px' }}>
          <a
            href={`mailto:${CONTACT.email}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontFamily: 'var(--font-grotesk, var(--font-body))', fontSize: '15px', fontWeight: '600',
              padding: '14px 28px', borderRadius: '12px',
              background: '#E8FF00', color: '#000',
              textDecoration: 'none', transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}
          >
            Send an Email →
          </a>
        </motion.div>

        {/* Footer */}
        <div style={{ paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#374151' }}>© 2026 Rahul Hiratsingh Sisode. Built end to end.</p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#374151' }}>B.E. AI & ML · Gharda Institute · 2026</p>
        </div>
      </div>
    </section>
  );
}
