import { Link } from 'react-router-dom'
import { RefreshCw, WifiOff } from 'lucide-react'
import Character from './Characters'

export function Loading({ label = 'Loading…', compact }) {
  return (<div role="status" aria-live="polite" className={`flex flex-col items-center justify-center text-center ${compact ? 'py-4' : 'py-14'}`}>
    <Character who="sam" size={compact ? 50 : 90} className="bob" /><div className="mt-2 flex items-center gap-2 font-display font-bold"><span className="inline-block w-5 h-5 rounded-full border-4 border-navy/20 border-t-coral animate-spin" aria-hidden="true" />{label}</div></div>)
}
export function ErrorState({ error, onRetry, title }) {
  const net = error?.isNetwork; const heading = title ?? (net ? 'Cannot reach the server' : 'Something went wrong')
  return (<div role="alert" className="card bg-coral/20 text-center max-w-xl mx-auto">
    <Character who="ravi" size={90} className="mx-auto" /><h3 className="text-2xl flex items-center justify-center gap-2">{net && <WifiOff size={22} />}{heading}</h3>
    <p className="mt-1">{error?.message || 'Please try again.'}</p>{onRetry && <button className="btn-coral mt-4" onClick={onRetry}><RefreshCw size={18} />Try again</button>}</div>)
}
export function EmptyState({ title, text, children }) {
  return (<div className="card bg-white text-center max-w-xl mx-auto"><Character who="sam" size={90} className="mx-auto" /><h3 className="text-2xl">{title}</h3>{text && <p className="mt-1">{text}</p>}{children && <div className="mt-4 flex flex-wrap gap-3 justify-center">{children}</div>}</div>)
}
export const OfflineNote = ({ what = 'content' }) => (
  <p role="status" className="chip !bg-sun/80 mb-4"><WifiOff size={14} />Server offline. Showing the built-in {what} until it reconnects.</p>)
export { Link }
