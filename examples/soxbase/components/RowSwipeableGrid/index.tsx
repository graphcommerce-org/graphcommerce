import { Theme, Typography, makeStyles } from '@material-ui/core'
import { ProductListItemsFragment } from '@reachdigital/magento-product'
import { SidebarSlider, RenderType, responsiveVal } from '@reachdigital/next-ui'
import React from 'react'
import renderers from '../ProductListItems/renderers'
import { RowSwipeableGridFragment } from './RowSwipeableGrid.gql'

type RowSwipeableGridProps = RowSwipeableGridFragment & ProductListItemsFragment

const useStyles = makeStyles(
  (theme: Theme) => ({
    item: {
      minWidth: responsiveVal(200, 900),
    },
  }),
  {
    name: 'RowSwipeableGrid',
  },
)

export default function RowSwipeableGrid(props: RowSwipeableGridProps) {
  const { title, items } = props
  const classes = useStyles(props)

  if (!items || items.length === 0) return null

  return (
    <SidebarSlider sidebar={<Typography variant='h2'>{title}</Typography>}>
      {items?.map((item) =>
        item ? (
          <RenderType
            key={item.uid ?? ''}
            renderer={renderers}
            {...item}
            classes={{ item: classes.item }}
            imageOnly
          />
        ) : null,
      )}
    </SidebarSlider>
  )
}
