import { CountryCodeEnum } from '@reachdigital/graphql'
import { AddressMultiLine } from '@reachdigital/magento-customer'
import { CountryRegionsQuery } from '@reachdigital/magento-store'
import React from 'react'
import { CartAddressFragment } from '../CartAddress/CartAddress.gql'

export type CartAddressMultiLineProps = CartAddressFragment & CountryRegionsQuery

export default function CartAddressMultiLine(props: CartAddressMultiLineProps) {
  const { country, countries } = props
  return (
    <AddressMultiLine
      {...props}
      country_code={country.code as CountryCodeEnum}
      countries={countries}
    />
  )
}
