// @vitest-environment happy-dom
import type { TypedDocumentNode } from '@graphcommerce/graphql/apollo'
import {
  ApolloClient,
  ApolloLink,
  CombinedGraphQLErrors,
  gql,
  InMemoryCache,
} from '@graphcommerce/graphql/apollo'
import { Observable } from '@graphcommerce/graphql/rxjs'
import { describe, expect, it, vi } from 'vitest'
import { CustomerTokenDocument } from '../hooks/CustomerToken.gql'
import { customerTypePolicies } from '../typePolicies'
import type { PushRouter } from './customerLink'
import { customerLink } from './customerLink'

vi.mock(import('@graphcommerce/next-config/config'), async (importOriginal) => ({
  ...(await importOriginal()),
  magentoVersion: 248,
}))
vi.mock('@lingui/core/macro', () => ({ t: (strings: TemplateStringsArray) => strings.join('') }))

const CustomerOrders = gql`
  query CustomerOrders {
    customer {
      email
    }
  }
` as TypedDocumentNode<Record<string, unknown>>

const AddProductsToCart = gql`
  mutation AddProductsToCart($cartId: String!, $cartItems: [CartItemInput!]!) {
    addProductsToCart(cartId: $cartId, cartItems: $cartItems) {
      cart {
        id
      }
    }
  }
` as TypedDocumentNode<Record<string, unknown>>

const ProductPrices = gql`
  query ProductPrices($context: PrivateContext) {
    products(search: "a") @privateContext(context: $context) {
      total_count
    }
  }
` as TypedDocumentNode<{ products: { total_count: number } }>

const RecaptchaV3Config = gql`
  query RecaptchaV3Config {
    recaptchaV3Config {
      website_key
    }
  }
` as TypedDocumentNode<{ recaptchaV3Config: { website_key: string } }>

const SignIn = gql`
  mutation SignIn($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
` as TypedDocumentNode<Record<string, unknown>>

/** Responds like Magento 2.4.8+ for the customer with the token `new-token`. */
function setup(valid = true) {
  const requests: { operationName: string; authorization?: string }[] = []
  const listeners = new Set<(url: string) => void>()
  const router: PushRouter = {
    locale: undefined,
    push: vi.fn(async () => true),
    events: {
      on: (_event: string, handler: (url: string) => void) => listeners.add(handler),
      off: (_event: string, handler: (url: string) => void) => listeners.delete(handler),
      emit: () => {},
    },
  }

  const magento = new ApolloLink((operation) => {
    const { authorization } = operation.getContext().headers ?? {}
    const { operationName = '' } = operation
    requests.push({ operationName, authorization })

    return new Observable((observer) => {
      if (authorization === 'Bearer expired-token') {
        observer.next({
          errors: [
            {
              message: 'User token has been revoked',
              extensions: { category: 'graphql-authentication' },
            },
          ],
        })
      } else if (operationName === 'SignIn') {
        observer.next({
          errors: [
            {
              message: 'The account sign-in was incorrect',
              extensions: { category: 'graphql-authentication' },
            },
          ],
        })
      } else if (operationName === 'RecaptchaV3Config') {
        observer.next({
          data: { recaptchaV3Config: { __typename: 'ReCaptchaConfigOutput', website_key: 'key' } },
        })
      } else if (operationName === 'ProductPrices') {
        const total_count = authorization ? 2 : 1
        observer.next({ data: { products: { __typename: 'Products', total_count } } })
      } else if (!authorization) {
        observer.next({
          errors: [
            {
              message: "The current customer isn't authorized.",
              extensions: { category: 'graphql-authorization' },
            },
          ],
        })
      } else if (operationName === 'CustomerOrders') {
        observer.next({ data: { customer: { __typename: 'Customer', email: 'a@b.c' } } })
      } else {
        observer.next({ data: { addProductsToCart: { cart: { __typename: 'Cart', id: '1' } } } })
      }
      observer.complete()
    })
  })

  const client = new ApolloClient({
    cache: new InMemoryCache({ typePolicies: customerTypePolicies }),
    link: ApolloLink.from([customerLink(router), magento]),
  })
  client.writeQuery({
    query: CustomerTokenDocument,
    data: {
      customerToken: {
        __typename: 'CustomerToken',
        token: 'expired-token',
        createdAt: null,
        valid,
        xMagentoCacheId: null,
        email: 'a@b.c',
      },
    },
  })

  const navigate = (url: string) => listeners.forEach((listener) => listener(url))
  const signIn = () => {
    client.writeQuery({
      query: CustomerTokenDocument,
      data: {
        customerToken: {
          __typename: 'CustomerToken',
          token: 'new-token',
          createdAt: null,
          valid: true,
          xMagentoCacheId: null,
          email: 'a@b.c',
        },
      },
    })
  }
  const query = () =>
    client.query({ query: CustomerOrders, fetchPolicy: 'network-only', errorPolicy: 'all' })
  const addToCart = () =>
    client.mutate({
      mutation: AddProductsToCart,
      variables: { cartId: '1', cartItems: [{ sku: 'a', quantity: 1 }] },
      errorPolicy: 'all',
    })

  const privateQuery = () =>
    client.query({
      query: ProductPrices,
      variables: { context: { loggedIn: true } },
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    })

  return { client, router, requests, navigate, signIn, query, addToCart, privateQuery }
}

