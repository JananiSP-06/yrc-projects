// In-memory replacement for services/api.js used by the component tests. It follows the real API contract.
import { SIGNS } from '../data/content'
export class ApiError extends Error { constructor(kind, status, message) { super(message); this.kind = kind; this.status = status } get isNetwork() { return this.kind === 'network' || this.kind === 'timeout' } }
export const API_BASE_URL = 'http://fake'
const up = s => s.toUpperCase()
const fx = {
  signs: SIGNS.map((s, i) => ({ id: i + 1, name: s.name, category: up(s.cat), description: s.mean, imagePath: `/assets/signs/${s.k}.svg`, safetyInstruction: s.do })),
  questions: [
    { id: 1, question: 'Q1 helmet when?', category: 'HELMET_SEATBELT', difficulty: 'EASY', options: ['Only highways', 'Every ride', 'Only night'], correctOption: 1, explanation: 'Every ride.' },
    { id: 2, question: 'Q2 seatbelt who?', category: 'HELMET_SEATBELT', difficulty: 'EASY', options: ['Everyone in the car', 'Only driver', 'Only front'], correctOption: 0, explanation: 'Everyone.' },
    { id: 3, question: 'Q3 chin strap?', category: 'HELMET_SEATBELT', difficulty: 'MEDIUM', options: ['Style', 'Warmth', 'Keeps helmet on', 'Weight'], correctOption: 2, explanation: 'Keeps it on.' },
    { id: 5, question: 'Q5 headlights at night?', category: 'CONDITIONS', difficulty: 'EASY', options: ['None', 'Dipped headlights', 'High beam'], correctOption: 1, explanation: 'Dipped.' },
    { id: 4, question: 'Q4 emergency number?', category: 'EMERGENCY', difficulty: 'EASY', options: ['100100', '555', '112'], correctOption: 2, explanation: '112 is national.' },
  ],
  tips: [{ id: 1, title: 'Helmet on, every ride', description: 'Always wear a properly fitted helmet.', category: 'HELMET', imagePath: '/assets/characters/arjun.svg' }, { id: 2, title: 'Cross at the zebra', description: 'Look right, left, right.', category: 'PEDESTRIAN', imagePath: '/assets/characters/riya.svg' }],
  campaigns: [
    { id: 1, title: 'Helmet Awareness Drive', description: 'Talk to riders.', startDate: '2026-12-01', endDate: '2026-12-07', category: 'HELMET', posterPath: null, status: 'UPCOMING' },
    { id: 2, title: 'Pedestrian Safety Walk', description: 'Walk through crossings.', startDate: '2026-10-02', endDate: '2026-10-09', category: 'PEDESTRIAN', posterPath: null, status: 'COMPLETED' }],
}
export const fake = { fail: null, delay: 0, pledges: new Set(), calls: [], lastQuiz: null, reset() { this.fail = null; this.pledges = new Set(); this.calls = []; this.lastQuiz = null; fx.campaignsOverride = null; fx.questionsOverride = null } }
const run = async (name, fn) => { fake.calls.push(name); if (fake.delay) await new Promise(r => setTimeout(r, fake.delay)); if (fake.fail === 'network') throw new ApiError('network', 0, 'Cannot reach the RoadWise server. Check that the backend is running.'); if (fake.fail === name) throw new ApiError('http', 500, 'Something went wrong on the server'); return fn() }
const pub = q => ({ id: q.id, question: q.question, category: q.category, difficulty: q.difficulty, options: q.options })
export const getSigns = () => run('getSigns', () => fx.signs)
export const getQuizzes = p => run('getQuizzes', () => (fake.lastQuiz = p, fx.questionsOverride || fx.questions).filter(q => (!p?.category || q.category === p.category) && (!p?.difficulty || q.difficulty === p.difficulty)).slice(0, p?.limit || 99).map(pub))
export const submitQuiz = answers => run('submitQuiz', () => {
  const details = answers.map(a => { const q = fx.questions.find(x => x.id === a.questionId); return { questionId: q.id, selectedOption: a.selectedOption, correct: a.selectedOption === q.correctOption, correctOption: q.correctOption, explanation: q.explanation } })
  const correct = details.filter(d => d.correct).length, total = details.length, percentage = Math.round(correct * 100 / total)
  return { total, correct, incorrect: total - correct, percentage, message: `server says ${percentage}`, details } })
export const getRandomTip = () => run('getRandomTip', () => fx.tips[Math.floor(Math.random() * fx.tips.length)])
export const getCampaigns = up => run('getCampaigns', () => (fx.campaignsOverride || fx.campaigns).filter(c => !up || c.status === 'UPCOMING'))
export const takePledge = id => run('takePledge', () => { const again = fake.pledges.has(id); fake.pledges.add(id); return { visitorId: id, pledgedAt: '2026-11-08T10:00:00', alreadyPledged: again, totalPledges: fake.pledges.size } })
export const getPledgeCount = () => run('getPledgeCount', () => fake.pledges.size)
export { fx }
