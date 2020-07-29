import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import GQLRenderType, { GQLTypeRenderer } from 'components/GQLRenderType'
import { FilterTypeMap } from 'components/ProductListItems/filterTypes'
import { vpCalc, UseStyles } from 'components/Theme'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    productList: {
      display: 'grid',
      gridColumnGap: theme.gridSpacing.column,
      gridRowGap: theme.gridSpacing.gutter,
      gridTemplateColumns: `repeat(auto-fill, minmax(${vpCalc(150, 285)}, 1fr))`,
    },
  }),
  { name: 'ProductList' },
)

type ProductListRenderer = GQLTypeRenderer<
  NonNullable<NonNullable<GQLProductListItemsFragment['items']>[0]>,
  { filterTypeMap: FilterTypeMap }
>

type ProductListItemsParams = GQLProductListItemsFragment &
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
          <GQLRenderType
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
