import { Page } from '@playwright/test'

export async function fillCartAgreementsForm(page: Page) {
  const inputs = await page.$$('form[name=cartAgreements] input')
  await Promise.all(inputs.map((input) => input.check()))
}
