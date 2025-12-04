import { permissions } from '@graphcommerce/next-config/config'
import { useStorefrontConfig } from '@graphcommerce/next-ui'

function useCustomerAccountPermission() {
  return (
    useStorefrontConfig().permissions?.customerAccount ?? permissions?.customerAccount ?? 'ENABLED'
  )
}

export function useCustomerAccountCanSignIn() {
  return useCustomerAccountPermission() !== 'DISABLED'
}

export function useCustomerAccountCanSignUp() {
  return useCustomerAccountPermission() === 'ENABLED'
}
