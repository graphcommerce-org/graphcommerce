#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFatalError = void 0;
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
dotenv_1.default.config();
function handleFatalError(e, logger = new utils_1.DefaultLogger('◈')) {
    logger.error(e.stack || e.message);
    // eslint-disable-next-line no-console
    console.log(e);
    if (process.env.JEST == null)
        (0, node_process_1.exit)(1);
}
exports.handleFatalError = handleFatalError;
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
    const conf = (await (0, findConfig_1.findConfig)({}));
    // We're configuring a custom fetch function
    conf.customFetch = require.resolve('@graphcommerce/graphql-mesh/customFetch');
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
    conf.additionalResolvers = [];
    // conf.additionalResolvers.push('**/resolvers/**/*.ts')
    const deps = (0, next_config_1.resolveDependenciesSync)();
    const packages = [...deps.values()].filter((p) => p !== '.');
    (0, next_config_1.packageRoots)(packages).forEach((r) => {
        conf.additionalTypeDefs.push(`${r}/**/*.graphqls`);
    });
    const meshScan = [...deps.values()].map(async (r) => {
        const resolver = `${r}/mesh.ts`;
        const hasResolver = await node_fs_1.promises
            .stat(resolver)
            .then(() => true)
            .catch(() => false);
        if (!conf.additionalResolvers)
            conf.additionalResolvers = [];
        if (hasResolver)
            conf.additionalResolvers.push(resolver);
    });
    await Promise.all(meshScan);
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
    const yamlString = (0, next_config_1.replaceConfigInString)(yaml_1.default.stringify(conf), (0, next_config_1.loadConfig)(root));
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
