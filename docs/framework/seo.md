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

## Generate the XML sitemap

GraphCommerce uses
[next-sitemap ↗](https://github.com/iamvishnusankar/next-sitemap) to generate
the sitemap, which is located in the directory /public/sitemap.xml. For example,
view the [demo sitemap.xml ↗](https://graphcommerce.vercel.app/sitemap.xml)

Generating the sitemap.xml file is part of the static build process. Use
`yarn build` to initiate the build process and to generate a new sitemap.xml
file.

Sitemap generation uses the
[`canonicalBaseUrl` configuration](./config.md#canonicalbaseurl-string).

## Modify /robots.txt

GraphCommerce creates a /robots.txt file on build time. Its contents can be
modified by editing /next-sitemap.js. For example, view the
[demo robots.txt ↗](https://graphcommerce.vercel.app/robots.txt)

Generating the robot.txt file is part of the static build process. Use
`yarn build` to initiate the build process and to generate a new robots.txt
file.

## Next steps

- Learn about [Static Generation (SSG)](../framework/static-generation.md) in
  GraphCommerce
