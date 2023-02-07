"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withGraphCommerce = void 0;
const plugin_1 = require("inspectpack/plugin");
const webpack_1 = require("webpack");
const loadConfig_1 = require("./config/loadConfig");
const configToImportMeta_1 = require("./config/utils/configToImportMeta");
const InterceptorPlugin_1 = require("./interceptors/InterceptorPlugin");
const resolveDependenciesSync_1 = require("./utils/resolveDependenciesSync");
let graphcommerceConfig;
function domains(config) {
    return Object.values(config.i18n.reduce((acc, loc) => {
        if (!loc.domain)
            return acc;
        acc[loc.domain] = {
            defaultLocale: loc.defaultLocale ? loc.locale : acc[loc.domain]?.defaultLocale,
            locales: [...(acc[loc.domain]?.locales ?? []), loc.locale],
            domain: loc.domain,
            http: true,
        };
        return acc;
    }, {}));
}
function remotePatterns(url) {
    const urlObj = new URL(url);
    return {
        hostname: urlObj.hostname,
        protocol: urlObj.protocol,
        port: urlObj.port,
    };
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
function withGraphCommerce(nextConfig, cwd) {
    graphcommerceConfig ??= (0, loadConfig_1.loadConfig)(cwd);
    const importMetaPaths = (0, configToImportMeta_1.configToImportMeta)(graphcommerceConfig);
    const { i18n } = graphcommerceConfig;
    const { hostname, port } = new URL(graphcommerceConfig.magentoEndpoint);
    return {
        ...nextConfig,
        i18n: {
            defaultLocale: i18n.find((locale) => locale.defaultLocale)?.locale ?? i18n[0].locale,
            locales: i18n.map((locale) => locale.locale),
            domains: [...domains(graphcommerceConfig), ...(nextConfig.i18n?.domains ?? [])],
        },
        images: {
            remotePatterns: [
                { hostname, port },
                { hostname: 'media.graphassets.com', protocol: 'https' },
                ...(nextConfig.images?.remotePatterns ?? []),
            ],
        },
        transpilePackages: [
            ...[...(0, resolveDependenciesSync_1.resolveDependenciesSync)().keys()].slice(1),
            ...(nextConfig.transpilePackages ?? []),
        ],
        webpack: (config, options) => {
            // Allow importing yml/yaml files for graphql-mesh
            config.module?.rules?.push({ test: /\.ya?ml$/, use: 'js-yaml-loader' });
            if (!config.plugins)
                config.plugins = [];
            // Make import.meta.graphCommerce available for usage.
            config.plugins.push(new webpack_1.DefinePlugin(importMetaPaths));
            // To properly properly treeshake @apollo/client we need to define the __DEV__ property
            if (!options.isServer) {
                config.plugins.push(new webpack_1.DefinePlugin({ __DEV__: options.dev }));
            }
            if (!options.isServer && graphcommerceConfig.webpackDuplicatesPlugin) {
                config.plugins.push(new plugin_1.DuplicatesPlugin({
                    ignoredPackages: [
                        // very small
                        'react-is',
                        // build issue
                        'tslib',
                        // server
                        'isarray',
                        'readable-stream',
                    ],
                }));
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
