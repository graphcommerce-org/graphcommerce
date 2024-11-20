import { useQuery } from '@graphcommerce/graphql'
import type { CurrencyFormatProps } from '@graphcommerce/next-ui'
import { CurrencyFormat } from '@graphcommerce/next-ui'
import type { MoneyFragment } from './Money.gql'
import { StoreConfigDocument } from './StoreConfig.gql'

type OverridableProps = {
  round?: boolean
  formatOptions?: Omit<CurrencyFormatProps, 'currency'>
}

export type MoneyProps = MoneyFragment & OverridableProps

export function Money(props: MoneyProps) {
  const { currency, value, round = false, formatOptions } = props
  const { data: config } = useQuery(StoreConfigDocument)
  const digits = (value ?? 0) % 1 !== 0

  if (typeof value === 'undefined' || value === null) return null

  return (
    <CurrencyFormat
      currency={currency ?? config?.storeConfig?.base_currency_code ?? ''}
      maximumFractionDigits={round && !digits ? 0 : 2}
      {...formatOptions}
    >
      {value}
    </CurrencyFormat>
  )
}
