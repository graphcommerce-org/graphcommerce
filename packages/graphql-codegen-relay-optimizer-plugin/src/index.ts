import { GraphQLSchema, parse, printSchema, DefinitionNode } from "graphql";
import { Types, PluginFunction } from "@graphql-codegen/plugin-helpers";

import { Parser as RelayParser } from "relay-compiler";
import CompilerContext from "relay-compiler/lib/core/CompilerContext";
import { create as relayCreate } from "relay-compiler/lib/core/Schema";
import { print as relayPrint } from "relay-compiler/lib/core/IRPrinter";

import { transform as skipRedundantNodesTransform } from "relay-compiler/lib/transforms/SkipRedundantNodesTransform";
import { transform as inlineFragmentsTransform } from "relay-compiler/lib/transforms/InlineFragmentsTransform";
import { transform as applyFragmentArgumentTransform } from "relay-compiler/lib/transforms/ApplyFragmentArgumentTransform";
import { transformWithOptions as flattenTransformWithOptions } from "relay-compiler/lib/transforms/FlattenTransform";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RelayOptimizerPluginConfig {}

export const plugin: PluginFunction<RelayOptimizerPluginConfig> = (
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  _config: RelayOptimizerPluginConfig
) => {
  // @TODO way for users to define directives they use, otherwise relay will throw an unknown directive error
  // Maybe we can scan the queries and add them dynamically without users having to do some extra stuff
  // transformASTSchema creates a new schema instance instead of mutating the old one
  const adjustedSchema = relayCreate(printSchema(schema)).extend([
    /* GraphQL */ `
      directive @connection(key: String!, filter: [String!]) on FIELD
      directive @client on FIELD
    `
  ]);

  const documentAsts = documents.reduce((prev, v) => {
    return [...prev, ...v.content.definitions];
  }, [] as DefinitionNode[]);

  const relayDocuments = RelayParser.transform(adjustedSchema, documentAsts);

  const fragmentCompilerContext = new CompilerContext(adjustedSchema).addAll(
    relayDocuments
  );

  const fragmentDocuments = fragmentCompilerContext
    .applyTransforms([
      applyFragmentArgumentTransform,
      flattenTransformWithOptions({ flattenAbstractTypes: false }),
      skipRedundantNodesTransform
    ])
    .documents()
    .filter(doc => doc.kind === "Fragment");

  const queryCompilerContext = new CompilerContext(adjustedSchema)
    .addAll(relayDocuments)
    .applyTransforms([
      applyFragmentArgumentTransform,
      inlineFragmentsTransform,
      flattenTransformWithOptions({ flattenAbstractTypes: false }),
      skipRedundantNodesTransform
    ]);

  const newQueryDocuments = queryCompilerContext.documents().map(doc => ({
    filePath: "optimized by relay",
    content: parse(relayPrint(adjustedSchema, doc))
  }));

  const newDocuments = [
    ...fragmentDocuments.map(doc => ({
      filePath: "optimized by relay",
      content: parse(relayPrint(adjustedSchema, doc))
    })),
    ...newQueryDocuments
  ];

  documents.splice(0, documents.length);
  documents.push(...newDocuments);

  return {
    content: ""
  };
};
