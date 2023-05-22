const { isMonorepo } = require('@graphcommerce/next-config')

/**
 * Augmenting the locale config to be compatible with GraphCommerce.
 *
 * Note: We're converting the locale-country strings to locale only. This means we're losing
 * functionality to define country specific locale options. If this a feature you require, please
 * create an issue.
 *
 * @param {Partial<import('@lingui/conf').LinguiConfig>} config
 * @returns {Partial<import('@lingui/conf').LinguiConfig>}
 */
function linguiNextConfig(config) {
  const { locales, ...otherConfig } = config
  return {
    orderBy: 'messageId',
    locales: isMonorepo()
      ? ['en', 'nl', 'fr', 'de', 'es', 'it']
      : config.locales.map((l) => l?.split('-')[0]),
    formatOptions: { lineNumbers: false, origins: false },
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
    ...otherConfig,
  }
}

module.exports = linguiNextConfig
