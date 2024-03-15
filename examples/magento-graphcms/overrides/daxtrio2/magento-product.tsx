import type { ProductPageName as ProductPageNameBase } from '@graphcommerce/magento-product'
import { IfConfig } from '@graphcommerce/next-config'

// export const replace = 'ProductPageName'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig<'compareVariant'> = ['compareVariant', 'ICON']

export const ProductPageName: typeof ProductPageNameBase = (props) => {
  const { product } = props
  return <>Replacement {product.name}</>
}
