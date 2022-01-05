import { ProductListItemsFragment } from '@graphcommerce/magento-product'
import {
  RenderType,
  responsiveVal,
  SidebarSlider,
  SidebarSliderProps,
 makeStyles } from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import React from 'react'
import renderers from '../../../ProductListItems/renderers'
import { RowProductFragment } from '../RowProduct.gql'

type SwipeableProps = RowProductFragment &
  ProductListItemsFragment &
  Pick<SidebarSliderProps, 'classes'>

const useStyles = makeStyles({ name: 'Swipeable' })({
  sidebarTitle: {
    textTransform: 'uppercase',
  },
  scroller: {
    gridAutoColumns: `minmax(${responsiveVal(180, 800)}, 60vh)`,
  },
})

export default function Swipeable(props: SwipeableProps) {
  const { title, items } = props
  const {
    classes: { sidebarTitle, ...classes },
  } = useStyles()

  if (!items || items.length === 0) return null

  return (
    <SidebarSlider
      classes={classes}
      sidebar={
        <Typography variant='h2' className={sidebarTitle}>
          {title}
        </Typography>
      }
    >
      {items?.map((item) =>
        item ? (
          <RenderType
            key={item.uid ?? ''}
            renderer={renderers}
            {...item}
            imageOnly
            sizes={responsiveVal(180, 900)}
          />
        ) : null,
      )}
    </SidebarSlider>
  )
}
