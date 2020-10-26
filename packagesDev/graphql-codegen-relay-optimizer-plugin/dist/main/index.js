"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.plugin = void 0;
var graphql_1 = require("graphql");
var relay_compiler_1 = require("relay-compiler");
var CompilerContext_1 = __importDefault(require("relay-compiler/lib/core/CompilerContext"));
var IRPrinter_1 = require("relay-compiler/lib/core/IRPrinter");
var Schema_1 = require("relay-compiler/lib/core/Schema");
var ApplyFragmentArgumentTransform_1 = require("relay-compiler/lib/transforms/ApplyFragmentArgumentTransform");
var FlattenTransform_1 = require("relay-compiler/lib/transforms/FlattenTransform");
var InlineFragmentsTransform_1 = require("relay-compiler/lib/transforms/InlineFragmentsTransform");
var SkipRedundantNodesTransform_1 = require("relay-compiler/lib/transforms/SkipRedundantNodesTransform");
exports.plugin = function (schema, documents, _config) {
    return {
        content: ''
    };
    // @TODO way for users to define directives they use, otherwise relay will throw an unknown directive error
    // Maybe we can scan the queries and add them dynamically without users having to do some extra stuff
    // transformASTSchema creates a new schema instance instead of mutating the old one
    var adjustedSchema = Schema_1.create(graphql_1.printSchema(schema)).extend([
        /* GraphQL */ "\n      directive @connection(key: String!, filter: [String!]) on FIELD\n      directive @client on FIELD\n    ",
    ]);
    var documentAsts = documents.reduce(function (prev, v) {
        var _a, _b;
        return __spreadArrays(prev, ((_b = (_a = v.document) === null || _a === void 0 ? void 0 : _a.definitions) !== null && _b !== void 0 ? _b : []));
    }, []);
    var relayDocuments = relay_compiler_1.Parser.transform(adjustedSchema, documentAsts);
    var fragmentCompilerContext = new CompilerContext_1["default"](adjustedSchema).addAll(relayDocuments);
    var fragmentDocuments = fragmentCompilerContext
        .applyTransforms([
        ApplyFragmentArgumentTransform_1.transform,
        FlattenTransform_1.transformWithOptions({ flattenAbstractTypes: false }),
        SkipRedundantNodesTransform_1.transform,
    ])
        .documents()
        .filter(function (doc) { return doc.kind === 'Fragment'; });
    var queryCompilerContext = new CompilerContext_1["default"](adjustedSchema)
        .addAll(relayDocuments)
        .applyTransforms([
        ApplyFragmentArgumentTransform_1.transform,
        InlineFragmentsTransform_1.transform,
        FlattenTransform_1.transformWithOptions({ flattenAbstractTypes: false }),
        SkipRedundantNodesTransform_1.transform,
    ]);
    var newQueryDocuments = queryCompilerContext.documents().map(function (doc) { return ({
        location: 'optimized by relay',
        document: graphql_1.parse(IRPrinter_1.print(adjustedSchema, doc))
    }); });
    var newDocuments = [];
    if (newQueryDocuments.length === 0) {
        return { content: '' };
    }
    if (newQueryDocuments.length === 1) {
        newDocuments = newQueryDocuments;
    }
    else {
        newDocuments = __spreadArrays(fragmentDocuments.map(function (doc) { return ({
            location: 'optimized by relay',
            document: graphql_1.parse(IRPrinter_1.print(adjustedSchema, doc))
        }); }), newQueryDocuments);
    }
    documents.splice(0, documents.length);
    documents.push.apply(documents, newDocuments);
    return {
        content: ''
    };
};
