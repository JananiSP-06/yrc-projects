import React, { useState } from 'react'
import Reveal from './Reveal.jsx'
import { Kit, Sparkle, C } from '../illustrations/parts.jsx'
import { KIT_ITEMS, KitIcon } from '../illustrations/KitItems.jsx'

export default function KitSection() {
  const [sel, setSel] = useState(KIT_ITEMS[0])
  return (
    <section id="kit" className="section kit" aria-labelledby="kit-title">
      <div className="container kit-grid">
        <Reveal className="kit-stage">
          <svg viewBox="0 0 360 320" role="img" aria-label={`A red first aid kit with ${sel.name.toLowerCase()} lifted out of it.`} focusable="false">
            <ellipse cx="180" cy="286" rx="130" ry="12" fill="rgba(20,33,61,.12)" />
            <g transform="translate(180 220)">
              <g className="bob"><Kit s={1.55} /></g>
            </g>
            <g key={sel.id} className="kit-pop">
              <circle cx="180" cy="62" r="52" fill="#fff" stroke={C.navy} strokeWidth="4" />
              <g transform="translate(130 12) scale(1)">
                <g transform="scale(1)"><sel.Icon /></g>
              </g>
            </g>
            <Sparkle x={48} y={70} s={1.2} />
            <Sparkle x={318} y={120} s={0.9} color="#7fcdb8" />
          </svg>
        </Reveal>

        <div>
          <Reveal className="section-head left">
            <h2 id="kit-title">First aid essentials</h2>
            <p>A good kit is simple. Tap an item to see what it is for.</p>
          </Reveal>
          <div className="kit-items" role="listbox" aria-label="First aid kit items">
            {KIT_ITEMS.map((it, i) => (
              <Reveal
                as="button"
                key={it.id}
                delay={i * 50}
                role="option"
                aria-selected={sel.id === it.id}
                className={`kit-item ${sel.id === it.id ? 'is-on' : ''}`}
                style={{ '--tint': it.tint }}
                onClick={() => setSel(it)}
                onMouseEnter={() => setSel(it)}
                onFocus={() => setSel(it)}
              >
                <span className="kit-icon"><KitIcon item={it} size={64} /></span>
                <span>{it.name}</span>
              </Reveal>
            ))}
          </div>
          <div className="kit-detail" aria-live="polite">
            <h3>{sel.name}</h3>
            <p>{sel.use}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
