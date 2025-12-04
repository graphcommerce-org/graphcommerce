import { useCustomerSession } from '@graphcommerce/magento-customer/hooks/useCustomerSession'
import { permissions } from '@graphcommerce/next-config/config'
import { useStorefrontConfig } from '@graphcommerce/next-ui'

function useCartPermissions() {
  return useStorefrontConfig().permissions?.cart ?? permissions?.cart ?? 'ENABLED'
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
