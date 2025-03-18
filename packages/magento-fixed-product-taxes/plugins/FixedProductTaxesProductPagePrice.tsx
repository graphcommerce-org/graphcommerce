import { useQuery } from '@graphcommerce/graphql'
import type { AddToCartItemSelector, ProductPagePriceProps } from '@graphcommerce/magento-product'
import { Money, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { filterNonNullableKeys, ListFormat } from '@graphcommerce/next-ui'
import { Box, Typography } from '@mui/material'
import React from 'react'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
}

export function ProductPagePrice(props: PluginProps<ProductPagePriceProps>) {
  const { Prev, product, ...rest } = props

  const { product_fixed_product_tax_display_setting: displaySetting = 'FPT_DISABLED' } =
    useQuery(StoreConfigDocument).data?.storeConfig ?? {}

  const taxes = filterNonNullableKeys(product.price_range.minimum_price.fixed_product_taxes, [
    'amount',
  ]).filter((tax) => tax.amount.value && tax.amount.value > 0)

  const shouldDisplay = !(
    taxes.length === 0 ||
    displaySetting === 'FPT_DISABLED' ||
    displaySetting === 'INCLUDE_FPT_WITHOUT_DETAILS' ||
    displaySetting === 'EXCLUDE_FPT_WITHOUT_DETAILS'
  )

  return (
    <>
      <Prev product={product} {...rest} />
      {shouldDisplay && displaySetting === 'INCLUDE_FPT_WITH_DETAILS' && (
        <Box sx={{ typography: 'body2', mt: 1 }}>
          <ListFormat listStyle='long'>
            {taxes.map((tax) => (
              <React.Fragment key={tax.amount.value}>
                {tax.label} <Money {...tax.amount} />
              </React.Fragment>
            ))}
          </ListFormat>
        </Box>
      )}
    </>
  )
}
