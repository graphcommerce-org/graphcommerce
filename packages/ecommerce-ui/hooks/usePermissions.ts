// eslint-disable-next-line import/no-extraneous-dependencies
import { useCustomerSession } from '@graphcommerce/magento-customer/hooks/useCustomerSession'
import { useStorefrontConfig } from '@graphcommerce/next-ui'

export function useCartIsEnabled() {
  const cart =
    useStorefrontConfig().permissions?.cart ?? import.meta.graphCommerce.permissions?.cart
  return !cart || cart === 'ENABLED'
}
export function useCartIsAvailableForUser() {
  const { loggedIn } = useCustomerSession()
  const cart =
    useStorefrontConfig().permissions?.cart ?? import.meta.graphCommerce.permissions?.cart
  return cart !== 'CUSTOMER_ONLY' || loggedIn
}
export function useCartIsDisabled() {
  const cart =
    useStorefrontConfig().permissions?.cart ?? import.meta.graphCommerce.permissions?.cart
  return cart === 'DISABLED'
}

export function useCheckoutIsEnabled() {
  const checkout =
    useStorefrontConfig().permissions?.checkout ?? import.meta.graphCommerce.permissions?.checkout
  return !checkout || checkout === 'ENABLED'
}
export function useCheckoutIsAvailableForUser() {
  const { loggedIn } = useCustomerSession()
  const checkout =
    useStorefrontConfig().permissions?.checkout ?? import.meta.graphCommerce.permissions?.checkout
  return checkout !== 'CUSTOMER_ONLY' || loggedIn
}
export function useCheckoutIsDisabled() {
  const checkout =
    useStorefrontConfig().permissions?.checkout ?? import.meta.graphCommerce.permissions?.checkout
  return checkout === 'DISABLED'
}

export function useCustomerAccountIsEnabled() {
  const customerAccount =
    useStorefrontConfig().permissions?.customerAccount ??
    import.meta.graphCommerce.permissions?.customerAccount
  return !customerAccount || customerAccount === 'ENABLED'
}
export function useCustomerAccountRegistrationDisabled() {
  const customerAccount =
    useStorefrontConfig().permissions?.customerAccount ??
    import.meta.graphCommerce.permissions?.customerAccount
  return !customerAccount || customerAccount === 'DISABLE_REGISTRATION'
}
export function useCustomerAccountIsDisabled() {
  const customerAccount =
    useStorefrontConfig().permissions?.customerAccount ??
    import.meta.graphCommerce.permissions?.customerAccount
  return customerAccount === 'DISABLED'
}
