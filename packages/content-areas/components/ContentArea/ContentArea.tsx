import { ProductListItemRenderer } from '@graphcommerce/magento-product'
import { UniversalPageQuery } from '../../queries/UniversalPage.gql'

type ContentAreaProps = UniversalPageQuery & {
  productListRenderer: ProductListItemRenderer
}

export function ContentArea(props: ContentAreaProps) {
  const { content, productListRenderer, renderer } = props
  return <div />
}
