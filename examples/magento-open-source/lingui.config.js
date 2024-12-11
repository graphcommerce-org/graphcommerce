/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */

const linguiNextConfig = require('@graphcommerce/lingui-next/config')
const { loadConfig } = require('@graphcommerce/next-config')
require('dotenv').config()

const locales = loadConfig(process.cwd()).storefront.map(({ locale, linguiLocale }) => {
  if (linguiLocale) return linguiLocale
  const matches = locale?.match(/([a-z]{2})-([a-z]{2})-([a-z]+)/i)
  if (matches) return `${matches[1]}-${matches[2]}`
  return locale
})

module.exports = linguiNextConfig({ locales })
