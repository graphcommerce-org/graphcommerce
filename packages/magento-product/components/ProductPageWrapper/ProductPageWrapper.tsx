import { Box } from '@mui/material'
import { AddProductsToCartButtonProps } from '../AddProductsToCart'

export type ProductPageWrapperProps = {
  product?: Pick<AddProductsToCartButtonProps, 'product'>
  children?: React.ReactNode
}

export function ProductPageWrapper(props: ProductPageWrapperProps) {
  const { product, children } = props

  return <Box sx={{ position: 'relative', border: '1px solid red' }}>{children}</Box>
}
