import React from 'react'
import Reveal from './Reveal.jsx'
import { IconPhone } from './Icons.jsx'

const PRINCIPLES = ['Humanity', 'Impartiality', 'Neutrality', 'Independence', 'Voluntary service', 'Unity', 'Universality']

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container about-grid">
        <Reveal>
          <h2 id="about-title">About YRC</h2>
          <p className="about-lead">
            Youth Red Cross (YRC) brings young people into the Red Cross movement to learn life-saving skills and serve their communities.
          </p>
          <p>
            First aid is one of the most useful things a young person can learn. A calm helper who knows the next step can protect someone until medical help arrives. Learning together at school and in the community also builds kindness, responsibility and teamwork.
          </p>
          <p>The movement works by seven fundamental principles:</p>
          <ul className="principles">
            {PRINCIPLES.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </Reveal>
        <Reveal delay={120} className="about-side">
          <div className="sos">
            <span className="sos-icon"><IconPhone width={26} height={26} /></span>
            <h3>In an emergency</h3>
            <p><a href="tel:112">112</a> National emergency number (India)</p>
            <p><a href="tel:108">108</a> Ambulance service in many states</p>
            <small>Use the emergency number for your own country if you are elsewhere.</small>
          </div>
          <div className="note">
            <h3>Please note</h3>
            <p>
              These guides follow widely used Red Cross and NHS first aid advice, but reading is no substitute for practice. Join a certified first aid course, and always follow the instructions of emergency services.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
