import type { CountryCodeEnum } from '@graphcommerce/graphql-mesh'
import { AddressSingleLine } from '@graphcommerce/magento-customer'
import React from 'react'
import type { CartAddressFragment } from '../CartAddress/CartAddress.gql'

export type CartAddressSingleLineProps = CartAddressFragment & { locale?: CountryCodeEnum }

export function CartAddressSingleLine(props: CartAddressSingleLineProps) {
  const { locale } = props
  return <AddressSingleLine {...props} country_code={locale} />
}
