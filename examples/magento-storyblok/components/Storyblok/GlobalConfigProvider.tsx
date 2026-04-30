import { createContext, useContext, useEffect, useState } from 'react'
import type { StoryblokGlobalConfig } from './types'

const GlobalConfigContext = createContext<StoryblokGlobalConfig | null>(null)
const SetGlobalConfigContext = createContext<
  ((config: StoryblokGlobalConfig | null) => void) | null
>(null)

export function GlobalConfigProvider(props: {
  value: StoryblokGlobalConfig | null | undefined
  children: React.ReactNode
}) {
  const { value, children } = props

  // `override` holds live Visual Editor updates pushed via `useSetGlobalConfig`.
  // When unset (null), we fall back to the SSR `value` prop.
  const [override, setOverride] = useState<StoryblokGlobalConfig | null>(null)
  // Track the last `value` we saw so we can reset the override on navigation
  // (when a new page provides a fresh SSR value, any stale editor override is dropped).
  // This is React's recommended "adjust state during render" pattern — preferred over
  // syncing via useEffect, which would cause a double render.
  const [lastValue, setLastValue] = useState(value)

  if (value !== lastValue) {
    setLastValue(value)
    setOverride(null)
  }

  const config = override ?? value ?? null

  return (
    <GlobalConfigContext.Provider value={config}>
      <SetGlobalConfigContext.Provider value={setOverride}>
        {children}
      </SetGlobalConfigContext.Provider>
    </GlobalConfigContext.Provider>
  )
}

export function useGlobalConfig() {
  return useContext(GlobalConfigContext)
}

/** Push live Visual Editor updates into the global config context. */
export function useSetGlobalConfig(config: StoryblokGlobalConfig | null | undefined) {
  const setConfig = useContext(SetGlobalConfigContext)
  useEffect(() => {
    if (setConfig && config) setConfig(config)
  }, [setConfig, config])
}
