/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { goToPayment, selectPaymentMethod } from '@graphcommerce/magento-cart-payment-method/test'
import { test } from '@graphcommerce/magento-product/test/productURL.fixture'
import { addConfigurableProductToCart } from '@graphcommerce/magento-product-configurable/test/addConfigurableProductToCart'
import { expect } from '@playwright/test'
import { handleOffsitePayment, placeOrderOffsite, selectIssuer } from './utils'

const method = 'mollie_methods_ideal'

test.describe(method, () => {
  test('Should be able to place an order and return on the success page', async ({
    page,
    productURL,
    apolloClient,
  }) => {
    await addConfigurableProductToCart(page, productURL.ConfigurableProduct)
    await goToPayment(page, apolloClient)
    await selectPaymentMethod(page, method)

    await selectIssuer(page, 'ideal_RABONL2U')
    await placeOrderOffsite(page, 'paid')
    expect(await page.locator('#back-to-home').innerText()).toBeDefined()
  })

  test("Should not allow submission when all fields aren't filled yet", async ({
    page,
    productURL,
    apolloClient,
  }) => {
    await addConfigurableProductToCart(page, productURL.ConfigurableProduct)
    await goToPayment(page, apolloClient)
    await selectPaymentMethod(page, method)
    await page.click('#place-order')

    await expect(page.locator('select[name="issuer"]')).toHaveAttribute('aria-invalid', 'true')
  })

  test('Should be possible to cancel an order and then place the order', async ({
    page,
    productURL,
    apolloClient,
  }) => {
    await addConfigurableProductToCart(page, productURL.ConfigurableProduct)
    await goToPayment(page, apolloClient)
    await selectPaymentMethod(page, method)
    await selectIssuer(page, 'ideal_RABONL2U')
    await placeOrderOffsite(page, 'canceled')
    await placeOrderOffsite(page, 'paid')
    expect(await page.locator('#back-to-home').innerText()).toBeDefined()
  })

  test('Should be possible to press back on the payment gateway and then place the order', async ({
    page,
    productURL,
    apolloClient,
  }) => {
    await addConfigurableProductToCart(page, productURL.ConfigurableProduct)
    await goToPayment(page, apolloClient)
    await selectPaymentMethod(page, method)
    await selectIssuer(page, 'ideal_RABONL2U')
    await Promise.all([page.waitForNavigation(), page.click('#place-order')])

    await page.goBack()

    expect(await page.locator('text=Payment failed with status: OPEN').innerText()).toBeDefined()

    await placeOrderOffsite(page, 'paid')
    expect(await page.locator('#back-to-home').innerText()).toBeDefined()
  })

  test('Should be possible to place the order even though there is a completely separate session', async ({
    page,
    productURL,
    apolloClient,
    context,
  }) => {
    await addConfigurableProductToCart(page, productURL.ConfigurableProduct)
    await goToPayment(page, apolloClient)
    await selectPaymentMethod(page, method)
    await selectIssuer(page, 'ideal_RABONL2U')
    await Promise.all([page.waitForNavigation(), page.click('#place-order')])

    const page2 = await context.newPage()
    await Promise.all([page2.waitForNavigation(), page2.goto(page.url())])
    await page.close()

    await handleOffsitePayment(page2, 'paid')

    expect(await page.locator('#back-to-home').innerText()).toBeDefined()
  })
})
