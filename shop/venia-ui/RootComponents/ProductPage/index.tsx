import React from 'react'
import MagentoDynamic from 'shop/venia-ui/MagentoDynamic/MagentoDynamic'
import { GetProductPageProps } from './getProductProps'

const ProductPage: React.FC<GetProductPageProps> = ({ product }) => {
  const { name, description } = product

  return (
    <MagentoDynamic
      loader={() => import('@magento/venia-ui/lib/components/ProductFullDetail')}
      skeleton={(ref) => <div ref={ref}>hoi</div>}
      product={product}
    />
  )
}

export default ProductPage
