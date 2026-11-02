import React from 'react'
import Reveal from './Reveal.jsx'
import { IconShield, IconPhone, IconHeart, IconHand } from './Icons.jsx'

const CCC = [
  { n: 1, title: 'Check', text: 'Is the area safe for you, the person and onlookers? Never put yourself in danger.', Icon: IconShield },
  { n: 2, title: 'Call', text: 'Call 112 early for serious injuries, or ask someone nearby to call while you help.', Icon: IconPhone },
  { n: 3, title: 'Care', text: 'Give first aid you know, stay with the person, and keep them calm and warm.', Icon: IconHeart },
]

const REMINDERS = [
  'Wear disposable gloves if you have them, and wash your hands afterwards.',
  'Do not move someone with a possible head, neck or back injury unless they are in danger.',
  'Do not give food or drink to a person who is drowsy or may need surgery.',
  'Stay calm and speak gently. Tell the person what you are doing.',
  'This site supports learning. A certified first aid course gives you practice with an instructor.',
]

export default function KnowBefore() {
  return (
    <section id="know" className="section know" aria-labelledby="know-title">
      <div className="container">
        <Reveal className="section-head light">
          <h2 id="know-title">Know before you act</h2>
          <p>Three habits come before any first aid step.</p>
        </Reveal>
        <ol className="ccc">
          {CCC.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 110} className="ccc-card">
              <span className="ccc-n">{c.n}</span>
              <c.Icon width={34} height={34} />
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="reminders" delay={120}>
          <div className="reminders-icon"><IconHand width={36} height={36} /></div>
          <ul>
            {REMINDERS.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