describe('customerLink when Magento rejects the customer token', () => {
  it('opens the sign-in page one time for requests that fail at the same time', async () => {
    const { router, navigate, signIn, query, addToCart } = setup()

    const results = Promise.all([query(), addToCart()])
    await vi.waitFor(() => expect(router.push).toHaveBeenCalled())
    navigate('/account/signin')
    signIn()
    navigate('/p/product')
    await results

    expect(router.push).toHaveBeenCalledTimes(1)
  })

  it('sends a request that started during the sign-in again with the new token', async () => {
    const { router, requests, navigate, signIn, query, addToCart } = setup()

    const first = query()
    await vi.waitFor(() => expect(router.push).toHaveBeenCalled())
    navigate('/account/signin')
    const added = addToCart()
    await vi.waitFor(() =>
      expect(requests).toContainEqual({
        operationName: 'AddProductsToCart',
        authorization: undefined,
      }),
    )
    signIn()
    navigate('/p/product')

    expect((await added).error).toBeUndefined()
    expect((await first).error).toBeUndefined()
    expect(requests).toContainEqual({
      operationName: 'AddProductsToCart',
      authorization: 'Bearer new-token',
    })
  })

  it('returns one sign-in error to each request after a dismiss and does not send them again', async () => {
    const { client, router, requests, navigate, query, addToCart } = setup()

    const first = query()
    await vi.waitFor(() => expect(router.push).toHaveBeenCalled())
    navigate('/account/signin')
    const added = addToCart()
    await vi.waitFor(() =>
      expect(requests.map((r) => r.operationName)).toContain('AddProductsToCart'),
    )
    await new Promise((resolve) => {
      setTimeout(resolve, 10)
    })
    const sent = requests.length
    navigate('/p/product')

    for (const { error } of await Promise.all([first, added])) {
      expect(CombinedGraphQLErrors.is(error)).toBe(true)
      if (!CombinedGraphQLErrors.is(error)) continue
      expect(error.errors.map((err) => err.extensions?.category)).toEqual(['graphql-authorization'])
      expect(error.errors[0].message).toBe('You must be signed in to continue')
    }
    expect(requests).toHaveLength(sent)
    expect(client.cache.readQuery({ query: CustomerTokenDocument })?.customerToken).toBeFalsy()
  })

  it('returns the error of a wrong password in the sign-in form', async () => {
    const { client, router, query } = setup()

    void query()
    await vi.waitFor(() => expect(router.push).toHaveBeenCalled())
    const { error } = await client.mutate({
      mutation: SignIn,
      variables: { email: 'a@b.c', password: 'wrong' },
      errorPolicy: 'all',
    })

    expect(CombinedGraphQLErrors.is(error) && error.errors[0].message).toBe(
      'The account sign-in was incorrect',
    )
    expect(router.push).toHaveBeenCalledTimes(1)
  })

  it('holds a private query during the sign-in and sends it with the new token', async () => {
    const { router, requests, navigate, signIn, query, privateQuery } = setup()

    const first = query()
    await vi.waitFor(() => expect(router.push).toHaveBeenCalled())
    navigate('/account/signin')
    const prices = privateQuery()
    await new Promise((resolve) => {
      setTimeout(resolve, 10)
    })
    signIn()
    navigate('/p/product')

    expect((await prices).data?.products.total_count).toBe(2)
    expect(requests.filter((request) => request.operationName === 'ProductPrices')).toEqual([
      { operationName: 'ProductPrices', authorization: 'Bearer new-token' },
    ])
    await first
  })

  it('returns the sign-in error to a held private query after a dismiss', async () => {
    const { router, requests, navigate, query, privateQuery } = setup()

    void query()
    await vi.waitFor(() => expect(router.push).toHaveBeenCalled())
    navigate('/account/signin')
    const prices = privateQuery()
    navigate('/p/product')
    const { error } = await prices

    expect(CombinedGraphQLErrors.is(error) && error.errors[0].message).toBe(
      'You must be signed in to continue',
    )
    expect(requests.map((request) => request.operationName)).not.toContain('ProductPrices')
  })

  it('sends a token that an earlier page saved with valid: false', async () => {
    const { router, requests, query } = setup(false)

    void query()
    await vi.waitFor(() => expect(router.push).toHaveBeenCalled())

    expect(requests[0]).toEqual({
      operationName: 'CustomerOrders',
      authorization: 'Bearer expired-token',
    })
  })

  it('sends a rejected guest query again without the token', async () => {
    const { client, router, requests } = setup()

    const result = client.query({
      query: RecaptchaV3Config,
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    })
    await vi.waitFor(() =>
      expect(requests).toContainEqual({
        operationName: 'RecaptchaV3Config',
        authorization: undefined,
      }),
    )

    expect((await result).data?.recaptchaV3Config.website_key).toBe('key')
    expect(router.push).toHaveBeenCalledTimes(1)
  })

  it('does not send a rejected mutation as a guest', async () => {
    const { router, requests, navigate, signIn, addToCart } = setup()

    const added = addToCart()
    await vi.waitFor(() => expect(router.push).toHaveBeenCalled())
    await new Promise((resolve) => {
      setTimeout(resolve, 10)
    })
    expect(requests).toEqual([
      { operationName: 'AddProductsToCart', authorization: 'Bearer expired-token' },
    ])
    navigate('/account/signin')
    signIn()
    navigate('/p/product')

    expect((await added).error).toBeUndefined()
  })

  it('sends the new token as soon as the sign-in succeeds', async () => {
    const { router, requests, navigate, signIn, query } = setup()

    const first = query()
    await vi.waitFor(() => expect(router.push).toHaveBeenCalled())
    navigate('/account/signin')
    signIn()
    const second = query()

    await vi.waitFor(() =>
      expect(requests.at(-1)).toEqual({
        operationName: 'CustomerOrders',
        authorization: 'Bearer new-token',
      }),
    )
    navigate('/p/product')
    await Promise.all([first, second])
  })
})
