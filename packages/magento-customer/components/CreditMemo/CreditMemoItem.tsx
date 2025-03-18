import { Money } from '@graphcommerce/magento-store'
import { extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Box, Typography } from '@mui/material'
import type { CreditMemoItemFragment } from './CreditMemoItem.gql'

export type CreditMemoItemProps = {
  item: CreditMemoItemFragment
  additionalInfo?: React.ReactNode
}

const componentName = 'CreditMemoItem'
const parts = ['root', 'itemInfo', 'additionalInfo', 'skuInfo', 'priceInfo'] as const
const { classes } = extendableComponent(componentName, parts)

export function CreditMemoItem(props: CreditMemoItemProps) {
  const { item, additionalInfo } = props
  const { product_name, product_sku, quantity_refunded, product_sale_price, discounts } = item

  return (
    <Box
      className={classes.root}
      sx={(theme) => ({
        display: 'grid',
        gridTemplateColumns: '1fr auto auto',
        gap: theme.spacings.sm,
        padding: `${theme.spacings.xs} 0`,
        borderBottom: `1px solid ${theme.palette.divider}`,
        '&:last-child': {
          borderBottom: 'none',
        },
        alignItems: 'center',
      })}
    >
      <Box className={classes.itemInfo}>
        <Typography variant='subtitle1'>
          {quantity_refunded} ⨉ {product_name}
        </Typography>
        {discounts?.map((discount) => (
          <Typography key={discount?.label} variant='body2' color='textSecondary'>
            {discount?.label}: <Money {...discount?.amount} />
          </Typography>
        ))}
      </Box>
      <Box className={classes.additionalInfo}>
        <Typography className={classes.skuInfo} variant='body2' color='textSecondary'>
          <Trans>SKU: {product_sku}</Trans>
        </Typography>
        {additionalInfo}
      </Box>
      <Box className={classes.priceInfo} sx={{ textAlign: 'right' }}>
        <Money {...product_sale_price} />
      </Box>
    </Box>
  )
}
