# GraphQL Mesh

GraphQL Mesh is a framework that helps shape and build an executable GraphQL
schema from multiple data sources.

## Differences between standard GraphQL Mesh

1. All the configurations are passed through the
   `@graphcommerce/graphql-mesh/meshConfig` method which allows you to create
   plugins for the mesh configuration
2. Backend requests are automatically retried with an exponential backoff
   strategy.
3. `additionalTypeDefs`, `additionalResolver`, `sources.handlers.openapi.source`
   accept module patterns `@graphcommerce/my-package/resolver.ts`
4. `*.graphqls` files are automatically loaded from the project root.
5. For all packages `schema/**/*.graphqls` are automatically loaded.
6. Magento version based graphql schema files are automatically loaded from
   their respective `schema246` / `schema247` etc. folders.

## Configuration

To make modifications to the Mesh configuration, you can:

1. Modify the meshrc.yaml to make it suit your needs.
2. Write a plugin.

### Modify the meshrc.yaml:

You can always modify the base configuration of the Mesh by modifying the
`meshrc.yaml` file. After making always run `yarn codegen` (this can be in a
separate terminal and nextjs will reload it).

### Write a plugin:

1. Create a plugin file something like this:
   plugins/meshConfigMyModifications.ts

```tsx
import type { meshConfig as meshConfigBase } from '@graphcommerce/graphql-mesh/meshConfig'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  module: '@graphcommerce/graphql-mesh/meshConfig',
  type: 'function',
}

export const meshConfig: FunctionPlugin<typeof meshConfigBase> = (
  prev,
  baseConfig,
  graphCommerceConfig,
) => {
  prev({
    ...baseConfig,
    sources: [
      ...baseConfig.sources,
      {
        name: 'mySource',
        handler: {
          graphql: {
            endpoint: 'https://my-source.com/graphql',
          },
        },
      },
    ],
    additionalResolvers: [
      ...(baseConfig.additionalResolvers ?? []),
      'lib/resolvers/my-feature.ts',
    ],
  })
}
```

### Creating additional schema's

During development it might come in handy to write schema extensions even before
any backend work has been done. `AnyFile.graphqls` in the graphql directory will
automatically be picked up and merged with the rest of the schema.

### Creating additional resolvers

In the plugin add additionalResolvers and point to your ts file where the
resolver is.

```tsx
// This MUST be a type import, else there will be a circular dependency.
import type { Resolvers } from '@graphcommerce/graphql-mesh'

const resolvers: Resolvers = {}
```

To make sure changes are picked up during development set the config value
`graphqlMeshEditMode: true` in your graphcommerce.config.js or set the env
variable `GC_GRAPHQL_MESH_EDIT_MODE=1`. This _will_ make the frontend
considerably slower.
