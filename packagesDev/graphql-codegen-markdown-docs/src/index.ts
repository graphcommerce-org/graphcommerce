import { PluginFunction, Types } from '@graphql-codegen/plugin-helpers'
import { getCachedDocumentNodeFromSchema } from '@graphql-codegen/plugin-helpers'
import { GraphQLSchema, visit } from 'graphql'
import { MarkdownDocsPluginConfig } from './config'

/** Converts input type to markdown document. */
export const plugin: PluginFunction<MarkdownDocsPluginConfig, Types.ComplexPluginOutput> = (
  schema: GraphQLSchema,
  _documents: Types.DocumentFile[],
  config: MarkdownDocsPluginConfig,
): Types.ComplexPluginOutput => {
  const astNode = getCachedDocumentNodeFromSchema(schema)

  const enumStings = new Map<string, string>()

  const descriptionText = (node: { description?: string; name: string }) => {
    if (!node.description) {
      console.warn(`Missing description for ${node.name}`)
    }
    return node.description ? `\n\n${node.description}` : ''
  }

  const possibleScalars = ['Boolean', 'String', 'Int', 'Float', 'ID']

  const content = visit<string>(astNode, {
    Document: {
      leave: (node) =>
        `<!-- Automatically generated from Config.graphqls -->${node.definitions
          .filter(Boolean)
          .join('\n')}`,
    },
    Name: { leave: (node) => node.value },
    NamedType: {
      leave: (node) =>
        possibleScalars.includes(node.name) ? node.name : `[${node.name}](#${node.name})`,
    }, // String, Boolean, GraphCommerceDebugConfig, etc.
    StringValue: { leave: (node) => node.value },
    ListType: { leave: (node) => `[${node.type}]` },
    NonNullType: {
      leave: (node) => `${node.type}!`,
    },
    InputValueDefinition: {
      leave: (node) => `\`${node.name}: ${node.type}\`${descriptionText(node)}`,
    },
    InputObjectTypeDefinition: {
      enter: function (node) {
        return {
          ...node,
          // Move required fields to the top.
          fields: [...(node.fields ?? [])].sort((a, b) =>
            a.type.kind === 'NonNullType' && b.type.kind !== 'NonNullType' ? -1 : 1,
          ),
        }
      },
      leave: (node) => {
        const title = descriptionText(node).trimStart().startsWith('#')
          ? `${descriptionText(node).trimStart()}\n\n### ${node.name}`
          : `### ${node.name}${descriptionText(node)}`

        return `\n${title}\n${node.fields?.map((f) => `\n#### ${f}`).join('\n')}`
      },
    },
    EnumValueDefinition: {
      leave: (node) => `${node.name} # ${node.description}`,
    },
    EnumTypeDefinition: {
      leave: (node) => {
        enumStings.set(node.name, node.values?.join('\n') || '')
        return ''
      },
    },
  })

  return { content }
}
