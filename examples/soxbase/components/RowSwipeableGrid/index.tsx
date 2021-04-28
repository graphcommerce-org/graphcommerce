import { Container, Typography } from '@material-ui/core'
import { ProductListItemsFragment } from '@reachdigital/magento-product-types/ProductListItems.gql'
import SidebarSlider from '@reachdigital/next-ui/FramerSlider/variants/SidebarSlider'
import RenderType from '@reachdigital/next-ui/RenderType'
import React from 'react'
import renderers from '../ProductListItems/renderers'
import { RowSwipeableGridFragment } from './RowSwipeableGrid.gql'

type RowSwipeableGridProps = RowSwipeableGridFragment & ProductListItemsFragment

export default function RowSwipeableGrid(props: RowSwipeableGridProps) {
  const { title, items } = props

  if (!items || items.length === 0) return null

  return (
    <SidebarSlider sidebar={<Typography variant='h2'>{title}</Typography>}>
      <Container maxWidth='md'>
        {items?.map((item) =>
          item ? <RenderType key={item.id ?? ''} renderer={renderers} {...item} imageOnly /> : null,
        )}
      </Container>
    </SidebarSlider>
  )
}
