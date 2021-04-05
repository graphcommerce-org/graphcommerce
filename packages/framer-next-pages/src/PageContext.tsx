import { NextRouter } from 'next/router'
import { createContext, useContext } from 'react'

export type PageContext = { router: NextRouter; level: number }

export const pageContext = createContext((undefined as unknown) as PageContext)

export const usePageLevel = () => useContext(pageContext).level
export const usePageRouter = () => useContext(pageContext).router
