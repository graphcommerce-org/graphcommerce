import { magentoVersion } from '@graphcommerce/next-config/config'

/**
 * `CartAddressInput.telephone` is a non-nullable `String!`, but whether a shop actually requires a
 * telephone is a store configuration (`customer/address/telephone_show`). GraphCommerce couldn't
 * read that, so it submitted this placeholder for an empty field — which is how fake phone numbers
 * ended up on orders.
 *
 * Magento only exposes the required-status through `attributesForm`, which was added in 2.4.7. On
 * older versions the placeholder is still the only way to satisfy the schema, so the behavior below
 * is version-gated: it stays exactly as it was on < 2.4.7 and is only dropped where the address
 * attribute metadata can take over.
 */
export const legacyPlaceholderTelephone = '000 - 000 0000'

/** Whether the address attribute metadata (`attributesForm`) is available to drive the field. */
const hasAddressAttributeMetadata = magentoVersion >= 247

/**
 * Reading direction: an address saved before this behavior changed still carries the placeholder.
 * Clear it so the customer is asked for a real number instead of being shown zeroes.
 *
 * On Magento < 2.4.7 the placeholder is still actively submitted, so the value is left alone.
 */
export function stripLegacyPlaceholderTelephone<T extends string | null | undefined>(
  telephone: T,
): T | '' {
  if (!hasAddressAttributeMetadata) return telephone
  return telephone === legacyPlaceholderTelephone ? '' : telephone
}

/**
 * Writing direction: submit an empty string for an empty field and let Magento validate it against
 * the same `is_required` the form renders with.
 *
 * On Magento < 2.4.7 that flag can't be read, so the placeholder is submitted as before — otherwise
 * a shop that requires a telephone would start rejecting a form that never marked the field
 * required.
 */
export function applyLegacyPlaceholderTelephone(telephone: string | null | undefined): string {
  if (!hasAddressAttributeMetadata) return telephone || legacyPlaceholderTelephone
  return telephone || ''
}
