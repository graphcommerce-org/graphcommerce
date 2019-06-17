"use strict";

const { parse, visit, BREAK } = require("graphql/language");
const { printSchema } = require("graphql/utilities");
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

  const fragmentCompilerContext = new GraphQLCompilerContext(schema).addAll(
    relayDocuments
  );

  const fragmentDocuments = fragmentCompilerContext
    .documents()
    .filter(doc => doc.kind === "Fragment");

  fragmentCompilerContext.applyTransforms([
    RelayApplyFragmentArgumentTransform.transform,
    FlattenTransform.transformWithOptions({ flattenAbstractTypes: true })
  ]);

  const queryDocuments = fragmentCompilerContext
    .documents()
    .filter(doc => doc.kind === "Root" && doc.operation === "query");

  const queryCompilerContext = new GraphQLCompilerContext(schema)
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

  const fragmentOutput = fragmentDocuments.map(doc => {
    let queryName = doc.name.split("_")[0];
    if (!queryName) {
      return "";
    }
    const query = queryDocuments.find(query => query.name === queryName);

    if (!query) {
      console.warn(
        `Fragment '${doc.name}' uses relay notation but no query was found.`
      );
      return "";
    }
    const queryAst = parse(GraphQLIRPrinter.print(query));

    // @TODO: there might be multiple selection paths that use this fragment
    // build path on generated type
    const selectionPath = [];
    let currentSelectionSet = null;

    visit(queryAst, {
      enter: (node, key, parent) => {
        if (node.kind === "SelectionSet") {
          currentSelectionSet = node;
          if (parent.kind === "OperationDefinition") {
            selectionPath.push({
              type: "query",
              name: parent.name.value
            });
          } else {
            selectionPath.push({
              type: parent.kind,
              name: parent.name.value
            });
          }
        } else if (
          currentSelectionSet &&
          node.kind === "FragmentSpread" &&
          node.name.value === doc.name
        ) {
          return BREAK;
        }
      },
      leave: (node, key, parent) => {
        if (node === currentSelectionSet) {
          currentSelectionSet = null;
          const indexFromEnd = selectionPath
            .slice(0)
            .reverse()
            .findIndex(item => item.name === parent.name.value);

          selectionPath.splice(
            selectionPath.length - indexFromEnd - 1,
            selectionPath.length
          );
        }
      }
    });

    // @TODO: handle plural fragments
    let isPlural = false;

    if (!selectionPath.length) {
      return "";
    }

    const dataKeyName = selectionPath[selectionPath.length - 1].name;
    const dataKeyType = selectionPath.reduce((value, current, index) => {
      if (index === 0) {
        return `${current.name}Query`;
      }
      return `${value}["${current.name}"]`;
    }, "");

    const title = doc.name.replace("_", "Query");

    const propsName = `With${title}FragmentContainerProps`;

    return `export type ${propsName} = {
  "${dataKeyName}": ${dataKeyType};
};
export const create${title}FragmentContainer = <
  TPassTroughProps extends ${propsName},
>(
  Component: React.ComponentType<
    Omit<TPassTroughProps, keyof ${propsName}> & {
      "${dataKeyName}": ${doc.name}Fragment;
    }
  >
):React.FC<TPassTroughProps> => {
  return ({ ["${dataKeyName}"]: rawData, ...props }) => {
    return <Component {...{
      ["${dataKeyName}"]: filter<${doc.name}Fragment>(${doc.name}FragmentDoc, rawData),
      ...props
    }} />;
  };
};`;
  });

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
    content: "",
    append: fragmentOutput,
    prepend: ["import { filter } from 'graphql-anywhere';"]
  };
};
