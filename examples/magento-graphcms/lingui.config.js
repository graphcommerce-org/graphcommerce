/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */

const linguiNextConfig = require('@graphcommerce/lingui-next/config')
const { loadConfig } = require('@graphcommerce/next-config')
require('dotenv').config()

const locales = loadConfig(process.cwd()).i18n.map(({ locale }) => locale)

module.exports = linguiNextConfig({ locales })
