import { useState } from 'react'
import { BadgeCheck, Download, Users } from 'lucide-react'
import Character from './Characters'
import { Loading, ErrorState } from './ApiStates'
import useApi from '../hooks/useApi'
import { getPledgeCount, takePledge as sendPledge } from '../services/api'
import { useProgress } from '../context/Progress'

const esc = s => s.replace(/[<>&"']/g, '')
export const certSvg = n => `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="620"><rect width="900" height="620" fill="#FFF7E8"/><rect x="20" y="20" width="860" height="580" rx="30" fill="none" stroke="#263B50" stroke-width="6"/><rect x="40" y="40" width="820" height="540" rx="22" fill="none" stroke="#FF9B85" stroke-width="3" stroke-dasharray="10 8"/><text x="450" y="140" text-anchor="middle" font-family="Arial" font-weight="800" font-size="42" fill="#263B50">Road Safety Pledge Certificate</text><text x="450" y="230" text-anchor="middle" font-family="Arial" font-size="26" fill="#263B50">This certifies that</text><text x="450" y="320" text-anchor="middle" font-family="Arial" font-weight="800" font-size="50" fill="#FF7A5C">${esc(n) || 'A Road Safety Champion'}</text><text x="450" y="400" text-anchor="middle" font-family="Arial" font-size="22" fill="#263B50">promises to follow traffic rules, respect other road users,</text><text x="450" y="436" text-anchor="middle" font-family="Arial" font-size="22" fill="#263B50">wear protective equipment and avoid distractions.</text><text x="450" y="530" text-anchor="middle" font-family="Arial" font-weight="700" font-size="24" fill="#263B50">RoadWise · Youth Red Cross · Every Road. Every Life.</text></svg>`
const save = (name, blob) => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 500) }
export function downloadCertificate(name) {
  const svg = certSvg(name); const img = new Image()
  img.onload = () => { const c = document.createElement('canvas'); c.width = 900; c.height = 620; c.getContext('2d').drawImage(img, 0, 0); c.toBlob(b => b ? save('roadwise-pledge-certificate.png', b) : save('roadwise-pledge-certificate.svg', new Blob([svg], { type: 'image/svg+xml' }))) }
  img.onerror = () => save('roadwise-pledge-certificate.svg', new Blob([svg], { type: 'image/svg+xml' }))
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
}
// An anonymous random id lets the server count each browser once. It holds no personal data.
export function visitorId() {
  try { let v = localStorage.getItem('rw_visitor'); if (!v) { v = crypto.randomUUID(); localStorage.setItem('rw_visitor', v) } return v } catch { return undefined }
}
export function PledgeTotal({ total, loading, error, onRetry, className = '' }) {
  if (loading) return <p className={className}>Loading pledge total…</p>
  if (error) return <p className={className}>Pledge total unavailable. <button className="underline font-bold" onClick={onRetry}>Retry</button></p>
  if (total == null) return null
  return <p className={`inline-flex items-center gap-2 font-bold ${className}`}><Users size={18} /><span data-testid="pledge-total">{total}</span> {total === 1 ? 'person has' : 'people have'} taken the pledge</p>
}
export default function Pledge() {
  const { takePledge } = useProgress(); const count = useApi(getPledgeCount, [])
  const [name, setName] = useState(''); const [busy, setBusy] = useState(false); const [err, setErr] = useState(null); const [done, setDone] = useState(null); const [total, setTotal] = useState(null)
  const submit = async () => {
    setBusy(true); setErr(null)
    try { const r = await sendPledge(visitorId()); setDone(r); setTotal(r.totalPledges); takePledge() } catch (e) { setErr(e) } finally { setBusy(false) }
  }
  const shown = total ?? count.data
  return (<div id="pledge" className="scroll-mt-24 card bg-sun/70 grid md:grid-cols-[auto_1fr] gap-6 items-center">
    <Character who="sam" size={140} className="mx-auto bob" />
    <div><h2 className="text-3xl">Road Safety Pledge</h2>
      <blockquote className="mt-2 text-lg font-semibold">“I promise to follow traffic rules, respect other road users, wear protective equipment, avoid distractions and encourage others to practise safe road behaviour.”</blockquote>
      {!done ? <div className="mt-4 flex flex-wrap gap-3 items-center"><label className="flex-1 min-w-[200px]"><span className="sr-only">Name for the certificate (optional)</span><input value={name} onChange={e => setName(e.target.value)} maxLength={40} placeholder="Name for certificate (optional)" className="w-full rounded-full border-2 border-navy/30 px-5 py-3 min-h-[48px]" /></label>
        <button className="btn-coral" disabled={busy} onClick={submit}>{busy ? 'Saving…' : 'Take the Road Safety Pledge'}</button></div>
        : <div role="status" className="mt-4"><p className="font-bold flex items-center gap-2"><BadgeCheck className="text-green-700" />{done.alreadyPledged ? 'You have already taken the pledge on this device. Thank you!' : 'Thank you! Your pledge is recorded.'}</p>
          <div className="flex flex-wrap gap-3 mt-3"><button className="btn-white" onClick={() => downloadCertificate(name)}><Download size={18} />Download certificate</button></div></div>}
      {err && <div className="mt-4"><ErrorState error={err} onRetry={submit} title="Your pledge was not saved" /></div>}
      <p className="text-sm mt-3">Your name stays in your browser and is only printed on the certificate. The server stores a random ID and the time.</p>
      <PledgeTotal className="mt-2" total={shown} loading={count.loading && total === null} error={count.error && total === null ? count.error : null} onRetry={count.reload} /></div></div>)
}
