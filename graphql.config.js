/**
 * GraphQL Configuration
 *
 * [GraphQL VSCode exstension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql)
 *
 * Todo(paales): implement environment variables support:
 *
 * - https://github.com/graphql/vscode-graphql/pull/267
 * - https://github.com/graphql/vscode-graphql/issues/257
 * - https://github.com/graphql/vscode-graphql/issues/127
 */
module.exports = {
  projects: {
    soxbase: {
      schema: 'examples/soxbase-api/generated/schema.graphqls',
      documents: ['examples/**/*.graphql', 'packages/**/*.graphql'],
      extensions: {
        languageService: {
          useSchemaFileDefinitions: true,
        },
        endpoints: {
          default: {
            url: 'http://localhost:3001/api/graphql/',
          },
        },
      },
    },
  },
}
