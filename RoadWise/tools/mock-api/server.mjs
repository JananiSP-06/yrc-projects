// Stand-in for the Spring Boot API, for testing the frontend where Maven/Spring cannot run.
// It follows backend/docs/API.md (public endpoints only) and reads the real MySQL/MariaDB database.
// It is NOT the Spring code: use the real backend for the final check.
import http from 'node:http'
import { randomUUID } from 'node:crypto'
import mysql from 'mysql2/promise'

const PORT = +process.env.PORT || 8080
const db = await mysql.createPool({ host: process.env.DB_HOST || '127.0.0.1', user: process.env.DB_USER || 'rw', password: process.env.DB_PASSWORD || 'rwpass', database: process.env.DB_NAME || 'roadwise', dateStrings: true })
const ORIGINS = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173').split(',')
const ENUMS = { sign: ['MANDATORY', 'CAUTIONARY', 'INFORMATORY'], quiz: ['BASICS', 'TRAFFIC_RULES', 'HELMET_SEATBELT', 'PEDESTRIAN_SAFETY', 'SIGNALS_SIGNS', 'EMERGENCY', 'CONDITIONS', 'INCLUSIVE_SAFETY'], diff: ['EASY', 'MEDIUM', 'HARD'], tip: ['HELMET', 'SEATBELT', 'PEDESTRIAN', 'CYCLING', 'DRIVING', 'GENERAL'] }
class HttpError extends Error { constructor(status, message, fieldErrors) { super(message); this.status = status; this.fieldErrors = fieldErrors } }
const parseEnum = (list, raw) => { if (raw == null || raw === '') return null; const k = String(raw).trim().toUpperCase().replace(/[- ]/g, '_'); if (!list.includes(k)) throw new HttpError(400, `Invalid value '${raw}'. Allowed values: [${list.join(', ')}]`); return k }
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]] } return a }
const sign = r => ({ id: r.id, name: r.name, category: r.category, description: r.description, imagePath: r.image_path, safetyInstruction: r.safety_instruction })
const tip = r => ({ id: r.id, title: r.title, description: r.description, category: r.category, imagePath: r.image_path })
const pct = (c, t) => t <= 0 ? 0 : Math.round(c * 100 / t)
const msg = p => p >= 90 ? 'Road Safety Champion! Superb work.' : p >= 70 ? 'Great job! You know your road safety.' : p >= 50 ? 'Good start. Review the lessons and try again.' : 'Keep learning. Every try makes you safer.'
async function questions(where, params) {
  const [qs] = await db.query(`select * from quiz_questions ${where} order by id`, params); if (!qs.length) return []
  const [os] = await db.query('select * from quiz_options where question_id in (?) order by question_id, position', [qs.map(q => q.id)])
  return qs.map(q => ({ ...q, options: os.filter(o => o.question_id === q.id).map(o => o.option_text) }))
}
const pubQ = q => ({ id: q.id, question: q.question_text, category: q.category, difficulty: q.difficulty, options: q.options })
async function listQuiz(category, difficulty, limit) {
  const c = parseEnum(ENUMS.quiz, category), d = parseEnum(ENUMS.diff, difficulty)
  if (limit != null && !(limit >= 1 && limit <= 50)) throw new HttpError(400, 'limit must be between 1 and 50')
  const w = [], p = []; if (c) { w.push('category = ?'); p.push(c) } if (d) { w.push('difficulty = ?'); p.push(d) }
  let list = await questions(w.length ? 'where ' + w.join(' and ') : '', p); if (limit != null) list = shuffle(list).slice(0, limit); return list.map(pubQ)
}
const routes = [
  ['GET', /^\/api\/signs$/, async (_, q) => { const c = parseEnum(ENUMS.sign, q.get('category')); const s = (q.get('search') || '').trim(); const [r] = await db.query(`select * from traffic_signs where (? is null or category = ?) and (? = '' or lower(name) like ?) order by name`, [c, c, s, `%${s.toLowerCase()}%`]); return r.map(sign) }],
  ['GET', /^\/api\/signs\/category\/([^/]+)$/, async m => { const c = parseEnum(ENUMS.sign, decodeURIComponent(m[1])); const [r] = await db.query('select * from traffic_signs where category = ? order by name', [c]); return r.map(sign) }],
  ['GET', /^\/api\/signs\/(\d+)$/, async m => { const [r] = await db.query('select * from traffic_signs where id = ?', [m[1]]); if (!r.length) throw new HttpError(404, `Traffic sign with id ${m[1]} was not found`); return sign(r[0]) }],
  ['GET', /^\/api\/quizzes$/, async (_, q) => listQuiz(q.get('category'), q.get('difficulty'), q.get('limit') == null ? null : +q.get('limit'))],
  ['GET', /^\/api\/quizzes\/category\/([^/]+)$/, async (m, q) => listQuiz(decodeURIComponent(m[1]), q.get('difficulty'), q.get('limit') == null ? null : +q.get('limit'))],
  ['GET', /^\/api\/quizzes\/(\d+)$/, async m => { const [q] = await questions('where id = ?', [m[1]]); if (!q) throw new HttpError(404, `Quiz question with id ${m[1]} was not found`); return pubQ(q) }],
  ['POST', /^\/api\/quizzes\/submit$/, async (_, __, body) => {
    const a = body?.answers; if (!Array.isArray(a) || a.length < 1 || a.length > 50) throw new HttpError(400, 'Validation failed', { answers: 'size must be between 1 and 50' })
    for (const x of a) if (!Number.isInteger(x?.questionId) || !Number.isInteger(x?.selectedOption) || x.selectedOption < 0) throw new HttpError(400, 'Validation failed', { answers: 'each answer needs questionId and selectedOption >= 0' })
    const ids = a.map(x => x.questionId); if (new Set(ids).size !== ids.length) throw new HttpError(400, 'Each question can be answered only once')
    const qs = await questions('where id in (?)', [ids]); const by = Object.fromEntries(qs.map(q => [q.id, q])); const missing = ids.filter(i => !by[i]); if (missing.length) throw new HttpError(400, `Unknown question ids: [${missing.join(', ')}]`)
    let correct = 0; const details = a.map(x => { const q = by[x.questionId]; if (x.selectedOption >= q.options.length) throw new HttpError(400, `Question ${q.id} has only ${q.options.length} options`); const ok = x.selectedOption === q.correct_option; if (ok) correct++; return { questionId: q.id, selectedOption: x.selectedOption, correct: ok, correctOption: q.correct_option, explanation: q.explanation } })
    const p = pct(correct, details.length); return { total: details.length, correct, incorrect: details.length - correct, percentage: p, message: msg(p), details } }],
  ['GET', /^\/api\/tips$/, async (_, q) => { const c = parseEnum(ENUMS.tip, q.get('category')); const [r] = c ? await db.query('select * from safety_tips where category = ? order by id', [c]) : await db.query('select * from safety_tips order by id'); return r.map(tip) }],
  ['GET', /^\/api\/tips\/random$/, async () => { const [r] = await db.query('select * from safety_tips order by rand() limit 1'); if (!r.length) throw new HttpError(404, 'No safety tips are available yet'); return tip(r[0]) }],
  ['GET', /^\/api\/tips\/category\/([^/]+)$/, async m => { const c = parseEnum(ENUMS.tip, decodeURIComponent(m[1])); const [r] = await db.query('select * from safety_tips where category = ? order by id', [c]); return r.map(tip) }],
  ['GET', /^\/api\/campaigns(\/upcoming)?$/, async m => { const today = new Date().toISOString().slice(0, 10); const [r] = m[1] ? await db.query('select * from awareness_campaigns where start_date >= ? order by start_date', [today]) : await db.query('select * from awareness_campaigns order by start_date desc')
    return r.map(c => ({ id: c.id, title: c.title, description: c.description, startDate: c.start_date, endDate: c.end_date, category: c.category, posterPath: c.poster_path, status: today < c.start_date ? 'UPCOMING' : today > c.end_date ? 'COMPLETED' : 'ONGOING' })) }],
  ['POST', /^\/api\/pledges$/, async (_, __, body) => {
    const raw = body?.visitorId; if (raw != null && !/^[0-9a-fA-F-]{36}$/.test(raw)) throw new HttpError(400, 'Validation failed', { visitorId: 'must be a UUID' })
    const id = (raw || randomUUID()).toLowerCase(); const [ex] = await db.query('select * from pledges where visitor_id = ?', [id]); let row = ex[0], again = !!row
    if (!row) { await db.query('insert into pledges (visitor_id, pledged_at, status) values (?, now(), ?)', [id, 'TAKEN']); [[row]] = await db.query('select * from pledges where visitor_id = ?', [id]) }
    const [[{ n }]] = await db.query('select count(*) n from pledges'); return { status: again ? 200 : 201, body: { visitorId: row.visitor_id, pledgedAt: row.pledged_at.replace(' ', 'T'), alreadyPledged: again, totalPledges: n } } }],
  ['GET', /^\/api\/pledges\/count$/, async () => { const [[{ n }]] = await db.query('select count(*) n from pledges'); return { total: n } }],
]
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x'); const origin = req.headers.origin
  const send = (status, obj, extra = {}) => { res.writeHead(status, { 'Content-Type': 'application/json', ...extra }); res.end(obj === undefined ? '' : JSON.stringify(obj)) }
  const cors = origin && ORIGINS.includes(origin) ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : {}
  if (req.method === 'OPTIONS') { return origin && ORIGINS.includes(origin) ? (res.writeHead(200, { ...cors, 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Authorization,Content-Type', 'Access-Control-Max-Age': '3600' }), res.end()) : (res.writeHead(403), res.end('Invalid CORS request')) }
  const err = (s, m, f) => send(s, { timestamp: new Date().toISOString(), status: s, error: { 400: 'Bad Request', 401: 'Unauthorized', 404: 'Not Found', 405: 'Method Not Allowed', 500: 'Internal Server Error' }[s], message: m, path: url.pathname, fieldErrors: f ?? null }, cors)
  try {
    if (url.pathname.startsWith('/api/admin')) return err(401, 'Login required (admin is only in the real backend)')
    let body; if (req.method === 'POST') { const chunks = []; for await (const c of req) chunks.push(c); const t = Buffer.concat(chunks).toString(); if (t) { try { body = JSON.parse(t) } catch { return err(400, 'Malformed request or invalid parameter') } } }
    const matches = routes.filter(r => r[1].test(url.pathname)); if (!matches.length) return err(404, 'No such endpoint')
    const route = matches.find(r => r[0] === req.method); if (!route) return err(405, 'Method not allowed')
    const out = await route[2](url.pathname.match(route[1]), url.searchParams, body)
    if (out && out.status && out.body) send(out.status, out.body, cors); else send(200, out, cors)
  } catch (e) { if (e instanceof HttpError) return err(e.status, e.message, e.fieldErrors); console.error(e); err(500, 'Something went wrong on the server') }
})
server.listen(PORT, () => console.log(`mock API on http://localhost:${PORT}`))
