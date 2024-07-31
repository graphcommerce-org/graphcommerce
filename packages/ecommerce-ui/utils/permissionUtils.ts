import { storefrontConfig } from '@graphcommerce/next-ui'

export function getCustomerAccountIsDisabled(locale: string | undefined) {
  return (
    storefrontConfig(locale)?.permissions?.customerAccount ??
    import.meta.graphCommerce.permissions?.customerAccount === 'DISABLED'
  )
}

export function getCartIsDisabled(locale: string | undefined) {
  return (
    storefrontConfig(locale)?.permissions?.cart ??
    import.meta.graphCommerce.permissions?.cart === 'DISABLED'
  )
}

export function getCheckoutIsDisabled(locale: string | undefined) {
  return (
    storefrontConfig(locale)?.permissions?.checkout ??
    import.meta.graphCommerce.permissions?.checkout === 'DISABLED'
  )
}
