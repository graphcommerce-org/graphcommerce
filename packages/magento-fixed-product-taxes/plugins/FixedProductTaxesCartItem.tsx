import type { CartItemActionCardProps } from '@graphcommerce/magento-cart-items'
import { Money } from '@graphcommerce/magento-store'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { useFixedProductTaxes } from '../hooks/useFixedProductTaxes'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-cart-items',
}

export function CartItemActionCard(props: PluginProps<CartItemActionCardProps>) {
  const { Prev, cartItem, ...rest } = props
  const { showDetails } = useFixedProductTaxes()

  const taxes = filterNonNullableKeys(cartItem.prices?.fixed_product_taxes, ['amount']).filter(
    (tax) => tax.amount.value && tax.amount.value > 0,
  )

  if (!showDetails || taxes.length === 0) {
    return <Prev cartItem={cartItem} {...rest} />
  }

  return (
    <Prev
      cartItem={cartItem}
      {...rest}
      details={
        <>
          {rest.details}
          <Box sx={{ typography: 'caption', color: 'text.secondary' }}>
            {taxes.map((tax) => (
              <Box key={tax.label ?? tax.amount.value} sx={{ display: 'flex', gap: 0.5 }}>
                <span>{tax.label}</span>
                <Money {...tax.amount} />
              </Box>
            ))}
          </Box>
        </>
      }
    />
  )
}
