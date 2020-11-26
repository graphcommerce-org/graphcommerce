import { Button } from '@material-ui/core'
import ProductListItemDownloadableBase, {
  ProductListItemDownloadableProps,
} from '@reachdigital/magento-product-downloadable/ProductListItemDownloadable'
import { useProductLink } from '@reachdigital/magento-product/ProductLink'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import React from 'react'

export default function ProductListItemDownloadable(props: ProductListItemDownloadableProps) {
  const productLink = useProductLink(props)
  return (
    <ProductListItemDownloadableBase {...props} subTitle='By Soxbase' aspectRatio={[1, 1]}>
      <PageLink href={productLink}>
        <Button color='primary' variant='contained'>
          Select options
        </Button>
      </PageLink>
    </ProductListItemDownloadableBase>
  )
}
