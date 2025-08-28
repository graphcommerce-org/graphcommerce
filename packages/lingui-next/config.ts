import { formatter } from '@lingui/format-po'

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
export default function linguiNextConfig(
  config: Partial<import('@lingui/conf').LinguiConfig>,
): Partial<import('@lingui/conf').LinguiConfig> {
  const { locales, ...otherConfig } = config
  return {
    orderBy: 'messageId',
    locales: ['en', 'nl', 'fr', 'de', 'es', 'it'],
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
