import { useEffect } from 'react'

/**
 * Prevents link navigation while the page is loaded inside the Storyblok
 * Visual Editor iframe (detected via the `_storyblok` query param). Editors
 * expect a click on a blok to open the field editor, not follow the link.
 *
 * Storyblok's own `preventClicks` bridge option is broken upstream
 * (storyblok/monoblok#82), hence this capture-phase workaround.
 *
 * Call this once from a component that renders on every page (e.g. a provider
 * that wraps your app) so pages that don't use `useStoryblokState` — such as
 * checkout or the global config page — are also covered.
 */
export function usePreventEditorNavigation() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    if (!new URLSearchParams(window.location.search).has('_storyblok')) return undefined

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest('a')) event.preventDefault()
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])
}
