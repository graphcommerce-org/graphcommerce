import { PercentFormat } from '@graphcommerce/next-ui'
import { Box, BoxProps } from '@mui/material'
import { ProductListItemFragment } from '../../Api/ProductListItem.gql'

export type ProductDiscountLabelProps = Pick<ProductListItemFragment, 'price_range'> &
  Omit<BoxProps, 'children'>

export function ProductDiscountLabel(props: ProductDiscountLabelProps) {
  const { price_range, ...boxProps } = props
  const discount = Math.floor(price_range.minimum_price.discount?.percent_off ?? 0)

  return (
    <>
      {discount > 0 && (
        <Box
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
          {...boxProps}
        >
          <PercentFormat>{discount / 100}</PercentFormat>
        </Box>
      )}
    </>
  )
}
