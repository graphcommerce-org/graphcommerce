import { createContext } from 'react'
import type { PageContext } from '../types'

export const pageRouterContext = createContext(undefined as unknown as PageContext)
pageRouterContext.displayName = 'PageRouterContext'
