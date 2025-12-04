import { format } from 'path'
import { useQuery } from '@graphcommerce/graphql'
import type { CurrencyFormatProps } from '@graphcommerce/next-ui'
import { CurrencyFormat, NumberFormat } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import type { MoneyFragment } from '../../graphql'
import { StoreConfigDocument } from '../../graphql'

type OverridableProps = {
  round?: boolean
  formatOptions?: Omit<CurrencyFormatProps, 'currency'>
  sx?: SxProps<Theme>
  asNumber?: boolean
}

export type MoneyProps = MoneyFragment & OverridableProps

export function Money(props: MoneyProps) {
  const { currency, value, round = false, sx, formatOptions, asNumber } = props
  const baseCurrencyCode =
    useQuery(StoreConfigDocument).data?.storeConfig?.default_display_currency_code
  const digits = (value ?? 0) % 1 !== 0
  const maximumFractionDigits = round && !digits ? 0 : 2
  const currencyCode = currency ?? baseCurrencyCode ?? ''

  if (typeof value === 'undefined' || value === null) return null

  if (asNumber)
    return (
      <NumberFormat
        minimumFractionDigits={2}
        maximumFractionDigits={maximumFractionDigits}
        value={value}
        {...formatOptions}
        numberStyle='decimal'
      />
    )
  return (
    <CurrencyFormat
      currency={currencyCode}
      maximumFractionDigits={maximumFractionDigits}
      currencyDisplay='narrowSymbol'
      {...formatOptions}
      value={value}
      sx={sx}
    />
  )
}
