import ProductListItemBundle from '@reachdigital/magento-product-bundle/ProductListItemBundle'
import ProductListItemConfigurable from '@reachdigital/magento-product-configurable/ProductListItemConfigurable'
import ProductListItemDownloadable from '@reachdigital/magento-product-downloadable/ProductListItemDownloadable'
import ProductListItemGrouped from '@reachdigital/magento-product-grouped/ProductListItemGrouped'
import ProductListItemSimple from '@reachdigital/magento-product-simple/ProductListItemSimple'
import ProductListItemVirtual from '@reachdigital/magento-product-virtual/ProductListItemVirtual'
import React from 'react'
import ProductListItemsBase, { ProductItemsGridProps } from './ProductListItemsBase'

export default function ProductListItems(props: Omit<ProductItemsGridProps, 'renderers'>) {
  return (
    <ProductListItemsBase
      renderers={{
        SimpleProduct: ProductListItemSimple,
        ConfigurableProduct: ProductListItemConfigurable,
        BundleProduct: ProductListItemBundle,
        VirtualProduct: ProductListItemVirtual,
        DownloadableProduct: ProductListItemDownloadable,
        GroupedProduct: ProductListItemGrouped,
        // todo: add a @reachdigital/magento-product-giftcard entity
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore GiftCardProduct is only available in Commerce
        GiftCardProduct: ProductListItemVirtual,
      }}
      {...props}
    />
  )
}
