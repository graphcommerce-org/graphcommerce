import React from 'react'
import { LayoutContext } from '../types'

export const layoutContext = React.createContext<null | LayoutContext>(null)
layoutContext.displayName = 'layoutContext'
