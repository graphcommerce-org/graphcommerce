// eslint-disable-next-line import/no-extraneous-dependencies
import { useCustomerSession } from '@graphcommerce/magento-customer/hooks/useCustomerSession'
import { useStorefrontConfig } from '@graphcommerce/next-ui'

function useCartPermissions() {
  return 'CUSTOMER_ONLY'
  return (
    useStorefrontConfig().permissions?.cart ??
    import.meta.graphCommerce.permissions?.cart ??
    'ENABLED'
  )
}

// export function useCartIsAvailableForUser() {
//   const { loggedIn } = useCustomerSession()
//   const cart = useCartPermissions()
//   return cart !== 'CUSTOMER_ONLY' || loggedIn
// }

// export function useCartIsDisabled() {
//   const cart =
//     useStorefrontConfig().permissions?.cart ?? import.meta.graphCommerce.permissions?.cart
//   return cart === 'DISABLED'
// }
export function useCartEnabled() {
  return useCartPermissions() !== 'DISABLED'
}

export function useCartGuestEnabled() {
  return useCartPermissions() === 'ENABLED'
}

export function useCartShouldLoginToContinue() {
  const { loggedIn } = useCustomerSession()
  const permission = useCartPermissions()
  if (permission === 'ENABLED') return false
  return !loggedIn
}

function useCheckoutPermission() {
  return (
    useStorefrontConfig().permissions?.checkout ??
    import.meta.graphCommerce.permissions?.checkout ??
    'ENABLED'
  )
}

export function useCheckoutGuestEnabled() {
  return useCheckoutPermission() === 'ENABLED'
}

export function useCheckoutShouldLoginToContinue() {
  const { loggedIn } = useCustomerSession()
  const permission = useCheckoutPermission()
  if (permission === 'ENABLED') return false
  return !loggedIn
}

function useCustomerAccountPermission() {
  return (
    useStorefrontConfig().permissions?.customerAccount ??
    import.meta.graphCommerce.permissions?.customerAccount ??
    'ENABLED'
  )
}

export function useCustomerAccountCanSignIn() {
  return useCustomerAccountPermission() !== 'DISABLED'
}

export function useCustomerAccountCanSignUp() {
  // return false
  return useCustomerAccountPermission() === 'ENABLED'
}

export function useCustomerAccountRegistrationDisabled() {
  return useCustomerAccountPermission() !== 'ENABLED'
}
