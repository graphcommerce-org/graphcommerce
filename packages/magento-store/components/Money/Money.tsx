import { useQuery } from '@graphcommerce/graphql'
import type { CurrencyFormatProps } from '@graphcommerce/next-ui'
import { CurrencyFormat } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import type { MoneyFragment } from '../../graphql'
import { StoreConfigDocument } from '../../graphql'

type OverridableProps = {
  round?: boolean
  formatOptions?: Omit<CurrencyFormatProps, 'currency'>
  sx?: SxProps<Theme>
}

export type MoneyProps = MoneyFragment & OverridableProps

export function Money(props: MoneyProps) {
  const { currency, value, round = false, formatOptions, sx } = props
  const baseCurrencyCode = useQuery(StoreConfigDocument).data?.storeConfig?.base_currency_code
  const digits = (value ?? 0) % 1 !== 0
  const maximumFractionDigits = round && !digits ? 0 : 2
  const currencyCode = currency ?? baseCurrencyCode ?? ''

  if (typeof value === 'undefined' || value === null) return null

  return (
    <CurrencyFormat
      currency={currencyCode}
      maximumFractionDigits={maximumFractionDigits}
      {...formatOptions}
      value={value}
      sx={sx}
    />
  )
}
