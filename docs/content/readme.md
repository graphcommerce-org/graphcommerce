---
menu: Overview
order: getting-started,framework
metaTitle: Start React, Next.js Magento PWA development here - GraphCommerce
metaDescription:
  'GraphCommerce is the open source PWA Studio Magento 2 alternative.
  GraphCommerce is a full-featured PWA storefront, not a Magento 2 PWA
  extension.'
---

> **Developer preview**  
> This is a developer preview of GraphCommerce. The documentation will be
> updated as GraphCommerce introduces
> [new features and refines existing functionality](https://github.com/ho-nl/m2-pwa/releases).

# GraphCommerce

GraphCommerce is a front-end framework used for building headless Magento
e-commerce storefronts in React. It includes the structure, components, and
tooling you need to get started so you can spend your time styling and designing
high end e-commerce progressive web apps (PWA).

<figure>

https://user-images.githubusercontent.com/1251986/154977573-4015e77c-43e7-481e-ab97-60c365c6b746.mp4

<video width="100%" controls autoPlay loop muted>
<source src="https://user-images.githubusercontent.com/1251986/154977573-4015e77c-43e7-481e-ab97-60c365c6b746.mp4" type="video/mp4"/>
</video>

  <figcaption>GraphCommerce magento-graphcms example demo</figcaption>
</figure>

---

### Stack

- Typescript
- React
- Nextjs
- GraphQL
- Mui
- Apollo
- GraphQL Code Generator
- Framer Motion

## Getting Started

GraphCommerce offers a [magento-graphcms](./getting-started/readme.md) example
that provides a full featured storefront. The example integrates with your
Magento backend and provides a full purchase journey out-of-the-box. It uses
GraphCMS to enrich pages with multiple content components, like the homepage.

The magento-graphcms example is styled using the Mui component library. You can
start styling by making changes to the [theme](./framework/theming.md).

## Features

GraphCommerce features include:

- App-like e-commerce UI
- Magento e-commerce component libary including cart, search, layered navigation
  components and category, product, account, checkout pages
- Optimized frontend performance, including bundling, image optimization, CDN
  caching
- Predictive url pefetching and caching
- Hybrid Static Site Generation (SSG)
- SEO optimized, including accessibility, sitemap.xml, canonicals, meta data
- Data fetching from multiple sources with the included GraphQL Mesh (composable
  commerce)
- Passing Google Core Web Vitals audits
- PWA out-of-the-box
- Magento multi language support, a store switcher component and framework
  translations EN, ES, FR, DE, NL
- Deployments to Vercel

## Build high-end Magento storefronts faster

GraphCommerce accelerates the Magento front-end development process by using a
carefully chosen, industry standard, tech stack. It includes Magento-specific
React components, pages and utilities for e-commerce. They're accessible,
performant, and ready for use. They also help to reduce the initial complexity
and boilerplate needed for building a custom storefront.

## FAQ

<div>
<details>
<summary><h3>Is GraphCommerce a Magento PWA theme?</h3></summary>

GraphCommerce is not a Magento PWA theme, nor is it a Magento 2 PWA extension. A
Magento theme is tightly integrated in the Magento codebase, where a
GraphCommerce storefront runs as a separate application.

GraphCommerce can be deployed on the same or a different server than the Magento
backend is hosted on. All data is fetched from the Magento 2 GraphQL API. Once
you finish GraphCommerce Magento PWA development and you are ready to launch,
the regular Magento frontend (theme and extensions) can be decommissioned.

</details>

<details>
<summary><h3>Is GraphCommerce a PWA Studio Magento 2 alternative?</h3></summary>

Yes, GraphCommerce is a very suitable alternative to Magento 2 PWA Studio.
GraphCommerce is built with modern, open source javascript frameworks and
libraries. Unlike PWA Studio for Magento 2, it features an app-like e-commerce
user interface, Hybrid Static Site Generation (SSG) and has the ability to fetch
data from multiple sources (composable commerce).
[Get started](./getting-started/create.md) with GraphCommerce if you're looking
for a PWA Studio Magento 2 alternative and would like to start fresh with
Magento PWA development.

</details>
</div>

## Next steps

- [Get started](./getting-started/create.md) with GraphCommerce and begin
  building a custom storefront.
