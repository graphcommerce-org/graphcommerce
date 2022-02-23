---
menu: Static Site Generation (SSG)
---

> **Developer preview**  
> This is a developer preview of GraphCommerce. The documentation will be
> updated as GraphCommerce introduces
> [new features and refines existing functionality](https://github.com/ho-nl/m2-pwa/releases).

# Static Site Generation (SSG) in GraphCommerce

Pages that export a function called getStaticProps, will pre-render at
build-time. `getStaticProps` generates HTML and JSON files, both of which can be
cached by a CDN for performance.

In the [magento-graphcms example](../getting-started/readme.md), getStaticProps
is used to pre-render **all pages**. Client-side rendering is used to display
user-specific content on pre-rendered pages at run-time.

For example, client-side rendering is used to display customer data on the
/account page:

```tsx
// Example from /pages/account/index.tsx

function AccountIndexPage() {
  const { data, loading, error } = useQuery(AccountDashboardDocument, {
    fetchPolicy: 'cache-and-network',
    ssr: false,
  })
  const { data: config } = useQuery(StoreConfigDocument)
  ...

  const customer = data?.customer
  ...
}
```

In the same file, `getStaticProps` runs the DefaultPageDocument query to fetch
the data needed to render the layout (header, footer, menu etc.)

```tsx
// Example from /pages/account/index.tsx

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
 ...

  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: 'account',
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  return {
    props: {
      ...(await page).data,
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
```

## getStaticPaths

Pages that have dynamic routes need a list of paths to be statically generated.
All paths specified by a function called `getStaticPaths` will be statically
pre-redered at build-time.

For example, `getStaticPaths` runs the ProductStaticPaths query to fetch a list
of all configurable product paths:

```tsx
// Example from /pages/product/configurable/[url].tsx

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
 ...
  const path = (locale: string) =>
    getProductStaticPaths(
      graphqlSsrClient(locale),
      locale,
      'ConfigurableProduct',
    )
  const paths = (await Promise.all(locales.map(path))).flat(1)

  return { paths, fallback: 'blocking' }
}
```

```tsx
// Example from /node_modules/@graphcommerce/magento-product/components/ProductStaticPaths/ProductStaticPaths.graphql

query ProductStaticPaths($currentPage: Int!, $pageSize: Int!) {
  products(filter: {}, pageSize: $pageSize, currentPage: $currentPage) {
    page_info {
      current_page
      total_pages
    }
    total_count
    items {
      ...ProductLink
    }
  }
}
```

## Build your local environment

You can test the static build process by running it locally:

- `cd /examples/magento-graphcms/` Navigate to the project directory
- `yarn build` Start static build process

The build proces locally will not pre-render product pages to reduce build time:

```tsx
// Example from /pages/product/configurable/[url].tsx

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {

  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }
  ...
}
```

## Next steps

- Learn more about
  [getStaticProps ↗](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)
  in the Next.js documentation
- Learn more about
  [getStaticPaths ↗](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths)
  in the Next.js documentation
- Learn more about [Static File Serving](../framework/static-file-serving.md)
