"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeInterceptors = exports.rmInterceptors = exports.generateInterceptors = exports.generateInterceptor = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const resolveDependenciesSync_1 = require("./utils/resolveDependenciesSync");
function generateInterceptor(plugin) {
    const { fromModule, components } = plugin;
    const importInjectables = `import { ${Object.entries(components)
        .map(([component]) => `${component} as ${component}Base`)
        .join(', ')} } from '${fromModule}'`;
    const pluginImports = Object.entries(components)
        .map(([_, plugins]) => plugins
        .sort((a, b) => a.plugin.localeCompare(b.plugin))
        .map((p) => `import { plugin as ${p.plugin.split('/')[p.plugin.split('/').length - 1]} } from '${p.plugin}'`)
        .join('\n'))
        .join('\n');
    const pluginExports = Object.entries(components)
        .map(([component, plugins]) => `// eslint-disable-next-line import/export
export const ${component} = [${plugins
        .map((p) => p.plugin.split('/')[p.plugin.split('/').length - 1])
        .join(', ')}].reduce(
  (acc, plugin) => plugin(acc),
  ${component}Base,
)
`)
        .join('\n');
    const componentExports = `// eslint-disable-next-line import/export
export * from '${fromModule}'`;
    const explanation = `// This interceptor is automatically generated and is loaded by webpack to replace the original export.
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/export */`;
    const template = [
        explanation,
        pluginImports,
        importInjectables,
        componentExports,
        pluginExports,
    ].join('\n\n');
    return { ...plugin, template };
}
exports.generateInterceptor = generateInterceptor;
function generateInterceptors(plugins, resolve) {
    // todo: Do not use reduce as we're passing the accumulator to the next iteration
    const byExportedComponent = plugins.reduce((acc, plug) => {
        const { exported } = plug;
        const resolved = resolve(exported);
        if (!acc[resolved.fromRoot])
            acc[resolved.fromRoot] = {
                ...resolved,
                target: `${resolved.fromRoot}.interceptor`,
                components: {},
            };
        if (!acc[resolved.fromRoot].components[plug.component])
            acc[resolved.fromRoot].components[plug.component] = [];
        acc[resolved.fromRoot].components[plug.component].push(plug);
        return acc;
    }, {});
    return Object.fromEntries(Object.entries(byExportedComponent).map(([target, plg]) => [target, generateInterceptor(plg)]));
}
exports.generateInterceptors = generateInterceptors;
function rmInterceptors(cwd = process.cwd()) {
    const dependencies = (0, resolveDependenciesSync_1.resolveDependenciesSync)(cwd);
    const removed = [];
    dependencies.forEach((dependency) => {
        const files = glob_1.default.sync(`${dependency}/**/*.interceptor.tsx`, { cwd });
        files.forEach((file) => {
            node_fs_1.default.unlinkSync(file);
            removed.push(file);
        });
    });
    return removed;
}
exports.rmInterceptors = rmInterceptors;
function writeInterceptors(interceptors, cwd = process.cwd()) {
    Object.entries(interceptors).forEach(([target, plugin]) => {
        // eslint-disable-next-line no-console
        const fileToWrite = `${path_1.default.join(cwd, plugin.fromRoot)}.interceptor.tsx`;
        node_fs_1.default.writeFileSync(fileToWrite, plugin.template);
    });
}
exports.writeInterceptors = writeInterceptors;
