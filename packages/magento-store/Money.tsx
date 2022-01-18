import { useQuery } from '@apollo/client'
import React, { useMemo } from 'react'
import { MoneyFragment } from './Money.gql'
import { StoreConfigDocument } from './StoreConfig.gql'

export type MoneyProps = MoneyFragment & { round?: boolean }

export function Money({ currency, value, round = false }: MoneyProps) {
  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale

  const digits = round && (value ?? 0) % 1 === 0

  const numberFormatter = useMemo(() => {
    if (!locale) return undefined

    return new Intl.NumberFormat(locale.replace('_', '-'), {
      style: 'currency',
      currency: currency ?? config?.storeConfig?.base_currency_code ?? '',
      ...(digits && { minimumFractionDigits: 0 }),
    })
  }, [config?.storeConfig?.base_currency_code, currency, digits, locale])

  if (!numberFormatter || !value) return null

  return <>{numberFormatter.format(value)}</>
}
