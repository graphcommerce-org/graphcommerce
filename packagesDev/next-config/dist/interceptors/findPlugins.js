"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPlugins = findPlugins;
const core_1 = require("@swc/core");
const glob_1 = require("glob");
const resolveDependenciesSync_1 = require("../utils/resolveDependenciesSync");
const parseStructure_1 = require("./parseStructure");
const pluginLogs = {};
// ANSI escape codes for console colors
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';
function findPlugins(config, cwd = process.cwd()) {
    const dependencies = (0, resolveDependenciesSync_1.resolveDependenciesSync)(cwd);
    const debug = Boolean(config.debug?.pluginStatus);
    const errors = [];
    const plugins = [];
    dependencies.forEach((filePath, packageName) => {
        const files = (0, glob_1.sync)(`${filePath}/plugins/**/*.{ts,tsx}`);
        files.forEach((file) => {
            let sourceModule = file.replace('.tsx', '').replace('.ts', '');
            if (file.startsWith(filePath))
                sourceModule = `${packageName}/${sourceModule.slice(filePath.length + 1)}`;
            if (packageName === '.' && !sourceModule.startsWith('.'))
                sourceModule = `./${sourceModule}`;
            try {
                const ast = (0, core_1.parseFileSync)(file, { syntax: 'typescript', tsx: true });
                (0, parseStructure_1.parseStructure)(ast, config, sourceModule).forEach((result) => {
                    plugins.push(result);
                });
            }
            catch (e) {
                console.error(`Error parsing ${file}`, e);
            }
        });
    });
    if (process.env.NODE_ENV === 'development' && debug) {
        const byExported = plugins.reduce((acc, plugin) => {
            const key = `🔌 ${GREEN}Plugins loaded for ${plugin.targetModule}#${plugin.targetExport}${RESET}`;
            if (!acc[key])
                acc[key] = [];
            acc[key].push(plugin);
            return acc;
        }, {});
        const toLog = [];
        Object.entries(byExported).forEach(([key, p]) => {
            const logStr = p
                .filter((c) => debug || c.enabled)
                .map((c) => {
                // eslint-disable-next-line no-nested-ternary
                const ifConfigStr = c.ifConfig
                    ? Array.isArray(c.ifConfig)
                        ? `${c.ifConfig[0]}=${c.ifConfig[1]}`
                        : `${c.ifConfig}`
                    : '';
                return `${c.enabled ? '🟢' : '⚪️'} ${c.sourceModule} ${ifConfigStr}`;
            })
                .join('\n');
            if (logStr && pluginLogs[key] !== logStr) {
                toLog.push(`${key}\n${logStr}`);
                pluginLogs[key] = logStr;
            }
        });
        // eslint-disable-next-line no-console
        if (toLog.length)
            console.log(toLog.join('\n\n'));
    }
    return [plugins, errors];
}
