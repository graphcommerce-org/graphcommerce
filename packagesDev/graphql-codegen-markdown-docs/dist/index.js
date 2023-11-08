"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = void 0;
const plugin_helpers_1 = require("@graphql-codegen/plugin-helpers");
const graphql_1 = require("graphql");
/** Converts input type to markdown document. */
const plugin = (schema, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_documents, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
config) => {
    const astNode = (0, plugin_helpers_1.getCachedDocumentNodeFromSchema)(schema);
    const enumStings = new Map();
    const descriptionText = (node) => {
        if (!node.description) {
            console.warn(`Missing description for ${node.name}`);
        }
        return node.description ? `\n\n${node.description}` : '';
    };
    const possibleScalars = {
        Boolean: 'boolean',
        String: 'string',
        Int: 'number',
        Float: 'number',
        ID: 'string',
    };
    const content = (0, graphql_1.visit)(astNode, {
        Document: {
            leave: (node) => `<!-- Automatically generated from Config.graphqls -->${node.definitions
                .filter(Boolean)
                .join('\n')}`,
        },
        Name: { leave: (node) => node.value },
        NamedType: {
            leave: (node) => {
                return possibleScalars[node.name] ?? `[\`${node.name}\`](#${node.name})`;
            },
        },
        StringValue: { leave: (node) => node.value },
        BooleanValue: {
            leave: (node) => (node.value ? 'true' : 'false'),
        },
        EnumValue: { leave: (node) => node.value },
        IntValue: { leave: (node) => node.value },
        ObjectValue: {
            leave: (node) => {
                const fields = node.fields.join(', ') ?? '';
                return `{ ${fields} }`;
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
                const defaultValue = node.defaultValue ? ` = ${node.defaultValue}` : '';
                return `${node.name}: ${node.type}${defaultValue}${descriptionText(node)}`;
            },
        },
        InputObjectTypeDefinition: {
            enter: (node) => ({
                ...node,
                // Move required fields to the top.
                fields: [...(node.fields ?? [])].sort((a, b) => a.type.kind === 'NonNullType' && b.type.kind !== 'NonNullType' ? -1 : 1),
            }),
            leave: (node) => {
                const text = descriptionText(node);
                const title = text.trimStart().startsWith('#')
                    ? `${text.trimStart()}\n\n### ${node.name}`
                    : `### ${node.name}${text}`;
                return `\n${title}\n${node.fields?.map((f) => `\n#### ${f}`).join('\n')}`;
            },
        },
        EnumValueDefinition: {
            leave: (node) => `${node.name} ${node.description ? `: ${node.description}` : ''}`,
        },
        EnumTypeDefinition: {
            leave: (node) => {
                enumStings.set(node.name, node.values?.join('\n') || '');
                return `\n### ${node.name} (enum) ${node.description ? `\n\n${node.description}` : ''}\n\n${node.values?.map((v) => `- ${v}`)?.join('\n')}`;
            },
        },
    });
    return { content };
};
exports.plugin = plugin;
