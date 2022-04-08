/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { selectPaymentMethod } from '@graphcommerce/magento-cart-payment-method/test'
import { goToPayment } from '@graphcommerce/magento-cart-payment-method/test/goToPayment'
import { addConfigurableProductToCart } from '@graphcommerce/magento-product-configurable/test/addConfigurableProductToCart'
import { test } from '@graphcommerce/magento-product/test/productURL.fixture'
import { expect } from '@playwright/test'
import { placeOrderOffsite } from './utils'

const method = 'mollie_methods_creditcard'

test.describe.only('mollie creditcard place order', () => {
  test('Should be able to place an order and return on the success page', async ({
    page,
    productURL,
    apolloClient,
  }) => {
    await addConfigurableProductToCart(page, productURL.ConfigurableProduct)
    await goToPayment(page, apolloClient)
    await selectPaymentMethod(page, method)

    await placeOrderOffsite(page, 'paid')
    expect(await page.locator('#back-to-home').innerText()).toBeDefined()
  })

  test('Should be possible to cancel an order and then place the order', async ({
    page,
    productURL,
    apolloClient,
  }) => {
    await addConfigurableProductToCart(page, productURL.ConfigurableProduct)
    await goToPayment(page, apolloClient)
    await selectPaymentMethod(page, method)
    await placeOrderOffsite(page, 'canceled')
    await placeOrderOffsite(page, 'paid')
    expect(await page.locator('#back-to-home').innerText()).toBeDefined()
  })

  test.only('Should be possible to press back on the payment gateway and then place the order', async ({
    page,
    productURL,
    apolloClient,
  }) => {
    await addConfigurableProductToCart(page, productURL.ConfigurableProduct)
    await goToPayment(page, apolloClient)
    await selectPaymentMethod(page, method)
    await Promise.all([page.waitForNavigation(), page.click('#place-order')])

    await page.goBack()

    expect(await page.locator('text=Payment failed with status: OPEN').innerText()).toBeDefined()

    await placeOrderOffsite(page, 'paid')
    expect(await page.locator('#back-to-home').innerText()).toBeDefined()
  })
})
