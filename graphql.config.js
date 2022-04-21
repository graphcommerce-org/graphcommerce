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
    MagentoGraphCms: {
      schema: [
        'packages/graphql-mesh/.mesh/schema.graphql',
        'packagesDev/graphql-codegen-near-operation-file/src/injectable.graphqls',
      ],
      documents: ['examples/magento-graphcms/components/**/*.graphql', 'packages/**/*.graphql'],
      extensions: {
        languageService: {
          useSchemaFileDefinitions: true,
        },
        endpoints: {
          default: {
            url: 'http://localhost:3000/api/graphql/',
          },
        },
      },
    },
  },
}
