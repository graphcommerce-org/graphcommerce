import { useQuery } from '@apollo/client'
import React, { useMemo } from 'react'
import { MoneyFragment } from './Money.graphql'
import { StoreConfigDocument } from './StoreConfig.graphql'

export default function Money({ currency, value }: MoneyFragment) {
  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale

  const numberFormatter = useMemo(() => {
    if (!currency || !locale) return undefined
    return new Intl.NumberFormat(locale.replace('_', '-'), { style: 'currency', currency })
  }, [locale, currency])

  if (!numberFormatter || !value) return null
  return <>{numberFormatter.format(value)}</>
}
