import { Theme, makeStyles } from '@material-ui/core'
import RenderType, { TypeRenderer } from '@reachdigital/next-ui/RenderType'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import clsx from 'clsx'
import React from 'react'
import { ProductListItemProps } from './ProductListItem'
import { ProductListItemsFragment } from './ProductListItems.gql'
import { FilterTypes } from './ProductListItems/filterTypes'

const blockSize = responsiveVal(200, 400)

const useStyles = makeStyles(
  (theme: Theme) => ({
    productList: {
      display: 'grid',
      gridColumnGap: theme.spacings.md,
      gridRowGap: theme.spacings.lg,
      gridTemplateColumns: `repeat(4, minmax(${blockSize}, 1fr))`,
      [theme.breakpoints.between('sm', 'md')]: {
        gridTemplateColumns: `repeat(3, minmax(auto, 1fr))`,
      },
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: `repeat(auto-fill, minmax(${blockSize}, 1fr))`,
      },
    },
  }),
  { name: 'ProductList' },
)

type Items = NonNullable<NonNullable<ProductListItemsFragment['items']>[0]>
type ProductListRenderer = TypeRenderer<Items, { filterTypes: FilterTypes } & ProductListItemProps>

type ProductListItemsParams = ProductListItemsFragment &
  UseStyles<typeof useStyles> &
  JSX.IntrinsicElements['div'] & {
    filterTypes: FilterTypes
    renderers: ProductListRenderer
  }

export default function ProductListItems(props: ProductListItemsParams) {
  const { items, filterTypes, renderers, ...divProps } = props
  const classes = useStyles(props)

  return (
    <div {...divProps} className={clsx(classes.productList, divProps.className)}>
      {items?.map((item) => {
        if (!item) return null
        return (
          <RenderType
            renderer={renderers}
            {...item}
            key={item?.id ?? ''}
            filterTypes={filterTypes}
          />
        )
      })}
    </div>
  )
}
