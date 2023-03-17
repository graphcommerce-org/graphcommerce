---
menu: Overview
---

# GraphCommerce framework overview

GraphCommerce is a front-end framework used for building headless Magento
e-commerce storefronts in React. It includes the structure, components, and
tooling you need to get started so you can spend your time styling and designing
high-end e-commerce progressive web apps (PWA).

### Framework concepts and components

| Concepts                                               | Customizing                              | Other                                              |
| ------------------------------------------------------ | ---------------------------------------- | -------------------------------------------------- |
| [Static generation](../framework/static-generation.md) | [Theming](../framework/theming.md)       | [Translations](../framework/translations.md)       |
| [Confg](../framework/config.md)                        | [Typography](../framework/typography.md) | [Troubleshooting](../framework/troubleshooting.md) |
| [Deployment](../framework/deployment.md)               | [Favicon](../framework/favicon.md)       | [SEO](../framework/seo.md)                         |
| [Hygraph](../framework/graphcms.md)                    | [Icons](../framework//icons.md)          |                                                    |

## GraphCommerce project structure

When you create a GraphCommerce app, the GraphCommerce
[magento-graphcms example](../getting-started/readme.md) comes with a basic file
structure of a GraphCommerce project that's integrated with Magento and Hygraph.
Most of the files that you'll work within your GraphCommerce project are located
in the /components or /pages directories.

- A minimal set of components you would most likely modify for your project
- The main layout component, which renders header, navigation, and footer
- A set of boilerplate pages, which handle URL routing
- Basic global styles in theme.ts provided by
  [Mui ↗](https://mui.com/customization/default-theme/)
- Interface translation files

```txt
File structure of the graphcommerce-magento example

├── components
    └── Layout
        └── Footer.tsx
        └── LayoutFull.tsx
    └── Hygraph
        └── Asset
        └── RowHeroBanner
        └── RowQuote
    └── theme.ts
    └── ...
├── GraphQL
    └── CategoryPage.graphql
    └── PageLink.graphql
    └── ...
├── pages
    └── product
        └── [url].jsx
        └── ...
    └── page
        └── [...url].jsx
    └── [...url].tsx
    └── [cart].tsx
    └── _app.tsx
    └── _document.tsx
    └── ...
├── locales
    └── en.po
    └── nl.po
    └── ...
```

## Next steps

- Learn about [theming](../framework/theming.md) a GraphCommerce storefront
- Learn about [Static Generation (SSG)](../framework/static-generation.md) in
  GraphCommerce
