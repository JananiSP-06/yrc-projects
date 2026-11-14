import { render, screen, within, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
vi.mock('../services/api', async () => await import('./fakeApi.js'))
import { fake, fx } from './fakeApi.js'
import App from '../App'
import { ProgressProvider } from '../context/Progress'
import { SIGNS } from '../data/content'
import { makeSignQuestions, makeScenarios, makeSignalRounds, SCENARIOS, SIGNAL_ROUNDS, LEVELS } from '../data/games'
import { adaptSign } from '../services/adapters'
import { MODULES, CONDITIONS, INCLUSIVE, recommend, moduleForTopic } from '../data/learn'

const open = path => render(<MemoryRouter initialEntries={[path]}><ProgressProvider><App /></ProgressProvider></MemoryRouter>)
const click = async (name, opts = {}) => userEvent.click(await screen.findByRole('button', { name, ...opts }))
const log = () => JSON.parse(localStorage.getItem('rw_progress_v1') || '{"log":[]}')
beforeEach(() => fake.reset())

describe('generators', () => {
  const pool = fx.signs.map(adaptSign)
  it('sign challenge questions: counts, unique options, correct index, from the supplied pool', () => {
    for (const lvl of Object.keys(LEVELS)) { const qs = makeSignQuestions(lvl, pool); expect(qs).toHaveLength(LEVELS[lvl].n)
      qs.forEach(q => { expect(new Set(q.options).size).toBe(4); const s = pool.find(x => x.k === q.sign); expect(q.options[q.answer]).toBe(lvl === 'advanced' ? s.do : s.name) }) }
  })
  it('copes with a tiny or odd pool from the backend', () => {
    expect(makeSignQuestions('beginner', pool.slice(0, 3))).toEqual([])
    const few = pool.filter(s => s.cat === 'Mandatory').slice(0, 4); makeSignQuestions('advanced', few).forEach(q => expect(new Set(q.options).size).toBe(q.options.length))
  })
  it('scenario and signal answer indexes are right', () => {
    makeScenarios(7).forEach(q => expect(q.options[q.answer]).toBe(SCENARIOS.find(s => s.text === q.prompt).right))
    makeSignalRounds(7).forEach(r => expect(r.options[r.answer]).toBe(SIGNAL_ROUNDS.find(x => x.prompt === r.prompt).right))
  })
  it('adapter maps a backend sign to the UI shape', () => { expect(adaptSign(fx.signs[0])).toMatchObject({ k: 'stop', name: 'Stop', cat: 'Mandatory' }) })
})

describe('Traffic signs (backend data)', () => {
  it('shows a loading state, then every sign from the API, with search and filter', async () => {
    fake.delay = 30; open('/traffic-signs'); expect(screen.getByText(/Loading traffic signs/)).toBeInTheDocument()
    expect(await screen.findByText('No Entry', { selector: 'h3' })).toBeInTheDocument(); expect(screen.getAllByRole('img', { name: /traffic sign$/ }).length).toBe(22 + 1)  // 22 cards + the challenge sign
    await userEvent.type(screen.getByPlaceholderText(/Search signs/), 'school'); expect(screen.getAllByRole('img', { name: /traffic sign$/ })).toHaveLength(1 + 1)
    await userEvent.clear(screen.getByPlaceholderText(/Search signs/)); await userEvent.type(screen.getByPlaceholderText(/Search signs/), 'zzz'); expect(screen.getByText('No signs found')).toBeInTheDocument()
  })
  it('uses what the backend sends, not the bundled list', async () => {
    fx.signs.push({ id: 99, name: 'Brand New Sign', category: 'INFORMATORY', description: 'Only the server knows this.', imagePath: '/assets/signs/brandNew.svg', safetyInstruction: 'Read it.' })
    open('/traffic-signs'); expect(await screen.findByText('Brand New Sign', { selector: 'h3' })).toBeInTheDocument(); fx.signs.pop()
  })
  it('falls back to the bundled signs with an offline note when the server is unreachable', async () => {
    fake.fail = 'network'; open('/traffic-signs'); expect(await screen.findByText(/Server offline/)).toBeInTheDocument(); expect(screen.getAllByRole('img', { name: /traffic sign$/ }).length).toBe(SIGNS.length + 1)
  })
  it('shows an error with retry for a server error, and recovers', async () => {
    fake.fail = 'getSigns'; open('/traffic-signs'); expect(await screen.findByRole('alert')).toHaveTextContent(/went wrong/); fake.fail = null; await click(/Try again/); expect(await screen.findByText('Stop', { selector: 'h3' })).toBeInTheDocument()
  })
})

describe('Traffic Sign Challenge', () => {
  it('plays every question from backend signs, scores, badges and retakes', async () => {
    open('/games/sign-challenge'); await click(/Beginner/)
    for (let n = 0; n < 5; n++) {
      const key = (await screen.findByRole('img', { name: /traffic sign$/ })).getAttribute('aria-label').replace(' traffic sign', ''); const s = SIGNS.find(x => x.k === key)
      await click(s.name, { exact: true }); expect(screen.getByText('Correct!')).toBeInTheDocument(); await click(n === 4 ? 'See my result' : 'Next question')
    }
    expect(screen.getByText('100%')).toBeInTheDocument(); expect(screen.getByText(/Traffic Sign Explorer/)).toBeInTheDocument(); expect(log().log[0]).toMatchObject({ k: 'sign', score: 5, total: 5 }); await click(/Retake/); expect(screen.getByText('Question 1')).toBeInTheDocument()
  })
  it('shows an error if signs cannot load', async () => { fake.fail = 'getSigns'; open('/games/sign-challenge'); expect(await screen.findByRole('alert')).toBeInTheDocument() })
})

describe('Road Safety Quiz (backend marks the answers)', () => {
  const answerAll = async (picks) => { for (let n = 0; n < picks.length; n++) { await userEvent.click(await screen.findByRole('radio', { name: picks[n] })); if (n < picks.length - 1) await click('Next') } }
  it('loads questions, never shows answers up front, submits, and shows the backend result', async () => {
    open('/games/quiz'); await click('Helmet and Seatbelt'); expect(await screen.findByText('Q1 helmet when?')).toBeInTheDocument()
    expect(screen.queryByText('Correct!')).toBeNull(); expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()
    await answerAll(['Every ride', 'Everyone in the car', 'Keeps helmet on']); await click('Submit answers')
    expect(await screen.findByText('100%')).toBeInTheDocument(); expect(screen.getByText('server says 100')).toBeInTheDocument(); expect(screen.getByText('Review your answers')).toBeInTheDocument(); expect(screen.getByText(/Helmet Hero/)).toBeInTheDocument()
    expect(fake.calls.filter(c => c === 'submitQuiz')).toHaveLength(1); expect(log().log[0]).toMatchObject({ k: 'quiz', score: 3, total: 3 })
  })
  it('uses the backend score for a partial result and shows the right answers in the review', async () => {
    open('/games/quiz'); await click('Helmet and Seatbelt'); await screen.findByText('Q1 helmet when?')
    await answerAll(['Only highways', 'Everyone in the car', 'Style']); await click('Submit answers')
    expect(await screen.findByText('33%')).toBeInTheDocument(); expect(screen.getByText('Correct answer: Every ride')).toBeInTheDocument(); expect(screen.getByText('Correct answer: Keeps helmet on')).toBeInTheDocument()
  })
  it('lets the visitor retry when submitting fails, keeping their answers', async () => {
    open('/games/quiz'); await click('Emergency'); await screen.findByText('Q4 emergency number?'); await userEvent.click(screen.getByRole('radio', { name: '112' })); fake.fail = 'submitQuiz'; await click('Submit answers')
    expect(await screen.findByRole('alert')).toHaveTextContent(/not submit/i); fake.fail = null; await click(/Try again/); expect(await screen.findByText('100%')).toBeInTheDocument()
  })
  it('handles an empty topic and a down server', async () => {
    open('/games/quiz'); await click('Pedestrian Safety'); expect(await screen.findByText('No questions here yet')).toBeInTheDocument()
    await click('Pick another topic'); fake.fail = 'network'; await click('Basics'); expect(await screen.findByText(/Cannot reach the RoadWise server/)).toBeInTheDocument()
    fake.fail = null; await click(/Try again/); expect(await screen.findByText('No questions here yet')).toBeInTheDocument()
  })
})

describe('Pledge', () => {
  beforeEach(() => { URL.createObjectURL = () => 'blob:x'; URL.revokeObjectURL = () => { } })
  it('shows the total, submits to the backend, updates the total and unlocks the badge', async () => {
    open('/campaigns'); expect(await screen.findByTestId('pledge-total')).toHaveTextContent('0'); await userEvent.type(screen.getByPlaceholderText(/Name for certificate/), 'Asha'); await click('Take the Road Safety Pledge')
    expect(await screen.findByText(/Your pledge is recorded/)).toBeInTheDocument(); expect(screen.getByTestId('pledge-total')).toHaveTextContent('1'); expect(screen.getByText(/Pledge Taker/)).toBeInTheDocument(); expect(log().pledged).toBe(true)
    await click(/Download certificate/)
  })
  it('sends the same anonymous id again and says so', async () => {
    open('/campaigns'); await click('Take the Road Safety Pledge'); await screen.findByText(/recorded/); document.body.innerHTML = ''; open('/campaigns'); await click('Take the Road Safety Pledge')
    expect(await screen.findByText(/already taken the pledge/)).toBeInTheDocument(); expect(fake.pledges.size).toBe(1)
  })
  it('does not award the badge when the pledge fails, and can retry', async () => {
    open('/campaigns'); await screen.findByTestId('pledge-total'); fake.fail = 'takePledge'; await click('Take the Road Safety Pledge')
    expect(await screen.findByText('Your pledge was not saved')).toBeInTheDocument(); expect(log().pledged ?? false).toBe(false); fake.fail = null; await click(/Try again/); expect(await screen.findByText(/recorded/)).toBeInTheDocument()
  })
  it('copes when the pledge total cannot load', async () => { fake.fail = 'getPledgeCount'; open('/campaigns'); expect(await screen.findByText(/Pledge total unavailable/)).toBeInTheDocument() })
})

describe('Campaigns', () => {
  it('lists campaigns from the API with status and dates, and the upcoming tab calls the API', async () => {
    open('/campaigns'); expect(await screen.findByText('Helmet Awareness Drive')).toBeInTheDocument(); expect(screen.getByText('Completed')).toBeInTheDocument(); expect(screen.getByText(/1 Dec 2026 to 7 Dec 2026/)).toBeInTheDocument()
    await userEvent.click(screen.getByRole('tab', { name: 'Upcoming' })); expect(await screen.findByText('Helmet Awareness Drive')).toBeInTheDocument(); await waitFor(() => expect(screen.queryByText('Pedestrian Safety Walk')).toBeNull())
  })
  it('handles empty, server error and unreachable server', async () => {
    fx.campaignsOverride = []; open('/campaigns'); expect(await screen.findByText('No campaigns yet')).toBeInTheDocument(); fx.campaignsOverride = null
    fake.fail = 'getCampaigns'; await userEvent.click(screen.getByRole('tab', { name: 'Upcoming' })); expect(await screen.findByText('Could not load campaigns')).toBeInTheDocument()
    fake.fail = 'network'; await click(/Try again/); expect(await screen.findByText(/Cannot reach the RoadWise server/)).toBeInTheDocument()
  })
})

describe('Home daily tip', () => {
  it('shows a tip from the backend and fetches another on Next tip', async () => {
    open('/'); const t = await screen.findByTestId('daily-tip'); expect(['Always wear a properly fitted helmet.', 'Look right, left, right.']).toContain(t.textContent.replace(/[“”]/g, ''))
    await click(/Next tip/); await waitFor(() => expect(fake.calls.filter(c => c === 'getRandomTip').length).toBeGreaterThan(1))
  })
  it('falls back to a bundled tip with a note when offline, and shows an error for a server fault', async () => {
    fake.fail = 'network'; open('/'); expect(await screen.findByText(/Server offline/)).toBeInTheDocument(); expect(screen.getByTestId('daily-tip')).toBeInTheDocument()
  })
  it('offers retry on a server fault', async () => { fake.fail = 'getRandomTip'; open('/'); expect(await screen.findByText(/could not load a safety tip/)).toBeInTheDocument(); fake.fail = null; await click('Try again'); expect(await screen.findByTestId('daily-tip')).toBeInTheDocument() })
})

describe('frontend-only games still work', () => {
  it('Traffic Signal Game: 6 rounds, explanations, Signal Master', async () => {
    open('/games/signal')
    for (let n = 0; n < 6; n++) { const prompt = screen.getByText(/^(You are|The light is)/).textContent; const r = SIGNAL_ROUNDS.find(x => x.prompt === prompt); await click(r.right, { exact: true }); expect(screen.getByText(r.why)).toBeInTheDocument(); await click(n === 5 ? 'See my result' : 'Next round') }
    expect(screen.getByText('100%')).toBeInTheDocument(); expect(screen.getByText(/Signal Master/)).toBeInTheDocument()
  })
  it('Spot the Mistake: find all, safe items explained, Eagle Eye', async () => {
    open('/games/spot-mistake'); const spot = n => screen.getByRole('button', { name: new RegExp(`^Spot ${n}( |$)`) })
    await userEvent.click(spot(6)); expect(screen.getByText(/This is safe/)).toBeInTheDocument(); for (let n = 1; n <= 5; n++) await userEvent.click(spot(n))
    expect(screen.getByText('You found every mistake!')).toBeInTheDocument(); expect(screen.getByText(/Eagle Eye/)).toBeInTheDocument()
  })
  it('What Would You Do: Pedestrian Pro', async () => {
    open('/games/what-would-you-do')
    for (let n = 0; n < 5; n++) { const s = SCENARIOS.find(x => x.text === screen.getByText(/./, { selector: 'p.font-display' }).textContent); await click(s.right, { exact: true }); await click(n === 4 ? 'See my result' : 'Next question') }
    expect(screen.getByText(/Pedestrian Pro/)).toBeInTheDocument()
  })
  it('Myth or Fact quiz: Myth Buster', async () => {
    open('/myths-vs-facts'); for (let n = 0; n < 5; n++) { await click(n % 2 ? 'Fact' : 'Myth'); await click('Next') } expect(screen.getByText(/Myth Buster/)).toBeInTheDocument()
  })
  it('achievements show all eight badges once everything is done', async () => {
    localStorage.setItem('rw_progress_v1', JSON.stringify({ pledged: true, pledgeCount: 1, log: [{ k: 'sign', score: 5, total: 5 }, { k: 'signal', score: 6, total: 6 }, { k: 'spot', score: 5, total: 5 }, { k: 'wwyd', score: 5, total: 5 }, { k: 'quiz', score: 4, total: 4, meta: { topic: 'Helmet and Seatbelt' } }, { k: 'myth', score: 5, total: 5 }] }))
    open('/achievements'); expect(document.querySelectorAll('[data-earned="true"]')).toHaveLength(8)
  })
})

describe('Learn dashboard and lessons', () => {
  it('lists all eight modules with working links', async () => {
    open('/learn'); expect(document.querySelectorAll('[data-module]')).toHaveLength(8)
    MODULES.forEach(m => expect(document.querySelector(`main a[href="${m.to}"]`)).not.toBeNull()); expect(screen.getByText('0 of 8')).toBeInTheDocument()
  })
  it('remembers opened lessons and finished knowledge checks, and shows them on the dashboard', async () => {
    open('/helmet-seatbelt'); await userEvent.click(await screen.findByRole('button', { name: 'On every ride' })); expect(log().log.at(-1)).toMatchObject({ k: 'check', score: 1, meta: { module: '/helmet-seatbelt' } })
    document.body.innerHTML = ''; open('/learn'); const card = document.querySelector('[data-module="3"]'); expect(within(card).getByText('Opened')).toBeInTheDocument(); expect(within(card).getByText('Checked')).toBeInTheDocument(); expect(screen.getByText('1 of 8')).toBeInTheDocument()
  })
  it('Module 7 has seven illustrated sections, each with a right and a wrong picture', () => {
    open('/road-conditions'); CONDITIONS.forEach(c => expect(document.getElementById(c.id)).not.toBeNull()); expect(CONDITIONS.map(c => c.id)).toEqual(['night', 'rain', 'fog', 'highway', 'school', 'railway', 'parking'])
    expect(screen.getAllByRole('img', { name: /^Right:/ })).toHaveLength(7); expect(screen.getAllByRole('img', { name: /^Wrong:/ })).toHaveLength(7)
  })
  it('Module 8 covers seniors, footpaths, ramps, tactile paving, audio signals and respectful help', () => {
    open('/inclusive-safety'); expect(INCLUSIVE).toHaveLength(6); ['Safe crossing for senior citizens', 'Accessible footpaths', 'Pedestrian ramps', 'Tactile paving', 'Audio pedestrian signals', 'Helping visually impaired pedestrians respectfully'].forEach(t => expect(screen.getByRole('heading', { name: t })).toBeInTheDocument())
    expect(screen.getAllByRole('img', { name: /^Wrong:/ })).toHaveLength(1)
  })
  it('lesson pages show right-vs-wrong cartoons', () => { for (const [p, n] of [['/helmet-seatbelt', 2], ['/pedestrian-safety', 3], ['/traffic-signals', 1], ['/accident-prevention', 2], ['/fundamentals', 1]]) { const { unmount } = open(p); expect(document.querySelectorAll('[data-compare]')).toHaveLength(n); unmount() } })
  it('Traffic Rules shows a cartoon that follows the chosen road user', async () => {
    open('/traffic-rules'); expect(document.querySelector('[data-compare=crossing]')).not.toBeNull(); await userEvent.click(screen.getByRole('tab', { name: /Car drivers/ })); expect(document.querySelector('[data-compare=seatbelt]')).not.toBeNull(); expect(document.querySelector('[data-compare=crossing]')).toBeNull()
  })
  it('the last lesson leads on to Emergency Help and Back/Next chain covers all eight', () => {
    open('/inclusive-safety'); expect(screen.getByRole('link', { name: /Back: Different Conditions/ })).toBeInTheDocument(); expect(screen.getByRole('link', { name: /Next: Emergency Help/ })).toBeInTheDocument()
  })
})

describe('recommendations (what to learn next)', () => {
  const st = (o = {}) => ({ log: [], visited: {}, ...o })
  it('starts with lessons not opened yet', () => { const r = recommend(st(), 3); expect(r.map(x => x.to)).toEqual(['/fundamentals', '/traffic-rules', '/helmet-seatbelt']); expect(r[0].reason).toMatch(/not opened/) })
  it('puts weak quiz topics first and links to the right lesson', () => {
    const r = recommend(st({ log: [{ k: 'quiz', score: 2, total: 5, meta: { topic: 'Road Conditions' } }], visited: { '/fundamentals': true } }), 2); expect(r[0]).toMatchObject({ to: '/road-conditions' }); expect(r[0].reason).toMatch(/40%/); expect(moduleForTopic('Inclusive Safety')).toBe('/inclusive-safety')
  })
  it('flags a missed knowledge check and a weak signal game', () => {
    expect(recommend(st({ log: [{ k: 'check', score: 0, total: 1, meta: { module: '/traffic-rules' } }], visited: Object.fromEntries(MODULES.map(m => [m.to, true])) }), 3)[0]).toMatchObject({ to: '/traffic-rules' })
    expect(recommend(st({ log: [{ k: 'signal', score: 3, total: 6 }] }), 1)[0].to).toBe('/traffic-signals')
  })
  it('does not repeat a lesson, and says so when everything is done', () => {
    const all = { visited: Object.fromEntries(MODULES.map(m => [m.to, true])), log: MODULES.map(m => ({ k: 'check', score: 1, total: 1, meta: { module: m.to } })) }
    expect(recommend(st(all), 5)).toEqual([]); const r = recommend(st({ log: [{ k: 'quiz', score: 1, total: 5, meta: { topic: 'Basics' } }, { k: 'check', score: 0, total: 1, meta: { module: '/fundamentals' } }] }), 8); expect(new Set(r.map(x => x.to)).size).toBe(r.length)
  })
  it('shows recommendations on the dashboard and the achievements page', async () => { open('/learn'); expect(screen.getByTestId('recommended')).toBeInTheDocument(); document.body.innerHTML = ''; open('/achievements'); expect(screen.getByText('Lessons to try next')).toBeInTheDocument() })
})

describe('new quiz topics, About scene and Campaigns month section', () => {
  it('quiz offers the two new topics and sends the right category code to the API', async () => {
    open('/games/quiz'); expect(await screen.findByRole('button', { name: 'Inclusive Safety' })).toBeInTheDocument(); await click('Road Conditions'); expect(await screen.findByText('Q5 headlights at night?')).toBeInTheDocument(); expect(fake.lastQuiz).toMatchObject({ category: 'CONDITIONS', limit: 10 })
  })
  it('About page has the community illustration', () => { open('/about'); expect(screen.getByRole('img', { name: /Students, a senior citizen, a traffic officer/ })).toBeInTheDocument() })
  it('Campaigns has a National Road Safety Month section pointing to MoRTH and six poster cards', async () => {
    open('/campaigns'); expect(screen.getByRole('heading', { name: 'National Road Safety Month' })).toBeInTheDocument(); expect(screen.getByRole('link', { name: /Official updates on MoRTH/ })).toHaveAttribute('href', 'https://morth.nic.in'); expect(screen.getAllByRole('button', { name: /Download poster/ })).toHaveLength(6)
    await userEvent.click(screen.getAllByRole('button', { name: /Download poster/ })[0]); expect(await screen.findByRole('button', { name: /Preparing/ })).toBeDisabled()
  })
})

describe('routing', () => {
  const routes = ['/', '/fundamentals', '/traffic-rules', '/traffic-signs', '/helmet-seatbelt', '/pedestrian-safety', '/traffic-signals', '/accident-prevention', '/emergency-help', '/myths-vs-facts', '/campaigns', '/about', '/learn', '/road-conditions', '/inclusive-safety', '/games', '/games/sign-challenge', '/games/signal', '/games/spot-mistake', '/games/what-would-you-do', '/games/quiz', '/achievements', '/nope']
  it.each(routes)('renders %s', async p => { open(p); expect(screen.getAllByRole('heading', { level: 1 }).length).toBeGreaterThan(0); await waitFor(() => expect(screen.queryByText(/^Loading/)).toBeNull(), { timeout: 2000 }) })
  it('every internal link on every page points at a real route', async () => {
    const valid = new Set(routes.filter(r => r !== '/nope')); const bad = []
    for (const p of routes.filter(r => r !== '/nope')) { const { unmount } = open(p); await waitFor(() => expect(screen.queryByText(/^Loading/)).toBeNull()); document.querySelectorAll('a[href^="/"]').forEach(a => { const h = a.getAttribute('href').split('#')[0] || '/'; if (!valid.has(h)) bad.push(`${p} -> ${h}`) }); unmount() }
    expect(bad).toEqual([])
  })
})
