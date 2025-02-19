import type { ProductListItemRenderer } from '@graphcommerce/magento-product'
import type { CmsBlockFragment } from './CmsBlock.gql'

export type CmsBlockProps = {
  cmsBlock: CmsBlockFragment | null | undefined
  productListRenderer: ProductListItemRenderer
}

export function CmsBlock(props: CmsBlockProps) {
  const { cmsBlock, productListRenderer } = props
  if (!cmsBlock?.content) return null
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: cmsBlock.content }} />
}
