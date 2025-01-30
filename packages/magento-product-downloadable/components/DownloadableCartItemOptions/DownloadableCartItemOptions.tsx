import {
  SelectedCustomizableOptions,
  type CartItemActionCardProps,
} from '@graphcommerce/magento-cart-items'
import { Money } from '@graphcommerce/magento-store'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import React from 'react'

export function DownloadableCartItemOptions(props: CartItemActionCardProps) {
  const { cartItem } = props

  if (cartItem.__typename !== 'DownloadableCartItem') return null

  const links = filterNonNullableKeys(cartItem.links, ['title', 'price'])

  return (
    <>
      <Box
        sx={(theme) => ({
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          gap: theme.spacings.xs,
        })}
      >
        {links.map((link) => (
          <React.Fragment key={link.uid}>
            <span>{link.title}</span>
            <Box>
              <Money value={link.price} currency={cartItem.prices?.price.currency} />
            </Box>
          </React.Fragment>
        ))}
      </Box>

      <SelectedCustomizableOptions {...cartItem} />
    </>
  )
}
