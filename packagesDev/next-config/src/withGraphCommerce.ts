import CircularDependencyPlugin from 'circular-dependency-plugin'
import { DuplicatesPlugin } from 'inspectpack/plugin'
import type { NextConfig } from 'next'
import { DomainLocale } from 'next/dist/server/config'
import { RemotePattern } from 'next/dist/shared/lib/image-config'
import { DefinePlugin, Configuration } from 'webpack'
import { loadConfig } from './config/loadConfig'
import { configToImportMeta } from './config/utils/configToImportMeta'
import { GraphCommerceConfig } from './generated/config'
import { InterceptorPlugin } from './interceptors/InterceptorPlugin'
import { resolveDependenciesSync } from './utils/resolveDependenciesSync'

let graphcommerceConfig: GraphCommerceConfig

function domains(config: GraphCommerceConfig): DomainLocale[] {
  return Object.values(
    config.storefront.reduce((acc, loc) => {
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

  const { storefront } = graphcommerceConfig

  const transpilePackages = [
    ...[...resolveDependenciesSync().keys()].slice(1),
    ...(nextConfig.transpilePackages ?? []),
  ]

  return {
    ...nextConfig,
    experimental: {
      enableUndici: true,
      ...nextConfig.experimental,
    },
    i18n: {
      defaultLocale:
        storefront.find((locale) => locale.defaultLocale)?.locale ?? storefront[0].locale,
      locales: storefront.map((locale) => locale.locale),
      domains: [...domains(graphcommerceConfig), ...(nextConfig.i18n?.domains ?? [])],
    },
    images: {
      ...nextConfig.images,
      domains: [
        new URL(graphcommerceConfig.magentoEndpoint).hostname,
        'media.graphassets.com',
        ...(nextConfig.images?.domains ?? []),
      ],
    },
    redirects: async () => {
      const redirects = (await nextConfig.redirects?.()) ?? []

      const destination = `${graphcommerceConfig.productRoute ?? '/p/'}:url*`

      redirects.push(
        ...[
          { source: '/product/bundle/:url*', destination, permanent: true },
          { source: '/product/configurable/:url*', destination, permanent: true },
          { source: '/product/downloadable/:url*', destination, permanent: true },
          { source: '/product/grouped/:url*', destination, permanent: true },
          { source: '/product/virtual/:url*', destination, permanent: true },
        ],
      )

      if (destination !== '/product/:url*')
        redirects.push({ source: '/product/:url*', destination, permanent: true })

      return redirects
    },
    rewrites: async () => {
      let rewrites = (await nextConfig.rewrites?.()) ?? []

      if (Array.isArray(rewrites)) {
        rewrites = { beforeFiles: rewrites, afterFiles: [], fallback: [] }
      }

      if (graphcommerceConfig.productRoute && graphcommerceConfig.productRoute !== '/p/') {
        rewrites.beforeFiles.push({
          source: `${graphcommerceConfig.productRoute ?? '/p/'}:path*`,
          destination: '/p/:path*',
        })
      }

      return rewrites
    },
    transpilePackages,
    webpack: (config: Configuration, options) => {
      // Allow importing yml/yaml files for graphql-mesh
      config.module?.rules?.push({ test: /\.ya?ml$/, use: 'js-yaml-loader' })

      if (!config.plugins) config.plugins = []

      // Make import.meta.graphCommerce available for usage.
      config.plugins.push(new DefinePlugin(importMetaPaths))

      // To properly properly treeshake @apollo/client we need to define the __DEV__ property
      if (!options.isServer) {
        config.plugins.push(new DefinePlugin({ __DEV__: options.dev }))
        if (graphcommerceConfig.debug?.webpackCircularDependencyPlugin) {
          config.plugins.push(
            new CircularDependencyPlugin({
              exclude: /readable-stream|duplexer2|node_modules\/next/,
            }),
          )
        }
        if (graphcommerceConfig.debug?.webpackDuplicatesPlugin) {
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

      config.snapshot = {
        ...(config.snapshot ?? {}),
        managedPaths: [
          new RegExp(`^(.+?[\\/]node_modules[\\/])(?!${transpilePackages.join('|')})`),
        ],
      }

      if (!config.resolve) config.resolve = {}
      config.resolve.alias = {
        ...config.resolve.alias,
        '@mui/base': '@mui/base/modern',
        '@mui/lab': '@mui/lab/modern',
        '@mui/material': '@mui/material/modern',
        '@mui/styled-engine': '@mui/styled-engine/modern',
        '@mui/system': '@mui/system/modern',
      }

      config.plugins.push(new InterceptorPlugin(graphcommerceConfig))

      return typeof nextConfig.webpack === 'function' ? nextConfig.webpack(config, options) : config
    },
  }
}
