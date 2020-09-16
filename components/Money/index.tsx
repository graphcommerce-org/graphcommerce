import { useStoreConfigQuery } from 'generated/apollo'
import React, { useMemo } from 'react'

export default function Money({ currency, value }: GQLMoneyFragment) {
  const { data: config } = useStoreConfigQuery()
  const locale = config?.storeConfig?.locale

  const numberFormatter = useMemo(() => {
    if (!currency || !locale) return undefined
    return new Intl.NumberFormat(locale.replace('_', '-'), { style: 'currency', currency })
  }, [locale, currency])

  if (!numberFormatter || !value) return null
  return <>{numberFormatter.format(value)}</>
}
