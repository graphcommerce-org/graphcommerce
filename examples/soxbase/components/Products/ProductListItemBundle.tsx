import { Button } from '@material-ui/core'
import ProductListItemBundleBase, {
  ProdustListItemBundleProps,
} from '@reachdigital/magento-product-bundle/ProductListItemBundle'
import { useProductLink } from '@reachdigital/magento-product/ProductLink'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import React from 'react'

export default function ProductListItemBundle(props: ProdustListItemBundleProps) {
  const productLink = useProductLink(props)

  return (
    <ProductListItemBundleBase {...props} subTitle='By Soxbase' aspectRatio={[1, 1]}>
      <PageLink href={productLink}>
        <Button color='primary' variant='contained'>
          Select options
        </Button>
      </PageLink>
    </ProductListItemBundleBase>
  )
}
