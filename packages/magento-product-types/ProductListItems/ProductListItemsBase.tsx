import { Theme, makeStyles } from '@material-ui/core'
import { Maybe } from '@reachdigital/magento-graphql'
import { ProductListItemProps } from '@reachdigital/magento-product/ProductListItem'
import RenderType, { TypeRenderer } from '@reachdigital/next-ui/RenderType'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import clsx from 'clsx'
import React from 'react'
import { ProductListItemRendererFragment } from './ProductListItemRenderer.gql'

export const useProductGridStyles = makeStyles(
  (theme: Theme) => ({
    productList: {
      display: 'grid',
      gridColumnGap: theme.spacings.md,
      gridRowGap: theme.spacings.lg,
      gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 360)}, 1fr))`,
    },
  }),
  { name: 'ProductList' },
)

export type ProductItemsGridProps = {
  items?: Maybe<Array<Maybe<ProductListItemRendererFragment & ProductListItemProps>>>
  renderers: TypeRenderer<ProductListItemRendererFragment, ProductListItemProps>
} & UseStyles<typeof useProductGridStyles> &
  JSX.IntrinsicElements['div']

export default function ProductListItemsBase(props: ProductItemsGridProps) {
  const { items, renderers, ...divProps } = props
  const classes = useProductGridStyles(props)

  return (
    <div {...divProps} className={clsx(classes.productList, divProps.className)}>
      {items?.map((item, idx) =>
        item ? (
          <RenderType
            key={item.id ?? ''}
            renderer={renderers}
            {...item}
            imageProps={{ loading: idx === 0 ? 'eager' : 'lazy' }}
          />
        ) : null,
      )}
    </div>
  )
}
