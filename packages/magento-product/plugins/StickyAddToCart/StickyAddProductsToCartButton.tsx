import type { IfConfig, ReactPlugin } from '@graphcommerce/next-config'
import { Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { type AddProductsToCartButton, useAddProductsToCartAction } from '../../components'

export const component = 'AddProductsToCartButton'
export const exported =
  '@graphcommerce/magento-product/components/AddProductsToCart/AddProductsToCartButton'
export const ifConfig: IfConfig = 'enableStickyAddToCart'

type PluginType = ReactPlugin<typeof AddProductsToCartButton>

const StickyAddProductsToCartButton: PluginType = (props) => {
  const { children, product, forwardedRef, ...rest } = props
  const action = useAddProductsToCartAction(props)

  return (
    <Button
      ref={forwardedRef}
      type='submit'
      color='primary'
      variant='pill'
      size='large'
      {...rest}
      {...action}
    >
      {children || <Trans id='Add to Cart' />}
    </Button>
  )
}

export const Plugin = StickyAddProductsToCartButton
