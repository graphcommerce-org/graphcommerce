import type { ApolloClient } from '@graphcommerce/graphql/apollo'
import {
  ApolloLink,
  CombinedGraphQLErrors,
  ErrorLink,
  SetContextLink,
} from '@graphcommerce/graphql/apollo'
import { from, of, switchMap } from '@graphcommerce/graphql/rxjs'
import { magentoVersion } from '@graphcommerce/next-config/config'
import { t } from '@lingui/core/macro'
import { GraphQLError } from 'graphql'
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

/** One sign-in for each client. It resolves to the new token, or to null after a dismiss. */
const signIns = new WeakMap<ApolloClient, Promise<string | null>>()

const customerErrorLink = (router: PushRouter) =>
  new ErrorLink(({ error, operation, forward }) => {
    if (!CombinedGraphQLErrors.is(error)) return undefined

    const { client } = operation
    const oldHeaders = operation.getContext().headers
    const customerToken = client.cache.readQuery({ query: CustomerTokenDocument })?.customerToken
    const categories = error.errors.map((err) => err.extensions?.category)

    const tokenRejected =
      !!oldHeaders?.authorization &&
      categories.includes(
        magentoVersion >= 248 ? 'graphql-authentication' : 'graphql-authorization',
      )

    // `addTokenHeader` sent the request without the expired token.
    const customerRequired =
      !oldHeaders?.authorization &&
      customerToken?.valid === false &&
      categories.includes('graphql-authorization')

    if (!tokenRejected && !customerRequired) return undefined

    if (tokenRejected) {
      if (!customerToken) throw Error('We currently do not have a customer token in the cache.')
      client.writeQuery({
        query: CustomerTokenDocument,
        data: { customerToken: { ...customerToken, valid: false } },
      })
    }

    let signIn = signIns.get(client)
    if (!signIn) {
      signIn = pushWithPromise(router, '/account/signin').then(() => {
        signIns.delete(client)
        const token = client.cache.readQuery({ query: CustomerTokenDocument })?.customerToken
        if (token?.valid && token.token) return token.token
        signOut(client)
        return null
      })
      signIns.set(client, signIn)
    }

    // Magento did not run a request that it rejected, so it is safe to send it again.
    return from(signIn).pipe(
      switchMap((token) => {
        if (!token) {
          return of({
            data: null,
            errors: [
              new GraphQLError(t`You must be signed in to continue`, {
                extensions: { category: 'graphql-authorization' },
              }),
            ],
          })
        }
        operation.setContext({ headers: { ...oldHeaders, authorization: `Bearer ${token}` } })
        return forward(operation)
      }),
    )
  })

export const customerLink = (router: PushRouter) =>
  ApolloLink.from([addTokenHeader, customerErrorLink(router)])
