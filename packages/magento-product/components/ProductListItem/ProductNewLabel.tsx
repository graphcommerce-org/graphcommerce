import { toDate } from '@graphcommerce/next-ui/Intl/DateTimeFormat/toDate'
import { Box, type BoxProps } from '@mui/material'
import type { ProductListItemFragment } from '../../graphql'

export type ProductNewLabelProps = {
  product: Pick<ProductListItemFragment, 'new_from_date' | 'new_to_date'>
} & Omit<BoxProps, 'children'>

export function ProductNewLabel(props: ProductNewLabelProps) {
  const { product, ...boxProps } = props
  const { new_from_date, new_to_date } = product

  const from = toDate(new_from_date)
  const to = toDate(new_to_date)
  const now = new Date()
  if (!from || from > now) return null
  if (to && to < now) return null

  return (
    <Box
      {...boxProps}
      sx={{
        typography: 'caption',
        bgcolor: 'text.primary',
        fontWeight: 'fontWeightBold',
        border: 1,
        borderColor: 'divider',
        padding: '0px 6px',
        color: 'background.default',
        display: 'inline-block',
      }}
    >
      New
    </Box>
  )
}
