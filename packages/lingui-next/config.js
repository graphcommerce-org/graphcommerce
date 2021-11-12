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
    locales: config.locales.map((l) => l?.split('-')[0]),
    formatOptions: { lineNumbers: false, origins: false },
    catalogs: [
      {
        path: 'locales/{locale}',
        include: ['<rootDir>/**/*.tsx', '<rootDir>/../../packages/**/*.tsx'],
        exclude: ['**/node_modules/!(@graphcommerce)/**'],
      },
    ],
    extractors: [require.resolve('@lingui/cli/api/extractors/typescript')],
    sourceLocale: 'en',
    ...otherConfig,
  }
}

module.exports = linguiNextConfig
