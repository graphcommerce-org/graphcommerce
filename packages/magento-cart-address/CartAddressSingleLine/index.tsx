import { CountryCodeEnum } from '@graphcommerce/graphql'
import { AddressSingleLine } from '@graphcommerce/magento-customer'
import React from 'react'
import { CartAddressFragment } from '../CartAddress/CartAddress.gql'

export type CartAddressSingleLineProps = CartAddressFragment & { locale?: CountryCodeEnum }

export default function CartAddressSingleLine(props: CartAddressSingleLineProps) {
  const { locale } = props
  return <AddressSingleLine {...props} country_code={locale} />
}
