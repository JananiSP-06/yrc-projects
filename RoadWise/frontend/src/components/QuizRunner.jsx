import { useState } from 'react'
import { ChevronLeft, ChevronRight, Check, X, Send } from 'lucide-react'
import { ProgressBar, ResultCard } from './Games'
import { ErrorState } from './ApiStates'

/**
 * Quiz where the backend marks the answers. The server never sends correct answers up front, so the visitor answers
 * every question first, then presses Submit. questions: [{ id, question, options[] }]. onSubmit(answers) -> result.
 */
export default function QuizRunner({ questions, onSubmit, onRetake, extra }) {
  const [i, setI] = useState(0); const [picked, setPicked] = useState({}); const [busy, setBusy] = useState(false); const [err, setErr] = useState(null); const [result, setResult] = useState(null)
  const q = questions[i]; const last = i === questions.length - 1; const answered = Object.keys(picked).length

  const submit = async () => {
    setBusy(true); setErr(null)
    try { setResult(await onSubmit(questions.map(x => ({ questionId: x.id, selectedOption: picked[x.id] })))) } catch (e) { setErr(e) } finally { setBusy(false) }
  }
  if (result) {
    const byId = Object.fromEntries(questions.map(x => [x.id, x]))
    return (<div className="max-w-2xl mx-auto"><ResultCard score={result.correct} total={result.total} pct={result.percentage} msg={result.message} onRetake={onRetake}>{extra}</ResultCard>
      <h3 className="text-2xl mt-8 mb-3">Review your answers</h3>
      <ul className="grid gap-3">{result.details.map(d => { const qq = byId[d.questionId]
        return <li key={d.questionId} className={`card !p-4 ${d.correct ? 'bg-mint/50' : 'bg-coral/20'}`}>
          <p className="font-bold flex gap-2 items-start">{d.correct ? <Check className="text-green-700 shrink-0" /> : <X className="text-red-700 shrink-0" />}{qq.question}</p>
          <p className="text-sm mt-1">Your answer: {qq.options[d.selectedOption]}</p>{!d.correct && <p className="text-sm font-bold">Correct answer: {qq.options[d.correctOption]}</p>}<p className="text-sm mt-1">{d.explanation}</p></li> })}</ul></div>)
  }
  return (<div className="max-w-2xl mx-auto">
    <ProgressBar value={answered} max={questions.length} label={`Question ${i + 1} · answered`} />
    <div className="card bg-white mt-4"><p className="font-display text-2xl font-bold text-center mb-4">{q.question}</p>
      <div className="grid gap-2" role="radiogroup" aria-label="Answer choices">{q.options.map((o, n) => (
        <button key={n} role="radio" aria-checked={picked[q.id] === n} onClick={() => setPicked(p => ({ ...p, [q.id]: n }))}
          className={`text-left rounded-2xl border-2 px-4 py-3 font-semibold min-h-[52px] ${picked[q.id] === n ? 'bg-sun border-navy' : 'border-navy/20 hover:bg-sky/50'}`}>{o}</button>))}</div>
      {err && <div className="mt-4"><ErrorState error={err} onRetry={submit} title="Could not submit your answers" /></div>}
      <div className="flex justify-between gap-3 mt-5">
        <button className="btn-white" disabled={i === 0} onClick={() => setI(i - 1)}><ChevronLeft size={18} />Back</button>
        {last ? <button className="btn-coral" disabled={busy || answered < questions.length} onClick={submit}><Send size={18} />{busy ? 'Marking…' : 'Submit answers'}</button>
          : <button className="btn-coral" disabled={picked[q.id] === undefined} onClick={() => setI(i + 1)}>Next<ChevronRight size={18} /></button>}</div>
      {last && answered < questions.length && <p className="text-sm text-center mt-2">Answer every question to submit. Use Back to check any you skipped.</p>}
    </div></div>)
}
