import type { ProductPageDescriptionProps } from '@graphcommerce/magento-product'
import { ProductPageDescription } from '@graphcommerce/magento-product'
import { Pagebuilder } from '../Pagebuilder/Pagebuilder'

export function ProductPagePagebuilder(props: ProductPageDescriptionProps) {
  const { description } = props

  return (
    <Pagebuilder pagebuilder={description?.pagebuilder}>
      <ProductPageDescription {...props} />
    </Pagebuilder>
  )
}
