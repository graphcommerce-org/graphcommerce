# SEO

## Page Meta data

Page meta data is handled by the `'@graphcommerce/magento-store/PageMeta.tsx'`
component. Depending on the page, the props that are passed are static or
dynamic (data from either Magento or GraphCMS).

```
Example from /cart.tsx

<PageMeta
  title={t`Cart (${data?.cart?.total_quantity ?? 0})`}
  metaDescription={t`Cart Items`}
  metaRobots={['noindex']}
  // canonial={''}
/>
```

Dynamic example

```
Example from /product/[url].tsx

<PageMeta
  title={page?.metaTitle ?? title ?? ''}
  metaDescription={page?.metaDescription ?? ''}
  metaRobots={metaRobots}
  canonical={page?.url}
/>
```

## Generate the XML sitemap

GraphCommerce uses
[next-sitemap](https://github.com/iamvishnusankar/next-sitemap) to generate the
sitemap, which is located in the directory /public/sitemap.xml. For example,
view the [demo sitemap.xml](https://graphcommerce.vercel.app/sitemap.xml)

Generating the sitemap.xml file is part of the static build proces. Use
`yarn build` to initiate the build proces and to generate a new sitemap.xml
file.

Sitemap generation uses the `NEXT_PUBLIC_SITE_URL` variable in your .env fil.

## Modify /robots.txt

GraphCommerce creates a /robots.txt file on build time. Its contents can be
modified by editing /next-sitemap.js. For example, view the
[demo robots.txt](https://graphcommerce.vercel.app/robots.txt)

Generating the robot.txt file is part of the static build proces. Use
`yarn build` to initiate the build proces and to generate a new robots.txt file.
