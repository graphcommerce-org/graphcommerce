'use client'

import {
  ProductListItemsBase,
  ProductItemsGridProps,
  AddProductsToCartForm,
} from '@graphcommerce/magento-product'
import { productListRenderer } from './productListRenderer'

export type ProductListItemsProps = Omit<ProductItemsGridProps, 'renderers'>

export function ProductListItems(props: ProductListItemsProps) {
  return (
    <AddProductsToCartForm>
      <ProductListItemsBase renderers={productListRenderer} {...props} />
    </AddProductsToCartForm>
  )
}
