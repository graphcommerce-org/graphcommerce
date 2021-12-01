import { useContext } from 'react'
import layoutContext from '../context/layoutContext'

export default function useLayoutContext() {
  return useContext(layoutContext)
}
