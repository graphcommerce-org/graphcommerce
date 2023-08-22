/* eslint-disable import/no-extraneous-dependencies */
import { Page } from '@playwright/test'

export async function fillShippingAddressForm(page: Page) {
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
}
