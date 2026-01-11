import { useContext } from 'react'
import type { PageContext } from '../context/pageContext'
import { pageContext } from '../context/pageContext'

const defaultPageContext: PageContext = {
  closeSteps: 0,
  backSteps: 0,
  depth: 0,
  direction: 0,
  active: true,
  routerKey: '',
}

/**
 * Get the current page context. Returns default values when used outside of framer-next-pages
 * context (e.g., in App Router).
 */
export function usePageContext(): PageContext {
  return useContext(pageContext) ?? defaultPageContext
}
