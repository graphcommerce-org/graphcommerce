import { DuplicatesPlugin } from 'inspectpack/plugin'
import type { NextConfig } from 'next'
import { DomainLocale } from 'next/dist/server/config'
import { DefinePlugin, Configuration } from 'webpack'
import { loadConfig } from './config/loadConfig'
import { configToImportMeta } from './config/utils/configToImportMeta'
import { GraphCommerceConfig } from './generated/config'
import { InterceptorPlugin } from './interceptors/InterceptorPlugin'
import { resolveDependenciesSync } from './utils/resolveDependenciesSync'

let graphcommerceConfig: GraphCommerceConfig

/**
 * GraphCommerce configuration: .
 *
 * ```ts
 * const { withGraphCommerce } = require('@graphcommerce/next-config')
 *
 * module.exports = withGraphCommerce(nextConfig)
 * ```
 */
export function withGraphCommerce(nextConfig: NextConfig, cwd: string): NextConfig {
  graphcommerceConfig ??= loadConfig(cwd)
  const importMetaPaths = configToImportMeta(graphcommerceConfig)

  const { i18n } = graphcommerceConfig

  const domains = Object.values(
    i18n.reduce((acc, loc) => {
      if (!loc.domain) return acc

      acc[loc.domain] = {
        defaultLocale: loc.defaultLocale ? loc.locale : acc[loc.domain]?.defaultLocale,
        locales: [...(acc[loc.domain]?.locales ?? []), loc.locale],
        domain: loc.domain,
        http: true,
      } as DomainLocale

      return acc
    }, {} as Record<string, DomainLocale>),
  )

  return {
    ...nextConfig,
    i18n: {
      defaultLocale: i18n.find((locale) => locale.defaultLocale)?.locale ?? i18n[0].locale,
      locales: i18n.map((locale) => locale.locale),
      // domains,
    },
    transpilePackages: [
      ...[...resolveDependenciesSync().keys()].slice(1),
      ...(nextConfig.transpilePackages ?? []),
    ],
    webpack: (config: Configuration, options) => {
      // Allow importing yml/yaml files for graphql-mesh
      config.module?.rules?.push({ test: /\.ya?ml$/, use: 'js-yaml-loader' })

      if (!config.plugins) config.plugins = []

      // Make import.meta.graphCommerce available for usage.
      config.plugins.push(new DefinePlugin(importMetaPaths))

      // To properly properly treeshake @apollo/client we need to define the __DEV__ property
      if (!options.isServer) {
        config.plugins.push(new DefinePlugin({ __DEV__: options.dev }))
      }
      if (!options.isServer && graphcommerceConfig.webpackDuplicatesPlugin) {
        config.plugins.push(
          new DuplicatesPlugin({
            ignoredPackages: [
              // very small
              'react-is',
              // build issue
              'tslib',
              // server
              'isarray',
              'readable-stream',
            ],
          }),
        )
      }

      // @lingui .po file support
      config.module?.rules?.push({ test: /\.po/, use: '@lingui/loader' })

      config.experiments = {
        layers: true,
        topLevelAwait: true,
      }

      // config.snapshot = {
      //   ...(config.snapshot ?? {}),
      //   managedPaths: [
      //     new RegExp(`^(.+?[\\/]node_modules[\\/])(?!${transpilePackages.join('|')})`),
      //   ],
      // }

      if (!config.resolve) config.resolve = {}
      config.resolve.alias = {
        ...config.resolve.alias,
        '@mui/base': '@mui/base/modern',
        '@mui/lab': '@mui/lab/modern',
        '@mui/material': '@mui/material/modern',
        '@mui/styled-engine': '@mui/styled-engine/modern',
        '@mui/system': '@mui/system/modern',
      }

      config.plugins.push(new InterceptorPlugin())

      return typeof nextConfig.webpack === 'function' ? nextConfig.webpack(config, options) : config
    },
  }
}
