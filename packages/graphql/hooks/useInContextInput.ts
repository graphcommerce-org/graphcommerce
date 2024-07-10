import { ApolloClient } from '@apollo/client'
import type { InContextInput } from '@graphcommerce/graphql-mesh'

export function getInContextInput(client: ApolloClient<any>): InContextInput | undefined {
  return {}
}

/**
 * Defines a method to handle the current context for the query.
 *
 * Other plugins should be able to define their own scopes and create a plugin on this method to augment the specific scope.
 *
 * @see @graphcommerce/magento-customer/plugins/magentoCustomerGetInContext.ts
 *
 * Note: ONLY return a value if the frontend should use the inContext directive.
 */
export const useInContextInput = (): InContextInput | undefined => undefined
