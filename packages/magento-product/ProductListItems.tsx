import { Theme, makeStyles } from '@material-ui/core'
import RenderType, { TypeRenderer } from '@reachdigital/next-ui/RenderType'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import clsx from 'clsx'
import React from 'react'
import { ProductListItemsFragment } from './ProductListItems.gql'
import { FilterTypeMap } from './ProductListItems/filterTypes'

const useStyles = makeStyles(
  (theme: Theme) => ({
    productList: {
      display: 'grid',
      gridColumnGap: theme.spacings.md,
      gridRowGap: theme.spacings.lg,
      gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 285)}, 1fr))`,
    },
  }),
  { name: 'ProductList' },
)

type Items = NonNullable<NonNullable<ProductListItemsFragment['items']>[0]>
type ProductListRenderer = TypeRenderer<Items, { filterTypeMap: FilterTypeMap }>

type ProductListItemsParams = ProductListItemsFragment &
  UseStyles<typeof useStyles> &
  JSX.IntrinsicElements['div'] & {
    filterTypeMap: FilterTypeMap
    renderers: ProductListRenderer
  }

export default function ProductListItems(props: ProductListItemsParams) {
  const { items, filterTypeMap, renderers, ...divProps } = props
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
            filterTypeMap={filterTypeMap}
          />
        )
      })}
    </div>
  )
}
