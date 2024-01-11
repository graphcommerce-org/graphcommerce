import { ProductListItemRenderer } from '@graphcommerce/magento-product'
import { PageContent } from '../../types'

export interface ContentAreaProps {
  content: PageContent
  productListRenderer: ProductListItemRenderer
}

export function ContentArea(props: ContentAreaProps) {
  const { content, productListRenderer, renderer } = props
  return <div />
}
