"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withGraphCommerce = withGraphCommerce;
// import CircularDependencyPlugin from 'circular-dependency-plugin'
const plugin_1 = require("inspectpack/plugin");
const webpack_1 = require("webpack");
const loadConfig_1 = require("./config/loadConfig");
const configToImportMeta_1 = require("./config/utils/configToImportMeta");
const InterceptorPlugin_1 = require("./interceptors/InterceptorPlugin");
const resolveDependenciesSync_1 = require("./utils/resolveDependenciesSync");
let graphcommerceConfig;
function domains(config) {
    return Object.values(config.storefront.reduce((acc, loc) => {
        if (!loc.domain)
            return acc;
        acc[loc.domain] = {
            defaultLocale: loc.locale,
            locales: [...(acc[loc.domain]?.locales ?? []), loc.locale],
            domain: loc.domain,
            http: process.env.NODE_ENV === 'development' || undefined,
        };
        return acc;
    }, {}));
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
function withGraphCommerce(nextConfig, cwd = process.cwd()) {
    graphcommerceConfig ??= (0, loadConfig_1.loadConfig)(cwd);
    const importMetaPaths = (0, configToImportMeta_1.configToImportMeta)(graphcommerceConfig);
    const { storefront } = graphcommerceConfig;
    const transpilePackages = [
        ...[...(0, resolveDependenciesSync_1.resolveDependenciesSync)().keys()].slice(1),
        ...(nextConfig.transpilePackages ?? []),
    ];
    return {
        ...nextConfig,
        bundlePagesRouterDependencies: true,
        experimental: {
            ...nextConfig.experimental,
            scrollRestoration: true,
            swcPlugins: [...(nextConfig.experimental?.swcPlugins ?? []), ['@lingui/swc-plugin', {}]],
        },
        i18n: {
            ...nextConfig.i18n,
            defaultLocale: storefront.find((locale) => locale.defaultLocale)?.locale ?? storefront[0].locale,
            locales: storefront.map((locale) => locale.locale),
            domains: [...domains(graphcommerceConfig), ...(nextConfig.i18n?.domains ?? [])],
        },
        images: {
            ...nextConfig.images,
            remotePatterns: [
                { hostname: new URL(graphcommerceConfig.magentoEndpoint).hostname },
                { hostname: 'media.graphassets.com' },
                { hostname: '*.graphcommerce.org' },
                ...(nextConfig.images?.remotePatterns ?? []),
            ],
        },
        redirects: async () => {
            const redirects = (await nextConfig.redirects?.()) ?? [];
            const destination = `${graphcommerceConfig.productRoute ?? '/p/'}:url*`;
            redirects.push(...[
                { source: '/product/bundle/:url*', destination, permanent: true },
                { source: '/product/configurable/:url*', destination, permanent: true },
                { source: '/product/downloadable/:url*', destination, permanent: true },
                { source: '/product/grouped/:url*', destination, permanent: true },
                { source: '/product/virtual/:url*', destination, permanent: true },
                { source: '/customer/account', destination: '/account', permanent: true },
            ]);
            if (destination !== '/product/:url*')
                redirects.push({ source: '/product/:url*', destination, permanent: true });
            return redirects;
        },
        rewrites: async () => {
            let rewrites = (await nextConfig.rewrites?.()) ?? [];
            if (Array.isArray(rewrites)) {
                rewrites = { beforeFiles: rewrites, afterFiles: [], fallback: [] };
            }
            if (graphcommerceConfig.productRoute && graphcommerceConfig.productRoute !== '/p/') {
                rewrites.beforeFiles.push({
                    source: `${graphcommerceConfig.productRoute ?? '/p/'}:path*`,
                    destination: '/p/:path*',
                });
            }
            return rewrites;
        },
        transpilePackages,
        webpack: (config, options) => {
            if (!config.module)
                config.module = { rules: [] };
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
            };
            if (!config.plugins)
                config.plugins = [];
            // Make import.meta.graphCommerce available for usage.
            config.plugins.push(new webpack_1.DefinePlugin(importMetaPaths));
            // To properly properly treeshake @apollo/client we need to define the __DEV__ property
            config.plugins.push(new webpack_1.DefinePlugin({ 'globalThis.__DEV__': options.dev }));
            if (!options.isServer) {
                // if (graphcommerceConfig.debug?.webpackCircularDependencyPlugin) {
                //   config.plugins.push(
                //     new CircularDependencyPlugin({
                //       exclude: /readable-stream|duplexer2|node_modules\/next/,
                //     }),
                //   )
                // }
                if (graphcommerceConfig.debug?.webpackDuplicatesPlugin) {
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
            }
            config.snapshot = {
                ...(config.snapshot ?? {}),
                managedPaths: [
                    new RegExp(`^(.+?[\\/]node_modules[\\/])(?!${transpilePackages.join('|')})`),
                ],
            };
            config.watchOptions = {
                ...(config.watchOptions ?? {}),
                ignored: new RegExp(`^((?:[^/]*(?:/|$))*)(.(git|next)|(node_modules[\\/](?!${transpilePackages.join('|')})))(/((?:[^/]*(?:/|$))*)(?:$|/))?`),
            };
            if (!config.resolve)
                config.resolve = {};
            if (!options.isServer && !options.dev) {
                config.resolve.alias = {
                    ...config.resolve.alias,
                    '@mui/base': '@mui/base/modern',
                    '@mui/lab': '@mui/lab/modern',
                    '@mui/material': '@mui/material/modern',
                    '@mui/styled-engine': '@mui/styled-engine/modern',
                    '@mui/system': '@mui/system/modern',
                };
            }
            config.plugins.push(new InterceptorPlugin_1.InterceptorPlugin(graphcommerceConfig, !options.isServer));
            return typeof nextConfig.webpack === 'function' ? nextConfig.webpack(config, options) : config;
        },
    };
}
