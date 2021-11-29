import { MotionValue } from 'framer-motion'
import { useRef } from 'react'
import appShellHeaderContext, { AppShellHeaderContext } from './appShellHeaderContext'

type AppShellProviderProps = {
  children: React.ReactNode
  scroll: MotionValue<number>
}

export default function AppShellProvider(props: AppShellProviderProps) {
  const { children, scroll } = props
  const context: AppShellHeaderContext = {
    titleRef: useRef<HTMLDivElement>(null),
    contentHeaderRef: useRef<HTMLDivElement>(null),
    scroll,
  }

  return <appShellHeaderContext.Provider value={context}>{children}</appShellHeaderContext.Provider>
}
