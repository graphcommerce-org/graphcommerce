import type { ProductPagePriceProps } from '@graphcommerce/magento-product'
import { Money } from '@graphcommerce/magento-store'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { filterNonNullableKeys, ListFormat } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { Trans } from '@lingui/react/macro'
import React from 'react'
import { useFixedProductTaxes } from '../hooks/useFixedProductTaxes'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
}

export function ProductPagePrice(props: PluginProps<ProductPagePriceProps>) {
  const { Prev, product, ...rest } = props
  const { displaySetting, showDetails, showFinalPrice } = useFixedProductTaxes()

  const taxes = filterNonNullableKeys(
    product.price_range.minimum_price.fixed_product_taxes,
    ['amount'],
  ).filter((tax) => tax.amount.value && tax.amount.value > 0)

  if (taxes.length === 0 || displaySetting === 'FPT_DISABLED' || !showDetails) {
    return <Prev product={product} {...rest} />
  }

  const totalFpt = taxes.reduce((sum, tax) => sum + (tax.amount.value ?? 0), 0)
  const basePrice = product.price_range.minimum_price.final_price
  const finalPriceValue = (basePrice.value ?? 0) + (showFinalPrice ? totalFpt : 0)

  return (
    <>
      <Prev product={product} {...rest} />
      <Box sx={{ typography: 'body2', mt: 0.5, color: 'text.secondary' }}>
        <ListFormat listStyle='long'>
          {taxes.map((tax) => (
            <React.Fragment key={tax.label ?? tax.amount.value}>
              {tax.label} <Money {...tax.amount} />
            </React.Fragment>
          ))}
        </ListFormat>
      </Box>
      {showFinalPrice && (
        <Box sx={{ typography: 'body2', fontWeight: 'bold', mt: 0.5 }}>
          <Trans>Final price</Trans>{' '}
          <Money currency={basePrice.currency} value={finalPriceValue} />
        </Box>
      )}
    </>
  )
}
