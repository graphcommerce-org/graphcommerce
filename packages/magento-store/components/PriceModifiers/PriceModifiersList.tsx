import { sumPriceModifiers, type PriceModifiersProps } from './PriceModifiers'
import { PriceModifierListChildItem } from './PriceModifiersListChildItem'
import { PriceModifierListItem } from './PriceModifiersListItem'

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
export function PriceModifiersList(props: PriceModifiersProps) {
  const { total: row_total, currency, modifiers, label } = props
  const basePrice = row_total - sumPriceModifiers(modifiers)

  const sortedModifiers = [...modifiers].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))

  if (modifiers.length === 0) return null

  return (
    <>
      {basePrice > 0 && basePrice !== row_total && (
        <PriceModifierListChildItem
          key='base-price'
          label={label}
          amount={basePrice}
          currency={currency}
          color='text.primary'
        />
      )}
      {sortedModifiers.map((mod) => (
        <PriceModifierListItem key={mod.key} label={mod.label} items={mod.items} />
      ))}
    </>
  )
}
