import { permissions } from '@graphcommerce/next-config/config'
import { storefrontConfig } from '@graphcommerce/next-ui'

function getCustomerAccountPermission(locale: string | undefined) {
  return (
    storefrontConfig(locale)?.permissions?.customerAccount ??
    permissions?.customerAccount ??
    'ENABLED'
  )
}

export function getCustomerAccountIsDisabled(locale: string | undefined) {
  return getCustomerAccountPermission(locale) === 'DISABLED'
}

export function getCustomerAccountCanSignIn(locale: string | undefined) {
  return getCustomerAccountPermission(locale) !== 'DISABLED'
}
