import type { ProductPageAddToCartRowProps } from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { CompareProductToggle } from '../components'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
  ifConfig: 'compare',
}

export function ProductPageAddToCartActionsRow(props: PluginProps<ProductPageAddToCartRowProps>) {
  const { Prev, ...rest } = props
  const { children, after, product } = props
  if (import.meta.graphCommerce.compareVariant === 'CHECKBOX')
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

  if (
    import.meta.graphCommerce.compareVariant === 'ICON' ||
    !import.meta.graphCommerce.compareVariant
  )
    return (
      <Prev {...rest}>
        {children}
        <CompareProductToggle product={product} sx={(theme) => ({ boxShadow: theme.shadows[6] })} />
      </Prev>
    )
}
