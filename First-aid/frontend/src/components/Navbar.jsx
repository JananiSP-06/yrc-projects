import React, { useEffect, useState } from 'react'
import { IconMenu, IconClose, IconArrowLeft, LogoMark } from './Icons.jsx'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'guides', label: 'First Aid Guides' },
  { id: 'how', label: 'How It Works' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'about', label: 'About YRC' },
]

export default function Navbar({ route, active, goSection }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const inGuide = route.name === 'guide'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    goSection(id)
  }

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="nav-inner">
        <a className="brand" href="#/" onClick={(e) => go(e, 'home')} aria-label="First Aid Made Simple, home">
          <LogoMark />
          <span className="brand-text">First Aid Made Simple</span>
        </a>

        <nav className="nav-links" aria-label="Main">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href="#/"
              className={!inGuide && active === l.id ? 'is-active' : ''}
              aria-current={!inGuide && active === l.id ? 'true' : undefined}
              onClick={(e) => go(e, l.id)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          {inGuide && (
            <a className="btn btn-soft btn-sm back-to-guides" href="#/" onClick={(e) => go(e, 'guides')}>
              <IconArrowLeft width={18} height={18} /> All guides
            </a>
          )}
          
          <button
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      <nav id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} aria-label="Mobile" hidden={!open}>
        {LINKS.map((l) => (
          <a key={l.id} href="#/" onClick={(e) => go(e, l.id)} className={!inGuide && active === l.id ? 'is-active' : ''}>
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
