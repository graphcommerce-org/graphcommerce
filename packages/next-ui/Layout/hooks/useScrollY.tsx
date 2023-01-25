import { useContext } from 'react'
import { layoutContext } from '../context/layoutContext'

export function useScrollY() {
  const context = useContext(layoutContext)

  if (!context) {
    throw new Error('useScrollY must be used within a LayoutProvider')
  }
  return context.scroll
}
