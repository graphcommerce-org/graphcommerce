---
menu: Overview
---

> **Developer preview**  
> This is a developer preview of GraphCommerce. The documentation will be
> updated as GraphCommerce introduces
> [new features and refines existing functionality](https://github.com/ho-nl/m2-pwa/releases).

# GraphCommerce framework overview

GraphCommerce is a front-end framework used for building headless Magento
e-commerce storefronts in React. It includes the structure, components, and
tooling you need to get started so you can spend your time styling and designing
high end e-commerce progressive web apps (PWA).

### Framework concepts and components

| Concepts                                                       | Customizing                              | Other                                              |
| -------------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------- |
| [Static generation](../framework/static-generation.md)         | [Theming](../framework/theming.md)       | [Translations](../framework/translations.md)       |
| [Environment Variables](../framework/environment-variables.md) | [Typography](../framework/typography.md) | [Troubleshooting](../framework/troubleshooting.md) |
| [Deployment](../framework/deployment.md)                       | [Favicon](../framework//favicon.md)      |                                                    |
| [GraphCMS](../framework/graphcms.md)                           | [SEO](../framework/seo.md)               |                                                    |

## GraphCommerce project structure

When you create a GraphCommerce app, the GraphCommerce
[magento-graphcms example](../getting-started/readme.md) comes with a basic file
structure of a GraphCommerce project that's integrated with Magento and
GraphCMS. Most of the files that you'll work with in your GraphCommerce project
are located in the /components or /pages directories.

- A minimal set of components you would most likelely modify for your project
- The main layout component, which renders header, navigation and footer
- A set of boilerplate pages, which handle url routing
- Basic global styles in theme.ts provided by
  [Mui ↗](https://mui.com/customization/default-theme/)
- Interface translation files

```txt
File structure of the graphcommerce-magento example

├── components
    └── Layout
        └── Footer.tsx
        └── LayoutFull.tsx
    └── GraphCMS
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
