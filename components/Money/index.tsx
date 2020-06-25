import React from 'react'

export default function Money(props: GQLMoneyFragment) {
  const { currency, value } = props

  const numberFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency })
  return <>{numberFormatter.format(value)}</>
}
