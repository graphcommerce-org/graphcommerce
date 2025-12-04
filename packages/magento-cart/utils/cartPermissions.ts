import { permissions } from '@graphcommerce/next-config/config'
import { storefrontConfig } from '@graphcommerce/next-ui'

/** @public */
function getCartPermissions(locale: string | undefined) {
  return storefrontConfig(locale)?.permissions?.cart ?? permissions?.cart ?? 'ENABLED'
}

/** @public */
export function getCartDisabled(locale: string | undefined) {
  return getCartPermissions(locale) === 'DISABLED'
}

/** @public */
export function getCartGuestEnabled(locale: string | undefined) {
  return getCartPermissions(locale) === 'ENABLED'
}

/** @public */
export function getCartEnabledForUser(locale: string | undefined, loggedIn: () => boolean) {
  if (getCartGuestEnabled(locale)) return true
  if (getCartDisabled(locale)) return false
  return !!loggedIn()
}
