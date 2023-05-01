import { ProductPageAddToCartRowProps } from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { CompareProductToggle } from '../components'

export const component = 'ProductPageAddToCartActionsRow'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'compare'

function AddCompareToProductPage(props: PluginProps<ProductPageAddToCartRowProps>) {
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
        <CompareProductToggle product={product} color='default' />
      </Prev>
    )
}
export const Plugin = AddCompareToProductPage
