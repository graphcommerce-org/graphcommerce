import type { LinguiConfig } from '@lingui/conf'

/**
 * Augmenting the locale config to be compatible with GraphCommerce.
 *
 * Note: We're converting the locale-country strings to locale only. This means we're losing
 * functionality to define country specific locale options. If this a feature you require, please
 * create an issue.
 */
export default function linguiNextConfig(
  config: Partial<LinguiConfig> & { locales: LinguiConfig['locales'] },
): Partial<LinguiConfig>
