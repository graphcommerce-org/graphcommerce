"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFragmentRegistry = void 0;
const visitor_plugin_common_1 = require("@graphql-codegen/visitor-plugin-common");
const graphql_1 = require("graphql");
const utils_1 = require("./utils");
/**
 * Used by `buildFragmentResolver` to  build a mapping of fragmentNames to paths, importNames, and other useful info
 */
function buildFragmentRegistry({ generateFilePath }, { documents, config }, schemaObject) {
    const baseVisitor = new visitor_plugin_common_1.BaseVisitor(config, {
        scalars: visitor_plugin_common_1.buildScalars(schemaObject, config.scalars),
        dedupeOperationSuffix: visitor_plugin_common_1.getConfigValue(config.dedupeOperationSuffix, false),
        omitOperationSuffix: visitor_plugin_common_1.getConfigValue(config.omitOperationSuffix, false),
        fragmentVariablePrefix: visitor_plugin_common_1.getConfigValue(config.fragmentVariablePrefix, ''),
        fragmentVariableSuffix: visitor_plugin_common_1.getConfigValue(config.fragmentVariableSuffix, 'FragmentDoc'),
    });
    const getFragmentImports = (possbileTypes, name) => {
        const fragmentImports = [];
        fragmentImports.push({ name: baseVisitor.getFragmentVariableName(name), kind: 'document' });
        const fragmentSuffix = baseVisitor.getFragmentSuffix(name);
        if (possbileTypes.length === 1) {
            fragmentImports.push({
                name: baseVisitor.convertName(name, {
                    useTypesPrefix: true,
                    suffix: fragmentSuffix,
                }),
                kind: 'type',
            });
        }
        else if (possbileTypes.length !== 0) {
            possbileTypes.forEach((typeName) => {
                fragmentImports.push({
                    name: baseVisitor.convertName(name, {
                        useTypesPrefix: true,
                        suffix: `_${typeName}_${fragmentSuffix}`,
                    }),
                    kind: 'type',
                });
            });
        }
        return fragmentImports;
    };
    const duplicateFragmentNames = [];
    const registry = documents.reduce((prev, documentRecord) => {
        const fragments = documentRecord.document.definitions.filter((d) => d.kind === graphql_1.Kind.FRAGMENT_DEFINITION);
        if (fragments.length > 0) {
            for (const fragment of fragments) {
                const schemaType = schemaObject.getType(fragment.typeCondition.name.value);
                if (!schemaType) {
                    throw new Error(`Fragment "${fragment.name.value}" is set on non-existing type "${fragment.typeCondition.name.value}"!`);
                }
                const possibleTypes = visitor_plugin_common_1.getPossibleTypes(schemaObject, schemaType);
                const filePath = generateFilePath(documentRecord.location);
                const imports = getFragmentImports(possibleTypes.map((t) => t.name), fragment.name.value);
                if (prev[fragment.name.value] &&
                    graphql_1.print(fragment) !== graphql_1.print(prev[fragment.name.value].node)) {
                    duplicateFragmentNames.push(fragment.name.value);
                }
                prev[fragment.name.value] = {
                    filePath,
                    imports,
                    onType: fragment.typeCondition.name.value,
                    node: fragment,
                };
            }
        }
        return prev;
    }, {});
    if (duplicateFragmentNames.length) {
        throw new Error(`Multiple fragments with the name(s) "${duplicateFragmentNames.join(', ')}" were found.`);
    }
    return registry;
}
exports.buildFragmentRegistry = buildFragmentRegistry;
/**
 *  Builds a fragment "resolver" that collects `externalFragments` definitions and `fragmentImportStatements`
 */
function buildFragmentResolver(collectorOptions, presetOptions, schemaObject) {
    const fragmentRegistry = buildFragmentRegistry(collectorOptions, presetOptions, schemaObject);
    const { baseOutputDir } = presetOptions;
    const { baseDir, typesImport } = collectorOptions;
    function resolveFragments(generatedFilePath, documentFileContent) {
        const fragmentsInUse = utils_1.extractExternalFragmentsInUse(documentFileContent, fragmentRegistry);
        const externalFragments = [];
        // fragment files to import names
        const fragmentFileImports = {};
        for (const fragmentName of Object.keys(fragmentsInUse)) {
            const level = fragmentsInUse[fragmentName];
            const fragmentDetails = fragmentRegistry[fragmentName];
            if (fragmentDetails) {
                // add top level references to the import object
                // we don't checkf or global namespace because the calling config can do so
                if (level === 0) {
                    if (fragmentFileImports[fragmentDetails.filePath] === undefined) {
                        fragmentFileImports[fragmentDetails.filePath] = fragmentDetails.imports;
                    }
                    else {
                        fragmentFileImports[fragmentDetails.filePath].push(...fragmentDetails.imports);
                    }
                }
                externalFragments.push({
                    level,
                    isExternal: true,
                    name: fragmentName,
                    onType: fragmentDetails.onType,
                    node: fragmentDetails.node,
                });
            }
        }
        return {
            externalFragments,
            fragmentImports: Object.entries(fragmentFileImports).map(([fragmentsFilePath, identifiers]) => ({
                baseDir,
                baseOutputDir,
                outputPath: generatedFilePath,
                importSource: {
                    path: fragmentsFilePath,
                    identifiers,
                },
                typesImport,
            })),
        };
    }
    return resolveFragments;
}
exports.default = buildFragmentResolver;
