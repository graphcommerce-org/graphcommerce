import { extendableComponent, useNumberFormat } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'

const { classes } = extendableComponent('ProductListItem', ['discount'] as const)

export type ProductListItemDiscountProps = {
  percentage?: number
}

export function ProductListItemDiscount(props: ProductListItemDiscountProps) {
  const { percentage = 0 } = props
  const formatter = useNumberFormat({ style: 'percent', maximumFractionDigits: 1 })

  if (!percentage || percentage <= 0) return null
  return (
    <Box
      className={classes.discount}
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
      {formatter.format(percentage / -100)}
    </Box>
  )
}
