"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = void 0;
const plugin_helpers_1 = require("@graphql-codegen/plugin-helpers");
const graphql_1 = require("graphql");
/** Converts input type to markdown document. */
const plugin = (schema, _documents, config) => {
    const astNode = (0, plugin_helpers_1.getCachedDocumentNodeFromSchema)(schema);
    const enumStings = new Map();
    const descriptionText = (node) => {
        if (!node.description) {
            console.warn(`Missing description for ${node.name}`);
        }
        return node.description ? `\n\n${node.description}` : '';
    };
    const possibleScalars = ['Boolean', 'String', 'Int', 'Float', 'ID'];
    const content = (0, graphql_1.visit)(astNode, {
        Document: {
            leave: (node) => `<!-- Automatically generated from Config.graphqls -->${node.definitions
                .filter(Boolean)
                .join('\n')}`,
        },
        Name: { leave: (node) => node.value },
        NamedType: {
            leave: (node) => possibleScalars.includes(node.name) ? node.name : `[${node.name}](#${node.name})`,
        },
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
                    fields: [...(node.fields ?? [])].sort((a, b) => a.type.kind === 'NonNullType' && b.type.kind !== 'NonNullType' ? -1 : 1),
                };
            },
            leave: (node) => {
                const title = descriptionText(node).trimStart().startsWith('#')
                    ? `${descriptionText(node).trimStart()}\n\n### ${node.name}`
                    : `### ${node.name}${descriptionText(node)}`;
                return `\n${title}\n${node.fields?.map((f) => `\n#### ${f}`).join('\n')}`;
            },
        },
        EnumValueDefinition: {
            leave: (node) => `${node.name} # ${node.description}`,
        },
        EnumTypeDefinition: {
            leave: (node) => {
                enumStings.set(node.name, node.values?.join('\n') || '');
                return '';
            },
        },
    });
    return { content };
};
exports.plugin = plugin;
