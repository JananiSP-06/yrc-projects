// Converts backend DTOs into the shapes the existing UI already uses.
const title = s => s.charAt(0) + s.slice(1).toLowerCase()
export const fileKey = path => (path || '').split('/').pop().replace(/\.[a-z0-9]+$/i, '')

export const adaptSign = s => ({ id: s.id, k: fileKey(s.imagePath), name: s.name, cat: title(s.category), mean: s.description, do: s.safetyInstruction, imagePath: s.imagePath })

// Quiz topics shown on the page -> backend category codes.
export const TOPIC_CODE = { Basics: 'BASICS', 'Traffic Rules': 'TRAFFIC_RULES', 'Helmet and Seatbelt': 'HELMET_SEATBELT', 'Pedestrian Safety': 'PEDESTRIAN_SAFETY', 'Signals and Signs': 'SIGNALS_SIGNS', Emergency: 'EMERGENCY', 'Road Conditions': 'CONDITIONS', 'Inclusive Safety': 'INCLUSIVE_SAFETY' }
export const LEVEL_CODE = { easy: 'EASY', medium: 'MEDIUM', hard: 'HARD' }

export const CHARACTERS = ['sam', 'riya', 'arjun', 'ravi']
export const adaptTip = t => { const k = fileKey(t.imagePath); return { id: t.id, title: t.title, t: t.description, who: CHARACTERS.includes(k) ? k : 'sam' } }
export const fmtDate = iso => new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
