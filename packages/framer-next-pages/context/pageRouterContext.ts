import { createContext } from 'react'
import { PageRouterContext } from '../types'

export const pageRouterContext = createContext(undefined as unknown as PageRouterContext)
pageRouterContext.displayName = 'PageRouterContext'
