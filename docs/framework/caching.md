# Caching

Caching can be a complex topic especially when you have multiple layers of
caching.

- [Cache on the server](#caching-on-the-server)
- [Cache in the browser](#caching-in-the-browser)
- [Cache in the service worker](#caching-in-the-service-worker)
- [Cache invalidation limitations](#cache-invalidation-limitations)

## Caching on the server

### During development

- Next.js will not cache any requests
- Magento will cache GraphQL calls. This is done by Magento itself, not by
  GraphCommerce.

### How long will a page be cached (getStaticProps)?

GraphCommerce uses
[Incremental Static Regeneration (ISR)](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration#on-demand-revalidation)
to cache pages with getStaticProps.

> If you set a revalidate time of 60, all visitors will see the same generated
> version of your site for one minute. The only way to invalidate the cache is
> from someone visiting that page after the minute has passed.

The length is determined by the `revalidate` property on the object that is
returned by `getStaticProps`. In GraphCommerce
[we use 60 \* 20](https://github.com/search?q=repo%3Agraphcommerce-org%2Fgraphcommerce+revalidate%3A++path%3A%2F%5Eexamples%5C%2Fmagento-graphcms%5C%2Fpages%5C%2F%2F&type=code).

This means that a cache will be regenerated when:

1. 20 minutes has passed
2. A new request is made to the page

Note: A page will never fall out of the cache if it is not requested. Even if
this is a very long time. In practice this can be _days_.

## How long will a page be cached (getServerSideProps)

Not all pages use getStaticProps, a
[few pages that are not static use getServerSideProps](https://github.com/search?q=repo%3Agraphcommerce-org%2Fgraphcommerce+getServerSideProps+path%3A%2F%5Eexamples%5C%2Fmagento-graphcms%5C%2Fpages%5C%2F%2F&type=code)

The pages that do not use ISR are `/c/[...url]` and `/search/[...url]` which are
filtered pages. These pages are not cached by the server at all.

Even though the `/c/[...url]` page
[sets a Cache-Control header](https://github.com/graphcommerce-org/graphcommerce/blob/canary/examples/magento-graphcms/pages/c/%5B...url%5D.tsx#L14-L17)
it isn't cached by Cloudflare and isn't cached by the browser / service worker.

### What happens when a backend is offline?

If a page is rendered with getStaticProps and the had been rendered before, it
will keep showing the old page. If the page hadn't been rendered before, it will
show a 500 error.

### How does caching work with Magento GraphQL?

Magento caches GraphQL queries that are send as GET requests (which are all
queries from GraphCommerce) and have a `@cache` directive configured in the
schema.

[Magento caches certain queries in GraphQL](https://developer.adobe.com/commerce/webapi/graphql/usage/caching/#cached-and-uncached-queries),
the following are relevant for GraphCommerce: `categories`, `products`, `route`.
You can also find out what is cached by doing a
[search in the Magento codebase](https://github.com/search?q=repo%3Amagento%2Fmagento2+%40cache%28cacheIdentity+path%3A*.graphqls&type=code).

Cache invalidation is using the same system as any page that is cached in
Varnish.
[GraphQL invalidation docs](https://developer.adobe.com/commerce/webapi/graphql/usage/caching/#cache-invalidation)

### ApolloClient InMemory cache used on the server

By default a GraphQL API call is _not_ cached, but by configuring fetchPolicy:
'cache-first' when running the query, we can cache the response of a GraphQL API
call.

To reduce the API calls to certain backends, we use an in-memory cache on the
server. There are two queries that are cached by ApolloClient's InMemory cache:

- Layout query
  [`staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })`](https://github.com/graphcommerce-org/graphcommerce/blob/7728774cd7e9a4463508a99344b177877e3c826b/examples/magento-graphcms/pages/%5B...url%5D.tsx#L156)
- HygraphAllPages query
  [`await client.query({ query: HygraphAllPagesDocument, fetchPolicy: alwaysCache })`](https://github.com/graphcommerce-org/graphcommerce/blob/7728774cd7e9a4463508a99344b177877e3c826b/packages/hygraph-ui/lib/hygraphPageContent.ts#L31)

We do this because this reduces the amount of GraphQL requests made to Hygraph
about 100x. The Layout and HygraphAllPages query would else be request on _all_
pages.

The InMemory cache is kept indefinitely, it is never flushed! There currently is
no way to flush this cache. This means that while a serverless funtion is
running or a node process is running the cache will be kept in memory:

- For serverless functions (Vercel) this isn't a problem as they are killed
  after a few minutes.
- For node.js processes this means that they _need_ to be restarted every now
  and then. (a few times a day is fine)

## Caching in the browser

### Apollo Client caching in the browser

By default all the information stored in the ApolloClient InMemory cache is also
persisted to localStorage. When the page is loaded, the cache is restored from
localStorage.

Apollo Client tries and use the cache as much as possible. This means that
multiple useQuery calls with the same query+variables will return the same
result and all use the cache (default `fetchPolicy: 'cache-first'`)

The exception is when a query is made with a different `fetchPolicy`. We
[use 'cache-and-network' on quite a few queries](https://github.com/search?q=repo%3Agraphcommerce-org%2Fgraphcommerce+fetchPolicy%3A+%27cache-and-network%27&type=code)
to make sure that the user always sees up-to-date data.

#### Improvements since GraphCommerce 6.2.0:

We've introduced the
[persistenceMapper](https://github.com/graphcommerce-org/graphcommerce/blob/canary/packages/graphql/components/GraphQLProvider/persistenceMapper.ts#L27-L36)
that makes sure not everything gets persisted to localStorage. We prune the
cache based on a list of selectors. This aims to keep the cache as small as
possible, without chaning the default behavior that 'everything is persisted to
localStorage'.

### What is stored in the localStorage?

All queries made with useQuery are stored in the localStorage of the user and is
restored when the user visits the website

- With GraphCommerce < 6.2.0: All queries made with useQuery are stored in the
  localStorage of the user and is restored when the user visits the website
- With GraphCommerce >= 6.2.0

### Which HTTP requests are cache by the browser?

- `pages` and `_next/data` requests are not cached and are requested each time a
  page is visited. The `_next/data` requests is the actual data of a page to be
  able to navigate faster over the site.
- `_next/static` requests are cached by the browser. These include `images`,
  `fonts` and `js` and `css`. All files are hashed and cleaned up when a new
  deployment is made.
- `_next/image`requests are cached by the browser, but has a 'revalidate' header
  so requests will be revalidated by the browser.

### Which HTTP requests are cached by the service worker?

Service worker sits between the browser and the network. It can cache requests
and return them from the cache instead of the network. This can be seen as an
_additional_ caching layer which can be configured separately from the browser
cache.

The service worker caches:

- [static fonts](https://github.com/shadowwalker/next-pwa/blob/master/cache.js#L28)
- [static images](https://github.com/shadowwalker/next-pwa/blob/master/cache.js#L39)
- [\_next/image](https://github.com/shadowwalker/next-pwa/blob/master/cache.js#L50)
- [js](https://github.com/shadowwalker/next-pwa/blob/master/cache.js#L85)

Note: When a new deployment is made, the service worker is updated. This means
that all previous caches are cleared and new caches are created.

It does not cache:

- [\_next/data](https://github.com/shadowwalker/next-pwa/blob/master/cache.js#L107):
  Although it looks like it does, the regex is actually wrong and it does not
  cache anything.
- [pages](https://github.com/shadowwalker/next-pwa/blob/master/cache.js#L152)
  Uses NetworkFirst strategy, which means it will always try to fetch the
  resource from the network first, and only if that fails it will use the cache.

## Cache invalidation limitations

### Pages keep having old information even though Magento has updated the data

Currently there is no communcation between Magento and Next.js to revalidate a
page when a product or category is updated.

This means that a page will only be revalidated when a user visits the page
again _and_ the revalidate time has been reached.

Suggested solution: Accept the revalidate time or reduce the revalidate time of
products and categories.

#### Pages keeps having stale global information

Even when a the LayoutDocument is refreshed by restarting a node.js process the
fresh data is not automatically shown to a user.

This means that a page only gets revalidated when a user visits the page again
_and_ the revalidate time has been reached.

This results in the situation that an header change like a navigation item or a
'global message' will see the old information for a long time.

Suggested solution: Create a fresh deployment

1. Manually create a fresh deployment.
2. Vercel: Integrate a
   [deploy hook](https://vercel.com/docs/concepts/deployments/deploy-hooks) as a
   [Hygraph webhook](https://hygraph.com/docs/api-reference/basics/webhooks)
3. Github actions: Integrate a
   [webhook_run](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_run)
   as a
   [Hygraph webhook](https://hygraph.com/docs/api-reference/basics/webhooks)
