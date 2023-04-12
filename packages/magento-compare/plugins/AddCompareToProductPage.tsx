import { ProductPageAddToCartRowProps } from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { CompareProductToggle } from '../components'
import { useCompareVariant } from '../hooks/useCompareVariant'

export const component = 'ProductPageAddToCartActionsRow'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'compare'

function AddCompareToProductPage(props: PluginProps<ProductPageAddToCartRowProps>) {
  const { Prev, ...rest } = props
  const { children, after, product } = props
  const compareVariant = useCompareVariant()
  if (compareVariant === 'checkbox')
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

  return (
    <Prev {...rest}>
      {children}
      <CompareProductToggle product={product} color='default' />
    </Prev>
  )
}
export const Plugin = AddCompareToProductPage
