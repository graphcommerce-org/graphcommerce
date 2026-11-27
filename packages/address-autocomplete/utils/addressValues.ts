import type { AddressCountry } from './findRegionId'
import { findRegionId } from './findRegionId'
import type { FormattedAddress } from './formatAddress'

export function addressValues(
  address: FormattedAddress,
  countries?: readonly (AddressCountry | null)[] | null,
) {
  return {
    street: address.street,
    houseNumber: address.houseNumber,
    addition: address.addition,
    postcode: address.postcode,
    city: address.city,
    countryCode: address.country,
    regionId: findRegionId(countries, address),
  }
}
