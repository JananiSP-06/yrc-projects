// Writes the sign and character drawings to public/assets so the backend's imagePath values resolve to real files.
// Run with: npm run assets
import { renderToStaticMarkup } from 'react-dom/server'
import { mkdirSync, writeFileSync } from 'node:fs'
import Sign, { SIGNS } from '../src/components/Signs.jsx'
import Character from '../src/components/Characters.jsx'
const ns = svg => svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ')
mkdirSync('public/assets/signs', { recursive: true }); mkdirSync('public/assets/characters', { recursive: true }); mkdirSync('public/assets/posters', { recursive: true })
for (const k of Object.keys(SIGNS)) writeFileSync(`public/assets/signs/${k}.svg`, ns(renderToStaticMarkup(<Sign k={k} size={256} />)))
for (const w of ['sam', 'riya', 'arjun', 'ravi']) writeFileSync(`public/assets/characters/${w}.svg`, ns(renderToStaticMarkup(<Character who={w} size={256} />)))
const cols = ['#BDE7F5', '#FFE59A', '#CDECCF', '#DCD5F5', '#FF9B85', '#FFE59A']
cols.forEach((c, i) => writeFileSync(`public/assets/posters/campaign-${i + 1}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="300" height="400"><rect width="600" height="800" fill="${c}"/><rect x="30" y="30" width="540" height="740" rx="40" fill="#FFF7E8" stroke="#263B50" stroke-width="6"/><text x="300" y="400" text-anchor="middle" font-family="Arial" font-weight="800" font-size="44" fill="#263B50">RoadWise</text><text x="300" y="460" text-anchor="middle" font-family="Arial" font-size="26" fill="#263B50">Road Safety Campaign</text></svg>`))
console.log('assets written')
