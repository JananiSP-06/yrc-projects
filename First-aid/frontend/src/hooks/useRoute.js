import { useEffect, useState } from 'react'

function parse() {
  const hash = window.location.hash.replace(/^#\/?/, '')
  const [first, id] = hash.split('/')
  if (first === 'guide' && id) return { name: 'guide', id }
  return { name: 'home' }
}

/** Tiny hash router: "#/" is the home page, "#/guide/burns" is a guide. */
export default function useRoute() {
  const [route, setRoute] = useState(parse)
  useEffect(() => {
    const onChange = () => setRoute(parse())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export const guideHref = (id) => `#/guide/${id}`
