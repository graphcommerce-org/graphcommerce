/* eslint-disable import/no-extraneous-dependencies */
import { waitForGraphQlResponse } from '@graphcommerce/graphql/test/apolloClient.fixture'
import { Page, expect } from '@playwright/test'
import { MolliePaymentHandlerDocument } from '../components/MolliePaymentHandler/MolliePaymentHandler.gql'

type Statuses = 'paid' | 'failed' | 'canceled' | 'open' | 'expired'

export const handleOffsitePayment = async (page: Page, status: Statuses) => {
  await page.click(`input[name="final_state"][value=${status}]`)

  await Promise.all([page.waitForNavigation(), page.click('.footer button')])

  const result = await waitForGraphQlResponse(page, MolliePaymentHandlerDocument)
  expect(result.errors).toBeUndefined()
  expect(result.data?.mollieProcessTransaction?.paymentStatus).toBe(status.toUpperCase())
}

export const placeOrderOffsite = async (page: Page, status: Statuses) => {
  await Promise.all([page.waitForNavigation(), page.click('#place-order')])

  await handleOffsitePayment(page, status)
}

export const selectIssuer = async (page: Page, issuer: string) => {
  await page.locator('select[name="issuer"]').selectOption(issuer)
}
