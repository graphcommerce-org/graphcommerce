/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { waitForGraphQlResponse } from '@graphcommerce/graphql/_playwright/apolloClient.fixture'
import { PaymentMethodPlaceOrderNoopDocument } from '@graphcommerce/magento-cart-payment-method/PaymentMethodPlaceOrderNoop/PaymentMethodPlaceOrderNoop.gql'
import { fillShippingAddressForm } from '@graphcommerce/magento-cart-shipping-address/_playwright/fillShippingAddressForm'
import { fillCartAgreementsForm } from '@graphcommerce/magento-cart/_playwright/fillCartAgreementsForm'
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

  // Select the iDEAL option
  await page.click('button[value=mollie_methods_ideal___]')

  // Select Rabobank
  await page.selectOption('select[name="issuer"]', 'ideal_RABONL2U')

  await fillCartAgreementsForm(page)

  await page.pause()

  // Place the order and wait for the the redirect to the new page.
  await Promise.all([page.waitForNavigation(), page.click('button[name="placeOrder"]')])

  // Let the order fail
  await page.click('input[name="final_state"][value=failed]')

  // Return to the website.
  await Promise.all([page.waitForNavigation(), page.click('.footer button')])

  await page.pause()

  const result = await waitForGraphQlResponse(page, PaymentMethodPlaceOrderNoopDocument)
  expect(result.errors).toBeUndefined()
  expect(result.data?.placeOrder?.order.order_number).toBeDefined()
})
