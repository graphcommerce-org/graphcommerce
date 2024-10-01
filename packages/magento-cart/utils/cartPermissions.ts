import { storefrontConfig } from '@graphcommerce/next-ui'

function getCartPermissions(locale: string | undefined) {
  return (
    storefrontConfig(locale)?.permissions?.cart ??
    import.meta.graphCommerce.permissions?.cart ??
    'ENABLED'
  )
}

export function getCartDisabled(locale: string | undefined) {
  return getCartPermissions(locale) === 'DISABLED'
}

export function getCartGuestEnabled(locale: string | undefined) {
  return getCartPermissions(locale) === 'ENABLED'
}

export function getCartEnabledForUser(locale: string | undefined, loggedIn: () => boolean) {
  if (getCartGuestEnabled(locale)) return true
  if (getCartDisabled(locale)) return false
  return !!loggedIn()
}
