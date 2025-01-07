const { findParentPath } = require('@graphcommerce/next-config')
const { formatter } = require('@lingui/format-po')

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
    locales: findParentPath(process.cwd()) ? ['en', 'nl', 'fr', 'de', 'es', 'it'] : config.locales,
    // formatOptions: { lineNumbers: false, origins: false, explicitIdAsDefault: true },
    format: formatter({ explicitIdAsDefault: true, lineNumbers: false, origins: false }),
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
