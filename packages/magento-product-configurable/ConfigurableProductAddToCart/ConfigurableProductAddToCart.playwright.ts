import { expect, Page } from '@reachdigital/playwright'
import { test } from '../../magento-product/__playwright__/fixtures/withProduct'

export const addProductToCart = async (page: Page, productUrl: string) => {
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
  await addProductToCart(page, productURL.ConfigurableProduct)
  expect(await page.waitForSelector('text=has been added to your shopping cart')).toBeDefined()
})
