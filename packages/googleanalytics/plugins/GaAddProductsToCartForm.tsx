import { AddProductsToCartFormProps } from '@graphcommerce/magento-product'
import { PluginProps } from '@graphcommerce/next-config'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { gtagAddToCart } from '../events/gtagAddToCart/gtagAddToCart'
import { gtagViewItem } from '../events/gtagViewItem/gtagViewItem'

export const component = 'AddProductsToCartForm'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'googleAnalyticsId'

/** When a product is added to the Cart, send a Google Analytics event */
function GaAddProductsToCartForm(props: PluginProps<AddProductsToCartFormProps>) {
  const { Prev, onComplete, ...rest } = props

  return (
    <Prev
      {...rest}
      onComplete={(data, variables) => {
        gtagAddToCart(data, variables)
        return onComplete?.(data, variables)
      }}
    />
  )
}

export const Plugin = GaAddProductsToCartForm
