import AddressSingleLine from '@reachdigital/magento-customer/AddressSingleLine'
import { CountryCodeEnum } from '@reachdigital/magento-graphql'
import React from 'react'
import { CartAddressFragment } from '../CartAddress/CartAddress.gql'
import { CountryRegionsQuery } from '../countries/CountryRegions.gql'

type CartAddressSingleLineProps = CartAddressFragment &
  CountryRegionsQuery & { locale?: CountryCodeEnum }

export default function CartAddressSingleLine(props: CartAddressSingleLineProps) {
  const { countries, locale } = props
  return <AddressSingleLine {...props} country_code={locale} countries={countries} />
}
