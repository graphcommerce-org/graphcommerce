---
menu: SEO
---

# SEO

We optimize for Search engines by default by integrating a few key features:

## Canonical URL

We provde a
[canonicalize / useCanonical](https://github.com/graphcommerce-org/graphcommerce/blob/canary/packages/next-ui/PageMeta/canonicalize.ts)
function that can be used to generate canonical URLs based on the current router
and further configuration. This functionaliy is used by the PageMeta component
as well as robots.txt and sitemap generation.

It considers the current locale, the domain.

## JsonLd

We integrated [JSON-LD](https://json-ld.org/) for pages.

A
[`<JsonLd>`](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/next-ui/JsonLd/JsonLd.tsx)
component provides Json-LD metadata for your pages. See
[`<ProductPageJsonLd/>`](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-product/components/JsonLdProduct/ProductPageJsonLd.tsx)
or
[`<BreadcrumbJsonLd>`](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/next-ui/BreadcrumbJsonLd/BreadcrumbJsonLd.tsx)
for examples.

## Page Meta data

Page meta data is handled by the
`import { PageMeta } from '@graphcommerce/next-ui'` component. Depending on the
page, the props that are passed are static or dynamic (functional page titles
are hardcoded).

```tsx
// Example from /cart.tsx
<PageMeta
  title={t`Cart (${data?.cart?.total_quantity ?? 0})`}
  metaDescription={t`Cart Items`}
  metaRobots={['noindex']}
  // canonial={''}
/>
```

Dynamic example

```tsx
// Example from /product/[url].tsx
<PageMeta
  title={page?.metaTitle ?? title ?? ''}
  metaDescription={page?.metaDescription ?? ''}
  metaRobots={metaRobots}
  canonical={`/${page?.url}`}
/>
```

## Robots.txt

Robots.txt and the sitemap files are generated on the fly and do not rely on any
static generation.

Robots.txt is generated during runtime so that a separate robots.txt can be
served for each domain that is configured.

GraphCommerce serves robots.txt & XML sitemap routes through the page router.
(`pages/robots.txt.tsx` & `pages/sitemap/`)  
By default the robots.txt allows/disallows robots based on the
[`robotsAllow` configuration](./config.md#robotsallow-boolean) and contains a
separate sitemap for product, category & content pages.

### Multi domain setup

When using a multi domain setup (e.g. https://mydomain.nl &
https://mydomain.com) configure the
[`domain` configuration](./config.md#domain-string) in the storefront config.

```js
/** @type {import('@graphcommerce/next-config/src/generated/config').GraphCommerceConfig} */
const config = {
  // ...
  storefront: [
    {
      locale: 'en',
      magentoStoreCode: 'en_US',
      defaultLocale: true,
      domain: 'https://mydomain.com',
    },
    {
      locale: 'nl',
      magentoStoreCode: 'nl_NL',
      defaultLocale: true,
      domain: 'https://mydomain.nl',
    },
    // ...
  ],
}
```

[`canonicalBaseUrl` configuration](./config.md#canonicalbaseurl-string), the
robots.txt will only include sitemaps specific to that domain.

### Multi locale setup

When using a multi locale based setup (e.g.
https://graphcommerce.vercel.app/en-gb), the robots.txt will include sitemaps
for all locales the configured domain. Example:
[robots.txt](https://graphcommerce.vercel.app/robots.txt)

## Sitemaps

GraphCommerce generates sitemaps per locale for
[sitemap/product.xml](https://github.com/graphcommerce-org/graphcommerce/blob/canary/examples/magento-graphcms/pages/sitemap/product.xml.tsx),
[sitemap/category.xml](https://github.com/graphcommerce-org/graphcommerce/blob/canary/examples/magento-graphcms/pages/sitemap/category.xml.tsx)
and
[sitemap/content.xml](https://github.com/graphcommerce-org/graphcommerce/blob/canary/examples/magento-graphcms/pages/sitemap/content.xml.tsx).

Limitations: We currently do not support hreflang in sitemaps since there is no
Magento GraphQL API to get the hreflang for a page.

## Next steps

- Learn about [Static Generation (SSG)](../framework/static-generation.md) in
  GraphCommerce
