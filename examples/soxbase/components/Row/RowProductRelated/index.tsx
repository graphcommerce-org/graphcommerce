import { Theme, Typography, makeStyles } from '@material-ui/core'
import { RelatedProductsFragment } from '@reachdigital/magento-product'
import { SidebarSlider, RenderType, responsiveVal } from '@reachdigital/next-ui'
import React from 'react'
import renderers from '../ProductListItems/renderers'
import { RowProductRelatedFragment } from './RowProductRelated.gql'

type RowProductRelatedProps = RowProductRelatedFragment & RelatedProductsFragment

const useStyles = makeStyles(
  (theme: Theme) => ({
    item: {
      minWidth: responsiveVal(200, 400),
    },
  }),
  { name: 'ProductRelated' },
)

export default function RowProductRelated(props: RowProductRelatedProps) {
  const { title, related_products } = props
  const classes = useStyles(props)

  if (!related_products || related_products.length === 0) return null

  return (
    <SidebarSlider sidebar={<Typography variant='h2'>{title}</Typography>}>
      {related_products?.map((item) =>
        item ? (
          <RenderType
            key={item.uid ?? ''}
            renderer={renderers}
            {...item}
            classes={{ item: classes.item }}
            sizes={responsiveVal(200, 400)}
          />
        ) : null,
      )}
    </SidebarSlider>
  )
}
