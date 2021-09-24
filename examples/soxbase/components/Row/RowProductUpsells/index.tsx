import { Theme, Typography, makeStyles } from '@material-ui/core'
import { UpsellProductsFragment } from '@graphcommerce/magento-product'
import { SidebarSlider, RenderType, responsiveVal } from '@graphcommerce/next-ui'
import React from 'react'
import renderers from '../../ProductListItems/renderers'
import { RowProductUpsellsFragment } from './RowProductUpsells.gql'

type RowProductUpsellsProps = RowProductUpsellsFragment & UpsellProductsFragment

const useStyles = makeStyles(
  (theme: Theme) => ({
    item: {
      minWidth: responsiveVal(200, 400),
    },
  }),
  { name: 'ProductUpsells' },
)

export default function RowProductUpsells(props: RowProductUpsellsProps) {
  const { title, upsell_products } = props
  const classes = useStyles(props)

  if (!upsell_products || upsell_products.length === 0) return null

  return (
    <SidebarSlider sidebar={<Typography variant='h2'>{title}</Typography>}>
      {upsell_products?.map((item) =>
        item ? (
          <RenderType
            key={item.uid ?? ''}
            renderer={renderers}
            classes={{ item: classes.item }}
            sizes={responsiveVal(200, 400)}
            {...item}
          />
        ) : null,
      )}
    </SidebarSlider>
  )
}
