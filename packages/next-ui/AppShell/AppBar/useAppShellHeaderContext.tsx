import { useContext } from 'react'
import appShellHeaderContext from './appShellHeaderContext'

export default function useAppShellHeaderContext() {
  return useContext(appShellHeaderContext)
}
