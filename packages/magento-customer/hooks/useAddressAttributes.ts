import { useAttributesForm } from '@graphcommerce/magento-store'
import { useMemo } from 'react'

/**
 * The Magento form code that describes the customer address form. Its attribute metadata reflects
 * the `customer/address/*_show` store configuration — most notably
 * `customer/address/telephone_show`, which can be set to required, optional or hidden — and is
 * therefore the authoritative source for which address fields a shop actually requires.
 */
export const addressAttributesFormCode = 'customer_address_edit'

/**
 * Magento's `CartAddressInput.telephone` is a non-nullable `String!`, so a value always has to be
 * sent even when the shop doesn't require a telephone number. Historically GraphCommerce filled in
 * this placeholder, which ends up stored on the order as if it were a real number.
 *
 * It is only used as a last resort now: when the address attribute metadata says a telephone is
 * required the field is rendered as required and an empty value can't be submitted, and when the
 * metadata says it is optional an empty string is sent instead.
 */
export const placeholderTelephone = '000 - 000 0000'

/**
 * Whether Magento requires an address attribute, keyed by attribute code. An attribute that isn't
 * in the map is either not part of the address form or its metadata hasn't loaded yet — callers
 * that use this to relax a fallback should treat `undefined` as "not known yet" rather than as "not
 * required".
 */
export type AddressAttributesRequired = Record<string, boolean | undefined>

/** @see {@link AddressAttributesRequired} */
export function useAddressAttributesRequired(): AddressAttributesRequired {
  const attributes = useAttributesForm({ formCode: addressAttributesFormCode })

  return useMemo(
    () =>
      Object.fromEntries(attributes.map((attribute) => [attribute.code, attribute.is_required])),
    [attributes],
  )
}

/**
 * Whether Magento requires a telephone number on an address, as configured by
 * `customer/address/telephone_show`. Returns `undefined` while the attribute metadata is still
 * loading.
 */
export function useTelephoneRequired(): boolean | undefined {
  return useAddressAttributesRequired().telephone
}
