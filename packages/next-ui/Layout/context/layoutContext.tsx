import React from 'react'
import { LayoutContext } from '../types'

export const layoutContext = React.createContext(undefined as unknown as LayoutContext)
layoutContext.displayName = 'layoutContext'
