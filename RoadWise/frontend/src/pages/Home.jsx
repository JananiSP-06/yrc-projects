import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, HeartPulse, Users, Shuffle, Gamepad2, Search, Eye } from 'lucide-react'
import { HeroScene, Cloud, Light } from '../components/Scenes'
import Character, { Speech } from '../components/Characters'
import Sign from '../components/Signs'
import { Section } from '../components/ui'
import { EXPLORE, TIPS, STATS } from '../data/content'
import useApi from '../hooks/useApi'
import { getRandomTip, getPledgeCount } from '../services/api'
import { adaptTip } from '../services/adapters'
import { Loading, OfflineNote } from '../components/ApiStates'
import { PledgeTotal } from '../components/Pledge'

export default function Home() {
  const [n, setN] = useState(0); const [last, setLast] = useState(null)
  // Daily tip comes from the backend. If the server is unreachable we show a bundled tip and say so.
  const tipReq = useApi(async () => { let t = adaptTip(await getRandomTip()); for (let k = 0; k < 2 && t.id === last; k++) t = adaptTip(await getRandomTip()); setLast(t.id); return t }, [n])
  const offlineTip = tipReq.error?.isNetwork; const [fb, setFb] = useState(0)
  const tip = tipReq.data || (offlineTip ? { who: TIPS[fb].who, t: TIPS[fb].t } : null)
  const pledges = useApi(getPledgeCount, [])
  return (<>
    <section className="relative overflow-hidden bg-sky">
      <Cloud className="absolute top-8 left-[4%] opacity-80" w={130} /><Cloud className="absolute top-40 left-[44%] opacity-70 hidden md:block" w={90} />
      <div className="wrap grid lg:grid-cols-[1fr_1.1fr] gap-8 items-center py-12 lg:py-16 relative">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
          <span className="chip bg-white"><Shield size={16} />A Youth Red Cross awareness project</span>
          <h1 className="text-5xl md:text-6xl mt-4 leading-[1.02]">Be Road Smart.<br />Be Life Smart.</h1>
          <p className="text-lg mt-4 max-w-lg">Meet Safety Sam and friends. Learn the rules of Indian roads, play fun games and help everyone get home safe.</p>
          <div className="flex flex-wrap gap-3 mt-7"><Link to="/learn" className="btn-coral">Start Learning<ArrowRight size={20} /></Link><Link to="/games" className="btn-sun"><Gamepad2 size={20} />Play Safety Games</Link></div>
          <p className="mt-6 font-display text-lg font-bold text-navy/80">Every Road. Every Life. Every Choice Matters.</p>
        </motion.div>
        <HeroScene />
      </div>
    </section>

    <Section title="Why road safety matters" sub="Three simple ideas to remember.">
      <div className="grid md:grid-cols-3 gap-5">{[[HeartPulse, 'Every life counts', 'Behind every crash is a family. Safe habits protect people we love.', 'bg-coral/30'], [Shield, 'Crashes can be prevented', 'Slower speeds, helmets, seatbelts and focus avoid many injuries.', 'bg-mint/70'], [Users, 'We all share the road', 'Walkers, riders and drivers each have a duty to follow the rules.', 'bg-lav/70']].map(([I, a, b, c]) => <div key={a} className={`card ${c}`}><span className="grid place-items-center w-14 h-14 rounded-2xl bg-white border-2 border-navy mb-3"><I /></span><h3 className="text-2xl">{a}</h3><p>{b}</p></div>)}</div>
    </Section>

    <Section title="Explore road safety" sub="Pick a topic and start with a friendly guide.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{EXPLORE.map(e => (
        <Link key={e.to} to={e.to} className="card !p-5 flex flex-col group hover:-translate-y-1 transition">
          <div className={`${e.color} rounded-3xl h-36 grid place-items-center overflow-hidden mb-3`}>{e.who ? <Character who={e.who} size={90} className="mt-6" /> : e.light ? <Light on="green" size={.8} /> : <Sign k={e.sign} size={90} />}</div>
          <h3 className="text-xl">{e.title}</h3><p className="text-sm flex-1">{e.text}</p><span className="mt-3 font-display font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">Explore<ArrowRight size={18} /></span></Link>))}</div>
    </Section>

    <Section>
      <div className="card bg-sun/70 grid md:grid-cols-[auto_1fr] gap-6 items-center min-h-[200px]">
        {!tip && tipReq.loading ? <div className="md:col-span-2"><Loading label="Finding a tip…" compact /></div> : !tip ? <div className="md:col-span-2 text-center" role="alert"><p className="font-bold">We could not load a safety tip right now.</p><button className="btn-white mt-3" onClick={() => setN(n + 1)}>Try again</button></div> : <>
        <Character who={tip.who} size={130} className="mx-auto bob" key={tip.t} />
        <div><h2 className="text-3xl">Daily safety tip</h2>{tip.title && <span className="chip mt-1">{tip.title}</span>}<p className="text-2xl font-display font-semibold mt-2" data-testid="daily-tip">“{tip.t}”</p>
          {offlineTip && <p className="mt-2"><OfflineNote what="tips" /></p>}
          <button className="btn-white mt-4" disabled={tipReq.loading} onClick={() => offlineTip ? setFb((fb + 1) % TIPS.length) : setN(n + 1)}><Shuffle size={18} />Next tip</button></div></>}</div>
    </Section>

    <Section title="Practise and play" sub="Quick games that make learning fun.">
      <div className="grid md:grid-cols-3 gap-5">{[[Search, 'Traffic sign quiz', 'Guess the meaning of real Indian road signs.', '/games/sign-challenge', 'bg-sky', 'stop'], [Eye, 'Spot the mistake', 'Find the unsafe habits in a busy road scene.', '/games/spot-mistake', 'bg-mint', 'crossing'], [Gamepad2, 'Traffic signal game', 'Try the signal lights and learn the right action.', '/games/signal', 'bg-lav', 'noEntry']].map(([I, a, b, to, c, s]) => (
        <Link key={a} to={to} className={`card ${c}/60 hover:-translate-y-1 transition flex items-center gap-4`}><Sign k={s} size={72} /><div><h3 className="text-xl flex items-center gap-2"><I size={18} />{a}</h3><p className="text-sm">{b}</p></div></Link>))}</div>
    </Section>

    <Section title="Why it matters in India" sub="Official numbers from the Ministry of Road Transport and Highways.">
      <div className="grid md:grid-cols-3 gap-5">{STATS.map(s => <div key={s.l} className="card bg-white text-center"><p className="font-display text-5xl font-extrabold text-coral">{s.n}</p><p className="font-bold mt-1">{s.l}</p><p className="text-sm text-navy/70 mt-2">{s.y} · {s.s}</p></div>)}</div>
      <p className="text-sm text-navy/70 mt-3">Please check the latest MoRTH report for updated figures.</p>
    </Section>

    <section className="wrap mt-20"><div className="rounded-[2.5rem] bg-navy text-cream p-8 md:p-12 grid md:grid-cols-[1fr_auto] gap-8 items-center overflow-hidden">
      <div><h2 className="text-4xl md:text-5xl">Make every journey a safe journey.</h2><p className="mt-3 text-cream/85 max-w-xl">Promise to follow the rules and share what you learn.</p>
        {pledges.data != null && <PledgeTotal className="mt-3 text-cream" total={pledges.data} />}
        <div className="flex flex-wrap gap-3 mt-6"><Link to="/campaigns#pledge" className="btn-sun">Take the Road Safety Pledge</Link><Link to="/games/quiz" className="btn-white">Start the Road Safety Quiz</Link></div></div>
      <div className="flex -space-x-4 justify-center">{['riya', 'sam', 'arjun'].map(w => <Character key={w} who={w} size={100} />)}</div></div></section>
  </>)
}
