import { globalApolloClient } from '@graphcommerce/graphql'
import {
  ApolloLink,
  CombinedGraphQLErrors,
  ErrorLink,
  SetContextLink,
} from '@graphcommerce/graphql/apollo'
import { from, switchMap } from '@graphcommerce/graphql/rxjs'
import { magentoVersion } from '@graphcommerce/next-config/config'
import type { GraphQLFormattedError } from 'graphql'
import type { NextRouter } from 'next/router'
import { signOut } from '../components/SignOutForm/signOut'
import { CustomerTokenDocument } from '../hooks'

export type PushRouter = Pick<NextRouter, 'push' | 'events' | 'locale'>

declare module '@apollo/client' {
  interface DefaultContext {
    headers?: Record<string, string>
  }
}

export async function pushWithPromise(router: Pick<NextRouter, 'push' | 'events'>, url: string) {
  try {
    await router.push(url)
  } catch {
    // Router push failed, resolving promise.
    return false
  }

  return new Promise<boolean>((resolve) => {
    function navigatedAwayFromTarget(incoming: string) {
      if (incoming.includes(url)) return
      // Navigated away from target, resolving promise.
      router.events.off('routeChangeComplete', navigatedAwayFromTarget)
      resolve(true)
    }
    function navigatedToTarget(incoming: string) {
      if (incoming.includes(url)) {
        // We are at the destination
        router.events.off('routeChangeComplete', navigatedToTarget)
        router.events.on('routeChangeComplete', navigatedAwayFromTarget)
      } else {
        // Navigated to target, but not the destination, resolving promise.
        resolve(false)
      }
    }
    router.events.on('routeChangeComplete', navigatedToTarget)
  })
}

const addTokenHeader = new SetContextLink((prevContext, operation) => {
  const headers: Record<string, string> = { ...prevContext.headers }

  try {
    const query = operation.client.cache.readQuery({ query: CustomerTokenDocument })

    if (query?.customerToken?.token && query?.customerToken?.valid !== false) {
      headers.authorization = `Bearer ${query?.customerToken?.token}`
    }
    return { headers }
  } catch {
    return { headers }
  }
})

const customerErrorLink = (router: PushRouter) =>
  new ErrorLink(({ error, operation, forward }) => {
    const client = globalApolloClient.current
    if (!client) return undefined

    // Check if this is a GraphQL error
    if (!CombinedGraphQLErrors.is(error)) return undefined

    const oldHeaders = operation.getContext().headers

    const authError = error.errors.find(
      (err: GraphQLFormattedError) =>
        err.extensions?.category ===
        (magentoVersion >= 248 ? 'graphql-authentication' : 'graphql-authorization'),
    )

    /** If the error we're dealing with is not an authorization error, we're done. */
    if (!authError) return undefined

    if (!oldHeaders?.authorization) {
      // console.error(
      //   'No authorization header found in request, but an authorization error was returned, this is a bug. This is the operation:',
      //   operation,
      // )
      return undefined
    }

    const currentToken = client.cache.readQuery({ query: CustomerTokenDocument })?.customerToken
    if (!currentToken) throw Error('We currenly do not have a customer token in the cache.')
    client.writeQuery({
      query: CustomerTokenDocument,
      data: { customerToken: { ...currentToken, valid: false } },
    })

    // After submission of the signIn form, navigate back to the current route.
    // Resolve the promomise.
    // Dependending on the result, either retry the request or clean up the cache.

    const signInAgainPromise = pushWithPromise(router, '/account/signin')

    return from(signInAgainPromise).pipe(
      switchMap(() => {
        const tokenQuery = client.cache.readQuery({ query: CustomerTokenDocument })

        if (tokenQuery?.customerToken?.valid) {
          // Customer is reauthenticated, retrying request.
          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: `Bearer ${tokenQuery?.customerToken?.token}`,
            },
          })
        } else {
          // Customer has not reauthenticated, clearing all customer data.
          signOut(client)
        }

        // retry the request, returning the new observable
        return forward(operation)
      }),
    )
  })

export const customerLink = (router: PushRouter) =>
  ApolloLink.from([addTokenHeader, customerErrorLink(router)])
