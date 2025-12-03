import linguiNextConfig from '@graphcommerce/lingui-next/config'
import { loadConfig } from '@graphcommerce/next-config'
import dotenv from 'dotenv'

dotenv.config({ quiet: true })

const locales = loadConfig(process.cwd()).storefront.map(({ locale, linguiLocale }) => {
  if (linguiLocale) return linguiLocale
  const matches = locale?.match(/([a-z]{2})-([a-z]{2})-([a-z]+)/i)
  if (matches) return `${matches[1]}-${matches[2]}`
  return locale
})

export default linguiNextConfig({ locales })
