import { PlaywrightTestConfig, devices } from '@reachdigital/playwright'

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
    video: 'retain-on-failure',
    baseURL: process.env.URL || 'http://localhost:3000',
  },

  timeout: 0,
}

export default config
