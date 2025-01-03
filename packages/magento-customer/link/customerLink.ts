import { globalApolloClient } from '@graphcommerce/graphql'
import type { ApolloCache } from '@graphcommerce/graphql/apollo'
import { ApolloLink, fromPromise, onError, setContext } from '@graphcommerce/graphql/apollo'
import type { ErrorCategory } from '@graphcommerce/magento-graphql'
import type { GraphQLFormattedError } from 'graphql'
import type { NextRouter } from 'next/router'
import { signOut } from '../components/SignOutForm/signOut'
import { CustomerTokenDocument } from '../hooks'

export type PushRouter = Pick<NextRouter, 'push' | 'events' | 'locale'>

declare module '@apollo/client' {
  interface DefaultContext {
    cache?: ApolloCache<unknown>
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

function isErrorCategory(err: GraphQLFormattedError, category: ErrorCategory) {
  return err.extensions?.category === category
}

const addTokenHeader = setContext((_, context) => {
  if (!context.headers) context.headers = {}

  try {
    const query = context.cache?.readQuery({ query: CustomerTokenDocument })

    if (query?.customerToken?.token) {
      context.headers.authorization = `Bearer ${query?.customerToken?.token}`
      return context
    }
    return context
  } catch (error) {
    return context
  }
})

const customerErrorLink = (router: PushRouter) =>
  onError((context) => {
    const { graphQLErrors, operation, forward } = context
    const client = globalApolloClient.current
    if (!client) return undefined

    const oldHeaders = operation.getContext().headers
    const authError = graphQLErrors?.find((err) => isErrorCategory(err, 'graphql-authorization'))

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

    return fromPromise(signInAgainPromise).flatMap(() => {
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
    })
  })

export const customerLink = (router: PushRouter) =>
  ApolloLink.from([addTokenHeader, customerErrorLink(router)])
