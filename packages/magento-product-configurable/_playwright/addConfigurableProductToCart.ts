import { Page, expect } from '@playwright/test'
import { waitForGraphQlResponse } from '@reachdigital/graphql/_playwright/apolloClient.fixture'
import { CreateEmptyCartDocument } from '@reachdigital/magento-cart/hooks/CreateEmptyCart.gql'
import { ConfigurableProductAddToCartDocument } from '../ConfigurableProductAddToCart/ConfigurableProductAddToCart.gql'

export async function addConfigurableProductToCart(page: Page, productUrl: string) {
  await page.goto(productUrl)

  const groups = await page.$$('form [role=group]')
  expect(groups.length).toBeGreaterThan(0)
  await Promise.all(
    groups.map(async (group) => (await group.$('[name^=selectedOptions]:first-of-type'))?.click()),
  )

  await page.click('button[type=submit]')

  const createCart = await waitForGraphQlResponse(page, CreateEmptyCartDocument)
  expect(createCart.errors).toBeUndefined()
  expect(createCart.data?.createEmptyCart).toBeDefined()

  const addToCart = await waitForGraphQlResponse(page, ConfigurableProductAddToCartDocument)
  expect(addToCart.errors).toBeUndefined()
  expect(addToCart.data?.addProductsToCart?.user_errors.length).toBe(0)
}
