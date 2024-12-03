import React from 'react'
import type { ScrollerContext } from '../types'

export const scrollerContext = React.createContext(undefined as unknown as ScrollerContext)
scrollerContext.displayName = 'scrollerContext'
