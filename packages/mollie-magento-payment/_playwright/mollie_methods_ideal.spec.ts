/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { waitForGraphQlResponse } from '@graphcommerce/graphql/_playwright/apolloClient.fixture'
import { PaymentMethodPlaceOrderNoopDocument } from '@graphcommerce/magento-cart-payment-method/PaymentMethodPlaceOrderNoop/PaymentMethodPlaceOrderNoop.gql'
import { fillShippingAddressForm } from '@graphcommerce/magento-cart-shipping-address/_playwright/fillShippingAddressForm'
import { addConfigurableProductToCart } from '@graphcommerce/magento-product-configurable/_playwright/addConfigurableProductToCart'
import { test } from '@graphcommerce/magento-product/_playwright/productURL.fixture'
import { expect } from '@playwright/test'

test('place order failed', async ({ page, productURL }) => {
  await addConfigurableProductToCart(page, productURL.ConfigurableProduct)

  await page.click('a:has-text("View shopping cart")')

  await page.click('a[href="/checkout"]:last-of-type')

  await page.click('input[name="email"]')
  await page.fill('input[name="email"]', 'test@test.com')

  await fillShippingAddressForm(page)

  await page.click('button[value=flatrate-flatrate]')
  await page.click('button:has-text("Next")')

  await page.click('button[value=mollie_methods_ideal___]')

  // Select ideal_RABONL2U
  await page.selectOption('select[name="issuer"]', 'ideal_RABONL2U')

  await page.pause()
  // Click button:has-text("Pay")
  await Promise.all([page.waitForNavigation(), page.click('button[name="placeOrder"]')])

  // Click :nth-match(input[name="final_state"], 3)
  await page.click('input[name="final_state"][value=failed]')

  // Click text=Ga verder ›
  await Promise.all([page.waitForNavigation(), page.click('.footer button')])

  await page.pause()

  const result = await waitForGraphQlResponse(page, PaymentMethodPlaceOrderNoopDocument)
  expect(result.errors).toBeUndefined()
  expect(result.data?.placeOrder?.order.order_number).toBeDefined()
})
