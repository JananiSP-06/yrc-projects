import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../services/adminApi', () => ({
  setAuth: vi.fn(), clearAuth: vi.fn(),
  adminMe: vi.fn().mockRejectedValueOnce({ status: 401, message: 'Login required' }).mockResolvedValue({ username: 'admin' }),
  adminStats: vi.fn().mockResolvedValue({ signs: 22, quizQuestions: 59, tips: 10, campaigns: 6, pledges: 3 }),
  adminList: vi.fn().mockResolvedValue([{ id: 1, name: 'Stop', category: 'MANDATORY', description: 'd', imagePath: '/assets/signs/stop.svg', safetyInstruction: 's' }]),
  adminSave: vi.fn().mockResolvedValue({}), adminDelete: vi.fn().mockResolvedValue({}),
}))
import Admin from '../pages/Admin'

describe('Admin page', () => {
  it('rejects a wrong login, then shows stats and the sign list after a good login', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><Admin /></MemoryRouter>)
    await user.type(screen.getByLabelText(/password/i), 'wrong'); await user.click(screen.getByRole('button', { name: /log in/i }))
    expect(await screen.findByText(/wrong username or password/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /log in/i }))
    expect(await screen.findByText('Stop')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText('59')).toBeInTheDocument())
  })
})