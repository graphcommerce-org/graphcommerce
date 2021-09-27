import { expect } from '@playwright/test'
import { test } from '@graphcommerce/magento-product/_playwright/productURL.fixture'
import { addConfigurableProductToCart } from './addConfigurableProductToCart'

test('add configurable to cart', async ({ page, productURL }) => {
  expect(productURL.ConfigurableProduct).toBeDefined()
  await addConfigurableProductToCart(page, productURL.ConfigurableProduct)
  expect(await page.waitForSelector('text=has been added to your shopping cart')).toBeDefined()
})
