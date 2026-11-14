import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowUp, Phone, ChevronRight } from 'lucide-react'
import Character from './Characters'
import { NAV_LEARN, REFS } from '../data/content'
import { MODULE_PATHS } from '../data/learn'
import { useProgress } from '../context/Progress'

const link = ({ isActive }) => `px-3 py-2 rounded-full font-display font-bold text-[17px] transition ${isActive ? 'bg-sun' : 'hover:bg-white/70'}`
function Logo() {
  return (<Link to="/" className="flex items-center gap-2" aria-label="RoadWise home">
    <span className="grid place-items-center w-11 h-11 rounded-full bg-sun border-2 border-navy overflow-hidden"><Character who="sam" size={34} className="mt-1" /></span>
    <span className="font-display text-2xl font-extrabold">Road<span className="text-coral">Wise</span></span></Link>)
}
function Navbar() {
  const [open, setOpen] = useState(false); const [learn, setLearn] = useState(false); const loc = useLocation()
  useEffect(() => { setOpen(false); setLearn(false) }, [loc.pathname])
  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b-2 border-navy/10">
      <div className="wrap flex items-center justify-between h-[72px]">
        <Logo />
        <nav className="hidden xl:flex items-center gap-1" aria-label="Main">
          <NavLink to="/" end className={link}>Home</NavLink>
          <div className="relative" onMouseLeave={() => setLearn(false)}>
            <button className="px-3 py-2 rounded-full font-display font-bold text-[17px] hover:bg-white/70 inline-flex items-center gap-1" aria-expanded={learn} onClick={() => setLearn(v => !v)} onMouseEnter={() => setLearn(true)}>Learn Road Safety <ChevronDown size={18} /></button>
            {learn && <div className="absolute left-0 top-full pt-2 w-72"><div className="card !p-2 !rounded-3xl">{[{ to: '/learn', label: 'All lessons', who: 'riya' }, ...NAV_LEARN, { to: '/myths-vs-facts', label: 'Myths vs Facts', who: 'sam' }].map(i => (<Link key={i.to} to={i.to} className="flex items-center gap-3 rounded-2xl px-3 py-2 hover:bg-sky/60 font-bold"><Character who={i.who} size={26} />{i.label}</Link>))}</div></div>}
          </div>
          <NavLink to="/traffic-signs" className={link}>Traffic Signs</NavLink>
          <NavLink to="/games" className={link}>Safety Games</NavLink>
          <NavLink to="/emergency-help" className={link}>Emergency Help</NavLink>
          <NavLink to="/campaigns" className={link}>Campaigns</NavLink>
          <NavLink to="/about" className={link}>About</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/games/quiz" className="btn-coral !py-2 !text-base hidden sm:inline-flex">Take the Quiz</Link>
          <button className="xl:hidden btn-white !p-0 w-12 h-12" onClick={() => setOpen(v => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      <AnimatePresence>{open && (
        <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="xl:hidden overflow-hidden bg-cream border-t-2 border-navy/10" aria-label="Mobile">
          <div className="wrap py-4 grid gap-1 max-h-[75vh] overflow-y-auto">
            {[['/', 'Home'], ['/learn', 'All lessons'], ...NAV_LEARN.map(i => [i.to, i.label]), ['/myths-vs-facts', 'Myths vs Facts'], ['/traffic-signs', 'Traffic Signs'], ['/games', 'Safety Games'], ['/achievements', 'My Achievements'], ['/emergency-help', 'Emergency Help'], ['/campaigns', 'Awareness Campaigns'], ['/about', 'About']].map(([to, l]) => (
              <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `flex justify-between items-center rounded-2xl px-4 py-3 font-display font-bold text-lg ${isActive ? 'bg-sun' : 'bg-white'}`}>{l}<ChevronRight size={18} /></NavLink>))}
            <Link to="/games/quiz" className="btn-coral mt-2">Take the Quiz</Link>
          </div></motion.nav>)}</AnimatePresence>
    </header>)
}
function Footer() {
  return (
    <footer className="mt-24 bg-navy text-cream">
      <div className="wrap py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1"><div className="flex items-center gap-2 mb-3"><Character who="sam" size={50} /><span className="font-display text-2xl font-extrabold">RoadWise</span></div>
          <p className="text-cream/80">Every Road. Every Life. Every Choice Matters. A friendly road safety guide for India.</p></div>
        <div><h3 className="text-xl mb-3">Quick links</h3><ul className="space-y-1 text-cream/85">{[['/learn', 'Learn Road Safety'], ['/traffic-signs', 'Traffic Signs'], ['/games', 'Safety Games'], ['/campaigns', 'Awareness Campaigns'], ['/about', 'About RoadWise']].map(([to, l]) => <li key={to}><Link className="hover:text-sun underline-offset-4 hover:underline" to={to}>{l}</Link></li>)}</ul></div>
        <div><h3 className="text-xl mb-3">In an emergency</h3><a href="tel:112" className="btn-coral !text-navy w-full"><Phone size={20} /> Call 112</a><p className="mt-3 text-sm text-cream/80">For police, fire and ambulance.</p></div>
        <div><h3 className="text-xl mb-3">Official resources</h3><ul className="space-y-1 text-sm">{REFS.map(r => <li key={r.u}><a href={r.u} target="_blank" rel="noreferrer" className="text-cream/85 hover:text-sun underline-offset-4 hover:underline">{r.t}</a></li>)}</ul></div>
      </div>
      <div className="border-t border-cream/20 py-5 text-center text-sm text-cream/70 px-5">A Youth Red Cross social service awareness project. © 2026 RoadWise. For education only.</div>
    </footer>)
}
function ScrollTop() {
  const [show, setShow] = useState(false)
  useEffect(() => { const f = () => setShow(window.scrollY > 500); window.addEventListener('scroll', f); return () => window.removeEventListener('scroll', f) }, [])
  return show ? <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-5 right-5 z-40 btn-sun !p-0 w-12 h-12" aria-label="Scroll to top"><ArrowUp /></button> : null
}
export default function Layout() {
  const { pathname, hash } = useLocation(); const { visit } = useProgress()
  useEffect(() => { if (MODULE_PATHS.includes(pathname)) visit(pathname) }, [pathname])
  useEffect(() => { if (hash) setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 80); else window.scrollTo(0, 0) }, [pathname, hash])
  return (<div className="min-h-screen flex flex-col">
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-sun focus:p-3">Skip to content</a>
    <Navbar /><motion.main id="main" key={pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25 }} className="flex-1"><Outlet /></motion.main><Footer /><ScrollTop /></div>)
}