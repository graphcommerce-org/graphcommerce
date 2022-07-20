#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFatalError = void 0;
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const node_process_1 = require("node:process");
const cli_1 = require("@graphql-mesh/cli");
const utils_1 = require("@graphql-mesh/utils");
const dotenv_1 = __importDefault(require("dotenv"));
const yaml_1 = __importDefault(require("yaml"));
const findConfig_1 = require("../mesh/findConfig");
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
const isMonoRepo = relativePath.startsWith(`..${node_path_1.default.sep}..${node_path_1.default.sep}examples`);
const cliParams = {
    ...cli_1.DEFAULT_CLI_PARAMS,
    playgroundTitle: 'GraphCommerce® Mesh',
};
const tmpMesh = `_tmp_mesh_${Math.random().toString(36).substring(2, 15)}`;
const tmpMeshLocation = node_path_1.default.join(root, `.${tmpMesh}rc.yml`);
async function cleanup() {
    try {
        await node_fs_1.promises.stat(tmpMeshLocation).then((r) => {
            if (r.isFile())
                return node_fs_1.promises.unlink(tmpMeshLocation);
        });
    }
    catch (e) {
        // ignore
    }
    return undefined;
}
const main = async () => {
    const conf = (await (0, findConfig_1.findConfig)({}));
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
        if (additionalTypeDef.startsWith('@'))
            return node_path_1.default.relative(root, require.resolve(additionalTypeDef));
        return additionalTypeDef;
    });
    // Scan the current working directory to also read all graphqls files.
    conf.additionalTypeDefs.push('**/*.graphqls');
    if (isMonoRepo) {
        conf.additionalTypeDefs.push('../../packages/**/*.graphqls');
        conf.additionalTypeDefs.push('../../packagesDev/**/*.graphqls');
    }
    else {
        conf.additionalTypeDefs.push('node_modules/@graphcommerce/**/*.graphqls');
    }
    if (!conf.serve)
        conf.serve = {};
    if (!conf.serve.playgroundTitle)
        conf.serve.playgroundTitle = 'GraphCommerce® Mesh';
    await node_fs_1.promises.writeFile(tmpMeshLocation, yaml_1.default.stringify(conf));
    // Reexport the mesh to is can be used by packages
    await node_fs_1.promises.writeFile(`${meshDir}/.mesh.ts`, `export * from '${relativePath.split(node_path_1.default.sep).join('/')}.mesh'`, { encoding: 'utf8' });
    await (0, cli_1.graphqlMesh)({ ...cliParams, configName: tmpMesh });
    await cleanup();
};
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
main().catch((e) => handleFatalError(e, new utils_1.DefaultLogger(cli_1.DEFAULT_CLI_PARAMS.initialLoggerPrefix)));
