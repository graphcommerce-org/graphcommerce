import { ProductPageDescription, ProductPageDescriptionProps } from '@reachdigital/magento-product'
import ProductDescription from '@reachdigital/next-ui/Row/ProductDescription'
import React, { PropsWithChildren } from 'react'

type RowProductDescriptionProps = PropsWithChildren<ProductPageDescriptionProps>

export default function RowProductPageDescription(props: RowProductDescriptionProps) {
  const { children, name, description } = props

  return (
    <ProductDescription
      name={name}
      description={<ProductPageDescription description={description} />}
    >
      {children}
    </ProductDescription>
  )
}
