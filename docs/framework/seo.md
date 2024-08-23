---
menu: SEO
---

# SEO

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

## Robots.txt & XML sitemaps

GraphCommerce serves robots.txt & XML sitemap routes through the page router.
(`pages/robots.txt.tsx` & `pages/sitemap/`)  
By default the robots.txt allows/disallows robots based on the
[`robotsAllow` configuration](./config.md#robotsallow-boolean) and contains a
separate sitemap for product, category & content pages.

### Multi domain setup

When using a multi domain setup (e.g. https://mydomain.nl &
https://mydomain.com) using the
[`canonicalBaseUrl` configuration](./config.md#canonicalbaseurl-string), the
robots.txt will only include sitemaps specific to that domain.

### Multi locale setup

When using a multi locale based setup (e.g.
https://graphcommerce.vercel.app/en-gb), the robots.txt will include sitemaps
for all locales on the global domain. Example:
[robots.txt](https://graphcommerce.vercel.app/robots.txt)

## Next steps

- Learn about [Static Generation (SSG)](../framework/static-generation.md) in
  GraphCommerce
