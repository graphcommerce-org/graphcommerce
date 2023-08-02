import { CartSummaryItemActionCard } from '@graphcommerce/magento-cart'
import type { PluginProps } from '@graphcommerce/next-config'
import { isTypename } from '@graphcommerce/next-ui'
import { ConfigurableCartItemOptions } from '../components'

export const component = 'CartSummaryItemActionCard'
export const exported =
  '@graphcommerce/magento-cart/components/CartSummary/CartSummaryItemActionCard'

export function ConfigurableCartSummaryItemActionCard(
  props: PluginProps<React.ComponentProps<typeof CartSummaryItemActionCard>>,
) {
  const { Prev, ...rest } = props
  if (!isTypename(rest.cartItem, ['ConfigurableCartItem'])) return <Prev {...rest} />
  return (
    <Prev
      {...rest}
      details={
        <>
          {rest.details}
          <ConfigurableCartItemOptions {...rest.cartItem} />
        </>
      }
    />
  )
}

export const Plugin = ConfigurableCartSummaryItemActionCard
