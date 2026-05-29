import { createContext, useContext, useEffect, useState } from 'react'
import { fetchGlobalConfig, useEditorState } from '../../lib/storyblok'
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
  const { skip, editorLanguage } = useEditorState()

  // `override` holds live Visual Editor updates pushed via `useSetGlobalConfig`
  // and editor-language refetches done below. When unset, we fall back to the
  // SSR `value` prop.
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

  // Editor-language refetch: pages other than `/global-config` fetch the
  // globalConfig in the storefront's language server-side. When the editor
  // shows a different language we refetch client-side once so USPs / footer /
  // etc. match the editor selection across the whole site.
  useEffect(() => {
    if (skip || editorLanguage === undefined) return undefined
    let cancelled = false
    fetchGlobalConfig({ preview: true, language: editorLanguage }).then((story) => {
      if (!cancelled && story?.content) setOverride(story.content)
    })
    return () => {
      cancelled = true
    }
  }, [skip, editorLanguage])

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
