/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { waitForGraphQlResponse } from '@graphcommerce/graphql/_playwright/apolloClient.fixture'
import { fillShippingAddressForm } from '@graphcommerce/magento-cart-shipping-address/_playwright/fillShippingAddressForm'
import { fillCartAgreementsForm } from '@graphcommerce/magento-cart/_playwright/fillCartAgreementsForm'
import { addConfigurableProductToCart } from '@graphcommerce/magento-product-configurable/_playwright/addConfigurableProductToCart'
import { test } from '@graphcommerce/magento-product/_playwright/productURL.fixture'
import { expect, Page } from '@playwright/test'
import { MolliePlaceOrderDocument } from '../components/MolliePlaceOrder/MolliePlaceOrder.gql'
import { UseMolliePaymentTokenHandlerDocument } from '../hooks/UseMolliePaymentTokenHandler.gql'

const goToPayment = async (page: Page) => {
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
}

test.describe('mollie ideal place order', () => {
  test('CANCELED', async ({ page, productURL }) => {
    test.fixme()
    await addConfigurableProductToCart(page, productURL.ConfigurableProduct)
    await goToPayment(page)

    // Place the order and wait for the the redirect to the new page.
    await Promise.all([page.waitForNavigation(), page.click('button[name="placeOrder"]')])

    // Let the order fail
    await page.click('input[name="final_state"][value=canceled]')

    // Return to the website.
    await Promise.all([page.waitForNavigation(), page.click('.footer button')])

    const result = await waitForGraphQlResponse(page, UseMolliePaymentTokenHandlerDocument)
    expect(result.errors).toBeUndefined()
    expect(result.data?.mollieProcessTransaction?.paymentStatus).toBe('CANCELED')

    // Select Rabobank
    await page.selectOption('select[name="issuer"]', 'ideal_RABONL2U')

    // Place the order and wait for the the redirect to the new page.
    await Promise.all([page.waitForNavigation(), page.click('button[name="placeOrder"]')])

    const placeOrder = await waitForGraphQlResponse(page, MolliePlaceOrderDocument)
    expect(placeOrder.errors).toBeUndefined()
  })

  test('PAID', async ({ page, productURL }) => {
    await addConfigurableProductToCart(page, productURL.ConfigurableProduct)
    await goToPayment(page)

    await page.pause()

    // Place the order and wait for the the redirect to the new page.
    await Promise.all([page.waitForNavigation(), page.click('button[name="placeOrder"]')])

    // Let the order fail
    await page.click('input[name="final_state"][value=paid]')

    // Return to the website.
    await Promise.all([page.waitForNavigation(), page.click('.footer button')])

    const result = await waitForGraphQlResponse(page, UseMolliePaymentTokenHandlerDocument)
    expect(result.errors).toBeUndefined()
    expect(result.data?.mollieProcessTransaction?.paymentStatus).toBe('PAID')

    await page.waitForNavigation()
  })
})

// test('place order failed', async ({ page, productURL }) => {
//   await addConfigurableProductToCart(page, productURL.ConfigurableProduct)
//   await goToPayment(page)

//   // Place the order and wait for the the redirect to the new page.
//   await Promise.all([page.waitForNavigation(), page.click('button[name="placeOrder"]')])

//   // Let the order fail
//   await page.click('input[name="final_state"][value=failed]')

//   // Return to the website.
//   await Promise.all([page.waitForNavigation(), page.click('.footer button')])

//   const result = await waitForGraphQlResponse(page, UseMolliePaymentTokenHandlerDocument)
//   expect(result.errors).toBeUndefined()
//   expect(result.data?.mollieProcessTransaction?.paymentStatus).toBeDefined()
// })
