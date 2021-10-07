import { useCartQuery } from '@graphcommerce/magento-cart'
import React, { PropsWithChildren, useContext, useEffect, useState } from 'react'
import { PaymentMethod, PaymentMethodModules, PaymentModule } from '../Api/PaymentMethod'
import { GetPaymentMethodContextDocument } from './GetPaymentMethodContext.gql'

type PaymentMethodContextProps = {
  methods: PaymentMethod[]
  selectedMethod?: PaymentMethod
  setSelectedMethod(method: PaymentMethod | undefined): void
  modules: PaymentMethodModules
  selectedModule?: PaymentModule
  setSelectedModule(module: PaymentModule | undefined): void
}

const paymentMethodContext = React.createContext<PaymentMethodContextProps>({
  methods: [],
  setSelectedMethod: () => {},
  modules: {},
  setSelectedModule: () => {},
})
paymentMethodContext.displayName = 'PaymentMethodContext'

type PaymentMethodContextProviderProps = PropsWithChildren<{ modules: PaymentMethodModules }>

export default function PaymentMethodContextProvider(props: PaymentMethodContextProviderProps) {
  const { modules, children } = props

  const context = useCartQuery(GetPaymentMethodContextDocument)

  const cartContext = context?.data?.cart
  const [methods, setMethods] = useState<PaymentMethod[]>([])
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>()
  const [selectedModule, setSelectedModule] = useState<PaymentModule>()

  // Expand the payment methods
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      if (!cartContext) return

      const freeMethod = cartContext.available_payment_methods?.find(
        (method) => method?.code === 'free',
      )

      const promises =
        [...(freeMethod ? [freeMethod] : cartContext.available_payment_methods ?? [])].map(
          async (method) =>
            method
              ? modules?.[method.code]?.expandMethods?.(method, cartContext) ?? [
                  { ...method, child: '' },
                ]
              : Promise.resolve([]),
        ) ?? []

      const loaded = (await Promise.all(promises)).flat(1).sort((a) => (a.preferred ? 1 : 0))
      const sortedMethods = loaded.sort((a, b) =>
        !modules?.[a?.code] ? 0 : !modules?.[b?.code] ? -1 : 1,
      )

      setMethods(sortedMethods)
    })()
  }, [cartContext, modules])

  return (
    <paymentMethodContext.Provider
      value={{
        methods,
        selectedMethod,
        setSelectedMethod,
        modules,
        selectedModule,
        setSelectedModule,
      }}
    >
      {Object.entries(modules).map(([method, module]) => {
        const PaymentHandler = module.PaymentHandler
        if (!PaymentHandler) return null
        return <PaymentHandler key={method} />
      })}
      {children}
    </paymentMethodContext.Provider>
  )
}

export function usePaymentMethodContext() {
  return useContext(paymentMethodContext)
}
