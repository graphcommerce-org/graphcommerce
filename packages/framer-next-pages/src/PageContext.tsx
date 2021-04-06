import { NextRouter } from 'next/router'
import { createContext, useContext } from 'react'

export type Direction = 1 | -1
export type PageContext = { pageRouter: NextRouter; depth: number; direction: Direction }

export const pageContext = createContext((undefined as unknown) as PageContext)

export const usePageDirection = () => useContext(pageContext).direction
export const usePageDepth = () => useContext(pageContext).depth
export const usePageRouter = () => useContext(pageContext).pageRouter
