import React, { useEffect, useMemo, useRef, useState } from 'react'
import Illustration from '../illustrations/Illustration.jsx'
import Reveal from './Reveal.jsx'
import { IconArrowRight, IconCheck, IconClose, IconRefresh } from './Icons.jsx'
import { submitQuiz, scoreLocally } from '../api.js'
import { guideHref } from '../hooks/useRoute.js'

const LETTERS = ['A', 'B', 'C', 'D']

function shuffle(list) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function ScoreRing({ score, total }) {
  const r = 52
  const c = 2 * Math.PI * r
  const pct = total ? score / total : 0
  return (
    <div className="ring" role="img" aria-label={`Score ${score} out of ${total}`}>
      <svg viewBox="0 0 130 130">
        <circle cx="65" cy="65" r={r} fill="none" stroke="#e8eef6" strokeWidth="12" />
        <circle
          className="ring-fill"
          cx="65" cy="65" r={r} fill="none" stroke="#e8505b" strokeWidth="12" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct)} transform="rotate(-90 65 65)"
        />
      </svg>
      <div className="ring-num"><strong>{score}</strong><span>of {total}</span></div>
    </div>
  )
}

export default function Quiz({ questions, guides }) {
  const [round, setRound] = useState(0)
  const [phase, setPhase] = useState('intro') // intro | play | result
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState(null)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const feedbackRef = useRef(null)
  const sectionRef = useRef(null)

  const deck = useMemo(() => shuffle(questions), [questions, round])
  const q = deck[idx]
  const guideByTopic = useMemo(() => Object.fromEntries(guides.map((g) => [g.id, g])), [guides])
  const liveScore = answers.filter((a, i) => a.selected === deck[i]?.correct).length

  useEffect(() => {
    if (picked !== null && feedbackRef.current) feedbackRef.current.focus({ preventScroll: false })
  }, [picked])

  const start = () => {
    setPhase('play')
    setIdx(0)
    setPicked(null)
    setAnswers([])
    setResult(null)
  }

  const choose = (i) => {
    if (picked !== null) return
    setPicked(i)
    setAnswers((a) => [...a, { questionId: q.id, selected: i }])
  }

  const next = async () => {
    if (idx + 1 < deck.length) {
      setIdx(idx + 1)
      setPicked(null)
      return
    }
    setPhase('result')
    setResult(scoreLocally(answers, deck))
    const server = await submitQuiz(answers, deck)
    setResult(server)
  }

  const retry = () => {
    setRound((r) => r + 1)
    setPhase('intro')
    setIdx(0)
    setPicked(null)
    setAnswers([])
    setResult(null)
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const message = (s, t) => {
    const p = s / t
    if (p === 1) return 'Perfect score. You are ready to help.'
    if (p >= 0.75) return 'Great work. Review the topics below to be sure.'
    if (p >= 0.5) return 'Good start. A little more practice will help.'
    return 'Keep learning. Revisit the guides below and try again.'
  }

  return (
    <section id="quiz" ref={sectionRef} className="section quiz" aria-labelledby="quiz-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 id="quiz-title">What would you do?</h2>
          <p>Learn and practise. Read each scenario, choose the best action, then see why.</p>
        </Reveal>

        <Reveal className="quiz-card" delay={80}>
          {phase === 'intro' && (
            <div className="quiz-intro">
              <div className="quiz-intro-art zoom-frame">
                <Illustration id="fainting-cover" alt="A person who has fainted lying on the ground with stars above their head." tint="#ddf4ee" accent="#2fa58f" />
              </div>
              <div>
                <h3>{deck.length} real-life scenarios</h3>
                <p>Burns, bleeding, choking, fainting, snake bites and fractures. You will get a picture and a short explanation after every answer.</p>
                <button className="btn btn-primary" onClick={start}>Start the quiz <IconArrowRight width={18} height={18} /></button>
              </div>
            </div>
          )}

          {phase === 'play' && q && (
            <div className="quiz-play" key={q.id}>
              <div className="quiz-top">
                <p className="quiz-count">Question {idx + 1} of {deck.length}</p>
                <p className="quiz-score" aria-live="polite">Score: <strong>{liveScore}</strong></p>
              </div>
              <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={deck.length} aria-valuenow={idx + (picked !== null ? 1 : 0)} aria-label="Quiz progress">
                <span style={{ width: `${((idx + (picked !== null ? 1 : 0)) / deck.length) * 100}%` }} />
              </div>

              <div className="quiz-grid">
                <div className="quiz-art zoom-frame">
                  <Illustration id={picked === null ? q.scene : q.feedbackScene} alt={picked === null ? 'Illustration of the scenario.' : 'Illustration of the correct action.'} tint={guideByTopic[q.topic]?.tint} accent={guideByTopic[q.topic]?.accent} />
                </div>
                <div>
                  <h3 className="quiz-q">{q.scenario}</h3>
                  <ul className="options">
                    {q.options.map((opt, i) => {
                      const state = picked === null ? '' : i === q.correct ? 'is-correct' : i === picked ? 'is-wrong' : 'is-dim'
                      return (
                        <li key={opt}>
                          <button className={`option ${state}`} onClick={() => choose(i)} disabled={picked !== null} aria-pressed={picked === i}>
                            <span className="letter">{LETTERS[i]}</span>
                            <span className="opt-text">{opt}</span>
                            {picked !== null && i === q.correct && <IconCheck className="opt-mark" width={22} height={22} />}
                            {picked === i && i !== q.correct && <IconClose className="opt-mark" width={22} height={22} />}
                          </button>
                        </li>
                      )
                    })}
                  </ul>

                  {picked !== null && (
                    <div className={`feedback ${picked === q.correct ? 'ok' : 'no'}`} tabIndex={-1} ref={feedbackRef} role="status">
                      <strong>{picked === q.correct ? 'Correct.' : 'Not quite.'}</strong>
                      <p>{q.explanation}</p>
                      <button className="btn btn-primary" onClick={next}>
                        {idx + 1 < deck.length ? 'Next question' : 'See my results'} <IconArrowRight width={18} height={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {phase === 'result' && result && (
            <div className="quiz-result">
              <ScoreRing score={result.score} total={result.total} />
              <div>
                <h3>{message(result.score, result.total)}</h3>
                {result.topicsToReview.length > 0 ? (
                  <>
                    <p>Topics to review:</p>
                    <div className="review-chips">
                      {result.topicsToReview.map((t) => (
                        <a key={t} className="chip chip-link" href={guideHref(t)} style={{ '--accent': guideByTopic[t]?.accent }}>
                          {guideByTopic[t]?.title || t}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <p>You answered every question correctly. Share what you learned with friends and family.</p>
                )}
                <div className="result-actions">
                  <button className="btn btn-primary" onClick={retry}><IconRefresh width={18} height={18} /> Try Again</button>
                </div>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
