/* eslint-disable import/no-extraneous-dependencies */
import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

/**
 * Per-locale projects are opt-in. Set `PLAYWRIGHT_LOCALES` to a comma-separated
 * list (e.g. `nl,de`) to generate `<project>-<locale>` variants. Importing
 * `next.config.ts` directly is intentionally avoided here: `next.config.ts`
 * pulls in `@graphcommerce/next-config` (ESM) and serwist, which the
 * Playwright Node loader compiles as CJS and crashes on with
 * `ReferenceError: exports is not defined in ES module scope`.
 */
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

const localesEnv = process.env.PLAYWRIGHT_LOCALES?.trim()
const locales = localesEnv
  ? localesEnv.split(',').map((l) => l.trim()).filter(Boolean)
  : []

const baseURL = process.env.URL || 'http://localhost:3000'
const projects = [...baseProjects]
for (const locale of locales) {
  for (const proj of baseProjects) {
    projects.push({
      name: `${proj.name}-${locale}`,
      use: { ...proj.use, locale, baseURL: `${baseURL}/${locale}` },
    })
  }
}

const config: PlaywrightTestConfig = {
  testMatch: ['**/*.playwright.ts'],
  projects,
  use: { baseURL },
  timeout: 2 * 60 * 1000,
}

export default config
