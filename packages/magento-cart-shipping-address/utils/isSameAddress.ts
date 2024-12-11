import type { CartAddressFragment } from '@graphcommerce/magento-cart/components/CartAddress/CartAddress.gql'

type PartialNullable<T> = {
  [P in keyof T]?: T[P] | null
}

type AddressSignature = PartialNullable<Omit<CartAddressFragment, '__typename'>>

const comparisonString = (a: AddressSignature) =>
  [
    a.firstname,
    a.lastname,
    ...(a.street ?? []),
    a.city,
    a.country?.code,
    a.company,
    a.postcode,
    a.region?.region_id,
    a.telephone,
  ]
    .filter(Boolean)
    .map((v) => (v ? `${v}`.trim() : ''))
    .join('|')

export function isSameAddress(
  address1: AddressSignature | null | undefined,
  address2: AddressSignature | null | undefined,
) {
  // check if both are undefined/null
  // eslint-disable-next-line eqeqeq
  if (address1 == address2) return true

  // one of the thow is undefined/null the other is defined.
  if (!address1 || !address2) return false

  return comparisonString(address1) === comparisonString(address2)
}
