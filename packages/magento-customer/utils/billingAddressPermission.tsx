import { permissions } from '@graphcommerce/next-config/config'
import { storefrontConfig } from '@graphcommerce/next-ui'

export function getBillingAddressPermission(locale: string | undefined) {
  return (
    storefrontConfig(locale)?.permissions?.billingAddress ??
    permissions?.billingAddress ??
    'EDITABLE'
  )
}
