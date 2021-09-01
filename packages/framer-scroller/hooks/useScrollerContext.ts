import { useContext } from 'react'
import { scrollerContext } from '../context/scrollerContext'
import { ScrollerContext } from '../types'

export function useScrollerContext(): ScrollerContext {
  return useContext(scrollerContext)
}
