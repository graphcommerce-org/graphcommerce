/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { test } from '@playwright/test'

test.describe('Authentication flow', () => {
  const generatedEmail = `playwright${Math.random().toString(36).substring(7)}@example.com`

  test('can create account', async ({ page }) => {
    await page.goto('/')

    await Promise.all([page.waitForNavigation(), await page.click('[data-test-id=customer-fab]')])

    const email = page.locator('input[name="email"]')
    await email.click()
    await email.fill(generatedEmail)

    const password = page.locator('input[name="password"]')
    await password.click()
    await password.fill('Welkom1234')
    const confirmPassword = page.locator('input[name="confirmPassword"]')
    await confirmPassword.fill('Welkom1234')

    const prefix = page.locator('#mui-component-select-prefix')
    await prefix.click()
    await page.click('text=Other')

    const firstname = page.locator('input[name="firstname"]')
    await firstname.click()
    await firstname.fill('Playwright')

    const lastname = page.locator('input[name="lastname"]')
    await lastname.click()
    await lastname.fill('Test')

    // Click button:has-text("Maak account")
    const createAccount = page.locator('[data-test-id=create-account]')
    await createAccount.click()

    await Promise.all([page.waitForNavigation(), page.click('text=your account here')])
  })
})
