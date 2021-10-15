import { RelatedProductsFragment } from '@graphcommerce/magento-product'
import { SidebarSlider, RenderType, responsiveVal } from '@graphcommerce/next-ui'
import { Theme, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import renderers from '../../../ProductListItems/renderers'
import { RowProductFragment } from '../RowProduct.gql'

type RelatedProps = RowProductFragment & RelatedProductsFragment

const useStyles = makeStyles(
  (theme: Theme) => ({
    item: {
      minWidth: responsiveVal(200, 400),
    },
  }),
  { name: 'ProductRelated' },
)

export default function Related(props: RelatedProps) {
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
