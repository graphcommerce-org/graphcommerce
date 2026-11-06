// @vitest-environment happy-dom

import type { CartStartCheckoutProps } from '@graphcommerce/magento-cart'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterAll, beforeAll, expect, it, vi } from 'vitest'
import { CartStartCheckout } from './GoogleDatalayerCartStartCheckout'

const sendEvent = vi.hoisted(() => vi.fn())
vi.mock('../hooks/useSendEvent', () => ({ useSendEvent: () => sendEvent }))

beforeAll(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
})

afterAll(() => {
  Reflect.deleteProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT')
})

const cart = {
  items: [
    {
      __typename: 'SimpleCartItem',
      uid: 'MQ==',
      quantity: 2,
      prices: {
        price: { currency: 'EUR', value: 10 },
        price_including_tax: { currency: 'EUR', value: 12.1 },
      },
      product: { __typename: 'SimpleProduct', uid: 'NQ==', sku: 'sku-1', name: 'Product' },
    },
  ],
} as unknown as CartStartCheckoutProps['cart']

it('sends view_cart with the items of the cart, once the cart has loaded', () => {
  const root = createRoot(document.createElement('div'))
  act(() => root.render(<CartStartCheckout Prev={() => null} cart={undefined} />))
  act(() => root.render(<CartStartCheckout Prev={() => null} cart={cart} />))
  act(() => root.unmount())

  expect(sendEvent).toHaveBeenCalledTimes(1)
  expect(sendEvent).toHaveBeenCalledWith(
    'view_cart',
    expect.objectContaining({
      items: [expect.objectContaining({ item_id: 'sku-1', quantity: 2 })],
    }),
  )
})
