#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFatalError = void 0;
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const process_1 = require("process");
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
        (0, process_1.exit)(1);
}
exports.handleFatalError = handleFatalError;
const root = process.cwd();
const meshDir = path_1.default.dirname(require.resolve('@graphcommerce/graphql-mesh'));
const relativePath = path_1.default.join(path_1.default.relative(meshDir, root), '/');
const isMonoRepo = relativePath.startsWith('../../examples');
const artifactsDir = path_1.default.join(path_1.default.relative(root, meshDir), '/.mesh');
const cliParams = {
    ...cli_1.DEFAULT_CLI_PARAMS,
    artifactsDir,
    playgroundTitle: 'GraphCommerce® Mesh',
};
const tmpMesh = `_tmp_mesh_${Math.random().toString(36).substring(2, 15)}`;
const tmpMeshLocation = path_1.default.join(root, `.${tmpMesh}rc.yml`);
const main = async () => {
    const conf = (await (0, findConfig_1.findConfig)({}));
    // Rewrite additionalResolvers so we can use module resolution more easily
    conf.additionalResolvers = conf.additionalResolvers ?? [];
    conf.additionalResolvers = conf.additionalResolvers?.map((additionalResolver) => {
        if (typeof additionalResolver !== 'string')
            return additionalResolver;
        if (additionalResolver.startsWith('@'))
            return path_1.default.relative(root, require.resolve(additionalResolver));
        return additionalResolver;
    });
    // Rewrite additionalTypeDefs so we can use module resolution more easily
    if (!conf.additionalTypeDefs)
        conf.additionalTypeDefs = [];
    conf.additionalTypeDefs = (Array.isArray(conf.additionalTypeDefs) ? conf.additionalTypeDefs : [conf.additionalTypeDefs]).map((additionalTypeDef) => {
        if (additionalTypeDef.startsWith('@'))
            return path_1.default.relative(root, require.resolve(additionalTypeDef));
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
    await fs_1.promises.writeFile(tmpMeshLocation, yaml_1.default.stringify(conf));
    await (0, cli_1.graphqlMesh)({ ...cliParams, configName: tmpMesh });
    await fs_1.promises.unlink(tmpMeshLocation);
};
process.on('SIGINT', () => fs_1.promises.unlink(tmpMeshLocation));
process.on('SIGTERM', () => fs_1.promises.unlink(tmpMeshLocation));
main().catch((e) => handleFatalError(e, new utils_1.DefaultLogger(cli_1.DEFAULT_CLI_PARAMS.initialLoggerPrefix)));
