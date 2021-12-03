import React from 'react'
import { LayoutContext } from '../types'

const layoutContext = React.createContext(undefined as unknown as LayoutContext)
layoutContext.displayName = 'layoutContext'

export default layoutContext
