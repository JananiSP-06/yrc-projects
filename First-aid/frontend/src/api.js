import fallbackGuides from './data/guides.json'
import fallbackQuiz from './data/quiz.json'

// In development Vite proxies /api to Spring Boot. Set VITE_API_URL to point elsewhere.
const BASE = import.meta.env.VITE_API_URL || '/api'

async function request(path, options, fallback) {
  try {
    const res = await fetch(`${BASE}${path}`, { headers: { Accept: 'application/json' }, ...options })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return { data: await res.json(), source: 'server' }
  } catch (err) {
    return { data: fallback, source: 'offline' }
  }
}

export const loadGuides = () => request('/guides', undefined, fallbackGuides)
export const loadQuiz = () => request('/quiz', undefined, fallbackQuiz)

/** Sends the finished quiz to the server for scoring. Falls back to local scoring if the server is not running. */
export async function submitQuiz(answers, questions) {
  const local = scoreLocally(answers, questions)
  const res = await request(
    '/quiz/submit',
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answers }) },
    local,
  )
  return { ...res.data, source: res.source }
}

export function scoreLocally(answers, questions) {
  const byId = Object.fromEntries(questions.map((q) => [q.id, q]))
  let score = 0
  const missed = new Set()
  answers.forEach((a) => {
    const q = byId[a.questionId]
    if (!q) return
    if (q.correct === a.selected) score += 1
    else missed.add(q.topic)
  })
  return { score, total: answers.length, topicsToReview: [...missed] }
}
