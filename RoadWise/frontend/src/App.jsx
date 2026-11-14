import { Routes, Route, Link } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import { Fundamentals, Helmet, Pedestrian, Prevention } from './pages/Modules'
import Rules from './pages/Rules'
import Signs from './pages/Signs'
import Signals from './pages/Signals'
import Emergency from './pages/Emergency'
import Myths from './pages/Myths'
import Campaigns from './pages/Campaigns'
import About from './pages/About'
import GamesHub from './pages/GamesHub'
import { SignChallenge, WhatWouldYouDo, RoadQuiz } from './pages/SimpleGames'
import SignalGame from './pages/SignalGame'
import SpotGame from './pages/SpotGame'
import Learn from './pages/Learn'
import Conditions from './pages/Conditions'
import Inclusive from './pages/Inclusive'
import Achievements from './pages/Achievements'
import Admin from './pages/Admin'
import Character from './components/Characters'
const NotFound = () => <div className="wrap py-20 text-center"><Character who="sam" size={140} className="mx-auto" /><h1 className="text-4xl">Oops, wrong turn!</h1><p className="mt-2">We could not find that page.</p><Link to="/" className="btn-coral mt-5">Back to Home</Link></div>
export default function App() {
  return (<Routes><Route element={<Layout />}>
    <Route index element={<Home />} /><Route path="fundamentals" element={<Fundamentals />} /><Route path="traffic-rules" element={<Rules />} />
    <Route path="traffic-signs" element={<Signs />} /><Route path="helmet-seatbelt" element={<Helmet />} /><Route path="pedestrian-safety" element={<Pedestrian />} />
    <Route path="traffic-signals" element={<Signals />} /><Route path="accident-prevention" element={<Prevention />} /><Route path="emergency-help" element={<Emergency />} />
    <Route path="myths-vs-facts" element={<Myths />} /><Route path="campaigns" element={<Campaigns />} /><Route path="about" element={<About />} /><Route path="games" element={<GamesHub />} /><Route path="games/sign-challenge" element={<SignChallenge />} /><Route path="games/signal" element={<SignalGame />} /><Route path="games/spot-mistake" element={<SpotGame />} /><Route path="games/what-would-you-do" element={<WhatWouldYouDo />} /><Route path="games/quiz" element={<RoadQuiz />} /><Route path="learn" element={<Learn />} /><Route path="road-conditions" element={<Conditions />} /><Route path="inclusive-safety" element={<Inclusive />} /><Route path="achievements" element={<Achievements />} /><Route path="admin" element={<Admin />} />
    <Route path="*" element={<NotFound />} />
  </Route></Routes>)
}