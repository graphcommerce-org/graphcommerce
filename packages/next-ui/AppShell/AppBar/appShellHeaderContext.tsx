import { MotionValue } from 'framer-motion'
import React from 'react'

export type AppShellHeaderContext = {
  titleRef: React.RefObject<HTMLDivElement>
  contentHeaderRef: React.RefObject<HTMLDivElement>
  scroll: MotionValue<number>
}

const appShellHeaderContext = React.createContext(undefined as unknown as AppShellHeaderContext)
appShellHeaderContext.displayName = 'appShellHeaderContext'

export default appShellHeaderContext
