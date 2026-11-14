import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Trophy, Check, X } from 'lucide-react'
import { PageHero } from './ui'
import Character from './Characters'
import Sign from './Signs'

export function GameShell({ title, intro, who, color, children }) {
  return (<><PageHero title={title} intro={intro} who={who} color={color} crumb={title} />
    <div className="wrap mt-8"><Link to="/games" className="btn-white !py-2 !text-base"><ArrowLeft size={18} />All games</Link></div>
    <div className="wrap mt-6">{children}</div></>)
}
export const ProgressBar = ({ value, max, label }) => (
  <div><div className="flex justify-between text-sm font-bold mb-1"><span>{label}</span><span>{Math.min(value, max)} of {max}</span></div>
    <div className="h-3 rounded-full bg-sky border border-navy/20" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}><div className="h-full rounded-full bg-coral transition-all" style={{ width: `${(value / max) * 100}%` }} /></div></div>)

export function Picker({ title, options, onPick, children }) {
  return (<div className="card bg-white max-w-2xl mx-auto"><h2 className="text-3xl mb-4">{title}</h2>
    <div className="grid gap-3">{options.map(([k, label, text]) => (
      <button key={k} onClick={() => onPick(k)} className="text-left rounded-2xl border-2 border-navy/20 hover:bg-sky/50 px-5 py-4 min-h-[56px]"><span className="font-display text-xl font-bold">{label}</span>{text && <span className="block text-sm">{text}</span>}</button>))}</div>{children}</div>)
}
export const message = p => p >= 90 ? ['Road Safety Champion! Superb work.', 'sam'] : p >= 70 ? ['Great job! You know your road safety.', 'riya'] : p >= 50 ? ['Good start. Review the lessons and try again.', 'arjun'] : ['Keep learning. Every try makes you safer.', 'ravi']
export function ResultCard({ score, total, onRetake, children, pct: pctIn, msg: msgIn }) {
  const pct = pctIn ?? Math.round((score / total) * 100); const [m, who] = message(pct); const msg = msgIn || m
  return (<div className="card bg-sun/70 text-center max-w-2xl mx-auto" role="status">
    <Character who={who} size={120} className="mx-auto bob" /><h2 className="text-4xl mt-2">{pct}%</h2><p className="font-display text-xl font-bold">{msg}</p>
    <div className="grid grid-cols-3 gap-3 my-5">{[['Questions', total], ['Correct', score], ['Incorrect', total - score]].map(([l, v]) => <div key={l} className="rounded-2xl bg-white border-2 border-navy/15 py-3"><p className="text-3xl font-display font-bold">{v}</p><p className="text-sm font-bold">{l}</p></div>)}</div>
    <div className="flex flex-wrap gap-3 justify-center"><button className="btn-coral" onClick={onRetake}><RotateCcw size={18} />Retake</button>{children}<Link to="/achievements" className="btn-white"><Trophy size={18} />My badges</Link></div></div>)
}
// Multiple choice runner used by the sign challenge, quiz and scenarios.
// question: { prompt, sign?, emoji?, who?, options[], answer, why }
export function McqRunner({ questions, onFinish, onRetake, extra }) {
  const [i, setI] = useState(0); const [pick, setPick] = useState(null); const [score, setScore] = useState(0); const sent = useRef(false)
  const done = i >= questions.length
  useEffect(() => { if (done && !sent.current) { sent.current = true; onFinish?.(score, questions.length) } }, [done])
  if (done) return <ResultCard score={score} total={questions.length} onRetake={onRetake}>{extra}</ResultCard>
  const q = questions[i]
  const choose = n => { if (pick !== null) return; setPick(n); if (n === q.answer) setScore(s => s + 1) }
  return (<div className="max-w-2xl mx-auto">
    <ProgressBar value={i + (pick !== null ? 1 : 0)} max={questions.length} label={`Question ${i + 1}`} />
    <div className="card bg-white mt-4">
      {(q.sign || q.emoji) && <div className="flex justify-center mb-3">{q.sign ? <Sign k={q.sign} size={130} /> : <div className="text-7xl" aria-hidden="true">{q.emoji}</div>}</div>}
      {q.title && <h2 className="text-2xl text-center">{q.title}</h2>}
      <p className="font-display text-2xl font-bold text-center mb-4">{q.prompt}</p>
      <div className="grid gap-2" role="group" aria-label="Answer choices">{q.options.map((o, n) => {
        const right = n === q.answer
        return <button key={o} onClick={() => choose(n)} disabled={pick !== null} className={`text-left rounded-2xl border-2 px-4 py-3 font-semibold min-h-[52px] flex items-center justify-between gap-2 ${pick === null ? 'border-navy/20 hover:bg-sky/50' : right ? 'bg-mint border-green-700' : n === pick ? 'bg-coral/40 border-red-700' : 'opacity-50 border-navy/10'}`}>{o}{pick !== null && (right ? <Check className="shrink-0 text-green-700" /> : n === pick ? <X className="shrink-0 text-red-700" /> : null)}</button>
      })}</div>
      {pick !== null && <div role="status" className={`mt-4 rounded-2xl p-4 border-2 ${pick === q.answer ? 'bg-mint/60 border-green-700/40' : 'bg-coral/20 border-red-700/30'}`}>
        <p className="font-display text-xl font-bold">{pick === q.answer ? 'Correct!' : 'Not quite.'}</p>
        {pick !== q.answer && <p className="font-semibold">Right answer: {q.options[q.answer]}</p>}<p>{q.why}</p>
        <button className="btn-coral mt-3" onClick={() => { setI(i + 1); setPick(null) }}>{i + 1 === questions.length ? 'See my result' : 'Next question'}</button></div>}
    </div>
    <p className="text-center mt-3 font-bold">Score so far: {score}</p></div>)
}
