// @vitest-environment happy-dom

import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from '@graphcommerce/graphql'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterAll, beforeAll, expect, it, vi } from 'vitest'
import { AddProductsToCartForm } from './AddProductsToCartForm'
import { useFormAddProductsToCart } from './useFormAddProductsToCart'

vi.mock('next/router', () => ({
  useRouter: () => ({ locale: 'en', pathname: '/p/[url]', push: vi.fn(), replace: vi.fn() }),
}))
vi.mock('./AddProductsToCartSnackbar', () => ({ AddProductsToCartSnackbar: () => null }))
vi.mock('@graphcommerce/magento-customer/hooks/useCustomerSession', async (importOriginal) => ({
  ...(await importOriginal<object>()),
  useCustomerSession: () => ({ loggedIn: false }),
}))

beforeAll(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
})

afterAll(() => {
  Reflect.deleteProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT')
})

function FormValues() {
  return <output>{JSON.stringify(useFormAddProductsToCart().getValues())}</output>
}

it('keeps the defaultValues of the form', async () => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.empty(),
    defaultOptions: { preview: {} },
  })

  const container = window.document.createElement('div')
  const root = createRoot(container)
  await act(async () =>
    root.render(
      <ApolloProvider client={client}>
        <AddProductsToCartForm
          redirect='added'
          defaultValues={{
            cartItems: [{ sku: 'configurable', quantity: 1, selected_options: ['variant'] }],
          }}
        >
          <FormValues />
        </AddProductsToCartForm>
      </ApolloProvider>,
    ),
  )
  const values: unknown = JSON.parse(container.querySelector('output')?.textContent ?? '{}')
  await act(async () => root.unmount())

  expect(values).toEqual({
    redirect: 'added',
    cartItems: [{ sku: 'configurable', quantity: 1, selected_options: ['variant'] }],
  })
})
