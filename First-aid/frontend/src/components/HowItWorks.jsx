import React, { useState } from 'react'
import Illustration from '../illustrations/Illustration.jsx'
import Reveal from './Reveal.jsx'

const STEPS = [
  { title: 'Choose an emergency', text: 'Open one of six guides, from burns to fractures. Use search if you are in a hurry.', scene: 'burns-cover', tint: '#ffe9df', accent: '#ff8a5c', alt: 'A spilled pot and a person holding a burned wrist.' },
  { title: 'Follow the pictures', text: 'Every action has its own illustration. Move through one step at a time, or jump to any step.', scene: 'burns-2', tint: '#ffe9df', accent: '#ff8a5c', alt: 'A burned forearm under a running tap with a 20 minute timer.' },
  { title: 'Spot the warnings', text: 'Red warnings show what not to do. Green notes give helpful extras. Both matter.', scene: 'bleeding-3', tint: '#fde4e6', accent: '#e8505b', alt: 'A stack of pads with a hand pressing on top and a do not peek sign.' },
  { title: 'Practise with the quiz', text: 'Try real-life scenarios. Each answer comes with a picture and a short reason.', scene: 'choking-1', tint: '#e1edfb', accent: '#3a7bd5', alt: 'A person clutching their throat while a helper encourages coughing.' },
]

export default function HowItWorks() {
  const [i, setI] = useState(0)
  const cur = STEPS[i]
  return (
    <section id="how" className="section how" aria-labelledby="how-title">
      <div className="container how-grid">
        <div>
          <Reveal className="section-head left">
            <h2 id="how-title">How it works</h2>
            <p>Four simple moves. Select a stage to preview it.</p>
          </Reveal>
          <ol className="timeline">
            {STEPS.map((s, idx) => (
              <Reveal as="li" key={s.title} delay={idx * 90} className={idx === i ? 'is-on' : ''}>
                <button
                  onClick={() => setI(idx)}
                  onMouseEnter={() => setI(idx)}
                  onFocus={() => setI(idx)}
                  aria-current={idx === i ? 'step' : undefined}
                >
                  <span className="tl-dot">{idx + 1}</span>
                  <span className="tl-text">
                    <strong>{s.title}</strong>
                    <span>{s.text}</span>
                  </span>
                </button>
              </Reveal>
            ))}
          </ol>
        </div>
        <Reveal className="how-panel" delay={120}>
          <div className="zoom-frame how-frame" key={cur.scene}>
            <Illustration id={cur.scene} alt={cur.alt} tint={cur.tint} accent={cur.accent} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
