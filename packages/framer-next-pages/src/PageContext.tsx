import { NextRouter } from 'next/router'
import { createContext, useContext } from 'react'

export type Direction = 1 | -1
export type PageContext = { depth: number; direction: Direction; active: boolean }

export const pageContext = createContext((undefined as unknown) as PageContext)
export const pageRouterContext = createContext((undefined as unknown) as NextRouter)

export const usePageDirection = () => useContext(pageContext).direction
export const usePageDepth = () => useContext(pageContext).depth
export const usePageRouter = () => useContext(pageRouterContext)
