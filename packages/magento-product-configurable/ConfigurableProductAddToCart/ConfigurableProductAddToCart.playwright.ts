import { test, expect } from '@reachdigital/playwright'

test('add configurable to cart', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/product/configurable/gc-puny-dots-sock`)

  const groups = await page.$$('form [role=group]')
  expect(groups.length).toBeGreaterThan(0)
  await Promise.all(
    groups.map(async (group) => (await group.$('[name^=selectedOptions]:first-of-type'))?.click()),
  )

  await page.click('button[type=submit]')

  await page.waitForResponse('**/graphql')
  await page.waitForResponse('**/graphql')

  const bla = await page.waitForSelector('text=has been added to your shopping cart')
  expect(bla).toBeDefined()
})
