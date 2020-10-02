import React, { useContext } from 'react'
import { NavigationSwipe } from './useNavigationSwipe'

export type NavigationContext = {
  swipe: NavigationSwipe
  from?: string
  to?: string
}

const navigationContext = React.createContext<NavigationContext>({
  swipe: 0,
})

export const NavigationContextProvider = navigationContext.Provider

export default function useNavigationContext() {
  return useContext(navigationContext)
}
