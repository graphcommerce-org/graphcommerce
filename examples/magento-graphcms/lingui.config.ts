import { formatter } from '@lingui/format-po'
import { loadConfig } from '@graphcommerce/next-config'
import { findParentPath } from '@graphcommerce/next-config/findParentPath'
import type { LinguiConfig } from '@lingui/conf'
import dotenv from 'dotenv'

dotenv.config()

const locales = loadConfig(process.cwd()).storefront.map(({ locale, linguiLocale }) => {
  if (linguiLocale) return linguiLocale
  const matches = locale?.match(/([a-z]{2})-([a-z]{2})-([a-z]+)/i)
  if (matches) return `${matches[1]}-${matches[2]}`
  return locale
})

const config: LinguiConfig = {
  orderBy: 'messageId',
  locales: findParentPath(process.cwd()) ? ['en', 'nl', 'fr', 'de', 'es', 'it'] : config.locales,
  format: formatter({ lineNumbers: false, origins: false }),
  catalogs: [
    {
      path: 'locales/{locale}',
      include: [
        '<rootDir>/**/*.tsx',
        '<rootDir>/**/!(*.d).ts',
        '<rootDir>/../../packages/**/*.tsx',
        '<rootDir>/../../packages/**/!(*.d).ts',
      ],
      exclude: ['**/node_modules/!(@graphcommerce)/**'],
    },
  ],
  sourceLocale: 'en',
}

export default config
