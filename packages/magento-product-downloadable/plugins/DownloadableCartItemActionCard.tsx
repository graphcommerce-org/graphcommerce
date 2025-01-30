import {
  SelectedCustomizableOptions,
  type CartItemActionCardProps,
} from '@graphcommerce/magento-cart-items'
import { Money } from '@graphcommerce/magento-store'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { filterNonNullableKeys, isTypename } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import React from 'react'
import { DownloadableCartItemOptions } from '../components/DownloadableCartItemOptions/DownloadableCartItemOptions'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-cart-items',
}

export function CartItemActionCard(props: PluginProps<CartItemActionCardProps>) {
  const { Prev, ...rest } = props

  return (
    <Prev
      {...rest}
      details={
        <>
          {rest.details} <DownloadableCartItemOptions {...rest} />
        </>
      }
    />
  )
}
