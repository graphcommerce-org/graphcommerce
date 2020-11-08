import { useQuery } from '@apollo/client'
import React, { useMemo } from 'react'
import { MoneyFragment } from './Money.gql'
import { StoreConfigDocument } from './StoreConfig.gql'

export default function Money({ currency, value }: MoneyFragment) {
  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale

  const val = value ?? 0
  // const digits = val % 1 === 0 && val > 100

  const numberFormatter = useMemo(() => {
    if (!currency || !locale) return undefined
    return new Intl.NumberFormat(locale.replace('_', '-'), {
      style: 'currency',
      currency,
      // ...(digits && { minimumFractionDigits: 0 }),
    })
  }, [locale, currency])

  if (!numberFormatter || !value) return null
  return <>{numberFormatter.format(value)}</>
}
