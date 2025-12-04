import { permissions } from '@graphcommerce/next-config/config'
import { useStorefrontConfig } from '@graphcommerce/next-ui'

export function useBillingAddressPermission() {
  return (
    useStorefrontConfig().permissions?.billingAddress ?? permissions?.billingAddress ?? 'EDITABLE'
  )
}
