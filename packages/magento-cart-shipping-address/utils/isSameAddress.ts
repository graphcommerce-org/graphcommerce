import { CartAddressFragment } from '@graphcommerce/magento-cart/components/CartAddress/CartAddress.gql'

const pluckAddress = ({
  firstname,
  lastname,
  street,
  city,
  country,
  telephone,
  company,
  postcode,
  region,
}: CartAddressFragment): Omit<CartAddressFragment, '__typename'> => ({
  firstname,
  lastname,
  street,
  city,
  country,
  telephone,
  company,
  postcode,
  region,
})

export function isSameAddress(
  address1: CartAddressFragment | null | undefined,
  address2: CartAddressFragment | null | undefined,
) {
  // check if both are undefined/null
  // eslint-disable-next-line eqeqeq
  if (address1 == address2) return true

  // one of the thow is undefined/null the other is defined.
  if (!address1 || !address2) return false

  return JSON.stringify(pluckAddress(address1)) === JSON.stringify(pluckAddress(address2))
}
