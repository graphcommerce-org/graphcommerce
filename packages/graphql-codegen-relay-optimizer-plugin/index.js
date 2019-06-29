"use strict";

const { parse } = require("graphql/language");
const { GraphQLCompilerContext } = require("relay-compiler");
const InlineFragmentsTransform = require("relay-compiler/lib/InlineFragmentsTransform");
const SkipRedundantNodesTransform = require("relay-compiler/lib/SkipRedundantNodesTransform");
const RelayApplyFragmentArgumentTransform = require("relay-compiler/lib/RelayApplyFragmentArgumentTransform");
const FlattenTransform = require("relay-compiler/lib/FlattenTransform");
const RelayParser = require("relay-compiler/lib/RelayParser");
const GraphQLIRPrinter = require("relay-compiler/lib/GraphQLIRPrinter");
const { transformASTSchema } = require("relay-compiler/lib/ASTConvert");

module.exports.plugin = (schema, documents) => {
  // @TODO way for users to define directives they use, otherwise relay will throw an unknown directive error
  // Maybe we can scan the queries and add them dynamically without users having to do some extra stuff
  // transformASTSchema creates a new schema instance instead of mutating the old one
  const adjustedSchema = transformASTSchema(schema, [
    `
  directive @connection(
    key: String!
  ) on FIELD
  directive @client on FIELD
  `
  ]);
  const documentAsts = documents.reduce((prev, v) => {
    return [...prev, ...v.content.definitions];
  }, []);

  const relayDocuments = RelayParser.transform(adjustedSchema, documentAsts);

  const fragmentCompilerContext = new GraphQLCompilerContext(
    adjustedSchema
  ).addAll(relayDocuments);

  const fragmentDocuments = fragmentCompilerContext
    .documents()
    .filter(doc => doc.kind === "Fragment");

  const queryCompilerContext = new GraphQLCompilerContext(adjustedSchema)
    .addAll(relayDocuments)
    .applyTransforms([
      RelayApplyFragmentArgumentTransform.transform,
      InlineFragmentsTransform.transform,
      FlattenTransform.transformWithOptions({ flattenAbstractTypes: true }),
      SkipRedundantNodesTransform.transform
    ]);

  const newQueryDocuments = queryCompilerContext.documents().map(doc => ({
    filePath: "optimized by relay",
    content: parse(GraphQLIRPrinter.print(doc))
  }));

  const newDocuments = [
    ...fragmentDocuments.map(doc => ({
      filePath: "optimized by relay",
      content: parse(GraphQLIRPrinter.print(doc))
    })),
    ...newQueryDocuments
  ];

  documents.splice(0, documents.length);
  documents.push(...newDocuments);

  return {
    content: ""
  };
};
