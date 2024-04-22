import { LazyHydrate, RenderType, extendableComponent, responsiveVal } from '@graphcommerce/next-ui'
import { Box, BoxProps } from '@mui/material'
import { ProductListItemFragment } from '../../Api/ProductListItem.gql'
import { AddProductsToCartForm } from '../../index'
import { ProductListItemProps } from '../ProductListItem/ProductListItem'
import { ProductListItemRenderer } from './renderer'

type ComponentState = {
  size?: 'normal' | 'small'
}

export type ProductItemsGridProps = {
  items?:
    | Array<(ProductListItemFragment & ProductListItemProps) | null | undefined>
    | null
    | undefined
  renderers: ProductListItemRenderer
  loadingEager?: number
  title: string
  sx?: BoxProps['sx']
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
  } = props

  const classes = withState({ size })

  return (
    <AddProductsToCartForm>
      <Box
        className={classes.root}
        sx={[
          (theme) => ({
            display: 'grid',
            gridColumnGap: theme.spacings.md,
            gridRowGap: theme.spacings.md,

            '&.sizeSmall': {
              gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 280)}, 1fr))`,
            },
            '&.sizeNormal': {
              gridTemplateColumns: {
                xs: `repeat(2, 1fr)`,
                md: `repeat(3, 1fr)`,
                lg: `repeat(4, 1fr)`,
              },
            },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {items?.map((item, idx) =>
          item ? (
            <LazyHydrate key={item.uid ?? ''} hydrated={loadingEager > idx ? true : undefined}>
              <RenderType
                renderer={renderers}
                sizes={
                  size === 'small'
                    ? { 0: '100vw', 354: '50vw', 675: '30vw', 1255: '23vw', 1500: '337px' }
                    : { 0: '100vw', 367: '48vw', 994: '30vw', 1590: '23vw', 1920: '443px' }
                }
                {...item}
                loading={loadingEager > idx ? 'eager' : 'lazy'}
                titleComponent={titleComponent}
                onClick={onClick}
                noReport
              />
            </LazyHydrate>
          ) : null,
        )}
      </Box>
    </AddProductsToCartForm>
  )
}
