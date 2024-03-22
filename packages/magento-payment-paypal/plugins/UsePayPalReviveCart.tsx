import { WaitForPaymentQueries } from '@graphcommerce/magento-cart-payment-method'
import type { PluginProps } from '@graphcommerce/next-config'
import { ComponentProps } from 'react'
import { usePayPalCartRevive } from '../hooks/usePayPalCartRevive'

export const component = 'WaitForPaymentQueries'
export const exported = '@graphcommerce/magento-cart-payment-method'

function UsePayPalReviveCart(props: PluginProps<ComponentProps<typeof WaitForPaymentQueries>>) {
  const { Prev, waitFor: w, ...rest } = props

  const reviving = usePayPalCartRevive({ code: 'paypal_express' })

  let waitFor: typeof w

  if (w) waitFor = [...(Array.isArray(w) ? w : [w]), reviving]
  else waitFor = reviving

  return <Prev {...rest} waitFor={waitFor} />
}
export const Plugin = UsePayPalReviveCart
