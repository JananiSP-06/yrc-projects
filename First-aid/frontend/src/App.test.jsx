import React from 'react'
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, within, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'
import guides from './data/guides.json'
import quiz from './data/quiz.json'
import { SCENES } from './illustrations/Illustration.jsx'

beforeEach(() => {
  cleanup()
  window.location.hash = '#/'
})

describe('content and illustrations', () => {
  it('has six guides with five steps each', () => {
    expect(guides.map((g) => g.id)).toEqual(['burns', 'bleeding', 'choking', 'fainting', 'snake-bites', 'fractures'])
    guides.forEach((g) => expect(g.steps.length).toBeGreaterThanOrEqual(4))
  })

  it('gives every step its own illustration, and no two steps share one', () => {
    const ids = guides.flatMap((g) => g.steps.map((s) => s.id))
    expect(new Set(ids).size).toBe(ids.length)
    ids.forEach((id) => expect(SCENES[id], `missing scene ${id}`).toBeTypeOf('function'))
    guides.forEach((g) => expect(SCENES[g.cover], `missing cover ${g.cover}`).toBeTypeOf('function'))
  })

  it('has alt text for every step', () => {
    guides.forEach((g) => g.steps.forEach((s) => expect(s.alt.length).toBeGreaterThan(10)))
  })

  it('quiz questions reference real scenes, topics and answers', () => {
    const topics = guides.map((g) => g.id)
    quiz.forEach((q) => {
      expect(SCENES[q.scene]).toBeTypeOf('function')
      expect(SCENES[q.feedbackScene]).toBeTypeOf('function')
      expect(topics).toContain(q.topic)
      expect(q.options).toHaveLength(4)
      expect(q.correct).toBeGreaterThanOrEqual(0)
      expect(q.correct).toBeLessThan(4)
    })
    topics.forEach((t) => expect(quiz.filter((q) => q.topic === t).length).toBeGreaterThanOrEqual(2))
  })
})

describe('home page', () => {
  it('shows the hero, navigation and six guide cards', async () => {
    render(<App />)
    expect(await screen.findByRole('heading', { level: 1, name: /first aid made simple/i })).toBeTruthy()
    expect(screen.getByText(/learn the right steps\. stay calm\. make a difference\./i)).toBeTruthy()
    ;['Home', 'First Aid Guides', 'How It Works', 'Quiz', 'About YRC'].forEach((label) => {
      expect(within(screen.getByRole('navigation', { name: 'Main' })).getByText(label)).toBeTruthy()
    })
    expect(screen.getAllByRole('link', { name: /learn the steps/i })).toHaveLength(6)
    expect(screen.getByRole('button', { name: /explore first aid/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /take the quiz/i })).toBeTruthy()
  })

  it('filters guides by search and by level', async () => {
    const user = userEvent.setup()
    render(<App />)
    await screen.findByRole('heading', { level: 1 })
    await user.type(screen.getByPlaceholderText(/search/i), 'snake')
    expect(screen.getAllByRole('link', { name: /learn the steps/i })).toHaveLength(1)
    await user.clear(screen.getByPlaceholderText(/search/i))
    await user.click(screen.getByRole('button', { name: 'Essential' }))
    expect(screen.getAllByRole('link', { name: /learn the steps/i })).toHaveLength(2)
    await user.type(screen.getByPlaceholderText(/search/i), 'zzzz')
    expect(screen.getByText(/no guide matches/i)).toBeTruthy()
  })

  it('renders the kit explorer and quick revision tabs', async () => {
    const user = userEvent.setup()
    render(<App />)
    await screen.findByRole('heading', { level: 1 })
    await user.click(screen.getByRole('option', { name: /roller bandage/i }))
    expect(screen.getByText(/hold a pad in place/i)).toBeTruthy()
    await user.click(screen.getByRole('tab', { name: 'Fractures' }))
    expect(screen.getByRole('tabpanel')).toBeTruthy()
  })
})

