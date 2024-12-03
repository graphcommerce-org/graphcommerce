import React, { useContext } from 'react'
import type { ComponentHandler, MollieInstance } from '../../Mollie'

export type MollieContext =
  | (MollieInstance & {
      cardHolder: ComponentHandler
      cardNumber: ComponentHandler
      expiryDate: ComponentHandler
      verificationCode: ComponentHandler
    })
  | undefined

export const mollieContext = React.createContext<MollieContext>(undefined)

export function useMollieContext() {
  return useContext(mollieContext)
}
