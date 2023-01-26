"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFlags = void 0;
const envToConf = (str) => str
    .replace('BUILD_FLAG_', '')
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
// convert to screamingSnakeCase and prefix with BUILD_FLAG_
const confToEnv = (str) => {
    const envVar = str
        .replace(/([A-Z])/g, (group) => `_${group}`)
        .toUpperCase()
        .replace(/^_/, '');
    return `BUILD_FLAG_${envVar}`;
};
function buildFlags(incoming) {
    const flags = incoming ?? {};
    // Find all process.env build flag
    Object.entries(process.env)
        .filter(([envVar]) => envVar.startsWith('BUILD_FLAG_'))
        .forEach(([envVar, stringValue]) => {
        if (stringValue !== '1' && stringValue !== '0' && stringValue !== undefined) {
            throw new Error(`Build flag ${envVar} must be a '1' or '0'`);
        }
        const buildFlagValue = stringValue === '1';
        const buildFlag = envToConf(envVar);
        if (typeof flags[buildFlag] !== 'undefined' && flags[buildFlag] !== buildFlagValue)
            console.warn(`${envVar}=${stringValue} overrides buildFlag ${buildFlag}`);
        flags[buildFlag] = buildFlagValue;
    });
    return Object.fromEntries(Object.entries(flags).map(([buildFlag, value]) => [confToEnv(buildFlag), value ? '1' : '']));
}
exports.buildFlags = buildFlags;
