import { makeStyles, Theme, Typography } from '@material-ui/core'
import { UpsellProductsFragment } from '@reachdigital/magento-product-types/UpsellProducts.gql'
import SidebarSlider from '@reachdigital/next-ui/FramerSlider/variants/SidebarSlider'
import RenderType from '@reachdigital/next-ui/RenderType'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import React from 'react'
import renderers from '../ProductListItems/renderers'
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
            key={item.id ?? ''}
            renderer={renderers}
            classes={{ item: classes.item }}
            {...item}
          />
        ) : null,
      )}
    </SidebarSlider>
  )
}
