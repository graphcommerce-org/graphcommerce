/* eslint-disable import/no-extraneous-dependencies */
import type { Page } from '@playwright/test'

export const selectPaymentMethod = async (page: Page, method: string) => {
  const locator = page.locator(`button[value=${method}]`)
  await locator.click()

  return locator
}
