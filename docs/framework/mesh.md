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

## Routing Magento traffic over an internal network

When the frontend runs next to Magento — e.g. both in the same Kubernetes
cluster — the mesh's server-side Magento requests (GraphQL and REST) can be
routed directly to an internal Service instead of hairpinning over the public
load balancer. Set in the **runtime** environment (e.g. a Kubernetes
ConfigMap):

```
GC_MAGENTO_ENDPOINT_SERVER=http://varnish.magento-namespace.svc.cluster.local
```

Every request whose URL starts with the origin of `GC_MAGENTO_ENDPOINT` is
rewritten to this origin, so both the GraphQL endpoint and the REST endpoint
are covered. `GC_MAGENTO_ENDPOINT` itself stays the public URL: it keeps
feeding build-time schema introspection, `images.remotePatterns` and the media
URLs Magento generates. The rewrite also sends `X-Forwarded-Proto: https`,
which the TLS-terminating proxy would normally add — Magento needs it to keep
generating `https://` URLs.

Caveats:

- Both `GC_MAGENTO_ENDPOINT_SERVER` and `GC_MAGENTO_ENDPOINT` must be present
  in the runtime environment; the rewrite happens per request at runtime.
- Do **not** set `GC_MAGENTO_ENDPOINT_SERVER` in the build environment: schema
  introspection (`gc-mesh build`) and static generation run where the internal
  endpoint is typically not reachable. Unset, the feature is a no-op.
- Point it at the Varnish service (not the webserver directly) to keep
  Magento's GraphQL full-page cache in the path.
- When a NetworkPolicy guards the Magento namespace, allow ingress from the
  frontend namespace to the Varnish pods.
