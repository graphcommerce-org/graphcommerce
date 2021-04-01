import { NextRouter } from 'next/router'
import { createContext, useContext } from 'react'

export type StackedPageContext = { router: NextRouter; level: number }

export const stackedPageContext = createContext((undefined as unknown) as StackedPageContext)

export const useStackLevel = () => useContext(stackedPageContext).level
export const useStackRouter = () => useContext(stackedPageContext).router
