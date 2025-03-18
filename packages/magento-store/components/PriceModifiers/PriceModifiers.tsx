import type { CurrencyEnum } from '@graphcommerce/graphql-mesh'
import { PriceModifierOptionValue, PriceModifierRow } from './CartItemOption'

export type PriceModifierItem = {
  key: string
  label: React.ReactNode
  secondary?: React.ReactNode
  quantity?: number
  price?: number
}

export type PriceModifier = {
  key: string
  label?: React.ReactNode
  items: PriceModifierItem[]
}

export type PriceModifiersProps = {
  row_total: number
  currency: CurrencyEnum | null | undefined
  modifiers: PriceModifier[]
}

export function sumPriceModifiers(modifiers: PriceModifier[]) {
  return modifiers.reduce(
    (price, mod) =>
      price +
      mod.items.reduce(
        (itemPrice, item) => itemPrice + (item.price ?? 0) * (item.quantity ?? 1),
        0,
      ),
    0,
  )
}

export function PriceModifiersTable(props: PriceModifiersProps) {
  const { row_total, currency, modifiers: modifications } = props
  const basePrice = row_total - sumPriceModifiers(modifications)

  return (
    <>
      {basePrice > 0 && (
        <PriceModifierOptionValue
          label='Base Price'
          price={basePrice}
          currency={currency}
          color='text.primary'
        />
      )}
      {modifications.map((mod) => (
        <PriceModifierRow
          key={mod.key}
          label={mod.label}
          items={mod.items.map(({ key, ...item }) => (
            <PriceModifierOptionValue key={key} {...item} currency={currency} />
          ))}
        />
      ))}
    </>
  )
}
