import { useContext } from 'react'
import { layoutContext } from '../context/layoutContext'

export function useScrollY() {
  return useContext(layoutContext).scroll
}
