// @vitest-environment node
// Runs the REAL services/api.js (axios) against a live API. Skipped unless API_URL is set:
//   API_URL=http://localhost:8080 npm run test:contract
import { describe, it, expect, beforeAll, vi } from 'vitest'
const URL_ = process.env.API_URL
describe.skipIf(!URL_)('API contract (live server)', () => {
  let api
  beforeAll(async () => { vi.stubEnv('VITE_API_BASE_URL', URL_); api = await import('../services/api.js') })
  it('serves traffic signs with every field', async () => {
    const s = await api.getSigns(); expect(s.length).toBeGreaterThanOrEqual(22)
    s.forEach(x => expect(x).toEqual(expect.objectContaining({ id: expect.any(Number), name: expect.any(String), category: expect.stringMatching(/^(MANDATORY|CAUTIONARY|INFORMATORY)$/), description: expect.any(String), imagePath: expect.stringMatching(/^\/assets\//), safetyInstruction: expect.any(String) })))
  })
  it('never exposes the answer key on public quiz endpoints', async () => {
    const qs = await api.getQuizzes({ limit: 50 }); expect(qs.length).toBeGreaterThan(5)
    qs.forEach(q => { expect(Object.keys(q).sort()).toEqual(['category', 'difficulty', 'id', 'options', 'question']); expect(q.options.length).toBeGreaterThanOrEqual(2) })
  })
  it('filters and limits quiz questions', async () => {
    const e = await api.getQuizzes({ category: 'EMERGENCY' }); expect(e.length).toBeGreaterThan(0); e.forEach(q => expect(q.category).toBe('EMERGENCY'))
    expect((await api.getQuizzes({ limit: 3 })).length).toBe(3)
    await expect(api.getQuizzes({ limit: 0 })).rejects.toMatchObject({ kind: 'http', status: 400 })
    await expect(api.getQuizzes({ category: 'nonsense' })).rejects.toMatchObject({ status: 400 })
  })
  it('marks quizzes on the server: consistent score, then 100% with the revealed answers', async () => {
    const qs = await api.getQuizzes({ limit: 8 })
    const first = await api.submitQuiz(qs.map(q => ({ questionId: q.id, selectedOption: 0 })))
    expect(first.total).toBe(8); expect(first.correct + first.incorrect).toBe(8); expect(first.details.filter(d => d.correct).length).toBe(first.correct)
    first.details.forEach(d => { expect(d.correct).toBe(d.selectedOption === d.correctOption); expect(d.explanation.length).toBeGreaterThan(0) })
    expect(first.percentage).toBe(Math.round(first.correct * 100 / 8))
    const perfect = await api.submitQuiz(first.details.map(d => ({ questionId: d.questionId, selectedOption: d.correctOption })))
    expect(perfect).toMatchObject({ total: 8, correct: 8, incorrect: 0, percentage: 100 }); expect(perfect.message).toMatch(/Champion/)
    const none = await api.submitQuiz(first.details.map(d => ({ questionId: d.questionId, selectedOption: (d.correctOption + 1) % qs.find(q => q.id === d.questionId).options.length })))
    expect(none).toMatchObject({ correct: 0, percentage: 0 })
  })
  it('rejects bad quiz submissions with a readable message', async () => {
    await expect(api.submitQuiz([])).rejects.toMatchObject({ status: 400 })
    await expect(api.submitQuiz([{ questionId: 999999, selectedOption: 0 }])).rejects.toMatchObject({ status: 400, message: expect.stringMatching(/Unknown question/) })
    await expect(api.submitQuiz([{ questionId: 2, selectedOption: 0 }, { questionId: 2, selectedOption: 1 }])).rejects.toMatchObject({ status: 400 })
    await expect(api.submitQuiz([{ questionId: 2, selectedOption: 99 }])).rejects.toMatchObject({ status: 400 })
  })
  it('returns random tips and campaigns with a computed status', async () => {
    const t = await api.getRandomTip(); expect(t).toEqual(expect.objectContaining({ id: expect.any(Number), title: expect.any(String), description: expect.any(String) }))
    const c = await api.getCampaigns(); expect(c.length).toBeGreaterThan(0); c.forEach(x => expect(['UPCOMING', 'ONGOING', 'COMPLETED']).toContain(x.status))
    const up = await api.getCampaigns(true); up.forEach(x => expect(x.status).toBe('UPCOMING'))
  })
  it('records one pledge per visitor id and counts them', async () => {
    const before = await api.getPledgeCount(); const id = crypto.randomUUID()
    const a = await api.takePledge(id); expect(a).toMatchObject({ visitorId: id, alreadyPledged: false, totalPledges: before + 1 })
    const b = await api.takePledge(id); expect(b).toMatchObject({ alreadyPledged: true, totalPledges: before + 1 }); expect(await api.getPledgeCount()).toBe(before + 1)
    const anon = await api.takePledge(); expect(anon.visitorId).toMatch(/^[0-9a-f-]{36}$/); await expect(api.takePledge('not-a-uuid')).rejects.toMatchObject({ status: 400 })
  })
  it('turns failures into ApiError', async () => {
    await expect(api.http.get('/api/signs/999999')).rejects.toMatchObject({ kind: 'http', status: 404 })
    await expect(api.http.get('/api/nope')).rejects.toMatchObject({ status: 404 })
    await expect(api.http.get('/api/admin/stats')).rejects.toMatchObject({ status: 401 })
    const dead = api.http.create ? null : null; vi.stubEnv('VITE_API_BASE_URL', 'http://localhost:1'); vi.resetModules(); const bad = await import('../services/api.js')
    await expect(bad.getSigns()).rejects.toMatchObject({ kind: 'network', isNetwork: true })
  })
})
