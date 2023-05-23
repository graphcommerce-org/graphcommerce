import { useMotionValue } from 'framer-motion'
import { useEffect } from 'react'
import { scrollPos } from '../components/Page'
import { usePageContext } from './usePageContext'

/**
 * When a page is rendered in the background the scrollposition should be offset when rendering
 * scroll based elements.
 */
export function useScrollOffset() {
  const pageContext = usePageContext()

  const { active, routerKey = '' } = pageContext ?? {}

  const scrolloffset = useMotionValue(0)

  useEffect(() => {
    if (active) scrolloffset.set(0)
    else scrolloffset.set(scrollPos(routerKey).y)
  }, [active, routerKey, scrolloffset])

  // When the page is rendered in the background we should use it's scroll offset while rendering
  return scrolloffset
}
