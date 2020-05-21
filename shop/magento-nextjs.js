/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/**
 * Probably
 */
module.exports = (nextConfig = {}) => {
  return {
    ...nextConfig,
    webpack(config) {
      /**
       * JS Support
       * https://github.com/magento/pwa-studio/blob/develop/packages/pwa-buildpack/lib/Utilities/getClientConfig.js#L63-L76
       *
       * Loading and compiling of JS files is handled by next-transpile-modules, see next.config.js
       *
       * todo: integrate that plugin inside this plugin
       */

      /**
       * CSS Support
       * https://github.com/magento/pwa-studio/blob/develop/packages/pwa-buildpack/lib/Utilities/getClientConfig.js#L85-L90
       *
       * todo: Check if :global stuff works properly
       */
      config.module.rules[1].oneOf = [
        ...config.module.rules[1].oneOf.slice(0, 3),
        {
          // ...config.module.rules[1].oneOf[2],
          sideEffects: false,
          test: /\.css$/,
          issuer: {
            include: [
              /(@magento[\\/]venia-ui|@magento[\\/]peregrine)$/,
              /(@magento[\\/]venia-ui|@magento[\\/]peregrine)[\\/](?!.*node_modules)/,
            ],
            exclude: [
              /node_modules[\\/](?!(@magento[\\/]venia-ui|@magento[\\/]peregrine)([\\/]|$)(?!.*node_modules))/,
            ],
          },
          // https://github.com/magento/pwa-studio/blob/develop/packages/pwa-buildpack/lib/Utilities/getClientConfig.js#L85-L90
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            },
          ],
          // We don't support compiling CSS from other node_modules, not sure why this is there.
          // https://github.com/magento/pwa-studio/blob/develop/packages/pwa-buildpack/lib/Utilities/getClientConfig.js#L94-L105
        },
        ...config.module.rules[1].oneOf.slice(3),
      ]

      /**
       * GraphQL file loader
       *
       * https://github.com/magento/pwa-studio/blob/develop/packages/pwa-buildpack/lib/Utilities/getClientConfig.js#L54-L62
       */
      config.module.rules.push({
        test: /\.graphql$/,
        include: [
          /(@magento[\\/]venia-ui|@magento[\\/]peregrine)$/,
          /(@magento[\\/]venia-ui|@magento[\\/]peregrine)[\\/](?!.*node_modules)/,
        ],
        exclude: [
          /node_modules[\\/](?!(@magento[\\/]venia-ui|@magento[\\/]peregrine)([\\/]|$)(?!.*node_modules))/,
        ],
        use: [
          {
            loader: 'graphql-tag/loader',
          },
        ],
      })

      /**
       * Svg/img/etc support
       *
       * https://github.com/magento/pwa-studio/blob/develop/packages/pwa-buildpack/lib/Utilities/getClientConfig.js#L108-L118
       */
      config.module.rules.push({
        test: /\.(jpg|svg|png)$/,
        include: [
          /(@magento[\\/]venia-ui|@magento[\\/]peregrine)$/,
          /(@magento[\\/]venia-ui|@magento[\\/]peregrine)[\\/](?!.*node_modules)/,
        ],
        exclude: [
          /node_modules[\\/](?!(@magento[\\/]venia-ui|@magento[\\/]peregrine)([\\/]|$)(?!.*node_modules))/,
        ],
        use: [{ loader: 'file-loader' }],
      })

      /**
       * Adds EE/CE specific file loaders.
       *
       * https://github.com/magento/pwa-studio/blob/develop/packages/pwa-buildpack/lib/WebpackTools/MagentoResolver.js
       * https://github.com/magento/pwa-studio/blob/develop/packages/pwa-buildpack/lib/Utilities/getClientConfig.js#L121-L126
       */
      config.resolve.extensions.push(
        process.env.MAGENTO_BACKEND_EDITION === 'EE' ? '.ee.js' : '.ce.js',
      )

      /**
       * Make sure it can find @magento/venia-drivers, should probably be provided in some other way.
       */
      config.resolve.alias['@magento/venia-drivers'] = path.resolve(process.cwd(), 'shop/drivers')

      return config
    },
  }
}
