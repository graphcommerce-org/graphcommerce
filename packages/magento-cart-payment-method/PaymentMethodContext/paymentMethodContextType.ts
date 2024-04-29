import { createContext, useContext } from 'react'
import type { PaymentMethod, PaymentMethodModules, PaymentModule } from '../Api/PaymentMethod'

export type PaymentMethodContextType = {
  methods: PaymentMethod[]
  selectedMethod?: PaymentMethod
  setSelectedMethod: (method: PaymentMethod | undefined) => void
  modules: PaymentMethodModules
  selectedModule?: PaymentModule
  setSelectedModule: (module: PaymentModule | undefined) => void
  onSuccess: (orderNumber: string) => Promise<void>
}

export const paymentMethodContext = createContext<PaymentMethodContextType | undefined>(undefined)
paymentMethodContext.displayName = 'PaymentMethodContext'

export function usePaymentMethodContext(optional: true): PaymentMethodContextType | undefined
export function usePaymentMethodContext(optional?: false): PaymentMethodContextType
export function usePaymentMethodContext(optional = false) {
  const context = useContext(paymentMethodContext)
  if (!optional && typeof context === 'undefined') {
    throw Error(
      'usePaymentMethodContext must be used within a PaymentMethodContextProvider or provide the optional=true argument',
    )
  }

  return useContext(paymentMethodContext)
}
