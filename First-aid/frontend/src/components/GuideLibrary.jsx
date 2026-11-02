import React, { useMemo, useState } from 'react'
import Illustration from '../illustrations/Illustration.jsx'
import Reveal from './Reveal.jsx'
import { IconArrowRight, IconClock, IconSearch } from './Icons.jsx'
import { guideHref } from '../hooks/useRoute.js'

const LEVELS = ['All', 'Beginner', 'Essential', 'Intermediate']

function GuideCard({ guide, index }) {
  const [touched, setTouched] = useState(false)
  return (
    <Reveal
      as="article"
      className={`guide-card ${touched ? 'is-touched' : ''}`}
      delay={index * 70}
      style={{ '--accent': guide.accent, '--tint': guide.tint }}
      onTouchStart={() => setTouched(true)}
      onTouchEnd={() => setTimeout(() => setTouched(false), 220)}
      onTouchCancel={() => setTouched(false)}
    >
      <a className="card-media zoom-frame" href={guideHref(guide.id)} tabIndex={-1} aria-hidden="true">
        <Illustration id={guide.cover} alt="" decorative tint={guide.tint} accent={guide.accent} />
      </a>
      <div className="card-body">
        <div className="card-meta">
          <span className="pill">{guide.level}</span>
          <span className="meta"><IconClock width={16} height={16} /> {guide.duration}</span>
          <span className="meta">{guide.steps.length} illustrated steps</span>
        </div>
        <h3>{guide.title}</h3>
        <p className="card-tag">{guide.tagline}</p>
        <p className="card-desc">{guide.description}</p>
        <a className="btn btn-primary btn-block" href={guideHref(guide.id)} aria-label={`Learn the steps: ${guide.title}`}>
          Learn the Steps <IconArrowRight width={18} height={18} />
        </a>
      </div>
    </Reveal>
  )
}

export default function GuideLibrary({ guides }) {
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState('All')

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return guides.filter((g) => {
      const okLevel = level === 'All' || g.level === level
      const okQuery = !q || `${g.title} ${g.tagline} ${g.description}`.toLowerCase().includes(q)
      return okLevel && okQuery
    })
  }, [guides, query, level])

  return (
    <section id="guides" className="section guides" aria-labelledby="guides-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 id="guides-title">First aid guides</h2>
          <p>Pick an emergency. Each guide shows every action as a picture, with one clear instruction at a time.</p>
        </Reveal>

        <Reveal className="toolbar" delay={80}>
          <label className="search">
            <IconSearch width={20} height={20} />
            <span className="sr-only">Search guides</span>
            <input
              type="search"
              placeholder="Search, for example burns"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <div className="chips" role="group" aria-label="Filter by level">
            {LEVELS.map((l) => (
              <button
                key={l}
                className={`chip ${level === l ? 'is-on' : ''}`}
                aria-pressed={level === l}
                onClick={() => setLevel(l)}
              >
                {l}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="guide-grid" aria-live="polite">
          {shown.map((g, i) => (
            <GuideCard key={g.id} guide={g} index={i} />
          ))}
        </div>
        {shown.length === 0 && (
          <div className="empty">
            <p>No guide matches that search. Try another word, or clear the filters.</p>
            <button className="btn btn-soft" onClick={() => { setQuery(''); setLevel('All') }}>Clear filters</button>
          </div>
        )}
      </div>
    </section>
  )
}
