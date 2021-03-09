import AddressSingleLine from '@reachdigital/magento-customer/AddressSingleLine'
import React from 'react'
import { CartAddressFragment } from '../cart-address/CartAddress.gql'

function CartAddressSingleLine(props: CartAddressFragment) {
  return <AddressSingleLine {...props} country_code={locale} countries={countries} />
}
