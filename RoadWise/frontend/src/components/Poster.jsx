import { useState } from 'react'
import { Download } from 'lucide-react'
import Character from './Characters'

const esc = s => s.replace(/[<>&"']/g, '')
const wrap = (t, max = 15) => t.split(' ').reduce((l, w) => { const last = l[l.length - 1]; if (last !== undefined && (last + ' ' + w).length <= max) l[l.length - 1] = last + ' ' + w; else l.push(w); return l }, [])
const save = (name, blob) => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 500) }
const b64 = s => btoa(unescape(encodeURIComponent(s)))

async function posterSvg(slogan, color, who) {
  let img = ''
  try { const r = await fetch(`/assets/characters/${who}.svg`); if (r.ok) img = `<image href="data:image/svg+xml;base64,${b64(await r.text())}" x="150" y="400" width="300" height="300"/>` } catch { /* poster still works without the picture */ }
  const lines = wrap(esc(slogan)).map((l, i) => `<text x="300" y="${190 + i * 62}" text-anchor="middle" font-family="Arial" font-weight="800" font-size="52" fill="#263B50">${l}</text>`).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800"><rect width="600" height="800" fill="${color}"/><rect x="28" y="28" width="544" height="744" rx="40" fill="#FFF7E8" stroke="#263B50" stroke-width="6"/><rect x="60" y="720" width="480" height="4" fill="#FF9B85"/>${lines}${img}<text x="300" y="758" text-anchor="middle" font-family="Arial" font-weight="700" font-size="26" fill="#FF7A5C">RoadWise · Youth Red Cross</text></svg>`
}
export async function downloadPoster(slogan, color, who, n) {
  const svg = await posterSvg(slogan, color, who); const name = `roadwise-poster-${n}`
  await new Promise(done => { const im = new Image(); im.onload = () => { const c = document.createElement('canvas'); c.width = 600; c.height = 800; c.getContext('2d').drawImage(im, 0, 0); c.toBlob(b => { b ? save(name + '.png', b) : save(name + '.svg', new Blob([svg], { type: 'image/svg+xml' })); done() }) }; im.onerror = () => { save(name + '.svg', new Blob([svg], { type: 'image/svg+xml' })); done() }; im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg) })
}
export default function PosterCard({ slogan, color, who, n }) {
  const [busy, setBusy] = useState(false)
  return (<div className="card bg-white flex flex-col">
    <div className="rounded-2xl p-4 text-center border-2 border-navy/15 flex flex-col items-center min-h-[250px]" style={{ background: color }}>
      <p className="font-display text-2xl font-extrabold leading-tight">{slogan}</p><Character who={who} size={110} className="mt-auto" /></div>
    <button className="btn-white !py-2 mt-3 w-full" disabled={busy} onClick={async () => { setBusy(true); try { await downloadPoster(slogan, color, who, n) } finally { setBusy(false) } }}><Download size={18} />{busy ? 'Preparing…' : 'Download poster'}</button></div>)
}
