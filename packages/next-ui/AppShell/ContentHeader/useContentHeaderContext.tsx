import { useContext } from 'react'
import contentHeaderContext from './contentHeaderContext'

export default function useContentHeaderContext() {
  return useContext(contentHeaderContext)
}
