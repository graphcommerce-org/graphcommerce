"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateConfig = generateConfig;
const fs_1 = require("fs");
// eslint-disable-next-line import/no-extraneous-dependencies
const cli_1 = require("@graphql-codegen/cli");
const core_1 = require("@swc/core");
const dotenv_1 = __importDefault(require("dotenv"));
const isMonorepo_1 = require("../../utils/isMonorepo");
const resolveDependenciesSync_1 = require("../../utils/resolveDependenciesSync");
const resolveDependency_1 = require("../../utils/resolveDependency");
dotenv_1.default.config();
const packages = [...(0, resolveDependenciesSync_1.resolveDependenciesSync)().values()].filter((p) => p !== '.');
const resolve = (0, resolveDependency_1.resolveDependency)();
const schemaLocations = packages.map((p) => `${p}/**/Config.graphqls`);
async function generateConfig() {
    const resolved = resolve('@graphcommerce/next-config');
    if (!resolved)
        throw Error('Could not resolve @graphcommerce/next-config');
    const targetTs = `${resolved.root}/src/generated/config.ts`;
    const targetJs = `${resolved.root}/dist/generated/config.js`;
    await (0, cli_1.generate)({
        silent: true,
        schema: ['graphql/**/Config.graphqls', ...schemaLocations],
        generates: {
            [targetTs]: {
                plugins: ['typescript', 'typescript-validation-schema', 'add'],
                config: {
                    // enumsAsTypes: true,
                    content: '/* eslint-disable */',
                    schema: 'zod',
                    notAllowEmptyString: true,
                    strictScalars: true,
                    enumsAsTypes: true,
                    scalarSchemas: {
                        Domain: 'z.string()',
                        DateTime: 'z.date()',
                        RichTextAST: 'z.object.json()',
                    },
                },
            },
            ...((0, isMonorepo_1.isMonorepo)() && {
                '../../docs/framework/config.md': {
                    plugins: ['@graphcommerce/graphql-codegen-markdown-docs'],
                },
            }),
        },
    });
    const result = (0, core_1.transformFileSync)(targetTs, {
        module: { type: 'commonjs' },
        env: { targets: { node: '16' } },
    });
    (0, fs_1.writeFileSync)(targetJs, result.code);
}
