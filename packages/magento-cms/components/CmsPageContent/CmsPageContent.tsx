import type { ProductListItemRenderer } from '@graphcommerce/magento-product'
import { Container } from '@mui/material'
import type { CmsPageContentFragment } from './CmsPageContent.gql'

export type CmsPageContentProps = {
  cmsPage: CmsPageContentFragment
  productListRenderer: ProductListItemRenderer
}

export function CmsPageContent(props: CmsPageContentProps) {
  const { cmsPage, productListRenderer } = props
  return (
    <Container maxWidth='md'>
      {/* eslint-disable-next-line react/no-danger */}
      {cmsPage.content && <div dangerouslySetInnerHTML={{ __html: cmsPage.content }} />}
    </Container>
  )
}
