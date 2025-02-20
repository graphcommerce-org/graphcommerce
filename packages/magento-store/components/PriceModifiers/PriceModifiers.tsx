import type { CurrencyEnum } from '@graphcommerce/graphql-mesh'

export function sumPriceModifiers(modifiers: PriceModifier[]) {
  return modifiers.reduce(
    (price, mod) =>
      price +
      mod.items.reduce(
        (itemPrice, item) => itemPrice + (item.amount ?? 0) * (item.quantity ?? 1),
        0,
      ),
    0,
  )
}

export type PriceModifierItem = {
  key: string
  label: React.ReactNode
  secondary?: React.ReactNode
  quantity?: number
  amount?: number
}

export type PriceModifier = {
  position?: number
  key: string
  label?: React.ReactNode
  items: PriceModifierItem[]
}

export type PriceModifiersProps = {
  label: React.ReactNode
  total: number
  currency: CurrencyEnum | null | undefined
  modifiers: PriceModifier[]
}
