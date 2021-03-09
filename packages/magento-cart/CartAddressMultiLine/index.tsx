import AddressMultiLine from '@reachdigital/magento-customer/AddressMultiLine'
import React from 'react'
import { CartAddressFragment } from '../cart-address/CartAddress.gql'

function CartAddressMultiLine(props: CartAddressFragment) {
  return <AddressMultiLine {...props} country_code={locale} countries={countries} />
}
