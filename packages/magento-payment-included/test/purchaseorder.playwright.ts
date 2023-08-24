/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { waitForGraphQlResponse } from '@graphcommerce/graphql/test/apolloClient.fixture'
import { PaymentMethodPlaceOrderNoopDocument } from '@graphcommerce/magento-cart-payment-method/PaymentMethodPlaceOrderNoop/PaymentMethodPlaceOrderNoop.gql'
import { goToPayment } from '@graphcommerce/magento-cart-payment-method/test/goToPayment'
import { test } from '@graphcommerce/magento-product/test/productURL.fixture'
import { addConfigurableProductToCart } from '@graphcommerce/magento-product-configurable/test/addConfigurableProductToCart'
import { expect } from '@playwright/test'

test('place order', async ({ page, productURL, apolloClient }) => {
  await addConfigurableProductToCart(page, productURL.ConfigurableProduct)
  await goToPayment(page, apolloClient)

  await page.click('button[value=purchaseorder]')

  await page.click('input[name="poNumber"]')
  await page.fill('input[name="poNumber"]', '1234567890')

  const waitForPlaceOrder = waitForGraphQlResponse(page, PaymentMethodPlaceOrderNoopDocument)

  await Promise.all([page.waitForNavigation(), page.click('#place-order')])

  expect((await waitForPlaceOrder).errors).toBeUndefined()
  expect((await waitForPlaceOrder).data?.placeOrder?.order.order_number).toBeDefined()

  expect(await page.locator('#back-to-home').innerText()).toBeDefined()
})
