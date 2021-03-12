import AddressMultiLine from '@reachdigital/magento-customer/AddressMultiLine'
import React from 'react'
import { CartAddressFragment } from '../cart-address/CartAddress.gql'
import { CountryRegionsQuery } from '../countries/CountryRegions.gql'

type CartAddressMultiLineProps = CartAddressFragment & CountryRegionsQuery

function CartAddressMultiLine(props: CartAddressMultiLineProps) {
  const { country, countries } = props
  return <AddressMultiLine {...props} country_code={country.code as any} countries={countries} />
}
