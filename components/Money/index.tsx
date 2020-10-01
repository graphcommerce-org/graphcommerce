import { useQuery } from '@apollo/client'
import { StoreConfigDocument } from 'generated/documents'
import React, { useMemo } from 'react'

export default function Money({ currency, value }: GQLMoneyFragment) {
  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale

  const numberFormatter = useMemo(() => {
    if (!currency || !locale) return undefined
    return new Intl.NumberFormat(locale.replace('_', '-'), { style: 'currency', currency })
  }, [locale, currency])

  if (!numberFormatter || !value) return null
  return <>{numberFormatter.format(value)}</>
}
