import { PlaywrightTestConfig, devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testMatch: '**/__playwright__/*.ts',
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
}

export default config
