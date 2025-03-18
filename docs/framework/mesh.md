# GraphQL Mesh

[GraphQL Mesh](https://the-guild.dev/graphql/mesh) is a framework that helps
shape and build an executable GraphQL schema from multiple data sources.

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

Create a plugin file something like this: `plugins/meshConfigMyModifications.ts`

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
any backend work has been done. `AnyFile.graphqls` in the `graphql` directory
will automatically be picked up and merged with the rest of the schema.

### Creating additional resolvers

In the plugin add `additionalResolvers` and point to your ts file where the
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

## Response caching

[GraphQL Mesh docs](https://the-guild.dev/graphql/mesh/docs/plugins/response-caching).
By default no queries are cached as various other systems will have their own
caching mechanisms.

Adding cache can be done by adding the `@cacheControl` directive to a schema
definition.

```graphql
extend type StoreConfig @cacheControl(maxAge: 1000, scope: PUBLIC) {
  # When extending a type a value is required. This value is never used since we're only interested in the schema definition.
  _cached: Boolean
}
```

### When to cache?

In general: If a backend offers it's own caching and it is 'fast enough' we
advise against caching in the mesh, however there are situations where this
makes sense. You might want to introduce caching when:

1. You are ok with possible stale values.
2. The query is part of the critical render path and you need it to be faster.
3. You have a cache invalidation logic to handle cache invalidation.
4. You are already caching in-memory now and need the cache to be shared between
   processes.

### Invalidating caches

To invalidate caches that are created you can run the following mutation:

```graphql
mutation Invalidate {
  invalidateCacheEntities(entities: [{ typename: "StoreConfig" }])
}
```

A second argument id is also allowed and allows you to invalidate specific
entities.

### Configuring the cache

By default the response cache is stored in memory. This works, but doesn't allow
