import { useState } from 'react'
import { Calendar, HardHat, Footprints, School, Palette, Users } from 'lucide-react'
import { PageHero, Section } from '../components/ui'
import Pledge from '../components/Pledge'
import { Loading, ErrorState, EmptyState } from '../components/ApiStates'
import useApi from '../hooks/useApi'
import { getCampaigns } from '../services/api'
import { fmtDate } from '../services/adapters'
import { SLOGANS } from '../data/content'
import PosterCard from '../components/Poster'
import { ExternalLink } from 'lucide-react'

const CAT = { ROAD_SAFETY_MONTH: [Calendar, 'bg-sky', 'Road Safety Month'], HELMET: [HardHat, 'bg-sun', 'Helmet'], PEDESTRIAN: [Footprints, 'bg-mint', 'Pedestrian'], SCHOOL: [School, 'bg-lav', 'School'], COMPETITION: [Palette, 'bg-coral/40', 'Competition'], COMMUNITY: [Users, 'bg-sun', 'Community'] }
const STATUS = { UPCOMING: 'bg-sky', ONGOING: 'bg-mint', COMPLETED: 'bg-white' }
function CampaignList() {
  const [tab, setTab] = useState('all')
  const { data, error, loading, reload } = useApi(() => getCampaigns(tab === 'upcoming'), [tab])
  return (<>
    <div role="tablist" className="flex gap-2 mb-5">{[['all', 'All campaigns'], ['upcoming', 'Upcoming']].map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`btn !py-2 ${tab === k ? 'bg-coral' : 'bg-white'}`}>{l}</button>)}</div>
    {loading ? <Loading label="Loading campaigns…" /> : error ? <ErrorState error={error} onRetry={reload} title="Could not load campaigns" />
      : !data.length ? <EmptyState title={tab === 'upcoming' ? 'No upcoming campaigns yet' : 'No campaigns yet'} text="New awareness campaigns will appear here soon.">{tab === 'upcoming' && <button className="btn-white" onClick={() => setTab('all')}>See all campaigns</button>}</EmptyState>
        : <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{data.map(c => { const [I, color, label] = CAT[c.category] || CAT.COMMUNITY
          return <article key={c.id} className={`card ${color}/70 flex flex-col`}><div className="flex items-center justify-between gap-2 mb-3"><span className="grid place-items-center w-12 h-12 rounded-2xl bg-white border-2 border-navy"><I /></span><span className={`chip ${STATUS[c.status]}`}>{c.status.charAt(0) + c.status.slice(1).toLowerCase()}</span></div>
            <h3 className="text-xl">{c.title}</h3><p className="text-sm font-bold mt-1">{label} · {fmtDate(c.startDate)}{c.endDate !== c.startDate && ` to ${fmtDate(c.endDate)}`}</p><p className="mt-2">{c.description}</p></article> })}</div>}</>)
}
export default function Campaigns() {
  const cols = ['#BDE7F5', '#FFE59A', '#CDECCF', '#DCD5F5', '#FF9B85', '#FFE59A']
  return (<><PageHero title="Awareness Campaigns" intro="Youth Red Cross volunteers can spread road safety in schools, colleges and neighbourhoods." who="riya" color="bg-lav" crumb="Campaigns" />
    <Section title="Campaigns and activities"><CampaignList /></Section>
    <Section title="National Road Safety Month" sub="A month set aside each year to talk about road safety across India.">
      <div className="card bg-sky/60 grid lg:grid-cols-[1.1fr_1fr] gap-6">
        <div><p>India's road safety month brings schools, colleges, police and volunteers together for awareness drives. The dates and theme can change from year to year, so check the Ministry of Road Transport and Highways (MoRTH) for this year's programme.</p>
          <a className="btn-sun mt-4" href="https://morth.nic.in" target="_blank" rel="noreferrer">Official updates on MoRTH<ExternalLink size={18} /></a></div>
        <div className="rounded-3xl bg-white border-2 border-navy/15 p-5"><h3 className="text-xl mb-2">A suggested month plan for your club</h3>
          <ol className="space-y-2">{[['Week 1', 'Helmet and seatbelt awareness at the gate'], ['Week 2', 'Pedestrian safety walk near the school'], ['Week 3', 'Classroom sessions on signs and signals'], ['Week 4', 'Poster and slogan competition, then the pledge']].map(([w, t]) => <li key={w} className="flex gap-3"><span className="chip !bg-sun shrink-0 self-start whitespace-nowrap">{w}</span>{t}</li>)}</ol></div></div></Section>
    <Section title="Slogans and posters" sub="Download a poster and print it for your notice board."><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{SLOGANS.map((s, i) => <PosterCard key={s} slogan={s} color={cols[i]} who={['sam', 'riya', 'arjun', 'ravi', 'sam', 'riya'][i]} n={i + 1} />)}</div></Section>
    <Section><Pledge /></Section></>)
}
