/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { fillShippingAddressForm } from '@reachdigital/magento-cart-shipping-address/ShippingAddressForm/ShippingAddressForm.playwright'
import { addConfigurableProductToCart } from '@reachdigital/magento-product-configurable/_playwright/ConfigurableProductAddToCart.playwright'
import { test } from '@reachdigital/magento-product/_playwright/withProduct'
import { expect } from '@reachdigital/playwright'

test('braintree_local_payments', async ({ page, productURL }) => {
  await addConfigurableProductToCart(page, productURL.ConfigurableProduct)

  await page.click('button:has-text("View shopping cart")')

  await page.click('a[href="/checkout"]:last-of-type')

  await page.click('input[name="email"]')
  await page.fill('input[name="email"]', 'test@test.com')

  await fillShippingAddressForm(page)

  await page.click('button[value=flatrate-flatrate]')
  await page.click('button:has-text("Next")')

  await page.click('button[value=braintree_local_payment___ideal]')

  const [braintreePopup] = await Promise.all([
    page.waitForEvent('popup'),
    page.click('button:has-text("Pay (iDEAL)")'),
  ])

  await braintreePopup.click('text=Proceed with Sandbox Purchase')
  await page.pause()
})
