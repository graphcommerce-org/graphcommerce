"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withGraphCommerce = void 0;
const webpack_1 = require("webpack");
const InterceptorPlugin_1 = require("./interceptors/InterceptorPlugin");
const resolveDependenciesSync_1 = require("./utils/resolveDependenciesSync");
/**
 * GraphCommerce configuration: .
 *
 * ```ts
 * const { withGraphCommerce } = require('@graphcommerce/next-config')
 *
 * module.exports = withGraphCommerce(nextConfig)
 * ```
 */
function withGraphCommerce(nextConfig, cwd) {
    return {
        ...nextConfig,
        transpilePackages: [
            ...[...(0, resolveDependenciesSync_1.resolveDependenciesSync)().keys()].slice(1),
            ...(nextConfig.transpilePackages ?? []),
        ],
        webpack: (config, options) => {
            // const graphCommerceConfig = loadConfig(cwd)
            // Allow importing yml/yaml files for graphql-mesh
            config.module?.rules?.push({ test: /\.ya?ml$/, use: 'js-yaml-loader' });
            if (!config.plugins)
                config.plugins = [];
            // To properly properly treeshake @apollo/client we need to define the __DEV__ property
            if (!options.isServer) {
                config.plugins.push(new webpack_1.DefinePlugin({ __DEV__: options.dev }), ...(config.plugins ?? []));
            }
            // @lingui .po file support
            config.module?.rules?.push({ test: /\.po/, use: '@lingui/loader' });
            config.experiments = {
                layers: true,
                topLevelAwait: true,
            };
            // config.snapshot = {
            //   ...(config.snapshot ?? {}),
            //   managedPaths: [
            //     new RegExp(`^(.+?[\\/]node_modules[\\/])(?!${transpilePackages.join('|')})`),
            //   ],
            // }
            if (!config.resolve)
                config.resolve = {};
            config.resolve.alias = {
                ...config.resolve.alias,
                '@mui/base': '@mui/base/modern',
                '@mui/lab': '@mui/lab/modern',
                '@mui/material': '@mui/material/modern',
                '@mui/styled-engine': '@mui/styled-engine/modern',
                '@mui/system': '@mui/system/modern',
            };
            config.plugins.push(new InterceptorPlugin_1.InterceptorPlugin());
            return typeof nextConfig.webpack === 'function' ? nextConfig.webpack(config, options) : config;
        },
    };
}
exports.withGraphCommerce = withGraphCommerce;
