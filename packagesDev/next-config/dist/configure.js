"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withGraphCommerce = void 0;
const next_transpile_modules_1 = __importDefault(require("next-transpile-modules"));
const webpack_1 = require("webpack");
const buildFlags_1 = require("./buildFlags");
const InterceptorPlugin_1 = require("./interceptors/InterceptorPlugin");
const loadConfig_1 = require("./loadConfig");
const resolveDependenciesSync_1 = require("./utils/resolveDependenciesSync");
function extendConfig(nextConfig, modules, conf) {
    return {
        ...nextConfig,
        env: {
            ...nextConfig.env,
            ...(0, buildFlags_1.buildFlags)(conf.buildFlags),
        },
        webpack: (config, options) => {
            // Allow importing yml/yaml files for graphql-mesh
            config.module?.rules?.push({ test: /\.ya?ml$/, use: 'js-yaml-loader' });
            // To properly properly treeshake @apollo/client we need to define the __DEV__ property
            if (!options.isServer) {
                config.plugins = [new webpack_1.DefinePlugin({ __DEV__: options.dev }), ...(config.plugins ?? [])];
            }
            // @lingui .po file support
            config.module?.rules?.push({ test: /\.po/, use: '@lingui/loader' });
            config.experiments = {
                layers: true,
                topLevelAwait: true,
            };
            config.snapshot = {
                ...(config.snapshot ?? {}),
                managedPaths: [new RegExp(`^(.+?[\\/]node_modules[\\/])(?!${modules.join('|')})`)],
            };
            // `config.watchOptions.ignored = ['**/.git/**', '**/node_modules/**', '**/.next/**']
            config.watchOptions = {
                ...(config.watchOptions ?? {}),
                ignored: ['**/.git/**', `**/node_modules/!(${modules.join('|')})**`, '**/.next/**'],
            };
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
            config.plugins = [...(config.plugins ?? []), new InterceptorPlugin_1.InterceptorPlugin()];
            return typeof nextConfig.webpack === 'function' ? nextConfig.webpack(config, options) : config;
        },
    };
}
/**
 * GraphCommerce configuration accepts packages and buildFlags:
 *
 * ```ts
 * const withGraphCommerce = configure({
 *   buildFlags: {
 *     myBuildFlag: true,
 *   },
 * })
 * ```
 */
function withGraphCommerce(config) {
    const conf = (0, loadConfig_1.loadConfig)();
    const { packages = [] } = conf;
    const dependencies = [...(0, resolveDependenciesSync_1.resolveDependenciesSync)().keys()].slice(1);
    const modules = [...dependencies, ...packages];
    return extendConfig((0, next_transpile_modules_1.default)(modules)(config), modules, conf);
}
exports.withGraphCommerce = withGraphCommerce;
