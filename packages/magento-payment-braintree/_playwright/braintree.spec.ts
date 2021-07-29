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

  await page.click('button[value=braintree___]')

  await page.click('button:has-text("Credit Card")')

  await page.waitForSelector('[name=braintree-hosted-field-number]')
  const ccFrame = page.frame('braintree-hosted-field-number')
  expect(ccFrame).toBeDefined()
  await ccFrame?.click('input[name=credit-card-number]')
  await ccFrame?.fill('input[name=credit-card-number]', '4111111111111111')

  const ccvFrame = page.frame({ name: 'braintree-hosted-field-cvv' })
  await ccvFrame?.click('input[name="cvv"]')
  await ccvFrame?.fill('input[name="cvv"]', '123')

  const expirationFrame = page.frame({ name: 'braintree-hosted-field-expirationDate' })
  await expirationFrame?.click('input[name="expiration"]')
  await expirationFrame?.fill('input[name="expiration"]', '102022')

  await page.click('button:has-text("Pay (Credit Card)")')

  const result = await waitForGraphQlResponse(page, PaymentMethodPlaceOrderNoopDocument)
  expect(result.errors).toBeUndefined()
  expect(result.data?.placeOrder?.order.order_number).toBeDefined()
})
