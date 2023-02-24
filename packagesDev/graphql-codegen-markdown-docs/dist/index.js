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
    const res = (0, graphql_1.visit)(astNode, {
        Document: {
            leave: (node) => `<!-- auto generated -->${node.definitions.filter(Boolean).join('\n')}`,
        },
        Name: { leave: (node) => node.value },
        NamedType: { leave: (node) => node.name },
        StringValue: { leave: (node) => node.value },
        ListType: { leave: (node) => `[${node.type}]` },
        NonNullType: { leave: (node) => `${node.type}!` },
        InputValueDefinition: {
            leave: (node) => {
                const { type } = node;
                return `\`${node.name}: ${type}\`${descriptionText(node)}`;
            },
        },
        InputObjectTypeDefinition: {
            enter: (node) => ({
                ...node,
                // Move required fields to the top.
                fields: [...(node.fields ?? [])].sort((a, b) => a.type.kind === 'NonNullType' && b.type.kind !== 'NonNullType' ? -1 : 1),
            }),
            leave: (node) => `\n## ${node.name}${descriptionText(node)}
${node.fields?.map((f) => `\n### ${f}`).join('\n')}`,
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
    return {
        // prepend: buildImports(),
        content: [res].join('\n'),
    };
};
exports.plugin = plugin;
