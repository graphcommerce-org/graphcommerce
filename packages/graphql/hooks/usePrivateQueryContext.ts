/* eslint-disable @typescript-eslint/no-unused-vars */
import type { MeshContext, PrivateContext } from '@graphcommerce/graphql-mesh'
import type { ApolloClient } from '@apollo/client'

/** Get the private context in GraphQL Mesh. */
export function getPrivateQueryContextMesh(
  _context: MeshContext & { headers?: Record<string, string | undefined> },
): PrivateContext | null {
  return null
}

/** Get the private context from the apollo client. */
export function getPrivateQueryContext(_client: ApolloClient): PrivateContext | null {
  return null
}

/**
 * Defines a method to handle the current context for the query.
 *
 * Other plugins should be able to define their own scopes and create a plugin on this method to
 * augment the specific scope.
 *
 * Note: ONLY return a value if the frontend should use the privateContext directive.
 */
export const usePrivateQueryContext = (): PrivateContext | null => null
