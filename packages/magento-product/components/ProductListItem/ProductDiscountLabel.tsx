import { PercentFormat } from '@graphcommerce/next-ui'
import type { BoxProps } from '@mui/material'
import { Box } from '@mui/material'
import type { ProductListItemFragment } from '../../Api/ProductListItem.gql'

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
          <PercentFormat maximumFractionDigits={0} value={discount / 100} />
        </Box>
      )}
    </>
  )
}
