import React from 'react'
import useReveal from '../hooks/useReveal.js'

/** Fades and slides its children up when they scroll into view. */
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, style, children, ...rest }) {
  const [ref, shown] = useReveal()
  return (
    <Tag ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`} style={{ '--delay': `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  )
}