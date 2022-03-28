/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ApolloClient, NormalizedCacheObject } from '@graphcommerce/graphql'
import { waitForGraphQlResponse } from '@graphcommerce/graphql/_playwright/apolloClient.fixture'
import { fillShippingAddressForm } from '@graphcommerce/magento-cart-shipping-address/_playwright/fillShippingAddressForm'
import { fillCartAgreementsForm } from '@graphcommerce/magento-cart/_playwright/fillCartAgreementsForm'
import { addConfigurableProductToCart } from '@graphcommerce/magento-product-configurable/_playwright/addConfigurableProductToCart'
import { test } from '@graphcommerce/magento-product/_playwright/productURL.fixture'
import { expect, Page } from '@playwright/test'
import { UseMolliePaymentTokenHandlerDocument } from '../hooks/UseMolliePaymentTokenHandler.gql'

const goToPayment = async (page: Page, apolloClient: ApolloClient<NormalizedCacheObject>) => {
  await page.locator('a:has-text("View shopping cart")').click()

  await page.locator('text=Start Checkout').click()

  const email = page.locator('input[name="email"]')
  await email.click()
  await email.fill('test@test.com')

  await fillShippingAddressForm(page)

  await page.click('button[value=flatrate-flatrate]')
  await page.pause()
  await page.click('button:has-text("Next")')

  // Fill in the agreements
  await fillCartAgreementsForm(page, apolloClient)
}

const selectIdeal = async (page: Page) => {
  await page.click('button[value=mollie_methods_ideal]')

  // Select Rabobank
  await page.selectOption('select[name="issuer"]', 'ideal_RABONL2U')
}

type Statuses = 'paid' | 'failed' | 'canceled' | 'open' | 'expired'

const placeOrder = async (page: Page, status: Statuses) => {
  await Promise.all([page.waitForNavigation(), page.click('button[name="placeOrder"]')])

  await page.click(`input[name="final_state"][value=${status}]`)
  await Promise.all([page.waitForNavigation(), page.click('.footer button')])

  const result = await waitForGraphQlResponse(page, UseMolliePaymentTokenHandlerDocument)
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
    expect(await page.locator('text=Back to home').innerText()).toBeDefined()
  })

  test('PAID', async ({ page, productURL, apolloClient }) => {
    await addConfigurableProductToCart(page, productURL.ConfigurableProduct)
    await goToPayment(page, apolloClient)
    await selectIdeal(page)
    await placeOrder(page, 'paid')
    expect(await page.locator('text=Back to home').innerText()).toBeDefined()
  })
})
