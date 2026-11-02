import React from 'react'

const base = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: false }
const mk = (children) => (props) => <svg {...base} {...props}>{children}</svg>

export const IconArrowRight = mk(<><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>)
export const IconArrowLeft = mk(<><path d="M19 12H5" /><path d="M11 6l-6 6 6 6" /></>)
export const IconCheck = mk(<path d="M5 12.5l4.5 4.5L19 7.5" />)
export const IconClose = mk(<><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>)
export const IconMenu = mk(<><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>)
export const IconSearch = mk(<><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></>)
export const IconWarn = mk(<><path d="M12 4l9 16H3z" /><path d="M12 10v4.5" /><path d="M12 17.5v.01" /></>)
export const IconBulb = mk(<><path d="M9 18h6" /><path d="M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.8c.7.6 1 1.3 1 2.2h5c0-.9.3-1.6 1-2.2A6 6 0 0 0 12 3z" /></>)
export const IconPhone = mk(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />)
export const IconShield = mk(<><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12l2.2 2.2L15.5 10" /></>)
export const IconHand = mk(<path d="M8 12V5.5a1.5 1.5 0 0 1 3 0V11m0-1V4a1.5 1.5 0 0 1 3 0v7m0-5.5a1.5 1.5 0 0 1 3 0V13m0-3.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7L4 14.5a1.6 1.6 0 0 1 2.6-1.8L8 14" />)
export const IconHeart = mk(<path d="M12 20s-7.5-4.5-7.5-10A4.3 4.3 0 0 1 12 7.6 4.3 4.3 0 0 1 19.5 10C19.5 15.5 12 20 12 20z" />)
export const IconClock = mk(<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>)
export const IconRefresh = mk(<><path d="M20 11a8 8 0 0 0-14.5-4" /><path d="M5 3v4h4" /><path d="M4 13a8 8 0 0 0 14.5 4" /><path d="M19 21v-4h-4" /></>)
export const IconZoom = mk(<><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /><path d="M11 8.5v5" /><path d="M8.5 11h5" /></>)
export const IconCross = (props) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false" {...props}>
    <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" fill="currentColor" />
  </svg>
)

export function LogoMark({ size = 36 }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" focusable="false">
      <rect x="6" y="14" width="52" height="40" rx="9" fill="#e8505b" stroke="#14213d" strokeWidth="3" />
      <path d="M22 14v-4a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v4" fill="none" stroke="#14213d" strokeWidth="3" />
      <circle cx="32" cy="34" r="13" fill="#fff" />
      <path d="M29 26h6v5h5v6h-5v5h-6v-5h-5v-6h5z" fill="#e8505b" />
    </svg>
  )
}
