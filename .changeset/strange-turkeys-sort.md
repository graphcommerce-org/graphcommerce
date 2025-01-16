---
'@graphcommerce/graphql-mesh': patch
---

GraphQL Mesh will now be in read-only mode by default, so only a single instance is created globally. This means it doesn't get recreated on each page compilation and fast refresh. Creating the instance is an expensive operation and can take multiple seconds and during development (and this can happen multiple times during a single change). Now only a single instance is created during development. To make sure changes are picked up during development set the config value `graphqlMeshEditMode: true` in your graphcommerce.config.js or set the env variable `GC_GRAPHQL_MESH_EDIT_MODE=1`. This _will_ make the frontend considerably slower.
