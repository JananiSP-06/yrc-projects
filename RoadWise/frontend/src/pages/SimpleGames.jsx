import { useMemo, useState } from 'react'
import { GameShell, McqRunner, Picker } from '../components/Games'
import QuizRunner from '../components/QuizRunner'
import { Loading, ErrorState, EmptyState, OfflineNote } from '../components/ApiStates'
import { LEVELS, makeSignQuestions, makeScenarios, TOPICS, QUIZ_LEVELS } from '../data/games'
import { getQuizzes, submitQuiz } from '../services/api'
import { TOPIC_CODE, LEVEL_CODE } from '../services/adapters'
import useApi from '../hooks/useApi'
import useSigns from '../hooks/useSigns'
import { useProgress } from '../context/Progress'

export function SignChallenge() {
  const { record } = useProgress(); const { signs, loading, error, offline, reload } = useSigns(); const [level, setLevel] = useState(null); const [round, setRound] = useState(0)
  const qs = useMemo(() => level ? makeSignQuestions(level, signs) : [], [level, round, signs])
  return (<GameShell title="Traffic Sign Challenge" intro="Look at the sign and choose the right answer. Pick a level to begin." who="ravi" color="bg-coral/40">
    {loading ? <Loading label="Loading signs…" /> : error ? <ErrorState error={error} onRetry={reload} /> : signs.length < 4 ? <EmptyState title="Not enough signs yet" text="The challenge needs at least four signs in the library." />
      : <>{offline && <OfflineNote what="signs" />}{!level ? <Picker title="Choose your level" options={Object.entries(LEVELS).map(([k, v]) => [k, v.label, `${v.n} questions · ${v.text}`])} onPick={setLevel} />
        : <McqRunner key={round + level} questions={qs} onFinish={(s, t) => record('sign', s, t, { level })} onRetake={() => setRound(r => r + 1)} extra={<button className="btn-white" onClick={() => setLevel(null)}>Change level</button>} />}</>}
  </GameShell>)
}
export function WhatWouldYouDo() {
  const { record } = useProgress(); const [round, setRound] = useState(0); const qs = useMemo(() => makeScenarios(5), [round])
  return (<GameShell title="What Would You Do?" intro="Real road situations. Pick the safest response and learn why." who="sam" color="bg-lav">
    <McqRunner key={round} questions={qs} onFinish={(s, t) => record('wwyd', s, t)} onRetake={() => setRound(r => r + 1)} /></GameShell>)
}

// Fetches one set of questions from the backend, then hands marking to the backend too.
function QuizSession({ cfg, onChange }) {
  const { record } = useProgress(); const [round, setRound] = useState(0)
  const { data, error, loading, reload } = useApi(() => getQuizzes({ category: TOPIC_CODE[cfg.topic], difficulty: LEVEL_CODE[cfg.level], limit: 10 }), [cfg, round])
  if (loading) return <Loading label="Loading questions…" />
  if (error) return <ErrorState error={error} onRetry={reload} title="Could not load the quiz" />
  if (!data.length) return <EmptyState title="No questions here yet" text="There are no questions for this level and topic."><button className="btn-coral" onClick={() => onChange({ ...cfg, level: 'all' })}>Try all levels</button><button className="btn-white" onClick={() => onChange(null)}>Pick another topic</button></EmptyState>
  const mark = async answers => { const r = await submitQuiz(answers); record('quiz', r.correct, r.total, { topic: cfg.topic, level: cfg.level }); return r }
  return <QuizRunner key={round} questions={data} onSubmit={mark} onRetake={() => setRound(r => r + 1)} extra={<button className="btn-white" onClick={() => onChange(null)}>Change topic</button>} />
}
export function RoadQuiz() {
  const [cfg, setCfg] = useState(null); const [lvl, setLvl] = useState('all')
  return (<GameShell title="Road Safety Quiz" intro="Test what you have learned. Choose a level and a topic. The server marks your answers." who="riya" color="bg-sky">
    {!cfg ? <div className="card bg-white max-w-2xl mx-auto"><h2 className="text-3xl mb-3">Level</h2>
      <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Level">{QUIZ_LEVELS.map(([k, l]) => <button key={k} aria-pressed={lvl === k} onClick={() => setLvl(k)} className={`chip !py-2 !text-base ${lvl === k ? '!bg-sun !border-navy' : ''}`}>{l}</button>)}</div>
      <h2 className="text-3xl mb-3">Topic</h2><div className="grid sm:grid-cols-2 gap-2">{['All topics', ...TOPICS].map(t => <button key={t} onClick={() => setCfg({ level: lvl, topic: t })} className="rounded-2xl border-2 border-navy/20 hover:bg-sky/50 px-4 py-3 font-bold text-left min-h-[52px]">{t}</button>)}</div></div>
      : <QuizSession key={cfg.topic + cfg.level} cfg={cfg} onChange={setCfg} />}
  </GameShell>)
}
