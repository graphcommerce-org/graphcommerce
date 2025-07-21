import { storefrontConfig } from '@graphcommerce/next-ui'

export function getImmutableBillingAddress(locale: string | undefined) {
  return (
    storefrontConfig(locale)?.permissions?.immutableBillingAddress ??
    import.meta.graphCommerce.permissions?.immutableBillingAddress ??
    false
  )
}
