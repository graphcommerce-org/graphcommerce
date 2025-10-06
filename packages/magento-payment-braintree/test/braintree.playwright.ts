/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { waitForGraphQlResponse } from '@graphcommerce/graphql/test/apolloClient.fixture'
import { PaymentMethodPlaceOrderNoopDocument } from '@graphcommerce/magento-cart-payment-method/PaymentMethodPlaceOrderNoop/PaymentMethodPlaceOrderNoop.gql'
import { fillShippingAddressForm } from '@graphcommerce/magento-cart-shipping-address/test/fillShippingAddressForm'
import { addConfigurableProductToCart } from '@graphcommerce/magento-product-configurable/test/addConfigurableProductToCart'
import { test } from '@graphcommerce/magento-product/test/productURL.fixture'
import { expect } from '@playwright/test'

test('place order', async ({ page, productURL }) => {
  await addConfigurableProductToCart(page, productURL.ConfigurableProduct)

  await page.click('#view-shopping-cart-button')

  await page.click('a[href="/checkout"]:last-of-type')

  await page.click('input[name="email"]')
  await page.fill('input[name="email"]', 'test@test.com')

  await fillShippingAddressForm(page)

  await page.click('button[value=flatrate-flatrate]')
  await page.click('#next')

  await page.click('button[value=braintree]')

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

  // Click button:has-text("Pay (Credit Card)")
  await page.click('#place-order')

  const result = await waitForGraphQlResponse(page, PaymentMethodPlaceOrderNoopDocument)
  expect(result.errors).toBeUndefined()
  expect(result.data?.placeOrder?.order.order_number).toBeDefined()
})
