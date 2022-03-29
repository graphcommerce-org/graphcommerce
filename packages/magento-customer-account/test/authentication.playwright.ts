/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { waitForGraphQlResponse } from '@graphcommerce/graphql/test/apolloClient.fixture'
import { SignUpDocument, SignUpMutation } from '@graphcommerce/magento-customer/components'
import {
  SignUpConfirmDocument,
  SignUpConfirmMutation,
} from '@graphcommerce/magento-customer/components/SignUpForm/SignUpConfirm.gql'
import { test } from '@playwright/test'

function isSignUp(
  doc: SignUpMutation | SignUpConfirmMutation | undefined | null,
): doc is SignUpMutation {
  return typeof (doc as SignUpMutation).generateCustomerToken?.token !== 'undefined'
}

test.describe('Authentication flow', () => {
  const generatedEmail = `playwright${Math.random().toString(36).substring(7)}@example.com`

  test('It can create an account', async ({ page }) => {
    await page.goto('/account/signin')

    const email = page.locator('input[name="email"]')
    await email.click()
    await email.fill(generatedEmail)

    const password = page.locator('input[name="password"]')
    await password.click()
    await password.fill('Welkom1234')
    const confirmPassword = page.locator('input[name="confirmPassword"]')
    await confirmPassword.fill('Welkom1234')

    await page.locator('text=Mr').click()
    await page.locator('text=Other').click()

    const firstname = page.locator('input[name="firstname"]')
    await firstname.click()
    await firstname.fill('Playwright')

    const lastname = page.locator('input[name="lastname"]')
    await lastname.click()
    await lastname.fill('Test')

    // Click button:has-text("Maak account")
    const createAccount = page.locator('#create-account')
    await createAccount.click()

    const result = await Promise.race([
      waitForGraphQlResponse(page, SignUpDocument),
      waitForGraphQlResponse(page, SignUpConfirmDocument),
    ])

    test.expect(result.errors).toBeUndefined()
    test.expect(result.data?.createCustomer?.customer.email).toMatch(generatedEmail)

    if (isSignUp(result.data)) {
      test.expect(result.data.generateCustomerToken).toBeDefined()
      const element = page.locator('text=Hi Playwright! You’re now logged in!')
      test.expect(await element.innerText()).toBeDefined()
    } else {
      test.expect((result.data as SignUpMutation).generateCustomerToken).toBeUndefined()
      const element = page.locator('text=Please check your inbox to validate your email')
      test.expect(await element.innerText()).toBeDefined()
    }
  })
})
