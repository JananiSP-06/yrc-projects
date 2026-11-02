import React, { useCallback, useEffect, useRef, useState } from 'react'
import Illustration from '../illustrations/Illustration.jsx'
import {
  IconArrowLeft, IconArrowRight, IconBulb, IconCheck, IconPhone, IconRefresh, IconWarn, IconZoom,
} from './Icons.jsx'
import { guideHref } from '../hooks/useRoute.js'

export default function GuideViewer({ guide, guides, goSection }) {
  const total = guide.steps.length
  const [step, setStep] = useState(0) // 0..total-1 = steps, total = completion
  const [dir, setDir] = useState(1)
  const [zoomed, setZoomed] = useState(false)
  const headRef = useRef(null)

  useEffect(() => {
    setStep(0)
    setZoomed(false)
    window.scrollTo({ top: 0 })
  }, [guide.id])

  const go = useCallback(
    (n) => {
      const next = Math.max(0, Math.min(total, n))
      setDir(next >= step ? 1 : -1)
      setStep(next)
      setZoomed(false)
    },
    [step, total],
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest && e.target.closest('input, textarea, select')) return
      if (e.key === 'ArrowRight') go(step + 1)
      if (e.key === 'ArrowLeft') go(step - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, step])

  useEffect(() => {
    if (headRef.current && step > 0) headRef.current.focus({ preventScroll: true })
  }, [step])

  const done = step === total
  const current = guide.steps[step]
  const nextGuide = guides[(guides.findIndex((g) => g.id === guide.id) + 1) % guides.length]
  const pct = done ? 100 : Math.round(((step + 1) / total) * 100)

  return (
    <section className="viewer" style={{ '--accent': guide.accent, '--tint': guide.tint }} aria-labelledby="viewer-title">
      <div className="container">
        <div className="viewer-top">
          <div>
            <a className="crumb" href="#/" onClick={(e) => { e.preventDefault(); goSection('guides') }}>
              <IconArrowLeft width={18} height={18} /> Back to all guides
            </a>
            <h1 id="viewer-title">{guide.title}</h1>
            <p className="viewer-tag">{guide.tagline}</p>
          </div>
          <a className="call-card" href="tel:112">
            <span className="call-icon"><IconPhone width={22} height={22} /></span>
            <span>
              <strong>Serious emergency?</strong>
              <small>Call 112 now. Do not wait to finish the guide.</small>
            </span>
          </a>
        </div>

        <div className="progress-row">
          <p className="progress-label" aria-live="polite">
            {done ? 'All steps complete' : `Step ${step + 1} of ${total}`}
          </p>
          <div
            className="progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-label={`${guide.title} guide progress`}
          >
            <span style={{ width: `${pct}%` }} />
          </div>
        </div>

        {!done ? (
          <div className={`step-stage dir-${dir > 0 ? 'fwd' : 'back'}`} key={`${guide.id}-${step}`}>
            <figure className="step-figure">
              <button
                className={`zoom-frame step-zoom ${zoomed ? 'is-zoomed' : ''}`}
                onClick={() => setZoomed((z) => !z)}
                aria-pressed={zoomed}
                aria-label={zoomed ? 'Zoom out of the illustration' : 'Zoom in on the illustration'}
              >
                <Illustration id={current.id} alt={current.alt} tint={guide.tint} accent={guide.accent} />
                <span className="zoom-hint"><IconZoom width={18} height={18} /> {zoomed ? 'Zoom out' : 'Tap to zoom'}</span>
              </button>
            </figure>

            <div className="step-copy">
              <div className="step-num" aria-hidden="true">{step + 1}</div>
              <h2 ref={headRef} tabIndex={-1}>{current.title}</h2>
              <p className="step-text">{current.text}</p>
              {current.warning && (
                <div className="callout callout-warn" role="note">
                  <IconWarn width={24} height={24} />
                  <div>
                    <strong>Warning</strong>
                    <p>{current.warning}</p>
                  </div>
                </div>
              )}
              {current.tip && (
                <div className="callout callout-tip" role="note">
                  <IconBulb width={24} height={24} />
                  <div>
                    <strong>Good to know</strong>
                    <p>{current.tip}</p>
                  </div>
                </div>
              )}
              <div className="step-nav">
                <button className="btn btn-soft" onClick={() => go(step - 1)} disabled={step === 0}>
                  <IconArrowLeft width={18} height={18} /> Previous Step
                </button>
                <button className="btn btn-primary" onClick={() => go(step + 1)}>
                  {step === total - 1 ? 'Finish' : 'Next Step'} <IconArrowRight width={18} height={18} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="complete" key="complete">
            <div className="complete-head">
              <span className="complete-badge"><IconCheck width={30} height={30} /></span>
              <div>
                <h2>You have finished the {guide.title.toLowerCase()} guide</h2>
                <p>Here is what to remember, and when to get professional help.</p>
              </div>
            </div>
            <div className="complete-grid">
              <div className="panel">
                <h3>Key actions</h3>
                <ol className="check-list">
                  {guide.keyActions.map((k) => (
                    <li key={k}><span><IconCheck width={16} height={16} /></span>{k}</li>
                  ))}
                </ol>
              </div>
              <div className="panel panel-alert">
                <h3>Call 112 or get medical help if</h3>
                <ul className="help-list">
                  {guide.seekHelp.map((k) => (
                    <li key={k}><IconWarn width={18} height={18} />{k}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="complete-actions">
              <button className="btn btn-soft" onClick={() => go(0)}><IconRefresh width={18} height={18} /> Review steps</button>
              <button className="btn btn-primary" onClick={() => goSection('quiz')}>Test yourself in the quiz <IconArrowRight width={18} height={18} /></button>
              <a className="btn btn-ghost" href={guideHref(nextGuide.id)}>Next guide: {nextGuide.title}</a>
            </div>
          </div>
        )}

        <nav className="thumbs" aria-label="Jump to a step">
          <ol>
            {guide.steps.map((s, i) => (
              <li key={s.id}>
                <button
                  className={`thumb ${i === step && !done ? 'is-current' : ''} ${i < step || done ? 'is-done' : ''}`}
                  onClick={() => go(i)}
                  aria-current={i === step && !done ? 'step' : undefined}
                  aria-label={`Go to step ${i + 1}: ${s.title}`}
                >
                  <span className="thumb-img"><Illustration id={s.id} alt="" decorative tint={guide.tint} accent={guide.accent} /></span>
                  <span className="thumb-label"><b>{i + 1}</b> {s.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
        <p className="hint">Tip: use the left and right arrow keys to move between steps.</p>
      </div>
    </section>
  )
}
