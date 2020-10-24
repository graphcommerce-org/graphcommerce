import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import GQLRenderType, { GQLTypeRenderer } from 'components/GQLRenderType'
import { FilterTypeMap } from 'components/Product/ProductListItems/filterTypes'
import { UseStyles } from 'components/Styles'
import responsiveVal from 'components/Styles/responsiveVal'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    productList: {
      display: 'grid',
      gridColumnGap: theme.spacings.md,
      gridRowGap: theme.spacings.lg,
      gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 340)}, 1fr))`,
      [theme.breakpoints.up('xl')]: {
        '& >.big': {
          gridColumn: 'span 2',
          gridRow: 'span 2;',
        },
        '& .bigimg': {
          height: responsiveVal(180, 960),
        },
      },
    },
  }),
  { name: 'ProductList' },
)

type Items = NonNullable<NonNullable<GQLProductListItemsFragment['items']>[0]>
type ProductListRenderer = GQLTypeRenderer<Items, { filterTypeMap: FilterTypeMap; isbig: boolean }>

type ProductListItemsParams = GQLProductListItemsFragment &
  UseStyles<typeof useStyles> &
  JSX.IntrinsicElements['div'] & {
    filterTypeMap: FilterTypeMap
    renderers: ProductListRenderer
  }

export default function ProductListItems(props: ProductListItemsParams) {
  const { items, filterTypeMap, renderers, ...divProps } = props
  const classes = useStyles(props)
  let big = 3
  let toggle = false

  return (
    <div {...divProps} className={clsx(classes.productList, divProps.className)}>
      {items?.map((item, index) => {
        if (!item) return null
        if (index === big) {
          if (toggle === false) {
            big = index + 7
            toggle = !toggle
          } else {
            big = index + 11
            toggle = !toggle
          }
        }

        return (
          <GQLRenderType
            renderer={renderers}
            {...item}
            key={item?.id ?? ''}
            filterTypeMap={filterTypeMap}
            isbig={index + 1 === big}
          />
        )
      })}
    </div>
  )
}
