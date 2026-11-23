---
'@graphcommerce/graphql': patch
---

Renew the SSR Apollo client at the first query after a publish.

`graphqlSsrClient()` decided with `renewSignal()` if its client was older than the renew signal. That function is synchronous and returned the value of the previous read, so the first `getStaticProps` after a publish kept the old client and rendered from the cache of before the publish. With on-demand revalidation, that render was often the revalidated page.

The new `renewableSsrClient()` makes the check in `query()`, which can wait for the signal. After a publish, the queries go to a new client. `refreshRenewSignal()` now gives callers that start during a read the result of that read. `renewSignal()` is removed.

Change `lib/graphql/graphqlSsrClient.ts` in your project:

```diff
-const ssrClient: {
-  [locale: string]: { instancedAt: number; client: ApolloClient }
-} = {}
+const ssrClient: { [locale: string]: ApolloClient } = {}
```

```diff
-  const signal = renewSignal()
-  const existing = ssrClient[locale]
-  if (existing && signal !== undefined && existing.instancedAt < signal) delete ssrClient[locale]
-
-  if (!ssrClient[locale])
-    ssrClient[locale] = { instancedAt: Date.now(), client: client(context, 'no-cache') }
-
-  return ssrClient[locale].client
+  ssrClient[locale] ??= renewableSsrClient(() => client(context, 'no-cache'))
+  return ssrClient[locale]
```
