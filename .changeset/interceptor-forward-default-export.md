---
'@graphcommerce/next-config': patch
---

Interceptors now forward the original module's default export. `export * from './X.original'` does not re-export `default` (ES semantics), so intercepting a module with a default export silently dropped it. This broke `gc-mesh build` when a plugin targeted `@graphcommerce/graphql-mesh/customFetch`: GraphQL Mesh resolves the fetch function via `exported.default || exported` and received the module namespace instead of the function, failing schema introspection with `Cannot read properties of undefined (reading '__schema')`.
