import AddressMultiLine from '@reachdigital/magento-customer/AddressMultiLine'
import { CountryRegionsQuery } from '@reachdigital/magento-store'
import React from 'react'
import { CartAddressFragment } from '../CartAddress/CartAddress.gql'

type CartAddressMultiLineProps = CartAddressFragment & CountryRegionsQuery

export default function CartAddressMultiLine(props: CartAddressMultiLineProps) {
  const { country, countries } = props
  return <AddressMultiLine {...props} country_code={country.code} countries={countries} />
}
