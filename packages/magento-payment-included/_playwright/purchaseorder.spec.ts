/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect } from '@playwright/test'
import { waitForGraphQlResponse } from '@reachdigital/graphql/_playwright/apolloClient.fixture'
import { PaymentMethodPlaceOrderNoopDocument } from '@reachdigital/magento-cart-payment-method/PaymentMethodPlaceOrderNoop/PaymentMethodPlaceOrderNoop.gql'
import { fillShippingAddressForm } from '@reachdigital/magento-cart-shipping-address/_playwright/fillShippingAddressForm'
import { addConfigurableProductToCart } from '@reachdigital/magento-product-configurable/_playwright/addConfigurableProductToCart'
import { test } from '@reachdigital/magento-product/_playwright/productURL.fixture'

test('place order', async ({ page, productURL }) => {
  await addConfigurableProductToCart(page, productURL.ConfigurableProduct)

  await page.click('a:has-text("View shopping cart")')

  await page.click('a[href="/checkout"]:last-of-type')

  await page.click('input[name="email"]')
  await page.fill('input[name="email"]', 'test@test.com')

  await fillShippingAddressForm(page)

  await page.click('button[value=flatrate-flatrate]')
  await page.click('button:has-text("Next")')

  await page.click('button[value=purchaseorder___]')

  await page.click('input[name="poNumber"]')
  await page.fill('input[name="poNumber"]', '1234567890')

  const [, , placeOrder] = await Promise.all([
    page.waitForNavigation(),
    page.click('button:has-text("Pay (Purchase Order)")'),
    waitForGraphQlResponse(page, PaymentMethodPlaceOrderNoopDocument),
  ])

  expect(placeOrder.errors).toBeUndefined()
  expect(placeOrder.data?.placeOrder?.order.order_number).toBeDefined()

  expect(await page.$('h2:has-text("Thank you for your order!")')).toBeDefined()
})
