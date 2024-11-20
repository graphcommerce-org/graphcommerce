import React from 'react'
import type { LayoutContext } from '../types'

export const layoutContext = React.createContext<null | LayoutContext>(null)
layoutContext.displayName = 'layoutContext'
