import { cartTypePolicies, migrateCart } from '@graphcommerce/magento-cart'
import { customerTypePolicies, migrateCustomer } from '@graphcommerce/magento-customer'
import { magentoTypePolicies } from '@graphcommerce/magento-graphql'

export const policies = [magentoTypePolicies, cartTypePolicies, customerTypePolicies]
export const migrations = [migrateCart, migrateCustomer]
