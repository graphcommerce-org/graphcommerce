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
  const [config, setConfig] = useState(value ?? null)

  useEffect(() => setConfig(value ?? null), [value])

  return (
    <GlobalConfigContext.Provider value={config}>
      <SetGlobalConfigContext.Provider value={setConfig}>
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
