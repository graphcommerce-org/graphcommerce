import { LazyHydrate, RenderType, extendableComponent, responsiveVal } from '@graphcommerce/next-ui'
import type { BoxProps, Breakpoint, Theme } from '@mui/material'
import { Box, useTheme } from '@mui/material'
import { AddProductsToCartForm } from '../AddProductsToCart'
import type { ProductListItemProps } from '../ProductListItem/ProductListItem'
import type { ProductListItemsFragment } from './ProductListItems.gql'
import type { ProductListItemRenderer } from './renderer'

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

export type ProductItemsGridProps = ProductListItemsFragment & {
  renderers: ProductListItemRenderer
  loadingEager?: number
  title: string
  sx?: BoxProps['sx']
  columns?: ((theme: Theme) => ColumnsConfig) | ColumnsConfig
  containerRef?: React.Ref<HTMLDivElement>
} & Pick<ProductListItemProps, 'onClick' | 'titleComponent'> &
  ComponentState

const slots = ['root'] as const
const name = 'ProductListItemsBase'

const { withState } = extendableComponent<ComponentState, typeof name, typeof slots>(name, slots)

export function ProductListItemsBase(props: ProductItemsGridProps) {
  const {
    items,
    containerRef,
    sx = [],
    renderers,
    loadingEager = 0,
    size = 'normal',
    titleComponent,
    onClick,
    columns,
  } = props

  const theme = useTheme()

  const totalWidth = `calc(100vw - ${theme.page.horizontal} * 2)`
  const gap = theme.spacings.md

  let columnConfig = typeof columns === 'function' ? columns(theme) : columns

  if (!columnConfig && size === 'small') {
    columnConfig = {
      xs: { count: 2 },
      md: { count: 3 },
      lg: { count: 4, totalWidth: `${theme.breakpoints.values.xl}px` },
    }
  }

  if (!columnConfig) {
    columnConfig = { xs: { count: 2 }, md: { count: 3 }, lg: { count: 4 } }
  }

  const classes = withState({ size })

  return (
    <AddProductsToCartForm>
      <Box
        ref={containerRef}
        className={classes.root}
        sx={[
          ...Object.entries(columnConfig).map(([key, column]) => ({
            [theme.breakpoints.up(key as Breakpoint)]: {
              gap: column.gap ?? gap,
              // width: totalWidth,
              gridTemplateColumns: `repeat(${column.count}, 1fr)`,
            },
          })),
          { display: 'grid' },
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
                  Object.entries(columnConfig ?? {}).map(([key, column]) => {
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
