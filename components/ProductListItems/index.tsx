import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core'
import { vpCalc, UseStyles } from 'components/Theme'
import clsx from 'clsx'
import { FilterTypeMap } from 'components/ProductListItems/filterTypes'
import ProductListItemSimple from 'components/ProductTypeSimple/ProductListItemSimple'
import ProductListItemConfigurable from '../ProductTypeConfigurable/ProductListItemConfigurable'

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

type ProductListItemsParams = GQLProductListItemsFragment &
  UseStyles<typeof useStyles> &
  JSX.IntrinsicElements['div'] & {
    filterTypeMap: FilterTypeMap
  }

export default function ProductListItems(props: ProductListItemsParams) {
  const { items, filterTypeMap, ...divProps } = props
  const classes = useStyles(props)

  return (
    <div {...divProps} className={clsx(classes.productList, divProps.className)}>
      {items.map((item) => {
        switch (item.__typename) {
          case 'ConfigurableProduct':
            return (
              <ProductListItemConfigurable {...item} key={item.id} filterTypeMap={filterTypeMap} />
            )
          case 'SimpleProduct':
            return <ProductListItemSimple {...item} key={item.id} />
          default:
            return <div>${item.__typename}</div>
        }
      })}
    </div>
  )
}
