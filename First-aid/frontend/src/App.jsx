import React, { useCallback, useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import GuideLibrary from './components/GuideLibrary.jsx'
import GuideViewer from './components/GuideViewer.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import KitSection from './components/KitSection.jsx'
import KnowBefore from './components/KnowBefore.jsx'
import QuickRevision from './components/QuickRevision.jsx'
import Quiz from './components/Quiz.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'
import useRoute from './hooks/useRoute.js'
import { loadGuides, loadQuiz } from './api.js'

const SECTION_IDS = ['home', 'guides', 'how', 'quiz', 'about']

export default function App() {
  const route = useRoute()
  const [guides, setGuides] = useState(null)
  const [questions, setQuestions] = useState(null)
  const [source, setSource] = useState('loading')
  const [active, setActive] = useState('home')
  const pending = useRef(null)

  useEffect(() => {
    let alive = true
    Promise.all([loadGuides(), loadQuiz()]).then(([g, q]) => {
      if (!alive) return
      setGuides(g.data)
      setQuestions(q.data)
      setSource(g.source === 'server' && q.source === 'server' ? 'server' : 'offline')
    })
    return () => { alive = false }
  }, [])

  const scrollToSection = useCallback((id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const goSection = useCallback((id) => {
    if (route.name !== 'home') {
      pending.current = id
      window.location.hash = '#/'
    } else {
      scrollToSection(id)
    }
  }, [route.name, scrollToSection])

  // After returning from a guide, jump to the requested section.
  useEffect(() => {
    if (route.name === 'home' && pending.current && guides) {
      const id = pending.current
      pending.current = null
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (id === 'home' || !el) window.scrollTo({ top: 0 })
        else el.scrollIntoView({ block: 'start' })
      })
    }
  }, [route.name, guides])

  // Highlight the current section in the nav.
  useEffect(() => {
    if (route.name !== 'home' || !guides) return undefined
    if (typeof IntersectionObserver === 'undefined') return undefined
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [route.name, guides])

  const guide = route.name === 'guide' && guides ? guides.find((g) => g.id === route.id) : null

  return (
    <>
      <Navbar route={route} active={active} goSection={goSection} />
      <main id="main">
        {!guides && (
          <div className="loading" role="status"><span className="spinner" /> Loading first aid guides</div>
        )}
        {guides && route.name === 'guide' && (
          guide ? (
            <GuideViewer guide={guide} guides={guides} goSection={goSection} />
          ) : (
            <div className="container notfound">
              <h1>We could not find that guide</h1>
              <p>It may have moved. Head back to the library to choose another.</p>
              <button className="btn btn-primary" onClick={() => goSection('guides')}>Back to all guides</button>
            </div>
          )
        )}
        {guides && route.name === 'home' && (
          <>
            <Hero goSection={goSection} />
            <GuideLibrary guides={guides} />
            <HowItWorks />
            <KitSection />
            <KnowBefore />
            <QuickRevision guides={guides} />
            {questions && <Quiz questions={questions} guides={guides} />}
            <About />
          </>
        )}
      </main>
      <Footer source={source} goSection={goSection} />
    </>
  )
}
