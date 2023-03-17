"use strict";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = void 0;
const CompilerContext_1 = __importDefault(require("@ardatan/relay-compiler/lib/core/CompilerContext"));
const IRPrinter_1 = require("@ardatan/relay-compiler/lib/core/IRPrinter");
const RelayParser_1 = require("@ardatan/relay-compiler/lib/core/RelayParser");
const Schema_1 = require("@ardatan/relay-compiler/lib/core/Schema");
const ApplyFragmentArgumentTransform_1 = require("@ardatan/relay-compiler/lib/transforms/ApplyFragmentArgumentTransform");
const FlattenTransform_1 = require("@ardatan/relay-compiler/lib/transforms/FlattenTransform");
const InlineFragmentsTransform_1 = require("@ardatan/relay-compiler/lib/transforms/InlineFragmentsTransform");
const SkipRedundantNodesTransform_1 = require("@ardatan/relay-compiler/lib/transforms/SkipRedundantNodesTransform");
const graphql_1 = require("graphql");
function isFragment(documentFile) {
    let name = false;
    if (!documentFile.document)
        return false;
    (0, graphql_1.visit)(documentFile.document, {
        FragmentDefinition: () => {
            name = true;
        },
    });
    return name;
}
const plugin = (schema, documents, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_config) => {
    const isFrag = documents.every((d) => isFragment(d));
    if (isFrag)
        return { content: '' };
    // @TODO way for users to define directives they use, otherwise relay will throw an unknown directive error
    // Maybe we can scan the queries and add them dynamically without users having to do some extra stuff
    // transformASTSchema creates a new schema instance instead of mutating the old one
    const adjustedSchema = (0, Schema_1.create)((0, graphql_1.printSchema)(schema)).extend([
        /* GraphQL */ `
      directive @connection(key: String!, filter: [String!]) on FIELD
      directive @client on FIELD
    `,
    ]);
    const documentAsts = documents.reduce((prev, v) => [...prev, ...(v.document?.definitions ?? [])], []);
    const relayDocuments = (0, RelayParser_1.transform)(adjustedSchema, documentAsts);
    const fragmentCompilerContext = new CompilerContext_1.default(adjustedSchema).addAll(relayDocuments);
    const fragmentDocuments = fragmentCompilerContext
        .applyTransforms([
        ApplyFragmentArgumentTransform_1.transform,
        (0, FlattenTransform_1.transformWithOptions)({ flattenAbstractTypes: false }),
        SkipRedundantNodesTransform_1.transform,
    ])
        .documents()
        .filter((doc) => doc.kind === 'Fragment');
    const queryCompilerContext = new CompilerContext_1.default(adjustedSchema)
        .addAll(relayDocuments)
        .applyTransforms([
        ApplyFragmentArgumentTransform_1.transform,
        InlineFragmentsTransform_1.transform,
        (0, FlattenTransform_1.transformWithOptions)({ flattenAbstractTypes: false }),
        SkipRedundantNodesTransform_1.transform,
    ]);
    const newQueryDocuments = queryCompilerContext.documents().map((doc) => ({
        location: 'optimized by relay',
        document: (0, graphql_1.parse)((0, IRPrinter_1.print)(adjustedSchema, doc)),
    }));
    let newDocuments = [];
    if (newQueryDocuments.length === 0) {
        return { content: '' };
    }
    if (newQueryDocuments.length === 1) {
        newDocuments = newQueryDocuments;
    }
    else {
        newDocuments = [
            ...fragmentDocuments.map((doc) => ({
                location: 'optimized by relay',
                document: (0, graphql_1.parse)((0, IRPrinter_1.print)(adjustedSchema, doc)),
            })),
            ...newQueryDocuments,
        ];
    }
    documents.splice(0, documents.length);
    documents.push(...newDocuments);
    return {
        content: '',
    };
};
exports.plugin = plugin;
