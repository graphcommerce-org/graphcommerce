/* eslint-disable import/no-extraneous-dependencies */
import { test } from '@graphcommerce/magento-product/test/productURL.fixture'
import { expect } from '@playwright/test'
import { addConfigurableProductToCart } from './addConfigurableProductToCart'

test('add configurable to cart', async ({ page, productURL }) => {
  expect(productURL.ConfigurableProduct).toBeDefined()
  await addConfigurableProductToCart(page, productURL.ConfigurableProduct)

  expect(await page.waitForSelector('text=has been added to your shopping cart')).toBeDefined()

  await Promise.all([page.waitForNavigation(), page.locator('#view-shopping-cart-button').click()])
  expect(await page.locator('h1:has-text("Cart Total")').innerText()).toBeDefined()
})
