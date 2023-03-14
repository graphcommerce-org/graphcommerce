/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { waitForGraphQlResponse } from '@graphcommerce/graphql/test/apolloClient.fixture'
import { PaymentMethodPlaceOrderNoopDocument } from '@graphcommerce/magento-cart-payment-method/PaymentMethodPlaceOrderNoop/PaymentMethodPlaceOrderNoop.gql'
import { goToPayment } from '@graphcommerce/magento-cart-payment-method/test/goToPayment'
import { test } from '@graphcommerce/magento-product/test/productURL.fixture'
import { addConfigurableProductToCart } from '@graphcommerce/magento-product-configurable/test/addConfigurableProductToCart'
import { expect } from '@playwright/test'

test('place order ideal', async ({ page, productURL, apolloClient, locale }) => {
  test.skip(locale !== 'nl', 'Skip test for non-nl locale')

  await addConfigurableProductToCart(page, productURL.ConfigurableProduct)
  await goToPayment(page, apolloClient)

  await page.click('button[value=braintree_local_payment___ideal]')

  await page.pause()

  const [braintreePopup] = await Promise.all([
    page.waitForEvent('popup'),
    page.click('#place-order'),
  ])

  await page.pause()

  await braintreePopup.click('text=Proceed with Sandbox Purchase')
  const result = await waitForGraphQlResponse(page, PaymentMethodPlaceOrderNoopDocument)
  expect(result.errors).toBeUndefined()
  expect(result.data?.placeOrder?.order.order_number).toBeDefined()
})
