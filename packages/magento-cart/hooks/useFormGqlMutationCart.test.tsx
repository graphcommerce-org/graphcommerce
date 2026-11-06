// @vitest-environment happy-dom

import type { TypedDocumentNode } from '@apollo/client'
import { ApolloClient, ApolloLink, gql, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { Observable } from 'rxjs'
import { afterAll, beforeAll, expect, it, vi } from 'vitest'
import { CurrentCartIdDocument } from './CurrentCartId.gql'
import { useFormGqlMutationCart } from './useFormGqlMutationCart'

vi.mock('./useCartPermissions', () => ({ useCartShouldLoginToContinue: () => false }))

beforeAll(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
})

afterAll(() => {
  Reflect.deleteProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT')
})

type Variables = { cartId: string }

const document = gql`
  mutation RemoveCouponFromCart($cartId: String!) {
    removeCouponFromCart(input: { cart_id: $cartId }) {
      cart {
        id
      }
    }
  }
` as TypedDocumentNode<Record<string, unknown>, Variables>

async function submitCancelledForm(cartId?: string) {
  const operations: string[] = []
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new ApolloLink((operation) => {
      operations.push(operation.operationName ?? '')
      return new Observable((observer) => {
        observer.next({ data: { createEmptyCart: 'new-cart' } })
        observer.complete()
      })
    }),
    defaultOptions: { preview: {} },
  })
  if (cartId) {
    client.cache.writeQuery({
      query: CurrentCartIdDocument,
      data: { currentCartId: { __typename: 'CurrentCartId', id: cartId, locked: false } },
    })
  }

  const onBeforeSubmit = vi.fn((_variables: Variables): Variables | false => false)
  let submit = async () => {}
  function Form() {
    const form = useFormGqlMutationCart(document, { onBeforeSubmit })
    submit = form.handleSubmit(() => {})
    return null
  }

  const root = createRoot(window.document.createElement('div'))
  await act(async () =>
    root.render(
      <ApolloProvider client={client}>
        <Form />
      </ApolloProvider>,
    ),
  )
  await act(() => submit())
  await act(async () => root.unmount())

  return { variables: onBeforeSubmit.mock.calls[0]?.[0], operations }
}

it('passes the current cart id to onBeforeSubmit', async () => {
  const { variables, operations } = await submitCancelledForm('test-cart')
  expect(variables?.cartId).toBe('test-cart')
  expect(operations).toEqual([])
})

it('passes a new cart id to onBeforeSubmit when there is no cart', async () => {
  const { variables, operations } = await submitCancelledForm()
  expect(variables?.cartId).toBe('new-cart')
  expect(operations).toEqual(['CreateEmptyCart'])
})
