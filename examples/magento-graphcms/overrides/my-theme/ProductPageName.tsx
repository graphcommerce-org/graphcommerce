import { AddProductsToCartButtonProps, ProductPageNameProps } from '@graphcommerce/magento-product'
import { IfConfig } from '@graphcommerce/next-config'

export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig<'compareVariant'> = ['compareVariant', 'CHECKBOX']

export function ProductPageName(props: ProductPageNameProps) {
  const { product } = props
  return <div>Hoi {product?.url_key} COMPARE</div>
}
