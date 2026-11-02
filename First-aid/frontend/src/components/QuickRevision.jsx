import React, { useState } from 'react'
import Reveal from './Reveal.jsx'
import Illustration from '../illustrations/Illustration.jsx'
import { IconCheck, IconWarn, IconArrowRight } from './Icons.jsx'
import { guideHref } from '../hooks/useRoute.js'

export default function QuickRevision({ guides }) {
  const [id, setId] = useState(guides[0]?.id)
  const g = guides.find((x) => x.id === id) || guides[0]
  if (!g) return null
  return (
    <section id="revision" className="section revision" aria-labelledby="rev-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 id="rev-title">Quick revision</h2>
          <p>The essentials of each guide in one glance.</p>
        </Reveal>
        <Reveal className="tabs" delay={60}>
          <div role="tablist" aria-label="Choose a guide to revise">
            {guides.map((x) => (
              <button
                key={x.id}
                role="tab"
                id={`tab-${x.id}`}
                aria-selected={x.id === g.id}
                aria-controls="rev-panel"
                className={x.id === g.id ? 'is-on' : ''}
                style={{ '--accent': x.accent }}
                onClick={() => setId(x.id)}
              >
                {x.title}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="rev-panel" id="rev-panel" role="tabpanel" aria-labelledby={`tab-${g.id}`} key={g.id} style={{ '--accent': g.accent, '--tint': g.tint }}>
          <div className="zoom-frame rev-media">
            <Illustration id={g.cover} alt={g.coverAlt} tint={g.tint} accent={g.accent} />
          </div>
          <div className="rev-body">
            <h3>{g.title}: remember</h3>
            <ul className="check-list">
              {g.keyActions.map((k) => (
                <li key={k}><span><IconCheck width={16} height={16} /></span>{k}</li>
              ))}
            </ul>
            <div className="rev-alert">
              <strong><IconWarn width={18} height={18} /> Get medical help if</strong>
              <p>{g.seekHelp[0]}. {g.seekHelp[1] ? `${g.seekHelp[1]}.` : ''}</p>
            </div>
            <a className="btn btn-primary" href={guideHref(g.id)}>Open the full guide <IconArrowRight width={18} height={18} /></a>
          </div>
        </div>
      </div>
    </section>
  )
}
