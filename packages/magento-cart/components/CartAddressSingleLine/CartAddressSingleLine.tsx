import type { CountryCodeEnum } from '@graphcommerce/graphql-mesh'
import { AddressSingleLine } from '@graphcommerce/magento-customer'
import React from 'react'
import type { CartAddressFragment } from '../CartAddress/CartAddress.gql'

export type CartAddressSingleLineProps = CartAddressFragment & { locale?: CountryCodeEnum }

/** @public */
export function CartAddressSingleLine(props: CartAddressSingleLineProps) {
  const { locale, custom_attributes = [], ...rest } = props
  return (
    <AddressSingleLine {...rest} country_code={locale} custom_attributesV2={custom_attributes} />
  )
}
