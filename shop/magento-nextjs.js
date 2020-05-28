/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { cloneDeep } = require('lodash')

const PATH_DELIMITER = '[\\\\/]' // match 2 antislashes or one slash

const regexEqual = (x, y) => {
  return (
    x instanceof RegExp &&
    y instanceof RegExp &&
    x.source === y.source &&
    x.global === y.global &&
    x.ignoreCase === y.ignoreCase &&
    x.multiline === y.multiline
  )
}

const safePath = (module) => module.split(/[\\\/]/g).join(PATH_DELIMITER)

const generateIncludes = (modules) => {
  return [
    new RegExp(`(${modules.map(safePath).join('|')})$`),
    new RegExp(`(${modules.map(safePath).join('|')})${PATH_DELIMITER}(?!.*node_modules)`),
  ]
}

const generateExcludes = (modules) => {
  return [
    new RegExp(
      `node_modules${PATH_DELIMITER}(?!(${modules
        .map(safePath)
        .join('|')})(${PATH_DELIMITER}|$)(?!.*node_modules))`,
    ),
  ]
}

const affectedPackages = ['@magento/venia-ui', '@magento/peregrine']
const magentoIncludes = generateIncludes(affectedPackages)
const magentoExcludes = generateExcludes(affectedPackages)

/**
 * @see https://github.com/magento/pwa-studio/blob/develop/packages/pwa-buildpack/lib/Utilities/getClientConfig.js
 * @see https://github.com/martpie/next-transpile-modules/blob/master/src/next-transpile-modules.js
 *
 * Plugins not used:
 * - RootComponentsPlugin: handles bundle splitting per page, already handled by NextJS
 * - UpwardIncludePlugin: Parses upward.yml, server handled by NextJS
 * - WebpackAssetsManifest: Handled by nextjs
 * - ServiceWorkerPlugin: Handled by nextjs plugin when required
 */
module.exports = (nextConfig = {}) => {
  return {
    ...nextConfig,
    /**
     * @param {WebpackOptions} config
     */
    webpack(config, environment) {
      const {
        config: { magento },
        isServer,
      } = environment

      // Avoid Webpack to resolve transpiled modules path to their real path as
      // we want to test modules from node_modules only. If it was enabled,
      // modules in node_modules installed via symlink would then not be
      // transpiled.
      config.resolve.symlinks = false

      /**
       * JS Support
       * https://github.com/magento/pwa-studio/blob/develop/packages/pwa-buildpack/lib/Utilities/getClientConfig.js#L63-L76
       */
      config.module.rules[0].include.push(...magentoIncludes)
      const origExclude = config.module.rules[0].exclude
      config.module.rules[0].exclude = (p) => {
        if (magentoIncludes.some((r) => r.test(p)) && !magentoExcludes.some((r) => r.test(p))) {
          return false
        }

        return origExclude(p)
      }

      /**
       * Solve issues with relative imports in modules.
       * https://github.com/martpie/next-transpile-modules/blob/master/src/next-transpile-modules.js#L66-L78
       */
      if (config.externals) {
        config.externals = config.externals.map((external) => {
          if (typeof external !== 'function') return external
          return (ctx, req, cb) => {
            return magentoIncludes.find((include) =>
              req.startsWith('.') ? include.test(path.resolve(ctx, req)) : include.test(req),
            )
              ? cb()
              : external(ctx, req, cb)
          }
        })
      }

      /**
       * Find all css loaders
       */
      const nextCssLoaders = config.module.rules.find((rule) => typeof rule.oneOf === 'object')

      /**
       * Disable all error-loaders for @magento packages
       */
      nextCssLoaders.oneOf
        // .filter((rule) => rule.use && rule.use.loader === 'error-loader')
        .forEach((rule) => {
          rule.exclude = rule.exclude || []
          rule.exclude.push(...magentoIncludes)
        })

      /**
       * Magento CSS module loader
       *
       * https://github.com/magento/pwa-studio/blob/develop/packages/pwa-buildpack/lib/Utilities/getClientConfig.js#L85-L90
       */
      const magentoCssLoader = cloneDeep(
        nextCssLoaders.oneOf.find(
          (rule) => rule.sideEffects === false && regexEqual(rule.test, /\.module\.css$/),
        ),
      )

      delete magentoCssLoader.issuer.exclude
      magentoCssLoader.test = /(?<!\.module)\.css$/
      magentoCssLoader.include = magentoIncludes
      magentoCssLoader.exclude = magentoExcludes
      const cssLoader = magentoCssLoader.use.find((loader) => loader.options.modules)
      cssLoader.options.modules.mode = 'local'
      nextCssLoaders.oneOf.push(magentoCssLoader)

      /**
       * GraphQL file loader
       *
       * https://github.com/magento/pwa-studio/blob/develop/packages/pwa-buildpack/lib/Utilities/getClientConfig.js#L54-L62
       */
      config.module.rules.push({
        test: /\.graphql$/,
        include: magentoIncludes,
        exclude: magentoExcludes,
        use: [{ loader: 'graphql-tag/loader' }],
      })

      /**
       * Svg/img/etc support
       *
       * https://github.com/magento/pwa-studio/blob/develop/packages/pwa-buildpack/lib/Utilities/getClientConfig.js#L108-L118
       */
      config.module.rules.push({
        test: /\.(jpg|svg|png)$/,
        include: magentoIncludes,
        exclude: magentoExcludes,
        use: [{ loader: 'file-loader' }],
      })

      /**
       * Adds EE/CE specific file loaders.
       *
       * https://github.com/magento/pwa-studio/blob/develop/packages/pwa-buildpack/lib/WebpackTools/MagentoResolver.js
       * https://github.com/magento/pwa-studio/blob/develop/packages/pwa-buildpack/lib/Utilities/getClientConfig.js#L121-L126
       */
      config.resolve.extensions.push(magento.isCommerce ? '.ee.js' : '.ce.js')

      /**
       * Make sure it can find @magento/venia-drivers, should probably be provided in some other way.
       */
      config.resolve.alias['@magento/venia-drivers'] = path.resolve(process.cwd(), magento.drivers)

      return config
    },
  }
}
