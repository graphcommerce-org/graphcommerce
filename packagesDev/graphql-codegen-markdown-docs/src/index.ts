import {
  PluginFunction,
  Types,
  getCachedDocumentNodeFromSchema,
} from '@graphql-codegen/plugin-helpers'
import { GraphQLSchema, visit } from 'graphql'
import { MarkdownDocsPluginConfig } from './config'

/** Converts input type to markdown document. */
export const plugin: PluginFunction<MarkdownDocsPluginConfig, Types.ComplexPluginOutput> = (
  schema: GraphQLSchema,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _documents: Types.DocumentFile[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const possibleScalars: Record<string, string> = {
    Boolean: 'boolean',
    String: 'string',
    Int: 'number',
    Float: 'number',
    ID: 'string',
  }

  const content = visit<string>(astNode, {
    Document: {
      leave: (node) =>
        `<!-- Automatically generated from Config.graphqls -->${node.definitions
          .filter(Boolean)
          .join('\n')}`,
    },
    Name: { leave: (node) => node.value },
    NamedType: {
      leave: (node) => {
        return possibleScalars[node.name] ?? `[\`${node.name}\`](#${node.name})`
      },
    }, // String, Boolean, GraphCommerceDebugConfig, etc.
    StringValue: { leave: (node) => node.value },
    BooleanValue: {
      leave: (node) => (node.value ? 'true' : 'false'),
    },
    EnumValue: { leave: (node) => node.value },
    IntValue: { leave: (node) => node.value },
    ObjectValue: {
      leave: (node) => {
        const fields = node.fields.join(', ') ?? ''
        return `{ ${fields} }`
      },
    },
    FloatValue: { leave: (node) => node.value },
    ListType: { leave: (node) => `${node.type}[]` },
    ObjectField: { leave: (node) => `${node.name}: ${node.value}` },
    NonNullType: {
      leave: (node) => `${node.type}!`,
    },
    InputValueDefinition: {
      leave: (node) => {
        const defaultValue = node.defaultValue ? ` = ${node.defaultValue}` : ''
        return `${node.name}: ${node.type}${defaultValue}${descriptionText(node)}`
      },
    },
    InputObjectTypeDefinition: {
      enter: (node) => ({
        ...node,
        // Move required fields to the top.
        fields: [...(node.fields ?? [])].sort((a, b) =>
          a.type.kind === 'NonNullType' && b.type.kind !== 'NonNullType' ? -1 : 1,
        ),
      }),
      leave: (node) => {
        const text = descriptionText(node)
        const title = text.trimStart().startsWith('#')
          ? `${text.trimStart()}\n\n### ${node.name}`
          : `### ${node.name}${text}`

        return `\n${title}\n${node.fields?.map((f) => `\n#### ${f}`).join('\n')}`
      },
    },
    EnumValueDefinition: {
      leave: (node) => `${node.name} ${node.description ? `: ${node.description}` : ''}`,
    },
    EnumTypeDefinition: {
      leave: (node) => {
        enumStings.set(node.name, node.values?.join('\n') || '')

        return `\n### ${node.name} (enum) ${
          node.description ? `\n\n${node.description}` : ''
        }\n\n${node.values?.map((v) => `- ${v}`)?.join('\n')}`
      },
    },
  })

  return { content }
}
