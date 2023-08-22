/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-relative-packages */
import { PlaywrightTestConfig, devices } from '@playwright/test'

import nextConfig from './examples/magento-graphcms/next.config'

// nextConfig.i18n

const baseProjects: PlaywrightTestConfig['projects'] = [
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
]

const locales = nextConfig.i18n?.locales ?? []
const defaultLocale = nextConfig.i18n?.defaultLocale

const projects = [...baseProjects]

if (locales.length > 0) {
  locales.forEach((locale) => {
    if (defaultLocale === locale) return

    baseProjects.forEach((proj) => {
      const name = `${proj.name}-${locale}`
      projects.push({
        name,
        use: {
          ...proj.use,
          locale,
          baseURL: `http://localhost:3000/${locale}`,
        },
      })
    })
  })
}

const config: PlaywrightTestConfig = {
  testMatch: ['**/*.playwright.ts'],
  projects,
  use: {
    baseURL: process.env.URL || 'http://localhost:3000',
  },

  timeout: 2 * 60 * 1000,
}

export default config
