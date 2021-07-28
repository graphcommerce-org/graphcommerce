import { test } from '@reachdigital/magento-product/_playwright/withProduct'
import { expect, Page } from '@reachdigital/playwright'

export async function addConfigurableProductToCart(page: Page, productUrl: string) {
  await page.goto(productUrl)

  const groups = await page.$$('form [role=group]')
  expect(groups.length).toBeGreaterThan(0)
  await Promise.all(
    groups.map(async (group) => (await group.$('[name^=selectedOptions]:first-of-type'))?.click()),
  )

  await page.click('button[type=submit]')

  await page.waitForResponse('**/graphql')
  await page.waitForResponse('**/graphql')
}

test('add configurable to cart', async ({ page, productURL }) => {
  expect(productURL.ConfigurableProduct).toBeDefined()
  await addConfigurableProductToCart(page, productURL.ConfigurableProduct)
  expect(await page.waitForSelector('text=has been added to your shopping cart')).toBeDefined()
})
