import type { CurrencySymbolProps } from '@graphcommerce/next-ui'
import { CurrencySymbol, ListFormat, nonNullable } from '@graphcommerce/next-ui'
import type { StoreSwitcherStore } from './useStoreSwitcher'

export type StoreSwitcherStoreCurrenciesProps = {
  showCurrencies?: number
  store: StoreSwitcherStore
  brackets?: boolean
  variant?: CurrencySymbolProps['variant']
}

export function StoreSwitcherStoreCurrencies(props: StoreSwitcherStoreCurrenciesProps) {
  const { store, showCurrencies = 0, brackets = false, variant } = props

  const currencies = (store.currency?.available_currency_codes ?? [])?.filter(nonNullable)

  const show = currencies.length <= showCurrencies
  const list = (
    <ListFormat listStyle='short' type='unit'>
      {currencies.map((currency) => (
        <CurrencySymbol
          key={currency}
          compactDisplay='short'
          variant={variant}
          currency={currency}
        />
      ))}
    </ListFormat>
  )

  if (!show) return null
  if (!brackets) return list
  return <> ({list})</>
}
