import axios from 'axios'

// The backend address comes from the environment (see .env.example). Nothing else is hard-coded.
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/+$/, '')

export class ApiError extends Error {
  constructor(kind, status, message) { super(message); this.name = 'ApiError'; this.kind = kind; this.status = status }
  get isNetwork() { return this.kind === 'network' || this.kind === 'timeout' }
}

export const http = axios.create({ baseURL: API_BASE_URL, timeout: 8000, headers: { 'Content-Type': 'application/json' } })

// Turn every failure into one friendly ApiError so screens never deal with raw axios errors.
http.interceptors.response.use(r => r, e => {
  if (e.response) {
    const d = e.response.data
    const fields = d && d.fieldErrors ? ' ' + Object.values(d.fieldErrors).join(' ') : ''
    return Promise.reject(new ApiError('http', e.response.status, ((d && d.message) || 'The server could not complete the request.') + fields))
  }
  if (e.code === 'ECONNABORTED') return Promise.reject(new ApiError('timeout', 0, 'The server took too long to answer.'))
  return Promise.reject(new ApiError('network', 0, 'Cannot reach the RoadWise server. Check that the backend is running.'))
})

const get = (url, params) => http.get(url, { params }).then(r => r.data)
const post = (url, body) => http.post(url, body).then(r => r.data)

export const getSigns = () => get('/api/signs')
export const getQuizzes = ({ category, difficulty, limit } = {}) => get('/api/quizzes', { category, difficulty, limit })
export const submitQuiz = answers => post('/api/quizzes/submit', { answers })
export const getRandomTip = () => get('/api/tips/random')
export const getCampaigns = (upcomingOnly = false) => get(upcomingOnly ? '/api/campaigns/upcoming' : '/api/campaigns')
export const takePledge = visitorId => post('/api/pledges', { visitorId })
export const getPledgeCount = () => get('/api/pledges/count').then(d => d.total)
