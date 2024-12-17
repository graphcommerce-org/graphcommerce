import type { PrivateContext } from '@graphcommerce/graphql-mesh'
import type { ApolloClient } from '@apollo/client'

export function getPrivateQueryContext(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  client: ApolloClient<any>,
): PrivateContext | null {
  return null
}

/**
 * Defines a method to handle the current context for the query.
 *
 * Other plugins should be able to define their own scopes and create a plugin on this method to augment the specific scope.
 *
 * @see @graphcommerce/magento-customer/plugins/magentoCustomerGetInContext.ts
 *
 * Note: ONLY return a value if the frontend should use the privateContext directive.
 */
export const usePrivateQueryContext = (): PrivateContext | null => null
