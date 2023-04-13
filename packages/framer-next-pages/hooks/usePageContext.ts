import { useContext } from 'react'
import { PageContext, pageContext } from '../context/pageContext'

export function usePageContext(): PageContext | undefined {
  return useContext(pageContext)
}
