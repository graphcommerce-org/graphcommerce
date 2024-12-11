import { useCustomerSession } from '@graphcommerce/magento-customer/hooks/useCustomerSession'
import { useStorefrontConfig } from '@graphcommerce/next-ui'

function useCartPermissions() {
  return (
    useStorefrontConfig().permissions?.cart ??
    import.meta.graphCommerce.permissions?.cart ??
    'ENABLED'
  )
}

export function useCartEnabled() {
  return useCartPermissions() !== 'DISABLED'
}

export function useCartShouldLoginToContinue() {
  const { loggedIn } = useCustomerSession()
  const permission = useCartPermissions()
  if (permission === 'ENABLED') return false
  return !loggedIn
}
