import { CountryCodeEnum } from '@reachdigital/graphql'
import { AddressSingleLine } from '@reachdigital/magento-customer'
import { CountryRegionsQuery } from '@reachdigital/magento-store'
import React from 'react'
import { CartAddressFragment } from '../CartAddress/CartAddress.gql'

export type CartAddressSingleLineProps = CartAddressFragment &
  CountryRegionsQuery & { locale?: CountryCodeEnum }

export default function CartAddressSingleLine(props: CartAddressSingleLineProps) {
  const { countries, locale } = props
  return <AddressSingleLine {...props} country_code={locale} countries={countries} />
}
