import {
  PriceModifierRow,
  PriceModifierValue,
  sumPriceModifiers,
  type PriceModifiersProps,
} from './PriceModifiers'

export type PriceModifiersProps = {
  row_total: number
  currency: CurrencyEnum | null | undefined
  modifiers: PriceModifier[]
}

export function PriceModifiersTable(props: PriceModifiersProps) {
  const { row_total, currency, modifiers } = props
  const basePrice = row_total - sumPriceModifiers(modifiers)

  const sortedModifiers = [...modifiers].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))

  if (modifiers.length === 0) return null

  return (
    <>
      {basePrice > 0 && basePrice !== row_total && (
        <PriceModifierValue
          key='base-price'
          label='Product Price'
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
