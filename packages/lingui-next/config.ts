import { findParentPath } from '@graphcommerce/next-config/findParentPath'
import type { LinguiConfig } from '@lingui/conf'
import { formatter } from '@lingui/format-po'

/**
 * Augmenting the locale config to be compatible with GraphCommerce.
 *
 * Note: We're converting the locale-country strings to locale only. This means we're losing
 * functionality to define country specific locale options. If this a feature you require, please
 * create an issue.
 */
export default function linguiNextConfig(config: LinguiConfig): LinguiConfig {
  const { locales, ...otherConfig } = config
  return {
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
    ...otherConfig,
  }
}
