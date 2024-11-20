import type { CountryCodeEnum } from '@graphcommerce/graphql-mesh'
import { AddressMultiLine } from '@graphcommerce/magento-customer'
import React from 'react'
import type { CartAddressFragment } from '../CartAddress/CartAddress.gql'

export type CartAddressMultiLineProps = Partial<CartAddressFragment>

export function CartAddressMultiLine(props: CartAddressMultiLineProps) {
  const { country, region, ...addressProps } = props
  return (
    <AddressMultiLine
      {...addressProps}
      country_code={country?.code as CountryCodeEnum}
      region={{ region_code: region?.code, region_id: region?.region_id, region: region?.label }}
    />
  )
}
