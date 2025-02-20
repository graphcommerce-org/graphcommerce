import type { CurrencyEnum } from '@graphcommerce/graphql-mesh'
import { Box } from '@mui/material'
import { Money } from '../Money/Money'
import {
  sumPriceModifiers,
  type PriceModifier,
  type PriceModifierItem,
  type PriceModifiersProps,
} from './PriceModifiers'

export function PriceModifierValue(
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

export function PriceModifierRow(props: PriceModifier) {
  const { label, items } = props

  if (items.length === 0) return null

  return (
    <Box sx={{}}>
      <PriceModifierValue key='price-modifier' label={label} color='text.primary' />
      {items.map(({ key: itemKey, ...item }) => (
        <PriceModifierValue key={itemKey} {...item} color='text.secondary' />
      ))}
    </Box>
  )
}

/**
 * A utility component to display price modifiers in a table format. Used for:
 *
 * Abstracts aways rendering from the price calculations.
 *
 * Renders a base price if it's different from the row total.
 *
 * - `<CartItemActionCard />`
 * - `<OrderItem />`
 * - `<InvoiceItem />`
 * - `<CreditMemoItem />`
 * - `<ShipmentItem />`
 * - `<ReturnItem />`
 */
export function PriceModifiersTable(props: PriceModifiersProps) {
  const { total: row_total, currency, modifiers, label } = props
  const basePrice = row_total - sumPriceModifiers(modifiers)

  const sortedModifiers = [...modifiers].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))

  if (modifiers.length === 0) return null

  return (
    <>
      {basePrice > 0 && basePrice !== row_total && (
        <PriceModifierValue
          key='base-price'
          label={label}
          amount={basePrice}
          currency={currency}
          color='text.primary'
        />
      )}
      {sortedModifiers.map((mod) => (
        <PriceModifierRow key={mod.key} label={mod.label} items={mod.items} />
      ))}
    </>
  )
}
