import { createContext } from 'react'
import { PageContext } from '../types'

export const pageRouterContext = createContext<PageContext | undefined>(undefined)
pageRouterContext.displayName = 'PageRouterContext'
