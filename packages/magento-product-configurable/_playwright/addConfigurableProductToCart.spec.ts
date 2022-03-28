import { test } from '@graphcommerce/magento-product/_playwright/productURL.fixture'
import { expect } from '@playwright/test'
import { addConfigurableProductToCart } from './addConfigurableProductToCart'
// import {} from '@graphcommerce/magento-cart/_playwright'

test('add configurable to cart', async ({ page, productURL }) => {
  expect(productURL.ConfigurableProduct).toBeDefined()
  await addConfigurableProductToCart(page, productURL.ConfigurableProduct)

  expect(await page.waitForSelector('text=has been added to your shopping cart')).toBeDefined()

  await Promise.all([page.waitForNavigation(), page.locator('text=View shopping cart').click()])
  expect(await page.locator('h1:has-text("Cart Total")').innerText()).toBeDefined()
})
