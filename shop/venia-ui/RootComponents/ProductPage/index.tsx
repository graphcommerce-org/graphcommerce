import React from 'react'
import { GetProductPageProps } from './getProductProps'

/**
 * Replaces RootComponents/Product
 * https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/RootComponents/Product/product.js
 */
const ProductPage: React.FC<GetProductPageProps> = ({ products }) => {
  const { meta_title } = products.items[0]
  return <>{meta_title}</>
}

export default ProductPage
