import { LazyHydrate, RenderType, extendableComponent, responsiveVal } from '@graphcommerce/next-ui'
import { Box, BoxProps, Breakpoint, Theme, useTheme } from '@mui/material'
import { ProductListItemFragment } from '../../Api/ProductListItem.gql'
import { AddProductsToCartForm } from '../AddProductsToCart'
import { ProductListItemProps } from '../ProductListItem/ProductListItem'
import { ProductListItemRenderer } from './renderer'

type ComponentState = {
  size?: 'normal' | 'small'
}

type ColumnConfig = {
  /**
   * The total width of the grid, this is used to provde the correct values to the image sizes prop so the right image size is loaded.
   *
   * @default "calc(100vw - ${theme.page.horizontal} * 2)"
   */
  totalWidth?: string
  /**
   * Gap between the columns/rows
   *
   * @default theme.spacings.md
   */
  gap?: string
  /**
   * Number of columns
   */
  count: number
}

type ColumnsConfig = Partial<Record<Breakpoint, ColumnConfig>>

export type ProductItemsGridProps = {
  items?:
    | Array<(ProductListItemFragment & ProductListItemProps) | null | undefined>
    | null
    | undefined
  renderers: ProductListItemRenderer
  loadingEager?: number
  title: string
  sx?: BoxProps['sx']
  calcColumns?: (theme: Theme) => ColumnsConfig
} & Pick<ProductListItemProps, 'onClick' | 'titleComponent'> &
  ComponentState

const slots = ['root'] as const
const name = 'ProductListItemsBase' as const

const { withState } = extendableComponent<ComponentState, typeof name, typeof slots>(name, slots)

export function ProductListItemsBase(props: ProductItemsGridProps) {
  const {
    items,
    sx = [],
    renderers,
    loadingEager = 0,
    size = 'normal',
    titleComponent,
    onClick,
    calcColumns,
  } = props

  const theme = useTheme()

  const totalWidth = `calc(100vw - ${theme.page.horizontal} * 2)`
  const gap = theme.spacings.md
  let columns = calcColumns?.(theme) ?? {
    xs: { count: 2 },
    md: { count: 3 },
    lg: { count: 4 },
  }

  if (!columns && size === 'small') {
    columns = {
      xs: { gap: theme.spacings.md, count: 2 },
      md: { gap: theme.spacings.md, count: 3 },
      lg: { totalWidth: `${theme.breakpoints.values.xl}px`, gap: theme.spacings.md, count: 4 },
    }
  }

  ///

  const classes = withState({ size })

  return (
    <AddProductsToCartForm>
      <Box
        className={classes.root}
        sx={[
          ...Object.entries(columns ?? {}).map(([key, column]) => ({
            [theme.breakpoints.up(key as Breakpoint)]: {
              gap: column.gap ?? gap,
              // width: totalWidth,
              gridTemplateColumns: `repeat(${column.count}, 1fr)`,
            },
          })),
          (theme) => ({
            display: 'grid',
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {items?.map((item, idx) =>
          item ? (
            <LazyHydrate
              key={item.uid ?? ''}
              hydrated={loadingEager > idx ? true : undefined}
              height={responsiveVal(250, 500)}
            >
              <RenderType
                renderer={renderers}
                sizes={Object.fromEntries(
                  Object.entries(columns ?? {}).map(([key, column]) => {
                    const totalW = column.totalWidth ?? totalWidth
                    const columnGap = column.gap ?? gap
                    return [
                      theme.breakpoints.values[key as Breakpoint],
                      `calc((${totalW} - (${columnGap} * ${column.count - 1})) / ${column.count})`,
                    ]
                  }),
                )}
                {...item}
                loading={loadingEager > idx ? 'eager' : 'lazy'}
                titleComponent={titleComponent}
                onClick={onClick}
              />
            </LazyHydrate>
          ) : null,
        )}
      </Box>
    </AddProductsToCartForm>
  )
}
