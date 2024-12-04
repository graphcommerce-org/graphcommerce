import { useContext } from 'react'
import type { PageContext } from '../context/pageContext'
import { pageContext } from '../context/pageContext'

export function usePageContext(): PageContext {
  return useContext(pageContext)
}
