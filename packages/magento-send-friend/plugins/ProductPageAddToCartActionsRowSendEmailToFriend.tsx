import type { ProductPageAddToCartRowProps } from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { SendEmailToFriend } from '../components/SendEmailToFriend/SendEmailToFriend'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
}

export function ProductPageAddToCartActionsRow(props: PluginProps<ProductPageAddToCartRowProps>) {
  const { Prev, product, children, ...rest } = props

  return (
    <Prev product={product} {...rest}>
      {children}
      <SendEmailToFriend product={product} />
    </Prev>
  )
}
