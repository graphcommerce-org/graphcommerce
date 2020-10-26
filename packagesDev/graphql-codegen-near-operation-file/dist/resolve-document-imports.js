"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const plugin_helpers_1 = require("@graphql-codegen/plugin-helpers");
const visitor_plugin_common_1 = require("@graphql-codegen/visitor-plugin-common");
const graphql_1 = require("graphql");
const fragment_resolver_1 = __importStar(require("./fragment-resolver"));
const utils_1 = require("./utils");
function fragmentName(documentFile) {
    let name;
    graphql_1.visit(documentFile.document, {
        enter: {
            FragmentDefinition: (node) => {
                name = node.name.value;
            },
        },
    });
    return name;
}
/**
 * Transform the preset's provided documents into single-file generator sources, while resolving fragment and user-defined imports
 *
 * Resolves user provided imports and fragment imports using the `DocumentImportResolverOptions`.
 * Does not define specific plugins, but rather returns a string[] of `importStatements` for the calling plugin to make use of
 */
function resolveDocumentImports(presetOptions, schemaObject, importResolverOptions) {
    const { baseOutputDir, documents, config } = presetOptions;
    const { generateFilePath, schemaTypesSource, baseDir, typesImport } = importResolverOptions;
    const resolveFragments = fragment_resolver_1.default(importResolverOptions, presetOptions, schemaObject);
    const fragmentRegistry = fragment_resolver_1.buildFragmentRegistry(importResolverOptions, presetOptions, schemaObject);
    if (config.flattenGeneratedTypes) {
        return (documents
            // .filter((documentFile) => typeof fragmentName(documentFile) === 'undefined')
            .map((documentFile) => {
            const generatedFilePath = generateFilePath(documentFile.location);
            if (typeof fragmentName(documentFile) === 'undefined') {
                return {
                    filename: generatedFilePath,
                    documents: [documentFile],
                    importStatements: [],
                    fragmentImports: [],
                    externalFragments: [],
                };
            }
            const externalFragments = utils_1.extractExternalFragmentsInUse(documentFile.document, fragmentRegistry);
            const fragments = documents.filter((d) => { var _a; return typeof externalFragments[(_a = fragmentName(d)) !== null && _a !== void 0 ? _a : ''] !== 'undefined'; });
            const importStatements = [];
            if (plugin_helpers_1.isUsingTypes(documentFile.document, [], schemaObject)) {
                const schemaTypesImportStatement = visitor_plugin_common_1.generateImportStatement({
                    baseDir,
                    importSource: visitor_plugin_common_1.resolveImportSource(schemaTypesSource),
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
        }));
    }
    return documents.map((documentFile) => {
        try {
            const generatedFilePath = generateFilePath(documentFile.location);
            const importStatements = [];
            const { externalFragments, fragmentImports } = resolveFragments(generatedFilePath, documentFile.document);
            if (plugin_helpers_1.isUsingTypes(documentFile.document, externalFragments.map((m) => m.name), schemaObject)) {
                const schemaTypesImportStatement = visitor_plugin_common_1.generateImportStatement({
                    baseDir,
                    importSource: visitor_plugin_common_1.resolveImportSource(schemaTypesSource),
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
            throw new plugin_helpers_1.DetailedError(`Unable to validate GraphQL document!`, `
      File ${documentFile.location} caused error:
        ${e.message || e.toString()}
            `, documentFile.location);
        }
    });
}
exports.resolveDocumentImports = resolveDocumentImports;
