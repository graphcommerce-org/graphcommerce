/* eslint-disable @typescript-eslint/no-non-null-assertion */

import CompilerContext from '@ardatan/relay-compiler/lib/core/CompilerContext'
import { print as relayPrint } from '@ardatan/relay-compiler/lib/core/IRPrinter'
import { transform as relayParserTransform } from '@ardatan/relay-compiler/lib/core/RelayParser'
import { create as relayCreate } from '@ardatan/relay-compiler/lib/core/Schema'
import { transform as applyFragmentArgumentTransform } from '@ardatan/relay-compiler/lib/transforms/ApplyFragmentArgumentTransform'
import { transformWithOptions as flattenTransformWithOptions } from '@ardatan/relay-compiler/lib/transforms/FlattenTransform'
import { transform as inlineFragmentsTransform } from '@ardatan/relay-compiler/lib/transforms/InlineFragmentsTransform'
import { transform as skipRedundantNodesTransform } from '@ardatan/relay-compiler/lib/transforms/SkipRedundantNodesTransform'
import { Types, PluginFunction } from '@graphql-codegen/plugin-helpers'
import { GraphQLSchema, parse, printSchema, DefinitionNode, visit } from 'graphql'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RelayOptimizerPluginConfig {}

function isFragment(documentFile: Types.DocumentFile) {
  let name = false
  if (!documentFile.document) return false

  visit(documentFile.document, {
    FragmentDefinition: () => {
      name = true
    },
  })
  return name
}

export const plugin: PluginFunction<RelayOptimizerPluginConfig> = (
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _config: RelayOptimizerPluginConfig,
) => {
  const isFrag = documents.every((d) => isFragment(d))

  if (isFrag) return { content: '' }

  // @TODO way for users to define directives they use, otherwise relay will throw an unknown directive error
  // Maybe we can scan the queries and add them dynamically without users having to do some extra stuff
  // transformASTSchema creates a new schema instance instead of mutating the old one
  const adjustedSchema = relayCreate(printSchema(schema)).extend([
    /* GraphQL */ `
      directive @connection(key: String!, filter: [String!]) on FIELD
      directive @client on FIELD
      directive @defer(if: Boolean! = true, label: String) on FRAGMENT_SPREAD | INLINE_FRAGMENT
    `,
  ])

  const documentAsts = documents.reduce(
    (prev, v) => [...prev, ...(v.document?.definitions ?? [])],
    [] as DefinitionNode[],
  )

  const relayDocuments = relayParserTransform(adjustedSchema, documentAsts)

  const fragmentCompilerContext = new CompilerContext(adjustedSchema).addAll(relayDocuments)

  const fragmentDocuments = fragmentCompilerContext
    .applyTransforms([
      applyFragmentArgumentTransform,
      flattenTransformWithOptions({ flattenAbstractTypes: false }),
      skipRedundantNodesTransform,
    ])
    .documents()
    .filter((doc) => doc.kind === 'Fragment')

  const queryCompilerContext = new CompilerContext(adjustedSchema)
    .addAll(relayDocuments)
    .applyTransforms([
      applyFragmentArgumentTransform,
      inlineFragmentsTransform,
      flattenTransformWithOptions({ flattenAbstractTypes: false }),
      skipRedundantNodesTransform,
    ])

  const newQueryDocuments: Types.DocumentFile[] = queryCompilerContext.documents().map((doc) => ({
    location: 'optimized by relay',
    document: parse(relayPrint(adjustedSchema, doc)),
  }))

  let newDocuments: Types.DocumentFile[] = []
  if (newQueryDocuments.length === 0) {
    return { content: '' }
  }
  if (newQueryDocuments.length === 1) {
    newDocuments = newQueryDocuments
  } else {
    newDocuments = [
      ...fragmentDocuments.map((doc) => ({
        location: 'optimized by relay',
        document: parse(relayPrint(adjustedSchema, doc)),
      })),
      ...newQueryDocuments,
    ]
  }

  documents.splice(0, documents.length)
  documents.push(...newDocuments)

  return {
    content: '',
  }
}
