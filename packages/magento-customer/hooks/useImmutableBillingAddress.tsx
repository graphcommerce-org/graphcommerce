import { useStorefrontConfig } from '@graphcommerce/next-ui'

export function useImmutableBillingAddress() {
  return (
    useStorefrontConfig().permissions?.immutableBillingAddress ??
    import.meta.graphCommerce.permissions?.immutableBillingAddress ??
    false
  )
}
