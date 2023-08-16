/**
 * GraphQL Configuration
 *
 * [GraphQL VSCode extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql)
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
        'examples/magento-graphcms/.mesh/schema.graphql',
        'packagesDev/graphql-codegen-near-operation-file/src/directive/env.graphqls',
        'packagesDev/graphql-codegen-near-operation-file/src/directive/injectable.graphqls',
      ],
      documents: [
        'examples/magento-graphcms/components/**/*.graphql',
        'examples/magento-graphcms/graphql/**/*.graphql',
        'packages/**/*.graphql',
      ],
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
      exclude: 'packages/hygraph-cli/readSchema.ts',
    },
  },
}
