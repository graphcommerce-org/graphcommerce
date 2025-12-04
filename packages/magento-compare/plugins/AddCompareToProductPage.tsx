import type { ProductPageAddToCartRowProps } from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { compareVariant } from '@graphcommerce/next-config/config'
import { CompareProductToggle } from '../components'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
  ifConfig: 'compare',
}

export function ProductPageAddToCartActionsRow(props: PluginProps<ProductPageAddToCartRowProps>) {
  const { Prev, ...rest } = props
  const { children, after, product } = props
  if (compareVariant === 'CHECKBOX')
    return (
      <Prev
        {...rest}
        after={
          <>
            {after}
            <CompareProductToggle product={product} />
          </>
        }
      />
    )

  if (compareVariant === 'ICON' || !compareVariant)
    return (
      <Prev {...rest}>
        {children}
        <CompareProductToggle product={product} sx={(theme) => ({ boxShadow: theme.shadows[6] })} />
      </Prev>
    )
}
