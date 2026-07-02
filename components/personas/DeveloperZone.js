'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, EXPERIENCE, DEV_SKILLS, CONTACT } from '../../lib/resumeData';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const stagger = { show: { transition: { staggerChildren: 0.06 } } };

const ACCENT = '#3B82F6';

function SectionLabel({ children }) {
  return (
    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4B5563', letterSpacing: '0.18em', marginBottom: '8px', textTransform: 'uppercase' }}>
      {children}
    </p>
  );
}

function SectionTitle({ children }) {
  return (
    <h3 style={{
      fontFamily: 'var(--font-grotesk, var(--font-display))',
      fontSize: 'clamp(24px, 3.5vw, 38px)',
      fontWeight: '700', color: '#F2F3F5',
      letterSpacing: '-0.02em', lineHeight: 1.15,
      marginBottom: '32px',
    }}>
      {children}
    </h3>
  );
}

// ── Glass Card wrapper ──────────────────────────────────────────────────
function GlassCard({ children, style = {}, hoverAccent = ACCENT, ...rest }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
        transition: 'border-color 0.25s, box-shadow 0.25s',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${hoverAccent}30`;
        e.currentTarget.style.boxShadow = `0 0 30px ${hoverAccent}10`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

// ── Skill badge ──────────────────────────────────────────────────
function Badge({ text }) {
  return (
    <motion.span
      whileHover={{ scale: 1.06 }}
      style={{
        fontFamily: 'var(--font-mono)', fontSize: '11px',
        padding: '5px 12px', borderRadius: '6px',
        background: 'rgba(59,130,246,0.08)',
        border: '1px solid rgba(59,130,246,0.2)',
        color: '#93C5FD', cursor: 'default', display: 'inline-block',
      }}
    >
      {text}
    </motion.span>
  );
}

// ── Skills Grid ──────────────────────────────────────────────────
function SkillsGrid() {
  const catLabels = {
    languages: 'Languages',
    frontend: 'Frontend',
    backend: 'Backend',
    databases: 'Databases',
    ai_ml: 'AI / ML',
    tools: 'Tools & DevOps',
  };

  return (
    <motion.div variants={fadeUp} style={{ marginBottom: '60px' }}>
      <SectionLabel>Technical Stack</SectionLabel>
      <SectionTitle>Skills</SectionTitle>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
        {Object.entries(DEV_SKILLS).map(([cat, skills]) => (
          <GlassCard key={cat} style={{ padding: '20px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#3B82F6', letterSpacing: '0.15em', marginBottom: '12px' }}>
              {catLabels[cat] || cat}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.map(s => <Badge key={s} text={s} />)}
            </div>
          </GlassCard>
        ))}
      </div>
    </motion.div>
  );
}

// ── Project Cards ──────────────────────────────────────────────────
function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);
  const statusColor = project.status === 'LIVE' ? '#10B981' : '#F59E0B';

  return (
    <GlassCard style={{ padding: '0', overflow: 'hidden', cursor: 'pointer' }} hoverAccent={ACCENT}>
      {/* Header */}
      <div
        onClick={() => setOpen(p => !p)}
        style={{
          padding: '18px 20px',
          borderBottom: open ? '1px solid rgba(255,255,255,0.05)' : 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#4B5563' }}>
            📄 {project.filename}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '9px', color: statusColor }}>
            ● {project.status}
          </span>
        </div>
        <span style={{ color: '#4B5563', fontSize: '12px', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', display: 'inline-block' }}>▾</span>
      </div>

      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ paddingTop: '16px' }}>
          <h4 style={{ fontFamily: 'var(--font-grotesk, var(--font-body))', fontSize: '15px', fontWeight: '600', color: '#F2F3F5', marginBottom: '4px' }}>
            {project.name}
          </h4>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#6B7280', marginBottom: '12px' }}>
            {project.tagline}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
            {project.tech.map(t => (
              <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', padding: '2px 8px', borderRadius: '4px', background: 'rgba(34,211,238,0.07)', color: '#67E8F9', border: '1px solid rgba(34,211,238,0.12)' }}>{t}</span>
            ))}
          </div>

          {open && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginBottom: '12px', lineHeight: 1.6 }}>
              {project.description}
            </p>
          )}

          <div style={{ display: 'flex', gap: '8px' }}>
            <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: ACCENT, textDecoration: 'none', padding: '4px 10px', border: `1px solid ${ACCENT}33`, borderRadius: '5px' }}>
              GitHub ↗
            </a>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#22D3EE', textDecoration: 'none', padding: '4px 10px', border: '1px solid rgba(34,211,238,0.25)', borderRadius: '5px' }}>
                Live ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

// ── Experience ──────────────────────────────────────────────────
function ExperienceList() {
  const [expanded, setExpanded] = useState(null);
  const devExp = EXPERIENCE.filter(e => e.tags.includes('dev'));

  return (
    <motion.div variants={fadeUp} style={{ marginBottom: '60px' }}>
      <SectionLabel>Work History</SectionLabel>
      <SectionTitle>Experience</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {devExp.map(exp => (
          <GlassCard
            key={exp.hash}
            style={{ padding: '20px 24px', cursor: 'pointer' }}
            hoverAccent={ACCENT}
          >
            <div onClick={() => setExpanded(p => p === exp.hash ? null : exp.hash)} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '20px', marginTop: '2px' }}>{exp.icon}</span>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-grotesk, var(--font-body))', fontSize: '15px', fontWeight: '600', color: '#F2F3F5', marginBottom: '2px' }}>{exp.role}</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: ACCENT, marginBottom: '2px' }}>{exp.company}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#4B5563' }}>{exp.period}</p>
                </div>
              </div>
              <span style={{ color: '#4B5563', fontSize: '12px', transition: 'transform 0.2s', transform: expanded === exp.hash ? 'rotate(180deg)' : 'none', display: 'inline-block', flexShrink: 0, marginTop: '4px' }}>▾</span>
            </div>
            {expanded === exp.hash && (
              <ul style={{ marginTop: '16px', paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {exp.bullets.map((b, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9CA3AF', paddingLeft: '12px', borderLeft: `2px solid ${ACCENT}50`, lineHeight: 1.6 }}>{b}</li>
                ))}
              </ul>
            )}
          </GlassCard>
        ))}
      </div>
    </motion.div>
  );
}

// ── GitHub Widget ──────────────────────────────────────────────────
function GithubWidget() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users/Rahul1613')
      .then(r => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  return (
    <GlassCard style={{ padding: '24px 28px', marginBottom: '60px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }} hoverAccent={ACCENT}>
      <div style={{ display: 'flex', align: 'center', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(59,130,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: '18px' }}>🐙</span>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#4B5563', letterSpacing: '0.15em', marginBottom: '2px' }}>GITHUB</p>
          <p style={{ fontFamily: 'var(--font-grotesk, var(--font-body))', fontSize: '15px', fontWeight: '600', color: '#F2F3F5' }}>Rahul1613</p>
        </div>
      </div>

      {stats && (
        <>
          {[
            { label: 'Repos', value: stats.public_repos },
            { label: 'Followers', value: stats.followers },
            { label: 'Following', value: stats.following },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: 'center', minWidth: '60px' }}>
              <p style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: '26px', fontWeight: '700', color: '#F2F3F5', lineHeight: 1 }}>{value}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#4B5563', marginTop: '2px' }}>{label}</p>
            </div>
          ))}
        </>
      )}

      <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '11px', color: ACCENT, textDecoration: 'none', padding: '8px 16px', border: `1px solid ${ACCENT}33`, borderRadius: '8px', transition: 'background 0.2s', whiteSpace: 'nowrap' }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.08)'}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}>
        View Profile ↗
      </a>
    </GlassCard>
  );
}

export default function DeveloperZone({ highlighted }) {
  const devProjects = PROJECTS.filter(p => p.tags.includes('dev'));

  return (
    <section
      id="dev-zone"
      style={{
        background: '#080909',
        padding: '80px 5vw',
        borderTop: `1px solid ${highlighted ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.04)'}`,
        position: 'relative',
      }}
    >
      {highlighted && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}66, transparent)` }} />}

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Zone header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '52px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: ACCENT, letterSpacing: '0.2em' }}>PATH 01 — DEVELOPER</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-grotesk, var(--font-display))',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: '800', color: '#F2F3F5',
            letterSpacing: '-0.03em', lineHeight: 1,
            marginBottom: '64px',
          }}
        >
          Developer<br />
          <span style={{ color: '#374151' }}>Workspace.</span>
        </motion.h2>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SkillsGrid />
        </motion.div>

        {/* Projects */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '60px' }}>
          <SectionLabel>Repository</SectionLabel>
          <SectionTitle>Projects</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
            {devProjects.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <ExperienceList />
        </motion.div>

        <GithubWidget />
      </div>
    </section>
  );
}
