import { http } from './api'

// Admin login uses HTTP Basic. The password stays in memory only (gone on refresh), never in localStorage.
let auth = null
export const setAuth = (username, password) => { auth = { username, password } }
export const clearAuth = () => { auth = null }
const cfg = () => ({ auth })

export const adminMe = () => http.get('/api/admin/me', cfg()).then(r => r.data)
export const adminStats = () => http.get('/api/admin/stats', cfg()).then(r => r.data)
export const adminList = path => http.get(path, cfg()).then(r => r.data)
export const adminSave = (path, id, body) => (id ? http.put(`${path}/${id}`, body, cfg()) : http.post(path, body, cfg())).then(r => r.data)
export const adminDelete = (path, id) => http.delete(`${path}/${id}`, cfg())