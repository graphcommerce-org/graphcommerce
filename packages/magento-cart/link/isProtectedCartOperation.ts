import { Operation } from '@graphcommerce/graphql'

// todo move to magento-cart
export function isProtectedCartOperation(operation: Operation): boolean {
  const mutations = ['AddProductsToCart'] /* Todo: Determine what operations should be put here */
  return mutations.includes(operation.operationName)
}
