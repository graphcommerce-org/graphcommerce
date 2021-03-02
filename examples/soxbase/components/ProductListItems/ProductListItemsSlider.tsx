import { ProductItemsGridProps } from '@reachdigital/magento-product-types/ProductListItems/ProductListItemsBase'
import MultiItemSlider from '@reachdigital/next-ui/FramerSlider/variants/MultiItemSlider'
import RenderType from '@reachdigital/next-ui/RenderType'
import React from 'react'
import renderers from './renderers'

type Props = {
  nobuttons?: boolean
  exPagination?: boolean[]
  setExPagination?: (set: boolean[]) => void
} & React.HTMLAttributes<HTMLDivElement>

export type ProductListItemsProps = Props & Omit<ProductItemsGridProps, 'renderers'>

export default function ProductListItemsSlider(props: ProductListItemsProps) {
  const { items, exPagination, setExPagination } = props
  return (
    <MultiItemSlider>
      {items?.map((item) =>
        item ? <RenderType key={item.id ?? ''} renderer={renderers} {...item} /> : null,
      )}
    </MultiItemSlider>
  )
}
