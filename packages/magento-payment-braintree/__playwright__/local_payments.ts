/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { addProductToCart } from '@reachdigital/magento-product-configurable/ConfigurableProductAddToCart/ConfigurableProductAddToCart.playwright'
import { test } from '@reachdigital/magento-product/__playwright__/fixtures/withProduct'

test.only('create braintree payment', async ({ page, productURL }) => {
  await addProductToCart(page, productURL.ConfigurableProduct)

  await page.click('button:has-text("View shopping cart")')

  await page.click('a[href="/checkout"]:last-of-type')

  await page.click('input[name="email"]')
  await page.fill('input[name="email"]', 'test@test.com')

  await page.click('input[name="firstname"]')
  await page.fill('input[name="firstname"]', 'Test')

  await page.click('input[name="lastname"]')
  await page.fill('input[name="lastname"]', 'Account')

  await page.click('input[name="street"]')
  await page.fill('input[name="street"]', 'Street')
  await page.press('input[name="street"]', 'Tab')
  await page.fill('input[name="houseNumber"]', '1')
  await page.press('input[name="houseNumber"]', 'Tab')
  await page.press('input[name="addition"]', 'Tab')
  await page.fill('input[name="postcode"]', '1234AB')
  await page.press('input[name="postcode"]', 'Tab')
  await page.fill('input[name="city"]', 'Amsterdam')
  await page.press('input[name="city"]', 'Tab')
  await page.selectOption('select[name="countryCode"]', 'NL')
  await page.click('input[name="telephone"]')
  await page.fill('input[name="telephone"]', '0123456789')
  await page.press('input[name="telephone"]', 'Tab')

  await page.click('button[value=flatrate-flatrate]')
  await page.click('button:has-text("Next")')

  await page.click('button[value=braintree_local_payment___ideal]')

  await page.pause()

  await page.click('button[type=submit]')
  const paypalSandbox = await page.waitForEvent('popup')
  await page.waitForNavigation()

  await paypalSandbox.waitForNavigation()
  // Click text=Proceed with Sandbox Purchase
  await paypalSandbox.click('text=Proceed with Sandbox Purchase')
  await paypalSandbox.close()

  // // Click text=Unable to place order: Your payment could not be taken. Please try again or use
  // await Promise.all([
  //   page.waitForNavigation(/* { url: 'http://localhost:3000/checkout/success?cartId=' }*/),
  //   page.click(
  //     'text=Unable to place order: Your payment could not be taken. Please try again or use ',
  //   ),
  // ])
  // // Click [id="__next"] div:has-text("BackThank you for your order!Back to HomeContinue shopping")
  // await page.click(
  //   '[id="__next"] div:has-text("BackThank you for your order!Back to HomeContinue shopping")',
  // )
})
