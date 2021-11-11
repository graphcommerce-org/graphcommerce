/**
 * Augmenting the locale config to be compatible with GraphCommerce.
 *
 * Note: We're converting the locale-country strings to locale only. This means we're losing
 * functionality to define country specific locale options. If this a feature you require, please
 * create an issue.
 */
function linguiNextConfig(config) {
  const { locales, ...otherConfig } = config
  return {
    locales: config.locales.map((l) => l?.split('-')[0]),
    formatOptions: { lineNumbers: false, origins: false },
    catalogs: [
      {
        path: 'locales/{locale}',
        include: ['<rootDir>/**/*.tsx'],
        exclude: ['**/node_modules/**'],
      },
    ],
    sourceLocale: 'en',
    ...otherConfig,
  }
}

module.exports = linguiNextConfig
