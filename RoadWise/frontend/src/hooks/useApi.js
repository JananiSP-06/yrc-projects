import { useCallback, useEffect, useRef, useState } from 'react'

/** Runs an async function on mount (and whenever deps change). Gives { data, error, loading, reload }. */
export default function useApi(fn, deps = [], { enabled = true } = {}) {
  const [state, setState] = useState({ data: null, error: null, loading: enabled })
  const run = useRef(0); const fnRef = useRef(fn); fnRef.current = fn
  const load = useCallback(() => {
    const id = ++run.current
    setState(s => ({ ...s, loading: true, error: null }))
    return fnRef.current().then(
      data => { if (id === run.current) setState({ data, error: null, loading: false }) },
      error => { if (id === run.current) setState({ data: null, error, loading: false }) })
  }, [])
  useEffect(() => { if (enabled) load(); return () => { run.current++ } }, [enabled, load, ...deps])
  return { ...state, reload: load }
}
