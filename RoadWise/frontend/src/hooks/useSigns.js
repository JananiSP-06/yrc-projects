import { useMemo } from 'react'
import useApi from './useApi'
import { getSigns } from '../services/api'
import { adaptSign } from '../services/adapters'
import { SIGNS as BUNDLED } from '../data/content'

/** Signs from the backend. Only if the server cannot be reached do we fall back to the bundled copy, flagged as offline. */
export default function useSigns() {
  const { data, error, loading, reload } = useApi(getSigns, [])
  const signs = useMemo(() => data ? data.map(adaptSign) : error?.isNetwork ? BUNDLED : [], [data, error])
  return { signs, loading, error: error && !error.isNetwork ? error : null, offline: !!error?.isNetwork, reload }
}
