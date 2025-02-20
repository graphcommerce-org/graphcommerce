import { Money, PriceModifiersTable, type PriceModifier } from '@graphcommerce/magento-store'
import { ActionCard, type ActionCardProps } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box } from '@mui/material'
import type { CreditMemoItemFragment } from './CreditMemoItem.gql'

export type CreditMemoItemProps = Omit<ActionCardProps, 'value' | 'image' | 'title'> & {
  item: CreditMemoItemFragment
  priceModifiers?: PriceModifier[]
}

export function CreditMemoItem(props: CreditMemoItemProps) {
  const { item, priceModifiers, size = 'responsive', ...rest } = props
  const { product_name, product_sku, quantity_refunded, product_sale_price, discounts, id } = item

  return (
    <ActionCard
      {...rest}
      value={id}
      sx={(theme) => ({
        '&.ActionCard-root': {
          px: 0,
          py: theme.spacings.xs,
        },
        '& .ActionCard-rootInner': {
          justifyContent: 'space-between',
          alignItems: 'stretch',
        },
        '&.sizeSmall': {
          px: 0,
        },
        '&.sizeResponsive': {
          [theme.breakpoints.down('md')]: { px: 0 },
        },
        '& .ActionCard-end': {
          justifyContent: 'space-between',
        },
        '& .ActionCard-action': {
          pr: 0,
        },
        '& .ActionCard-image': {
          alignSelf: 'flex-start',
        },
        '& .ActionCard-secondaryAction': {
          display: 'grid',
          rowGap: theme.spacings.xs,
          justifyItems: 'start',
        },
        '& .ActionCard-price': {
          pr: 0,
          mb: { xs: 0.5, sm: 0 },
        },
      })}
      size={size}
      title={product_name}
      price={
        <Money
          currency={product_sale_price.currency}
          value={(product_sale_price.value ?? 0) * (quantity_refunded ?? 1)}
        />
      }
      secondaryAction={
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
              mt: 1,
              gap: '10px',
              justifyContent: 'start',
            }}
          >
            {quantity_refunded}
            {' ⨉ '}
            <Money {...product_sale_price} />
          </Box>

          <Box sx={{ mt: 1, color: 'text.secondary' }}>
            <Trans>SKU: {product_sku}</Trans>
          </Box>

          {discounts?.map((discount) => (
            <Box key={discount?.label} sx={{ color: 'text.secondary' }}>
              {discount?.label}: <Money {...discount?.amount} />
            </Box>
          ))}

          {rest.secondaryAction}
        </>
      }
      details={
        <>
          {priceModifiers && priceModifiers.length > 0 && (
            <PriceModifiersTable
              label={<Trans id='Base Price'>Base price</Trans>}
              modifiers={[...priceModifiers]}
              total={product_sale_price.value ?? 0}
              currency={product_sale_price.currency}
            />
          )}
          {rest.details}
        </>
      }
    />
  )
}
