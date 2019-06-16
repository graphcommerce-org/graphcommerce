"use strict";

const { parse } = require("graphql/language");
const { GraphQLCompilerContext } = require("relay-compiler");
const InlineFragmentsTransform = require("relay-compiler/lib/InlineFragmentsTransform");
const SkipRedundantNodesTransform = require("relay-compiler/lib/SkipRedundantNodesTransform");
const RelayApplyFragmentArgumentTransform = require("relay-compiler/lib/RelayApplyFragmentArgumentTransform");
const FlattenTransform = require("relay-compiler/lib/FlattenTransform");
const RelayParser = require("relay-compiler/lib/RelayParser");
const GraphQLIRPrinter = require("relay-compiler/lib/GraphQLIRPrinter");

module.exports.plugin = (schema, documents) => {
  const documentAsts = documents.reduce((prev, v) => {
    return [...prev, ...v.content.definitions];
  }, []);

  const relayDocuments = RelayParser.transform(schema, documentAsts);

  const newDocuments = new GraphQLCompilerContext(schema)
    .addAll(relayDocuments)
    .applyTransforms([
      RelayApplyFragmentArgumentTransform.transform,
      InlineFragmentsTransform.transform,
      FlattenTransform.transformWithOptions({ flattenAbstractTypes: true }),
      SkipRedundantNodesTransform.transform
    ])
    .documents()
    .map(doc => parse(GraphQLIRPrinter.print(doc)))
    .map(doc => ({ filePath: "optimized by relay", content: doc }));

  // replace documents #hack
  documents.splice(0, documents.length);
  documents.push(...newDocuments);

  return "";
};
