import { useMemo } from 'react'
import { scrollPos } from '../components/Page'
import { usePageContext } from './usePageContext'

/**
 * When a page is rendered in the background the scrollposition should be offset when rendering
 * scroll based elements.
 */
export function useScrollOffset() {
  const { active, historyIdx } = usePageContext()

  // When the page is rendered in the background we should use it's scroll offset while rendering
  return useMemo(() => (active ? { x: 0, y: 0 } : scrollPos(historyIdx)), [active, historyIdx])
}
