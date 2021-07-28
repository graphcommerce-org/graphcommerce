import { PlaywrightTestConfig, devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testMatch: ['**/*.playwright.ts'],
  projects: [
    {
      name: 'android',
      use: { browserName: 'chromium', ...devices['Moto G4'] },
    },
    {
      name: 'iphone',
      use: { browserName: 'webkit', ...devices['iPhone 12'] },
    },
  ],
  use: {
    baseURL: process.env.URL || 'http://localhost:3000',
  },
  timeout: 1000 * 120,
}

export default config
