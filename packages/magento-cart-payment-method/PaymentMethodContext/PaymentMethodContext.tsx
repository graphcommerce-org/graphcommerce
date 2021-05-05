import { useCartQuery } from '@reachdigital/magento-cart/CurrentCartId/useCartQuery'
import React, { PropsWithChildren, useContext, useEffect, useState } from 'react'
import { PaymentError, PaymentMethod, PaymentMethodModules, PaymentModule } from '../PaymentMethod'
import { GetPaymentMethodContextDocument } from './GetPaymentMethodContext.gql'
import { PaymentMethodContextFragment } from './PaymentMethodContext.gql'

type PaymentMethodContextProps = {
  methods: PaymentMethod[]
  selectedMethod?: PaymentMethod
  setSelectedMethod(method: PaymentMethod | undefined): void
  modules: PaymentMethodModules
  selectedModule?: PaymentModule
  setSelectedModule(module: PaymentModule | undefined): void
  loading: boolean
  setLoading(loading: boolean): void
  error?: PaymentError
  setError(error?: PaymentError): void
}

const paymentMethodContext = React.createContext<PaymentMethodContextProps>({
  methods: [],
  setSelectedMethod: () => {},
  modules: {},
  setSelectedModule: () => {},
  loading: true,
  setLoading: () => {},
  setError: () => {},
})
paymentMethodContext.displayName = 'PaymentMethodContext'

type PaymentMethodContextProviderProps = PropsWithChildren<{ modules: PaymentMethodModules }>

export default function PaymentMethodContextProvider(props: PaymentMethodContextProviderProps) {
  const { modules, children } = props

  const { data: cartData } = useCartQuery(GetPaymentMethodContextDocument)
  const [methods, setMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>()
  const [selectedModule, setSelectedModule] = useState<PaymentModule>()
  const [error, setError] = useState<PaymentError>()

  // Expand the payment methods
  useEffect(() => {
    if (!cartData) return // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      const promises =
        cartData.cart?.available_payment_methods?.map(async (method) =>
          method
            ? modules?.[method.code]?.expandMethods?.(method, cartData.cart) ?? [
                { ...method, child: '' },
              ]
            : Promise.resolve([]),
        ) ?? []

      setMethods((await Promise.all(promises)).flat(1).sort((a) => (a.preferred ? 1 : 0)))
      setLoading(false)
    })()
  }, [cartData, modules])

  return (
    <paymentMethodContext.Provider
      value={{
        methods,
        selectedMethod,
        setSelectedMethod,
        modules,
        selectedModule,
        setSelectedModule,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </paymentMethodContext.Provider>
  )
}

export function usePaymentMethodContext() {
  return useContext(paymentMethodContext)
}
