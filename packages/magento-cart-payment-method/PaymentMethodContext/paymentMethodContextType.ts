import type { ParsedUrlQueryInput } from 'querystring'
import { createContext, useContext } from 'react'
import type { PaymentMethod, PaymentMethodModules, PaymentModule } from '../Api/PaymentMethod'

export type PaymentMethodContextType = {
  methods: PaymentMethod[]
  selectedMethod?: PaymentMethod
  setSelectedMethod: (method: PaymentMethod | undefined) => void
  modules: PaymentMethodModules
  selectedModule?: PaymentModule
  setSelectedModule: (module: PaymentModule | undefined) => void

  /**
   * Completes the checkout: runs the provider's `onSuccess` hook — purchase tracking, and whatever
   * plugins have attached themselves to it — then navigates to the success page and clears the cart
   * id, in that order.
   *
   * Payment handlers should always finish through here rather than navigating to the success page
   * themselves, otherwise that hook silently does not run.
   *
   * @param query Extra query parameters for the success page, e.g. a flag saying the payment is
   *   still being confirmed. Merged _over_ `order_number` and `cart_id`, so a handler that knows
   *   the cart id better than the provider does can supply its own.
   */
  onSuccess: (orderNumber: string, query?: ParsedUrlQueryInput) => Promise<void>
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
