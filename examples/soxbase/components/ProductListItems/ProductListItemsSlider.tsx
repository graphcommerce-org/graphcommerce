import { ProductItemsGridProps } from '@reachdigital/magento-product-types/ProductListItems/ProductListItemsBase'
import RenderType from '@reachdigital/next-ui/RenderType'
import ScrollSnapSlider from '@reachdigital/next-ui/ScrollSnapSlider'
import React from 'react'
import renderers from './renderers'

export type ProductListItemsProps = Omit<ProductItemsGridProps, 'renderers'>

export default function ProductListItemsSlider(props: ProductListItemsProps) {
  const { items } = props
  return (
    <ScrollSnapSlider>
      {items?.map((item) => {
        if (!item) return null
        return <RenderType key={item.id ?? ''} renderer={renderers} {...item} />
      })}
    </ScrollSnapSlider>
  )
}
