import type { NextConfig } from 'next'
import withTranspileModules from 'next-transpile-modules'
import { DefinePlugin, Configuration } from 'webpack'
import { InterceptorPlugin } from './interceptors/InterceptorPlugin'
import { resolveDependenciesSync } from './utils/resolveDependenciesSync'

function extendConfig(nextConfig: NextConfig, modules: string[]): NextConfig {
  return {
    ...nextConfig,
    webpack: (config: Configuration, options) => {
      // Allow importing yml/yaml files for graphql-mesh
      config.module?.rules?.push({ test: /\.ya?ml$/, use: 'js-yaml-loader' })

      // To properly properly treeshake @apollo/client we need to define the __DEV__ property
      if (!options.isServer) {
        config.plugins = [new DefinePlugin({ __DEV__: options.dev }), ...(config.plugins ?? [])]
      }

      // @lingui .po file support
      config.module?.rules?.push({ test: /\.po/, use: '@lingui/loader' })

      config.experiments = {
        layers: true,
        topLevelAwait: true,
      }

      config.snapshot = {
        ...(config.snapshot ?? {}),
        managedPaths: [new RegExp(`^(.+?[\\/]node_modules[\\/])(?!${modules.join('|')})`)],
      }

      // `config.watchOptions.ignored = ['**/.git/**', '**/node_modules/**', '**/.next/**']
      config.watchOptions = {
        ...(config.watchOptions ?? {}),
        ignored: ['**/.git/**', `**/node_modules/!(${modules.join('|')})**`, '**/.next/**'],
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

      config.plugins = [...(config.plugins ?? []), new InterceptorPlugin()]

      return typeof nextConfig.webpack === 'function' ? nextConfig.webpack(config, options) : config
    },
  }
}

export type GraphCommerceConfig = {
  /** Additional packages that should be transpiled, usually this auto generated. */
  packages?: string[]
}

export function withGraphCommerce(
  conf: GraphCommerceConfig = {},
): (config: NextConfig) => NextConfig {
  const { packages = [] } = conf
  const dependencies = [...resolveDependenciesSync().keys()].slice(1)

  const modules = [...dependencies, ...packages]
  return (config) => extendConfig(withTranspileModules(modules)(config), modules)
}