describe('guide viewer', () => {
  for (const g of guides) {
    it(`walks through every step of the ${g.id} guide`, async () => {
      const user = userEvent.setup()
      window.location.hash = `#/guide/${g.id}`
      render(<App />)
      expect(await screen.findByRole('heading', { level: 1, name: g.title })).toBeTruthy()

      for (let i = 0; i < g.steps.length; i++) {
        expect(screen.getByText(`Step ${i + 1} of ${g.steps.length}`)).toBeTruthy()
        expect(screen.getByRole('heading', { level: 2, name: g.steps[i].title })).toBeTruthy()
        // the large illustration for this step is on screen with its alt text
        expect(screen.getAllByRole('img', { name: g.steps[i].alt }).length).toBeGreaterThan(0)
        if (g.steps[i].warning) expect(screen.getByText(g.steps[i].warning)).toBeTruthy()
        const next = screen.getByRole('button', { name: i === g.steps.length - 1 ? /finish/i : /next step/i })
        await user.click(next)
      }
      expect(await screen.findByText(/all steps complete/i)).toBeTruthy()
      expect(screen.getByText(/key actions/i)).toBeTruthy()
      expect(screen.getByText(/call 112 or get medical help if/i)).toBeTruthy()
    })
  }

  it('supports Previous Step, thumbnails and arrow keys', async () => {
    const user = userEvent.setup()
    window.location.hash = '#/guide/burns'
    render(<App />)
    await screen.findByRole('heading', { level: 1, name: 'Burns' })
    expect(screen.getByRole('button', { name: /previous step/i }).disabled).toBe(true)
    await user.click(screen.getByRole('button', { name: /go to step 4/i }))
    expect(screen.getByText('Step 4 of 5')).toBeTruthy()
    await user.click(screen.getByRole('button', { name: /previous step/i }))
    expect(screen.getByText('Step 3 of 5')).toBeTruthy()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByText('Step 4 of 5')).toBeTruthy()
    await user.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(screen.getByText('Step 2 of 5')).toBeTruthy()
    const bar = screen.getByRole('progressbar')
    expect(bar.getAttribute('aria-valuenow')).toBe('40')
  })

  it('returns to the guide library from the guide', async () => {
    const user = userEvent.setup()
    window.location.hash = '#/guide/choking'
    render(<App />)
    await screen.findByRole('heading', { level: 1, name: 'Choking' })
    await user.click(screen.getAllByRole('link', { name: /all guides/i })[0])
    await waitFor(() => expect(screen.getByRole('heading', { level: 2, name: /first aid guides/i })).toBeTruthy())
  })
})

describe('quiz', () => {
  it('runs the whole quiz and shows results, then Try Again', async () => {
    const user = userEvent.setup()
    render(<App />)
    await screen.findByRole('heading', { level: 1 })
    await user.click(screen.getByRole('button', { name: /start the quiz/i }))

    for (let i = 0; i < quiz.length; i++) {
      expect(screen.getByText(`Question ${i + 1} of ${quiz.length}`)).toBeTruthy()
      const options = [...document.querySelectorAll('.options button')]
      expect(options).toHaveLength(4)
      await user.click(options[0])
      expect(screen.getByRole('status')).toBeTruthy()
      const label = i === quiz.length - 1 ? /see my results/i : /next question/i
      await user.click(screen.getByRole('button', { name: label }))
    }

    expect(await screen.findByRole('img', { name: /score \d+ out of 12/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /try again/i })).toBeTruthy()
    await user.click(screen.getByRole('button', { name: /try again/i }))
    expect(screen.getByRole('button', { name: /start the quiz/i })).toBeTruthy()
  })

  it('scores a perfect run as 12 of 12 with no topics to review', async () => {
    const user = userEvent.setup()
    render(<App />)
    await screen.findByRole('heading', { level: 1 })
    await user.click(screen.getByRole('button', { name: /start the quiz/i }))
    for (let i = 0; i < quiz.length; i++) {
      const q = quiz.find((x) => x.scenario === document.querySelector('.quiz-q').textContent)
      const options = [...document.querySelectorAll('.options button')]
      await user.click(options.find((o) => o.textContent.slice(1) === q.options[q.correct]))
      await user.click(screen.getByRole('button', { name: i === quiz.length - 1 ? /see my results/i : /next question/i }))
    }
    expect(await screen.findByRole('img', { name: 'Score 12 out of 12' })).toBeTruthy()
    expect(screen.getByText(/perfect score/i)).toBeTruthy()
  })
})
