import type { CurrencyEnum } from '@graphcommerce/graphql-mesh'
import { Box } from '@mui/material'
import { Money } from '../Money/Money'
import type { PriceModifierItem } from './PriceModifiers'

export function PriceModifierListChildItem(
  props: PriceModifierItem & {
    currency?: CurrencyEnum | null | undefined
    color?: 'text.primary' | 'text.secondary'
  },
) {
  const { label, amount = 0, quantity = 1, secondary, currency, color = 'text.secondary' } = props

  return (
    <Box sx={(theme) => ({ display: 'flex', gap: theme.spacings.xxs })}>
      <Box sx={{ color }}>{label}</Box>

      {(quantity > 1 || secondary) && (
        <Box component='span' sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
          {quantity > 1 && (
            <>
              {quantity} &times; <Money value={amount} currency={currency} />
            </>
          )}
          {secondary}
        </Box>
      )}

      {amount !== 0 && amount && (
        <Box sx={(theme) => ({ position: 'absolute', right: theme.spacings.xs })}>
          <Money value={quantity * amount} currency={currency} />
        </Box>
      )}
    </Box>
  )
}
