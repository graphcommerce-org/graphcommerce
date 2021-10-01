import { ProductListItemsFragment } from '@graphcommerce/magento-product'
import { SidebarSlider, RenderType, responsiveVal } from '@graphcommerce/next-ui'
import { Theme, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'
import renderers from '../../ProductListItems/renderers'
import { RowSwipeableGridFragment } from './RowSwipeableGrid.gql'

type RowSwipeableGridProps = RowSwipeableGridFragment & ProductListItemsFragment

const useStyles = makeStyles(
  (theme: Theme) => ({
    title: {
      textTransform: 'uppercase',
    },
    scroller: {
      '& > *': {
        minWidth: responsiveVal(180, 900),
      },
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
    <SidebarSlider
      classes={{ scroller: classes.scroller }}
      sidebar={
        <Typography variant='h3' className={classes.title}>
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
