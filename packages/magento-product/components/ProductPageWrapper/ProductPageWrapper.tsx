import { Box } from '@mui/material'
import { AddProductsToCartButtonProps } from '../AddProductsToCart'

export type ProductPageWrapperProps = {
  children?: React.ReactNode
}

export function ProductPageWrapper(props: ProductPageWrapperProps) {
  const { children } = props

  return <Box>{children}</Box>
}
