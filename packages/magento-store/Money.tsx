import { useQuery } from '@apollo/client'
import React, { useMemo } from 'react'
import { MoneyFragment } from './Money.gql'
import { StoreConfigDocument } from './StoreConfig.gql'

export default function Money({ currency, value }: MoneyFragment) {
  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale

  // const val = value ?? 0
  // const digits = val % 1 === 0 && val > 100

  const numberFormatter = useMemo(() => {
    if (!locale) return undefined

    return new Intl.NumberFormat(locale.replace('_', '-'), {
      style: 'currency',
      currency: currency ?? config?.storeConfig?.base_currency_code ?? '',
      // ...(digits && { minimumFractionDigits: 0 }),
    })
  }, [config?.storeConfig?.base_currency_code, currency, locale])

  if (!numberFormatter || !Number.isInteger(value)) return null

  return <>{numberFormatter.format(value ?? 0)}</>
}
