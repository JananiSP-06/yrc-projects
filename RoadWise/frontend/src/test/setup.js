import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach } from 'vitest'
import { cleanup } from '@testing-library/react'
beforeEach(() => { if (typeof window === 'undefined') return; localStorage.clear(); window.scrollTo = () => { }; window.HTMLElement.prototype.scrollIntoView = () => { } })
afterEach(() => { if (typeof document !== 'undefined') cleanup() })
