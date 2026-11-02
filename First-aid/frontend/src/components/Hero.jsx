import React from 'react'
import HeroIllustration from '../illustrations/Hero.jsx'
import { IconArrowRight, IconCross } from './Icons.jsx'

export default function Hero({ goSection }) {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title" className="hero-title enter e1">First Aid Made Simple.</h1>
          <p className="hero-lead enter e2">Learn the right steps. Stay calm. Make a difference.</p>
          <p className="hero-sub enter e2">
            Six common emergencies, each explained one picture at a time, plus a quiz to check what you remember.
          </p>
          <div className="hero-cta enter e3">
            <button className="btn btn-primary" onClick={() => goSection('guides')}>
              Explore First Aid <IconArrowRight width={20} height={20} />
            </button>
            <button className="btn btn-ghost" onClick={() => goSection('quiz')}>
              Take the Quiz
            </button>
          </div>
        </div>

        <div className="hero-art enter e4">
          <div className="hero-frame">
            <HeroIllustration />
          </div>
          <span className="float f1" aria-hidden="true"><IconCross /></span>
          <span className="float f2" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 3c3 4.5 6 7.5 6 11a6 6 0 0 1-12 0c0-3.500 3-6.500 6-11z" fill="currentColor" /></svg>
          </span>
          <span className="float f3" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="24" height="24"><rect x="3" y="9" width="18" height="6" rx="3" fill="currentColor" transform="rotate(-30 12 12)" /></svg>
          </span>
        </div>
      </div>
    </section>
  )
}
