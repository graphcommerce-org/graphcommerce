// import CircularDependencyPlugin from 'circular-dependency-plugin'
// import { DuplicatesPlugin } from 'inspectpack/plugin'
import type { NextConfig } from 'next'
import type { DomainLocale } from 'next/dist/server/config'
import type { Configuration } from 'webpack'
import { loadConfig } from './config/loadConfig'
import type { GraphCommerceConfig } from './generated/config'
import { resolveDependenciesSync } from './utils/resolveDependenciesSync'

let graphcommerceConfig: GraphCommerceConfig

function domains(config: GraphCommerceConfig): DomainLocale[] {
  return Object.values(
    config.storefront.reduce(
      (acc, loc) => {
        if (!loc.domain) return acc

        acc[loc.domain] = {
          defaultLocale: loc.locale,
          locales: [...(acc[loc.domain]?.locales ?? []), loc.locale],
          domain: loc.domain,
          http: process.env.NODE_ENV === 'development' || undefined,
        } as DomainLocale

        return acc
      },
      {} as Record<string, DomainLocale>,
    ),
  )
}

/**
 * GraphCommerce configuration with new Turbopack-compatible interceptor system.
 *
 * ```ts
 * const { withGraphCommerce } = require('@graphcommerce/next-config')
 *
 * module.exports = withGraphCommerce(nextConfig)
 * ```
 */
export function withGraphCommerce(nextConfig: NextConfig, cwd: string = process.cwd()): NextConfig {
  graphcommerceConfig ??= loadConfig(cwd)

  const { storefront } = graphcommerceConfig

  const transpilePackages = [
    ...[...resolveDependenciesSync().keys()].slice(1),
    ...(nextConfig.transpilePackages ?? []),
  ]

  return {
    ...nextConfig,
    bundlePagesRouterDependencies: true,
    turbopack: {
      ...(nextConfig.turbopack ?? {}),
      rules: {
        ...(nextConfig.turbopack?.rules ?? {}),
        '*.yaml': { loaders: [{ loader: 'js-yaml-loader', options: {} }], as: '*.js' },
        '*.yml': { loaders: [{ loader: 'js-yaml-loader', options: {} }], as: '*.js' },
        '*.po': { loaders: [{ loader: '@lingui/loader', options: {} }], as: '*.js' },
      },
    },
    experimental: {
      ...nextConfig.experimental,
      scrollRestoration: true,
      swcPlugins: [...(nextConfig.experimental?.swcPlugins ?? []), ['@lingui/swc-plugin', {}]],
      optimizePackageImports: [
        ...transpilePackages,
        ...(nextConfig.experimental?.optimizePackageImports ?? []),
      ],
    },
    i18n: {
      ...nextConfig.i18n,
      defaultLocale:
        storefront.find((locale) => locale.defaultLocale)?.locale ?? storefront[0].locale,
      locales: storefront.map((locale) => locale.locale),
      domains: [...domains(graphcommerceConfig), ...(nextConfig.i18n?.domains ?? [])],
    },
    images: {
      ...nextConfig.images,
      remotePatterns: [
        'magentoEndpoint' in graphcommerceConfig
          ? {
              hostname: new URL(graphcommerceConfig.magentoEndpoint).hostname,
            }
          : undefined,
        { hostname: '**.graphassets.com' },
        { hostname: '*.graphcommerce.org' },
        ...(nextConfig.images?.remotePatterns ?? []),
      ].filter((v) => !!v),
    },
    rewrites: async () => {
      let rewrites = (await nextConfig.rewrites?.()) ?? []

      if (Array.isArray(rewrites)) {
        rewrites = { beforeFiles: rewrites, afterFiles: [], fallback: [] }
      }

      if (
        'productRoute' in graphcommerceConfig &&
        typeof graphcommerceConfig.productRoute === 'string' &&
        graphcommerceConfig.productRoute !== '/p/'
      ) {
        rewrites.beforeFiles?.push({
          source: `${graphcommerceConfig.productRoute ?? '/p/'}:path*`,
          destination: '/p/:path*',
        })
      }

      return rewrites
    },
    transpilePackages,
    webpack: (config: Configuration, options) => {
      if (!config.module) config.module = { rules: [] }

      config.module = {
        ...config.module,
        rules: [
          ...(config.module.rules ?? []),
          // Allow importing yml/yaml files for graphql-mesh
          { test: /\.ya?ml$/, use: 'js-yaml-loader' },
          // @lingui .po file support
          { test: /\.po/, use: '@lingui/loader' },
        ],
        exprContextCritical: false,
      }

      if (!config.plugins) config.plugins = []

      config.snapshot = {
        ...(config.snapshot ?? {}),
        managedPaths: [
          new RegExp(`^(.+?[\\/]node_modules[\\/])(?!${transpilePackages.join('|')})`),
        ],
      }

      config.watchOptions = {
        ...(config.watchOptions ?? {}),
        ignored: new RegExp(
          `^((?:[^/]*(?:/|$))*)(.(git|next)|(node_modules[\\/](?!${transpilePackages.join(
            '|',
          )})))(/((?:[^/]*(?:/|$))*)(?:$|/))?`,
        ),
      }

      if (!config.resolve) config.resolve = {}

      return typeof nextConfig.webpack === 'function' ? nextConfig.webpack(config, options) : config
    },
  }
}
