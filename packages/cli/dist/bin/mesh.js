#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFatalError = handleFatalError;
/* eslint-disable import/no-extraneous-dependencies */
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const node_process_1 = require("node:process");
const next_config_1 = require("@graphcommerce/next-config");
const cli_1 = require("@graphql-mesh/cli");
const utils_1 = require("@graphql-mesh/utils");
const dotenv_1 = __importDefault(require("dotenv"));
const yaml_1 = __importDefault(require("yaml"));
const findConfig_1 = require("../utils/findConfig");
// eslint-disable-next-line import/no-unresolved
require("tsx/cjs"); // support importing typescript configs in CommonJS
// eslint-disable-next-line import/no-unresolved
require("tsx/esm"); // support importing typescript configs in ESM
dotenv_1.default.config();
function handleFatalError(e, logger = new utils_1.DefaultLogger('◈')) {
    logger.error(e.stack || e.message);
    // eslint-disable-next-line no-console
    console.log(e);
    if (process.env.JEST == null)
        (0, node_process_1.exit)(1);
}
const root = process.cwd();
const meshDir = node_path_1.default.dirname(require.resolve('@graphcommerce/graphql-mesh'));
const relativePath = node_path_1.default.join(node_path_1.default.relative(meshDir, root), '/');
const cliParams = {
    ...cli_1.DEFAULT_CLI_PARAMS,
    playgroundTitle: 'GraphCommerce® Mesh',
};
const tmpMesh = `_tmp_mesh`;
const tmpMeshLocation = node_path_1.default.join(root, `.${tmpMesh}rc.yml`);
async function cleanup() {
    try {
        await node_fs_1.promises.stat(tmpMeshLocation).then((r) => {
            if (r.isFile())
                return node_fs_1.promises.unlink(tmpMeshLocation);
            return undefined;
        });
    }
    catch (e) {
        // ignore
    }
    return undefined;
}
const main = async () => {
    const baseConf = (await (0, findConfig_1.findConfig)({}));
    const graphCommerce = (0, next_config_1.loadConfig)(root);
    // eslint-disable-next-line global-require
    // @ts-ignore Might not exist
    const { meshConfig } = (await Promise.resolve().then(() => __importStar(require('@graphcommerce/graphql-mesh/meshConfig.interceptor'))));
    const conf = meshConfig(baseConf, graphCommerce);
    // We're configuring a custom fetch function
    conf.customFetch = '@graphcommerce/graphql-mesh/customFetch';
    conf.serve = { ...conf.serve, endpoint: '/api/graphql' };
    // Rewrite additionalResolvers so we can use module resolution more easily
    conf.additionalResolvers = conf.additionalResolvers ?? [];
    conf.additionalResolvers = conf.additionalResolvers?.map((additionalResolver) => {
        if (typeof additionalResolver !== 'string')
            return additionalResolver;
        if (additionalResolver.startsWith('@'))
            return node_path_1.default.relative(root, require.resolve(additionalResolver));
        return additionalResolver;
    });
    conf.sources = conf.sources.map((source) => {
        const definedHandlers = Object.entries(source.handler);
        return {
            ...source,
            handler: Object.fromEntries(definedHandlers.map(([key, value]) => {
                if (key === 'openapi' && value) {
                    const openapi = value;
                    if (openapi.source.startsWith('@')) {
                        return [
                            key,
                            { ...openapi, source: node_path_1.default.relative(root, require.resolve(openapi.source)) },
                        ];
                    }
                }
                return [key, value];
            })),
        };
    });
    // Rewrite additionalTypeDefs so we can use module resolution more easily
    if (!conf.additionalTypeDefs)
        conf.additionalTypeDefs = [];
    conf.additionalTypeDefs = (Array.isArray(conf.additionalTypeDefs) ? conf.additionalTypeDefs : [conf.additionalTypeDefs]).map((additionalTypeDef) => {
        if (typeof additionalTypeDef === 'string' && additionalTypeDef.startsWith('@'))
            return node_path_1.default.relative(root, require.resolve(additionalTypeDef));
        return additionalTypeDef;
    });
    // Scan the current working directory to also read all graphqls files.
    conf.additionalTypeDefs.push('**/*.graphqls');
    const deps = (0, next_config_1.resolveDependenciesSync)();
    const packages = [...deps.values()].filter((p) => p !== '.');
    const mV = graphCommerce.magentoVersion ?? 246;
    (0, next_config_1.packageRoots)(packages).forEach((r) => {
        const alsoScan = [245, 246, 247, 248, 249, 250, 251, 252, 253, 254]
            .filter((v) => v > mV)
            .map((v) => `${r}/*/schema-${v}/**/*.graphqls`);
        conf.additionalTypeDefs.push(`${r}/*/schema/**/*.graphqls`);
        conf.additionalTypeDefs.push(...alsoScan);
    });
    if (!conf.serve)
        conf.serve = {};
    if (!conf.serve.playgroundTitle)
        conf.serve.playgroundTitle = 'GraphCommerce® Mesh';
    conf.plugins = [
        ...(conf.plugins ?? []),
        {
            httpDetailsExtensions: {
                if: "env.NODE_ENV === 'development'",
            },
        },
    ];
    const yamlString = (0, next_config_1.replaceConfigInString)(yaml_1.default.stringify(conf), graphCommerce);
    await node_fs_1.promises.writeFile(tmpMeshLocation, yamlString);
    // Reexport the mesh to is can be used by packages
    await node_fs_1.promises.writeFile(`${meshDir}/.mesh.ts`, `export * from '${relativePath.split(node_path_1.default.sep).join('/')}.mesh'`, { encoding: 'utf8' });
    await (0, cli_1.graphqlMesh)({ ...cliParams, configName: tmpMesh });
    await cleanup();
};
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
main().catch((e) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    cleanup();
    if (e instanceof Error) {
        handleFatalError(e, new utils_1.DefaultLogger(cli_1.DEFAULT_CLI_PARAMS.initialLoggerPrefix));
    }
});
