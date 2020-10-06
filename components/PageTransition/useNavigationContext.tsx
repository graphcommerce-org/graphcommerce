import React, { useContext } from 'react'
import { NavigationDirection } from './useNavigationDirection'

export type NavigationContext = {
  from?: string
  fromRoute?: string
  to?: string
  toRoute?: string
}

const navigationContext = React.createContext<NavigationContext>({})

export const NavigationContextProvider = navigationContext.Provider

export default function useNavigationContext() {
  return useContext(navigationContext)
}
