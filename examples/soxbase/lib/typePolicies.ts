import { cartTypePolicies, migrateCart } from '@reachdigital/magento-cart'
import { customerTypePolicies, migrateCustomer } from '@reachdigital/magento-customer'
import { magentoTypePolicies } from '@reachdigital/magento-graphql'

export const policies = [magentoTypePolicies, cartTypePolicies, customerTypePolicies]
export const migrations = [migrateCart, migrateCustomer]
