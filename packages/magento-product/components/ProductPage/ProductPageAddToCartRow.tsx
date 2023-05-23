'use client'

import { Box, SxProps, Theme } from '@mui/material'
import { UseAddProductsToCartActionFragment } from '../AddProductsToCart/UseAddProductsToCartAction.gql'

export type ProductPageAddToCartRowProps = {
  sx?: SxProps<Theme>
  children: React.ReactNode
  after?: React.ReactNode
  product: UseAddProductsToCartActionFragment
}

export function ProductPageAddToCartRow(props: ProductPageAddToCartRowProps) {
  const { sx, children, after, product } = props
  return (
    <>
      <Box
        sx={[
          (theme) => ({ display: 'flex', alignItems: 'start', columnGap: theme.spacings.xs }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {children}
      </Box>
      {after && <Box>{after}</Box>}
    </>
  )
}

/**
 * ProductPageAddToCartActionsRow is a re-export of the ProductPageAddToCartRow which creates a
 * component that can accept plugins for the product page.
 */
export const ProductPageAddToCartActionsRow = ProductPageAddToCartRow

/**
 * ProductPageAddToCartQuantityRow is a re-export of the ProductPageAddToCartRow which creates a
 * component that can accept plugins for the product page.
 */
export const ProductPageAddToCartQuantityRow = ProductPageAddToCartRow
