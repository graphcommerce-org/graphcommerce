import { ProductItemsGridProps } from '@reachdigital/magento-product-types/ProductListItems/ProductListItemsBase'
import RenderType from '@reachdigital/next-ui/RenderType'
import ScrollSnapSlider from '@reachdigital/next-ui/ScrollSnapSlider'
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
    <ScrollSnapSlider nobuttons exPagination={exPagination} setExPagination={setExPagination}>
      {items?.map((item) => {
        if (!item) return null
        return <RenderType key={item.id ?? ''} renderer={renderers} {...item} />
      })}
    </ScrollSnapSlider>
  )
}
