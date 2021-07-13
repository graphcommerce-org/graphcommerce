import React from 'react'

export type AppShellHeaderContext = {
  titleRef: React.RefObject<HTMLDivElement>
  contentHeaderRef: React.RefObject<HTMLDivElement>
}

const appShellHeaderContext = React.createContext(undefined as unknown as AppShellHeaderContext)
appShellHeaderContext.displayName = 'appShellHeaderContext'

export default appShellHeaderContext
