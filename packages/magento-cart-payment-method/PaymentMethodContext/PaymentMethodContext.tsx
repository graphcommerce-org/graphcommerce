import { useApolloClient } from '@graphcommerce/graphql'
import { useCartQuery, useClearCurrentCartId } from '@graphcommerce/magento-cart'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { useEventCallback } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import type {
  ExpandPaymentMethodsContext,
  PaymentMethod,
  PaymentMethodModules,
  PaymentModule,
} from '../Api/PaymentMethod'
import type { PaymentMethodContextFragment } from '../Api/PaymentMethodContext.gql'
import { GetPaymentMethodContextDocument } from './GetPaymentMethodContext.gql'
import type { PaymentMethodContextType } from './paymentMethodContextType'
import { paymentMethodContext } from './paymentMethodContextType'

export type PaymentMethodContextProviderProps = {
  modules?: PaymentMethodModules
  children: React.ReactNode
  successUrl?: string
  onSuccess?: (
    orderNumber: string,
    cart?: PaymentMethodContextFragment | null,
  ) => Promise<void> | void
}

/**
 * The PaymentMethodContextProvider configures all available PaymentMethods.
 *
 * You are able to provide a modules object to new PaymentMethods. Most provided payment methods are
 * integrated with Plugins.
 */
export function PaymentMethodContextProvider(props: PaymentMethodContextProviderProps) {
  const { modules = {}, successUrl = '/checkout/success', onSuccess, children } = props

  const context = useCartQuery(GetPaymentMethodContextDocument)
  const client = useApolloClient()
  const clearCurrentCartId = useClearCurrentCartId()
  const { push } = useRouter()

  const cartContext: ExpandPaymentMethodsContext = useMemo(
    () => ({ ...context?.data?.cart, client }),
    [client, context?.data?.cart],
  )

  const onSuccessCb: NonNullable<PaymentMethodContextType['onSuccess']> = useEventCallback(
    async (orderNumber) => {
      await onSuccess?.(orderNumber, context.data?.cart)
      await push({
        pathname: successUrl,
        query: { order_number: orderNumber, cart_id: context.data?.cart?.id },
      })
      clearCurrentCartId()
    },
  )

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>()
  const [selectedModule, setSelectedModule] = useState<PaymentModule>()

  const availableMethods = useMemo(() => {
    const allMethods = filterNonNullableKeys(cartContext?.available_payment_methods)
    const free = allMethods.find((method) => method?.code === 'free')

    return free ? [free] : allMethods
  }, [cartContext?.available_payment_methods])

  const [methods, setMethods] = useState<PaymentMethod[]>(
    availableMethods.map((m) => ({ ...m, code: `${m.code}_placeholder`, child: '' })),
  )

  // Expand the payment methods
  useEffect(() => {
    if (!cartContext) return // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      const promises = availableMethods.map(async (method) =>
        method
          ? (modules[method.code]?.expandMethods?.(method, cartContext) ?? [
              { ...method, child: '' },
            ])
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
      onSuccess: onSuccessCb,
    }),
    [methods, modules, onSuccessCb, selectedMethod, selectedModule],
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
