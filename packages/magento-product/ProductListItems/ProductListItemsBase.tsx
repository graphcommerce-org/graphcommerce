import { Theme, makeStyles } from '@material-ui/core'
import { Maybe } from '@reachdigital/graphql'
import RenderType from '@reachdigital/next-ui/RenderType'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import clsx from 'clsx'
import React from 'react'
import { ProductListItemFragment } from '../Api/ProductListItem.gql'
import { ProductListItemProps } from '../ProductListItem'
import { ProductListItemRenderer } from './renderer'

export const useProductGridStyles = makeStyles(
  (theme: Theme) => ({
    productList: {
      display: 'grid',
      gridColumnGap: theme.spacings.md,
      gridRowGap: theme.spacings.lg,
      gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 360)}, 1fr))`,
    },
    productListsmall: {
      gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 260)}, 1fr))`,
    },
  }),
  { name: 'ProductList' },
)

export type ProductItemsGridProps = {
  items?: Maybe<Array<Maybe<ProductListItemFragment & ProductListItemProps>>>
  renderers: ProductListItemRenderer
  loadingEager?: number
  size?: 'normal' | 'small'
} & UseStyles<typeof useProductGridStyles> &
  JSX.IntrinsicElements['div']

export default function ProductListItemsBase(props: ProductItemsGridProps) {
  const { items, renderers, loadingEager = 0, size, ...divProps } = props
  const classes = useProductGridStyles(props)
  console.log(items)

  return (
    <div
      {...divProps}
      className={clsx(classes.productList, classes[`productList${size}`], divProps.className)}
    >
      {items?.map((item, idx) =>
        item ? (
          <RenderType
            key={item.uid ?? ''}
            renderer={renderers}
            {...item}
            imageProps={{ loading: loadingEager > idx ? 'eager' : 'lazy' }}
          />
        ) : null,
      )}
    </div>
  )
}
