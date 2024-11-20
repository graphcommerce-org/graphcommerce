import { useContext } from 'react'
import { scrollerContext } from '../context/scrollerContext'
import type { ScrollerContext } from '../types'

export function useScrollerContext(): ScrollerContext {
  return useContext(scrollerContext)
}
