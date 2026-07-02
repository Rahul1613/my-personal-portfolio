'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, EXPERIENCE, DEV_SKILLS, CONTACT } from '../../lib/resumeData';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = { show: { transition: { staggerChildren: 0.08 } } };

// ── Tech Badge ──────────────────────────────────────────────────
function TechBadge({ text }) {
  return (
    <motion.div
      whileHover={{ rotateX: 5, rotateY: 8, scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.25)',
        borderRadius: '6px', padding: '6px 12px',
        fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#93C5FD',
        cursor: 'default', display: 'inline-block',
        transformStyle: 'preserve-3d',
      }}
    >
      {text}
    </motion.div>
  );
}

// ── Skills Grid ──────────────────────────────────────────────────
function SkillsGrid() {
  return (
    <motion.div variants={fadeUp} style={{ marginBottom: '80px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#3B82F6', letterSpacing: '0.2em', marginBottom: '8px' }}>
        // TECHNICAL ARSENAL
      </p>
      <h3 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(28px, 4vw, 48px)', color: '#F2F3F5', marginBottom: '40px', fontWeight: '700' }}>
        Stack & Tools
      </h3>

      <div style={{ display: 'grid', gap: '32px' }}>
        {Object.entries(DEV_SKILLS).map(([category, skills]) => (
          <div key={category}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#22D3EE', letterSpacing: '0.15em', marginBottom: '12px' }}>
              {'> '}{category}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.map((s) => <TechBadge key={s} text={s} />)}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Repo Card ──────────────────────────────────────────────────
function RepoCard({ project }) {
  const [expanded, setExpanded] = useState(false);

  const statusColor = project.status === 'LIVE' ? '#22D3EE' : '#FBBF24';

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        background: '#111318', border: '1px solid rgba(59,130,246,0.15)',
        borderRadius: '12px', minWidth: '300px', maxWidth: '340px',
        flexShrink: 0, cursor: 'pointer', overflow: 'hidden',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)';
        e.currentTarget.style.boxShadow = '0 0 24px rgba(59,130,246,0.12)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(59,130,246,0.15)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Tab header */}
      <div style={{
        background: 'rgba(59,130,246,0.06)', padding: '10px 16px',
        borderBottom: '1px solid rgba(59,130,246,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#93C5FD' }}>
          📄 {project.filename}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: statusColor }}>
          ● {project.status}
        </span>
      </div>

      <div style={{ padding: '16px' }}>
        <h4 style={{ fontFamily: 'var(--font-grotesk, var(--font-body))', fontSize: '16px', fontWeight: '600', color: '#F2F3F5', marginBottom: '6px' }}>
          {project.name}
        </h4>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7280', marginBottom: '12px', lineHeight: 1.5 }}>
          {project.tagline}
        </p>

        {/* Tech pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
          {project.tech.map(t => (
            <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', background: 'rgba(34,211,238,0.08)', color: '#67E8F9', border: '1px solid rgba(34,211,238,0.15)' }}>
              {t}
            </span>
          ))}
        </div>

        {/* Expanded description */}
        {expanded && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9CA3AF', marginBottom: '12px', lineHeight: 1.6 }}>
            {project.description}
          </p>
        )}

        {/* Links */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#3B82F6', textDecoration: 'none', padding: '4px 8px', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '4px' }}>
            GitHub ↗
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#22D3EE', textDecoration: 'none', padding: '4px 8px', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '4px' }}>
              Live ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Git Log Timeline ──────────────────────────────────────────────────
function GitLogTimeline() {
  const [expanded, setExpanded] = useState(null);
  const devExp = EXPERIENCE.filter(e => e.tags.includes('dev'));

  return (
    <motion.div variants={fadeUp} style={{ marginBottom: '80px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#3B82F6', letterSpacing: '0.2em', marginBottom: '8px' }}>
        // COMMIT HISTORY
      </p>
      <h3 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(28px, 4vw, 48px)', color: '#F2F3F5', marginBottom: '32px', fontWeight: '700' }}>
        Experience
      </h3>
      <div style={{ borderLeft: '1px solid rgba(59,130,246,0.2)', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '0' }}>
        {devExp.map((exp) => (
          <div key={exp.hash} style={{ position: 'relative', paddingBottom: '24px' }}>
            {/* Dot */}
            <div style={{ position: 'absolute', left: '-30px', top: '6px', width: '10px', height: '10px', borderRadius: '50%', background: '#3B82F6', boxShadow: '0 0 8px rgba(59,130,246,0.6)' }} />

            <div
              onClick={() => setExpanded(expanded === exp.hash ? null : exp.hash)}
              style={{ cursor: 'pointer', padding: '12px 16px', borderRadius: '8px', background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.1)', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,130,246,0.04)'}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#22D3EE', marginBottom: '2px' }}>
                <span style={{ color: '#4B5563' }}>{exp.hash}</span>{' '}
                <span style={{ color: '#F59E0B' }}>(HEAD)</span>{' '}
                {exp.role}
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#6B7280' }}>
                {exp.company} · {exp.period}
              </p>

              {expanded === exp.hash && (
                <ul style={{ marginTop: '12px', paddingLeft: '0', listStyle: 'none' }}>
                  {exp.bullets.map((b, i) => (
                    <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9CA3AF', marginBottom: '6px', paddingLeft: '12px', borderLeft: '2px solid rgba(59,130,246,0.3)', lineHeight: 1.5 }}>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── GitHub Stats Widget ──────────────────────────────────────────────────
function GithubWidget() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/Rahul1613')
      .then(r => r.json())
      .then(d => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <motion.div
      variants={fadeUp}
      style={{
        background: '#111318', border: '1px solid rgba(59,130,246,0.2)',
        borderRadius: '16px', padding: '28px 32px', marginBottom: '80px',
        display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap',
      }}
    >
      <div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#3B82F6', letterSpacing: '0.2em', marginBottom: '6px' }}>
          GITHUB / Rahul1613
        </p>
        <h4 style={{ fontFamily: 'var(--font-grotesk, var(--font-body))', fontSize: '18px', color: '#F2F3F5', fontWeight: '600' }}>
          {loading ? 'Loading...' : stats?.name || 'Rahul Sisode'}
        </h4>
        {stats?.bio && <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>{stats.bio}</p>}
      </div>
      {stats && (
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          {[
            { label: 'Repos', val: stats.public_repos },
            { label: 'Followers', val: stats.followers },
            { label: 'Following', val: stats.following },
          ].map(({ label, val }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: '#22D3EE', lineHeight: 1 }}>{val}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#4B5563', marginTop: '4px', letterSpacing: '0.15em' }}>{label}</p>
            </div>
          ))}
        </div>
      )}
      <a href={CONTACT.github} target="_blank" rel="noopener noreferrer"
        style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#3B82F6', textDecoration: 'none', padding: '8px 16px', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px', transition: 'background 0.2s' }}>
        VIEW PROFILE ↗
      </a>
    </motion.div>
  );
}

export default function DeveloperZone({ highlighted }) {
  const devProjects = PROJECTS.filter(p => p.tags.includes('dev'));

  return (
    <section
      id="dev-zone"
      style={{
        background: '#0A0B0D',
        padding: '100px 5vw',
        borderTop: highlighted ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(255,255,255,0.04)',
        position: 'relative',
      }}
    >
      {/* Section accent line */}
      {highlighted && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #3B82F6, #22D3EE, transparent)' }} />
      )}

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '60px', display: 'flex', alignItems: 'center', gap: '16px' }}
        >
          <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, #3B82F6, #22D3EE)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#3B82F6', letterSpacing: '0.2em' }}>PATH 01</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-grotesk, var(--font-display))',
            fontSize: 'clamp(48px, 8vw, 100px)', fontWeight: '700',
            color: '#F2F3F5', letterSpacing: '-0.03em',
            lineHeight: 0.95, marginBottom: '80px',
          }}
        >
          DEVELOPER<br />
          <span style={{ background: 'linear-gradient(135deg, #3B82F6, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            WORKSPACE.
          </span>
        </motion.h2>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SkillsGrid />
        </motion.div>

        {/* Project Repo Cards — horizontal scroll */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '80px' }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#3B82F6', letterSpacing: '0.2em', marginBottom: '8px' }}>
            // REPOSITORY
          </p>
          <h3 style={{ fontFamily: 'var(--font-grotesk, var(--font-display))', fontSize: 'clamp(28px, 4vw, 48px)', color: '#F2F3F5', marginBottom: '32px', fontWeight: '700' }}>
            Projects
          </h3>
          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', scrollbarWidth: 'thin', scrollbarColor: 'rgba(59,130,246,0.3) transparent' }}>
            {devProjects.map(p => <RepoCard key={p.id} project={p} />)}
          </div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <GitLogTimeline />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <GithubWidget />
        </motion.div>
      </div>
    </section>
  );
}
