import { ProductListItemsFragment } from '@graphcommerce/magento-product'
import { RenderType, responsiveVal, SidebarSlider } from '@graphcommerce/next-ui'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import renderers from '../../../ProductListItems/renderers'
import { RowProductFragment } from '../RowProduct.gql'

type SwipeableProps = RowProductFragment & ProductListItemsFragment

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
    name: 'Swipeable',
  },
)

export default function Swipeable(props: SwipeableProps) {
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
