import { Maybe } from '@graphcommerce/graphql'
import { CartAddressFragment } from '../CartAddress/CartAddress.gql'
import { CustomerFieldsFragment } from './CustomerFields.gql'

export function mergeCartAddresses(
  addresses: Maybe<CartAddressFragment>[],
  customerFields: CustomerFieldsFragment,
): Partial<CartAddressFragment> {
  // const merged = addresses.filter((_) => !!_).reduce((prev, curr) => {
  //   const keys = new Set(Object.keys(prev));

  // }, {} as Partial<CartAddressFragment>)

  return {}
}
