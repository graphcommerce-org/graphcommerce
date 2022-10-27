#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-extraneous-dependencies */
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const next_config_1 = require("@graphcommerce/next-config");
const cli_1 = require("@graphql-codegen/cli");
const rimraf_1 = __importDefault(require("rimraf"));
const yaml_1 = __importDefault(require("yaml"));
const [, , cmd] = process.argv;
const root = process.cwd();
const configLocation = node_path_1.default.join(root, `._tmp_codegen.yml`);
async function cleanup() {
    try {
        await promises_1.default.stat(configLocation).then((r) => {
            if (r.isFile())
                return promises_1.default.unlink(configLocation);
            return undefined;
        });
    }
    catch (e) {
        // ignore
    }
    return undefined;
}
function appendDocumentLocations(conf, packages) {
    const documents = Array.isArray(conf.documents) ? conf.documents : [conf.documents];
    documents.push(...packages.map((p) => `${p}/**/*.graphql`));
    return conf;
}
async function main() {
    // Make sure we dont already have a --config or -c cli argument as we're going to override it.
    if (process.argv.includes('--config') || process.argv.includes('-c')) {
        throw Error('--config or -c argument is not supported, modify codegen.yml to make changes');
    }
    const packages = [...(0, next_config_1.resolveDependenciesSync)().values()].filter((p) => p !== '.');
    // Detect if we're operating in the monorepo environment or in an installation
    const isMono = !!packages.find((p) => p.startsWith('../..'));
    // Load the current codegen.yml
    // Todo: implement loading with a custom --config or -c here.
    const conf = await (0, cli_1.loadCodegenConfig)({ configFilePath: root });
    // Get a a list of all generates configurations.
    const generates = Object.entries(conf.config.generates);
    let extension;
    // Find the file extension used for the generated graphql files and cleanup if not used anymore.
    generates.forEach(([, gen]) => {
        if (Array.isArray(gen))
            return;
        if (gen.presetConfig?.extension)
            extension = gen.presetConfig.extension;
    });
    if (extension)
        (0, rimraf_1.default)(node_path_1.default.join(root, `**/*${extension}`), console.error);
    // - Prepend the all targets with ../../ if we're running in a monorepo setup.
    // - Append all the Graphcommerce packages to the configuration
    conf.config.generates = Object.fromEntries(generates.map(([generateTarget, generateConf]) => [
        isMono ? `../../${generateTarget}` : generateTarget,
        Array.isArray(generateConf) ? generateConf : appendDocumentLocations(generateConf, packages),
    ]));
    // Reexport the mesh to is can be used by codegen
    await promises_1.default.writeFile(configLocation, yaml_1.default.stringify(conf.config));
    // Append the new cli argument
    process.argv.push('--config');
    process.argv.push(configLocation);
    // Run the cli
    const result = await (0, cli_1.runCli)(cmd);
    await cleanup();
    process.exit(result);
}
main().catch((e) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    cleanup();
    (0, cli_1.cliError)(e);
});
