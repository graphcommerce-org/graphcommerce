/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { waitForGraphQlResponse } from '@graphcommerce/graphql/test/apolloClient.fixture'
import { goToPayment } from '@graphcommerce/magento-cart-payment-method/test/goToPayment'
import { addConfigurableProductToCart } from '@graphcommerce/magento-product-configurable/test/addConfigurableProductToCart'
import { test } from '@graphcommerce/magento-product/test/productURL.fixture'
import { expect, Page } from '@playwright/test'
import { MolliePaymentHandlerDocument } from '../components/MolliePaymentHandler/MolliePaymentHandler.gql'

const selectIdeal = async (page: Page) => {
  await page.click('button[value=mollie_methods_ideal]')

  // Select Rabobank
  await page.selectOption('select[name="issuer"]', 'ideal_RABONL2U')
}

type Statuses = 'paid' | 'failed' | 'canceled' | 'open' | 'expired'

const placeOrder = async (page: Page, status: Statuses) => {
  await Promise.all([page.waitForNavigation(), page.click('#place-order')])

  await page.click(`input[name="final_state"][value=${status}]`)
  await Promise.all([page.waitForNavigation(), page.click('.footer button')])

  const result = await waitForGraphQlResponse(page, MolliePaymentHandlerDocument)
  expect(result.errors).toBeUndefined()
  expect(result.data?.mollieProcessTransaction?.paymentStatus).toBe(status.toUpperCase())
}

test.describe('mollie ideal place order', () => {
  test('CANCELED', async ({ page, productURL, apolloClient }) => {
    await addConfigurableProductToCart(page, productURL.ConfigurableProduct)
    await goToPayment(page, apolloClient)
    await selectIdeal(page)
    await placeOrder(page, 'canceled')
    await placeOrder(page, 'paid')
    expect(await page.locator('#back-to-home').innerText()).toBeDefined()
  })

  test('OPEN', async ({ page, productURL, apolloClient }) => {
    await addConfigurableProductToCart(page, productURL.ConfigurableProduct)
    await goToPayment(page, apolloClient)
    await selectIdeal(page)
    await placeOrder(page, 'open')
    await placeOrder(page, 'paid')
    expect(await page.locator('#back-to-home').innerText()).toBeDefined()
  })

  test('PAID', async ({ page, productURL, apolloClient }) => {
    await addConfigurableProductToCart(page, productURL.ConfigurableProduct)
    await goToPayment(page, apolloClient)
    await selectIdeal(page)
    await placeOrder(page, 'paid')
    expect(await page.locator('#back-to-home').innerText()).toBeDefined()
  })

  test('Pressed back', async ({ page, productURL, apolloClient }) => {
    await addConfigurableProductToCart(page, productURL.ConfigurableProduct)
    await goToPayment(page, apolloClient)
    await selectIdeal(page)
    await Promise.all([page.waitForNavigation(), page.click('#place-order')])

    await page.pause()
    await page.goBack()

    expect(await page.locator('text=Payment failed with status: OPEN').innerText()).toBeDefined()

    await placeOrder(page, 'paid')
    expect(await page.locator('#back-to-home').innerText()).toBeDefined()
  })
})
