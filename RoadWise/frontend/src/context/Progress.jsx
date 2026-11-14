import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { Trophy } from 'lucide-react'

// Progress lives in localStorage for now. Stage 3 can sync the same shape to the backend.
const KEY = 'rw_progress_v1'
const EMPTY = { log: [], pledged: false, pledgeCount: 0, visited: {} }
const load = () => { try { return { ...EMPTY, ...JSON.parse(localStorage.getItem(KEY) || '{}') } } catch { return EMPTY } }
const ratio = e => e.score / e.total

export const BADGES = [
  { id: 'signs', name: 'Traffic Sign Explorer', emoji: '🛑', how: 'Finish a Traffic Sign Challenge', test: s => s.log.some(e => e.k === 'sign') },
  { id: 'signal', name: 'Signal Master', emoji: '🚦', how: 'Score 80% or more in the Traffic Signal Game', test: s => s.log.some(e => e.k === 'signal' && ratio(e) >= .8) },
  { id: 'eagle', name: 'Eagle Eye', emoji: '🦅', how: 'Find every mistake in a Spot the Mistake scene', test: s => s.log.some(e => e.k === 'spot' && e.score === e.total) },
  { id: 'pedestrian', name: 'Pedestrian Pro', emoji: '🚶', how: 'Score 70% or more in What Would You Do?', test: s => s.log.some(e => e.k === 'wwyd' && ratio(e) >= .7) },
  { id: 'helmet', name: 'Helmet Hero', emoji: '⛑️', how: 'Score 80% or more in the Helmet and Seatbelt quiz', test: s => s.log.some(e => e.k === 'quiz' && e.meta?.topic === 'Helmet and Seatbelt' && ratio(e) >= .8) },
  { id: 'myth', name: 'Myth Buster', emoji: '🔍', how: 'Get 4 or more right in the Myth or Fact quiz', test: s => s.log.some(e => e.k === 'myth' && e.score >= 4) },
  { id: 'pledge', name: 'Pledge Taker', emoji: '🤝', how: 'Take the Road Safety Pledge', test: s => s.pledged },
]
const CHAMP = { id: 'champion', name: 'Road Safety Champion', emoji: '🏆', how: 'Earn all the other badges' }
const earnedIds = s => { const ids = BADGES.filter(b => b.test(s)).map(b => b.id); if (ids.length === BADGES.length) ids.push('champion'); return ids }
export const ALL_BADGES = [...BADGES, CHAMP]

const Ctx = createContext(null)
export const useProgress = () => useContext(Ctx)

export function ProgressProvider({ children }) {
  const [state, setState] = useState(load); const [toast, setToast] = useState([]); const ref = useRef(state)
  useEffect(() => { ref.current = state; try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { } }, [state])
  useEffect(() => { if (!toast.length) return; const t = setTimeout(() => setToast([]), 4500); return () => clearTimeout(t) }, [toast])
  const commit = useCallback(next => {
    const before = earnedIds(ref.current), after = earnedIds(next)
    ref.current = next; setState(next)
    const fresh = after.filter(i => !before.includes(i)).map(i => ALL_BADGES.find(b => b.id === i))
    if (fresh.length) setToast(fresh)
  }, [])
  const record = useCallback((k, score, total, meta = {}) => commit({ ...ref.current, log: [...ref.current.log, { k, score, total, meta, at: Date.now() }].slice(-200) }), [commit])
  const takePledge = useCallback(() => commit({ ...ref.current, pledged: true, pledgeCount: ref.current.pledgeCount + 1 }), [commit])
  const visit = useCallback(path => { if (ref.current.visited?.[path]) return; const next = { ...ref.current, visited: { ...ref.current.visited, [path]: true } }; ref.current = next; setState(next) }, [])
  const reset = useCallback(() => { ref.current = EMPTY; setState(EMPTY); setToast([]) }, [])
  const earned = earnedIds(state)
  return (<Ctx.Provider value={{ state, record, takePledge, visit, reset, earned }}>{children}
    {toast.length > 0 && <div role="status" className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 card !py-3 !px-5 bg-sun flex items-center gap-3 max-w-[92vw]"><Trophy /><div><p className="font-display font-bold">New badge earned!</p><p className="text-sm">{toast.map(b => `${b.emoji} ${b.name}`).join(', ')}</p></div></div>}
  </Ctx.Provider>)
}
