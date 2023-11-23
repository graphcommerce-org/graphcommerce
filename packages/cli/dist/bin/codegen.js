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
const dotenv_1 = __importDefault(require("dotenv"));
const rimraf_1 = require("rimraf");
const yaml_1 = __importDefault(require("yaml"));
const [, , cmd] = process.argv;
dotenv_1.default.config();
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
    const deps = (0, next_config_1.resolveDependenciesSync)();
    const packages = [...deps.values()].filter((p) => p !== '.');
    // Load the current codegen.yml
    // Todo: implement loading with a custom --config or -c here.
    const conf = await (0, cli_1.loadCodegenConfig)({ configFilePath: root });
    // Get a a list of all generates configurations.
    const generates = Object.entries(conf.config.generates).map(([generatedPath, value]) => {
        const found = [...deps.entries()].find((dep) => generatedPath.startsWith(`node_modules/${dep[0]}`));
        if (!found)
            return [generatedPath, value];
        const newPath = generatedPath.replace(`node_modules/${found[0]}`, found[1]);
        return [newPath, value];
    });
    let extension;
    // Find the file extension used for the generated graphql files and cleanup if not used anymore.
    generates.forEach(([, gen]) => {
        if (Array.isArray(gen))
            return;
        if (gen.presetConfig?.extension)
            extension = gen.presetConfig.extension;
    });
    const isWatching = process.argv.includes('--watch') || process.argv.includes('-w');
    if (!isWatching && extension)
        await (0, rimraf_1.rimraf)(node_path_1.default.join(root, `**/*${extension}`), { glob: true });
    // - Prepend the all targets with ../../ if we're running in a monorepo setup.
    // - Append all the Graphcommerce packages to the configuration
    conf.config.generates = Object.fromEntries(generates.map(([generateTarget, generateConf]) => [
        generateTarget,
        Array.isArray(generateConf) ? generateConf : appendDocumentLocations(generateConf, packages),
    ]));
    (0, next_config_1.packageRoots)(packages).forEach((r) => {
        conf.config.generates[r] = conf.config.generates['.'];
    });
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
