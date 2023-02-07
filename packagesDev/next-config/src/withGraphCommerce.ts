import CircularDependencyPlugin from 'circular-dependency-plugin'
import { DuplicatesPlugin } from 'inspectpack/plugin'
import type { NextConfig } from 'next'
import { DomainLocale } from 'next/dist/server/config'
import { RemotePattern } from 'next/dist/shared/lib/image-config'
import { DefinePlugin, Configuration, WebpackPluginInstance } from 'webpack'
import { loadConfig } from './config/loadConfig'
import { configToImportMeta } from './config/utils/configToImportMeta'
import { GraphCommerceConfig } from './generated/config'
import { InterceptorPlugin } from './interceptors/InterceptorPlugin'
import { resolveDependenciesSync } from './utils/resolveDependenciesSync'

let graphcommerceConfig: GraphCommerceConfig

function domains(config: GraphCommerceConfig): DomainLocale[] {
  return Object.values(
    config.i18n.reduce((acc, loc) => {
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
}

function remotePatterns(url: string): RemotePattern {
  const urlObj = new URL(url)
  return {
    hostname: urlObj.hostname,
    protocol: urlObj.protocol as RemotePattern['protocol'],
    port: urlObj.port,
  }
}

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

  return {
    ...nextConfig,
    i18n: {
      defaultLocale: i18n.find((locale) => locale.defaultLocale)?.locale ?? i18n[0].locale,
      locales: i18n.map((locale) => locale.locale),
      domains: [...domains(graphcommerceConfig), ...(nextConfig.i18n?.domains ?? [])],
    },
    images: {
      domains: [
        new URL(graphcommerceConfig.magentoEndpoint).hostname,
        'media.graphassets.com',
        ...(nextConfig.images?.domains ?? []),
      ],
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
        if (graphcommerceConfig.webpackCircularDependencyPlugin) {
          config.plugins.push(
            new CircularDependencyPlugin({
              exclude: /readable-stream|duplexer2|node_modules\/next/,
            }) as WebpackPluginInstance,
          )
        }
        if (graphcommerceConfig.webpackDuplicatesPlugin) {
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
