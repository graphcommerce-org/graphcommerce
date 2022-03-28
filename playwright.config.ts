import { PlaywrightTestConfig, devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testMatch: ['**/_playwright/**.spec.ts'],
  projects: [
    {
      name: 'android',
      use: { browserName: 'chromium', ...devices['Moto G4'] },
    },
    {
      name: 'iphone',
      use: { browserName: 'webkit', ...devices['iPhone 12'] },
    },
    {
      name: 'chrome',
      use: { browserName: 'chromium', viewport: { width: 1280, height: 1280 } },
    },
  ],
  use: {
    baseURL: process.env.URL || 'http://localhost:3000',
  },

  timeout: 2 * 60 * 1000,
}

export default config
