import { permissions } from '@graphcommerce/next-config/config'
import { storefrontConfig } from '@graphcommerce/next-ui'

function getCheckoutPermission(locale: string | undefined) {
  return storefrontConfig(locale)?.permissions?.checkout ?? permissions?.checkout ?? 'ENABLED'
}

export function getCheckoutIsDisabled(locale: string | undefined) {
  return getCheckoutPermission(locale) === 'DISABLED'
}
