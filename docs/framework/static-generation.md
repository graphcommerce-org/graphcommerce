---
menu: Static Site Generation (SSG)
metaTitle: Static Site Generation with Nextjs ecommerce framework GraphCommerce
metaDescription:
  'GraphCommerce is a nextjs Magento framework. GraphCommerce offers Static Site
  Generation for Magento nextjs PWA out-of-the-box.'
metaUrl: framework/static-generation-nextjs-ecommerce
---

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

In the same file, `getStaticProps` runs the hygraphPageContent query to fetch
the data needed to render the layout (header, footer, menu etc.)

```tsx
// Example from /pages/account/index.tsx

export const getStaticProps = enhanceStaticProps(async ({ locale }) => {
 ...

  const page = hygraphPageContent('account')

  return {
    props: {
      ...(await page).data,
      up: { href: '/', title: 'Home' },
    },
    revalidate: 60 * 20,
  }
})
```

## getStaticPaths

Pages that have dynamic routes need a list of paths to be statically generated.
All paths specified by a function called `getStaticPaths` will be statically
pre-rendered at build-time.

For example, `getStaticPaths` runs the ProductStaticPaths query to fetch a list
of all configurable product paths:

```tsx
// Example from /pages/blog/[url].tsx

export const getStaticPaths = enhanceStaticPaths(
  'blocking',
  async ({ locale }) =>
    (await graphqlQuery(BlogPostPathsDocument)).data.pages.map((page) => ({
      params: { url: `${page?.url}`.replace('blog/', '') },
      locale,
    })),
)
```

```tsx
// Example from /examples/magento-graphcms/components/Blog/BlogPaths.graphql

query BlogPostPaths {
  pages(where: { url_not_starts_with: "blog/tagged/", url_starts_with: "blog/" }) {
    url
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

export const getStaticPaths = async ({ locales = [] }) => {

  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }
  ...
}
```

<details open>
    <summary>Disabling Static Generation on production</summary>

To disable or limit the amount of pages that are statically pre-redered, slice
the paths array. This will reduce build-time:

```tsx
// Example from /pages/product/configurable/[url].tsx

export const getStaticPaths = async ({ locales = [] }) => {
  ...

  return { paths: paths.slice(0, 10), fallback: 'blocking' }
}
```

Pages that are not pre-rendered at build-time, will be rendered at run-time
(on-demand).

</details>

## Incremental Static Regeneration

Most pages have value for `revalidate` in the object that is returned by
`getStaticProps`:

```tsx
// Example from /pages/product/configurable/[url].tsx

return {
  props: {
    ...(await productPage).data,
    ...(await typeProductPage).data,
    up,
  },
  revalidate: 60 * 20,
}
```

When set, static pages will be regenerated at run-time (on-demand) every 20
minutes.

The initial request to the product page will show the cached page. After 20
minutes, the regeneration of the page is triggered on the first following
request. Once the page has been successfully generated, the cache will be
invalidated and the updated product page is shown.

## FAQ

<div>
<details>
<summary>When is GraphCommerce a suitable Nextjs ecommerce solution?</summary>

### When is GraphCommerce a suitable Nextjs ecommerce solution?

GraphCommerce is a suitable Nextjs ecommerce solution if your e-commerce store
is already running on Magento Open Source or Adobe Commerce. A Nextjs Magento
stack offers interesting features like Static Site Generation (SSG), which will
improve Magento catalog performance. Nextjs Magento is also a great combination
if you are looking to migrate to Magento.

</details>

<details>
<summary>What are the advantages of a Nextjs React Magento stack?</summary>

### What are the advantages of a Nextjs React Magento stack?

Nextjs React Magento is considered newer web technology, offering a modern
approach to e-commerce development. React can be viewed as the industry standard
for large-scale web apps. Next.js adds the ability for Static Site Generation (a
form of Server-side Rendering), enabling indexing by search engines.
GraphCommerce is a framework that combines Nextjs, React and Magento, and
simplifies building Magento Nextjs PWA's.

</details>
</div>

## Next steps

- Learn more about [building pages](../getting-started/pages.md) in
  GraphCommerce
- Learn more about [Static File Serving](../framework/static-file-serving.md)
- Learn more about
  [getStaticProps ↗](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)
  or
  [getStaticPaths ↗](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths)
  in the Next.js documentation
