import { useCustomerSession } from '@graphcommerce/magento-customer/hooks/useCustomerSession'
import { useStorefrontConfig } from '@graphcommerce/next-ui'

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
