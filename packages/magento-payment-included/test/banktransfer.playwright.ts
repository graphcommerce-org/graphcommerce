/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { waitForGraphQlResponse } from '@graphcommerce/graphql/test/apolloClient.fixture'
import { PaymentMethodPlaceOrderNoopDocument } from '@graphcommerce/magento-cart-payment-method/PaymentMethodPlaceOrderNoop/PaymentMethodPlaceOrderNoop.gql'
import { goToPayment } from '@graphcommerce/magento-cart-payment-method/test/goToPayment'
import { test } from '@graphcommerce/magento-product/test/productURL.fixture'
import { addConfigurableProductToCart } from '@graphcommerce/magento-product-configurable/test/addConfigurableProductToCart'
import { expect } from '@playwright/test'

test('banktransfer', async ({ page, productURL, apolloClient }) => {
  await addConfigurableProductToCart(page, productURL.ConfigurableProduct)
  await goToPayment(page, apolloClient)

  await page.click('button[value=banktransfer]')

  const waitForPlaceOrder = waitForGraphQlResponse(page, PaymentMethodPlaceOrderNoopDocument)

  await Promise.all([page.waitForNavigation(), page.click('#place-order')])

  expect((await waitForPlaceOrder).errors).toBeUndefined()
  expect((await waitForPlaceOrder).data?.placeOrder?.order.order_number).toBeDefined()

  expect(await page.locator('#back-to-home').innerText()).toBeDefined()
})
