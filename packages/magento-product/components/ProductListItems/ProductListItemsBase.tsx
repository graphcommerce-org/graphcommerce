import { Maybe } from '@graphcommerce/graphql'
import { RenderType, UseStyles, responsiveVal } from '@graphcommerce/next-ui'
import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx'
import React from 'react'
import { ProductListItemFragment } from '../../Api/ProductListItem.gql'
import { ProductListItemProps } from '../ProductListItem'
import { ProductListItemRenderer } from './renderer'

export const useStyles = makeStyles(
  (theme: Theme) => ({
    productList: {
      display: 'grid',
      gridColumnGap: theme.spacings.sm,
      gridRowGap: theme.spacings.md,
      gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 360)}, 1fr))`,
    },
    productListsmall: {
      gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 280)}, 1fr))`,
    },
  }),
  { name: 'ProductList' },
)

export type ProductItemsGridProps = {
  items?:
    | Array<(ProductListItemFragment & ProductListItemProps) | null | undefined>
    | null
    | undefined
  renderers: ProductListItemRenderer
  loadingEager?: number
  size?: 'normal' | 'small'
} & UseStyles<typeof useStyles> &
  JSX.IntrinsicElements['div']

export default function ProductListItemsBase(props: ProductItemsGridProps) {
  const { items, renderers, loadingEager = 0, size, ...divProps } = props
  const classes = useStyles(props)

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
            loading={loadingEager > idx ? 'eager' : 'lazy'}
            sizes={
              size === 'small'
                ? { 0: '100vw', 354: '50vw', 675: '30vw', 1255: '23vw', 1500: '337px' }
                : { 0: '100vw', 367: '48vw', 994: '30vw', 1590: '23vw', 1920: '443px' }
            }
            noReport
          />
        ) : null,
      )}
    </div>
  )
}
