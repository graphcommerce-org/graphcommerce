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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDocumentImports = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-cycle */
const path_1 = require("path");
const plugin_helpers_1 = require("@graphql-codegen/plugin-helpers");
const visitor_plugin_common_1 = require("@graphql-codegen/visitor-plugin-common");
const graphql_1 = require("graphql");
const fragment_resolver_1 = __importStar(require("./fragment-resolver"));
const utils_1 = require("./utils");
function getFragmentName(documentFile) {
    let name;
    if (!documentFile.document)
        return name;
    (0, graphql_1.visit)(documentFile.document, {
        FragmentDefinition(node) {
            name = node.name.value;
        },
    });
    return name;
}
/**
 * Transform the preset's provided documents into single-file generator sources, while resolving
 * fragment and user-defined imports
 *
 * Resolves user provided imports and fragment imports using the `DocumentImportResolverOptions`.
 * Does not define specific plugins, but rather returns a string[] of `importStatements` for the
 * calling plugin to make use of
 */
function resolveDocumentImports(presetOptions, schemaObject, importResolverOptions) {
    const { baseOutputDir, documents, pluginMap } = presetOptions;
    const { generateFilePath, schemaTypesSource, baseDir, typesImport } = importResolverOptions;
    const resolveFragments = (0, fragment_resolver_1.default)(importResolverOptions, presetOptions, schemaObject);
    const fragmentRegistry = (0, fragment_resolver_1.buildFragmentRegistry)(importResolverOptions, presetOptions, schemaObject);
    const isRelayOptimizer = !!Object.keys(pluginMap).find((plugin) => plugin.includes('relay-optimizer-plugin'));
    const resDocuments = documents.map((documentFile) => {
        try {
            const isFragment = typeof getFragmentName(documentFile) !== 'undefined';
            if (!isFragment && isRelayOptimizer) {
                const generatedFilePath = generateFilePath(documentFile.location);
                let externalFragments = (0, utils_1.extractExternalFragmentsInUse)(documentFile.document, fragmentRegistry);
                // Sort the entries in the right order so fragments are defined when using
                externalFragments = Object.fromEntries(Object.entries(externalFragments).sort(([, levelA], [, levelB]) => levelB - levelA));
                const fragments = documents.filter((d) => typeof externalFragments[getFragmentName(d) ?? ''] !== 'undefined');
                const importStatements = [];
                if ((0, plugin_helpers_1.isUsingTypes)(documentFile.document, [], schemaObject)) {
                    const schemaTypesImportStatement = (0, visitor_plugin_common_1.generateImportStatement)({
                        baseDir,
                        emitLegacyCommonJSImports: presetOptions.config.emitLegacyCommonJSImports,
                        importSource: (0, visitor_plugin_common_1.resolveImportSource)(schemaTypesSource),
                        baseOutputDir,
                        outputPath: generatedFilePath,
                        typesImport,
                    });
                    importStatements.unshift(schemaTypesImportStatement);
                }
                // const newDocument = [...fragments.map((f) => f.rawSDL), documentFile.rawSDL].join('\n')
                return {
                    filename: generatedFilePath,
                    documents: [...fragments, documentFile],
                    importStatements,
                    fragmentImports: [],
                    externalFragments: [],
                };
            }
            const generatedFilePath = generateFilePath(documentFile.location);
            const importStatements = [];
            const { externalFragments, fragmentImports } = resolveFragments(generatedFilePath, documentFile.document);
            if (isRelayOptimizer ||
                (0, plugin_helpers_1.isUsingTypes)(documentFile.document, externalFragments.map((m) => m.name), schemaObject)) {
                const schemaTypesImportStatement = (0, visitor_plugin_common_1.generateImportStatement)({
                    baseDir,
                    importSource: (0, visitor_plugin_common_1.resolveImportSource)(schemaTypesSource),
                    emitLegacyCommonJSImports: presetOptions.config.emitLegacyCommonJSImports,
                    baseOutputDir,
                    outputPath: generatedFilePath,
                    typesImport,
                });
                importStatements.unshift(schemaTypesImportStatement);
            }
            return {
                filename: generatedFilePath,
                documents: [documentFile],
                importStatements,
                fragmentImports,
                externalFragments,
            };
        }
        catch (e) {
            if (e instanceof Error) {
                throw new Error(`File ${documentFile.location} caused error: ${e.message || e.toString()}`);
            }
            else {
                throw e;
            }
        }
    });
    return resDocuments.filter((result) => result.filename.startsWith((0, path_1.resolve)(baseDir, baseOutputDir).replace(/\\/g, '/')));
}
exports.resolveDocumentImports = resolveDocumentImports;
