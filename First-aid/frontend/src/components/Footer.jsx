import React from 'react'
import { LogoMark } from './Icons.jsx'

export default function Footer({ source, goSection }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <LogoMark size={30} />
          <div>
            <strong>First Aid Made Simple</strong>
            <span>A Youth Red Cross learning project</span>
          </div>
        </div>
        <nav aria-label="Footer">
          <a href="#/" onClick={(e) => { e.preventDefault(); goSection('guides') }}>Guides</a>
          <a href="#/" onClick={(e) => { e.preventDefault(); goSection('quiz') }}>Quiz</a>
          <a href="#/" onClick={(e) => { e.preventDefault(); goSection('about') }}>About YRC</a>
        </nav>
        <p className={`source source-${source}`}>
          <span className="dot" aria-hidden="true" />
          {source === 'server' ? 'Content loaded from the Spring Boot server' : source === 'loading' ? 'Loading content' : 'Offline mode: using built-in content'}
        </p>
      </div>
    </footer>
  )
}
