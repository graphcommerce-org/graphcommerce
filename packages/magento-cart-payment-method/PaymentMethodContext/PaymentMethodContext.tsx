import { useCartQuery } from '@graphcommerce/magento-cart'
import React, { PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'
import { PaymentMethod, PaymentMethodModules, PaymentModule } from '../Api/PaymentMethod'
import { useCartLock } from '../hooks'
import { GetPaymentMethodContextDocument } from './GetPaymentMethodContext.gql'

type PaymentMethodContextProps = {
  methods: PaymentMethod[]
  selectedMethod?: PaymentMethod
  setSelectedMethod: (method: PaymentMethod | undefined) => void
  modules: PaymentMethodModules
  selectedModule?: PaymentModule
  setSelectedModule: (module: PaymentModule | undefined) => void
}

const paymentMethodContext = React.createContext<PaymentMethodContextProps>({
  methods: [],
  setSelectedMethod: () => {},
  modules: {},
  setSelectedModule: () => {},
})
paymentMethodContext.displayName = 'PaymentMethodContext'

type PaymentMethodContextProviderProps = PropsWithChildren<{ modules: PaymentMethodModules }>

export function PaymentMethodContextProvider(props: PaymentMethodContextProviderProps) {
  const { modules, children } = props

  const context = useCartQuery(GetPaymentMethodContextDocument)

  const cartContext = context?.data?.cart
  const [methods, setMethods] = useState<PaymentMethod[]>([])
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>()
  const [selectedModule, setSelectedModule] = useState<PaymentModule>()

  const availableMethods = useMemo(() => {
    const allMethods = cartContext?.available_payment_methods ?? []
    const free = allMethods.find((method) => method?.code === 'free')

    return free ? [free] : allMethods
  }, [cartContext?.available_payment_methods])

  // Expand the payment methods
  useEffect(() => {
    if (!cartContext) return // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      const promises = availableMethods.map(async (method) =>
        method
          ? modules[method.code]?.expandMethods?.(method, cartContext) ?? [{ ...method, child: '' }]
          : Promise.resolve([]),
      )

      const loaded = (await Promise.all(promises)).flat(1).sort((a) => (a.preferred ? 1 : 0))

      setMethods(loaded)
    })()
  }, [availableMethods, cartContext, modules])

  const value = useMemo(
    () => ({
      methods,
      selectedMethod,
      setSelectedMethod,
      modules,
      selectedModule,
      setSelectedModule,
    }),
    [methods, modules, selectedMethod, selectedModule],
  )

  return (
    <paymentMethodContext.Provider value={value}>
      {Object.entries(modules).map(([code, module]) =>
        module.PaymentHandler ? <module.PaymentHandler key={code} code={code} /> : null,
      )}
      {children}
    </paymentMethodContext.Provider>
  )
}

export function usePaymentMethodContext() {
  return useContext(paymentMethodContext)
}
