import { DuplicatesPlugin } from 'inspectpack/plugin'
import type { NextConfig } from 'next'
import { DefinePlugin, Configuration } from 'webpack'
import { loadConfig } from './config/loadConfig'
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

  return {
    ...nextConfig,
    transpilePackages: [
      ...[...resolveDependenciesSync().keys()].slice(1),
      ...(nextConfig.transpilePackages ?? []),
    ],
    webpack: (config: Configuration, options) => {
      // Allow importing yml/yaml files for graphql-mesh
      config.module?.rules?.push({ test: /\.ya?ml$/, use: 'js-yaml-loader' })

      if (!config.plugins) config.plugins = []

      // To properly properly treeshake @apollo/client we need to define the __DEV__ property
      if (!options.isServer) {
        config.plugins.push(new DefinePlugin({ __DEV__: options.dev }), ...(config.plugins ?? []))
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
