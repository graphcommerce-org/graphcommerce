/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */

const linguiNextConfig = require('@graphcommerce/lingui-next/config')

require('dotenv').config()

if (!process.env.NEXT_PUBLIC_LOCALE_STORES)
  throw Error('Please specify NEXT_PUBLIC_LOCALE_STORES in your .env')

const locales = Object.keys(JSON.parse(process.env.NEXT_PUBLIC_LOCALE_STORES))

module.exports = linguiNextConfig({ locales })
