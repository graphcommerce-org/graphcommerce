# GraphCommerce magento-graphcms example overview

GraphCommerce offers a magento-graphcms example that provides an approachable
path to building GraphCommerce custom e-commerce storefront. This guide
describes what's included in the magento-graphcms example and how you can begin
exploring it.

## How it works

Most of the files that you'll work with in your GraphCommerce project are
located in the /components or /pages directories.

- A minimal set of components you would most likelely modify for your project
- The main layout component, which renders header, navigation and footer
- A set of boilerplate pages, which handle url routing
- Basic global styles in ThemeProvider.tsx provided by
  [Mui](https://mui.com/customization/default-theme/)
- Interface translation files

```
File structure of the graphcommerce-magento example

├── components
    └── Layout
        └── Logo.tsx
        └── Footer.tsx
        └── LayoutFull.tsx
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
    └── fr.po
    └── nl.po
    └── ...
├── Theme
    └── themeProvider.tsx
```

# Components

The GraphCommerce magento-graphcms example provides a series of components that
you can use as a starting point for development. These components query the
Magento GraphQL API for efficient data-fetching. Most components have a .graphql
file which contains the GraphQL query fragment.

## Modifying components

By default, the components that you would most likely modify are located in the
`/components` directory. You can directly modify these components and customize
styles.

Others components are imported where needed , and can be recognized by their
namespace `@graphcommerce/`. There are different ways to
[customize styles](https://mui.com/customization/how-to-customize/) of importend
components. The most common way is by adding an sx prop: `sx={{color:'red'}}`.

If you want to extend a component's behaviour or built your own, you can
duplicate a `@graphcommerce/` component to your /components directory. You'll
need to update all imports with the new location of your local component. This
also applies if you want to modify a component's [query fragment]().

## Component overview

Local

- /Asset - [Source]() | [Documentation]()
- /Blog - [Source]() | [Documentation]()
- /Layout - [Source]() | [Documentation]()
- /Row - [Source]() | [Documentation]()
- /Usps - [Source]() | [Documentation]()

Packages

- @graphcommerce/browserslist-config-pwa - [Source]()
- @graphcommerce/eslint-config-pwa - [Source]()
- @graphcommerce/framer-next-pages - [Source]()
- @graphcommerce/googleanalytics - [Source]()
- @graphcommerce/googlerecaptcha - [Source]()
- @graphcommerce/googletagmanager - [Source]()
- @graphcommerce/graphcms-ui - [Source]()
- @graphcommerce/graphql - [Source]()
- @graphcommerce/graphql-mesh - [Source]()
- @graphcommerce/image - [Source]()
- @graphcommerce/lingui-next - [Source]()
- @graphcommerce/magento-cart - [Source]()
- @graphcommerce/magento-cart-billing-address - [Source]()
- @graphcommerce/magento-cart-checkout - [Source]()
- @graphcommerce/magento-cart-coupon - [Source]()
- @graphcommerce/magento-cart-email - [Source]()
- @graphcommerce/magento-cart-items - [Source]()
- @graphcommerce/magento-cart-payment-method - [Source]()
- @graphcommerce/magento-cart-shipping-address - [Source]()
- @graphcommerce/magento-cart-shipping-method - [Source]()
- @graphcommerce/magento-category - [Source]()
- @graphcommerce/magento-cms - [Source]()
- @graphcommerce/magento-customer - [Source]()
- @graphcommerce/magento-customer-account - [Source]()
- @graphcommerce/magento-customer-order - [Source]()
- @graphcommerce/magento-graphql - [Source]()
- @graphcommerce/magento-newsletter - [Source]()
- @graphcommerce/magento-payment-included - [Source]()
- @graphcommerce/magento-product - [Source]()
- @graphcommerce/magento-product-bundle - [Source]()
- @graphcommerce/magento-product-configurable - [Source]()
- @graphcommerce/magento-product-downloadable - [Source]()
- @graphcommerce/magento-product-grouped - [Source]()
- @graphcommerce/magento-product-simple - [Source]()
- @graphcommerce/magento-product-virtual - [Source]()
- @graphcommerce/magento-review - [Source]()
- @graphcommerce/magento-search - [Source]()
- @graphcommerce/magento-store - [Source]()
- @graphcommerce/next-config - [Source]()
- @graphcommerce/next-ui - [Source]()
- @graphcommerce/prettier-config-pwa - [Source]()
- @graphcommerce/react-hook-form - [Source]()
- @graphcommerce/typescript-config-pwa - [Source]()

# Pages

GraphCommerce uses Next.js
[file-based routing](https://nextjs.org/docs/routing/introduction), built on the
concept of pages. A page is a React Component exported from a `.tsx` file in the
/pages directory. When a file is added to the /pages directory, it's
automatically available as a route.

All routes of the app contain a url segment that corresponds with a directory in
the /pages directory. Magento category routes are handled by the
`/pages/[...url].tsx` page and therefore do not contain a url segment. As a
result, the category url structure of the app matches your default Magento
frontend 1-on-1.

```
Page structure of the graphcommerce-magento example

├── pages
    └── about
    └── account
    └── api
    └── blog
    └── checkout
    └── customer
    └── modal
    └── page
    └── product
    └── search
    └── service
├── _app.tsx
├── _document.tsx
├── [...url].tsx
├── 404.tsx
├── cart.tsx
├── index.tsx
├── switch-stores.tsx
```

# GraphQL API

GraphCommerce is built and optimized to use data coming from Magento's GraphQL
API. GraphCommerce uses GraphQL Mesh, which adds the ability to add extra
(micro)services as data sources. In the magento-graphcms example, a headless CMS
called [GraphCMS]() is integrated.

By default, the GraphQL Mesh endpoint runs on route /api/grapql. You can query
both the Magento GraphQL schema and the GraphCMS GraphQL schema. Try out the
GraphCommerce demo
[GraphQL Explorer](https://graphcommerce.vercel.app/api/graphql).

## Query fragments

Every component that requires data from Magento or GraphCMS has it's own
`.graphql` file, containing a GraphQL query fragment. GraphQL Code Generator is
used to convert query fragments to both the GraphQL document (query or mutation)
and Typescript type definitions, both captured in `.gql(.ts)` files.

Pages run queries in the getStaticProps function and store the response as
props. Most pages have a single page query, that combines multiple query
fragments from components. These accumelating page queries are located in the
/components/GraphQL directory.

```
GraphQL queries in the graphcommerce-magento example

├── components
    └── GraphQL
        └── CategoryPage.graphql
        └── PageLink.graphql
        └── DefaultPage.graphql
        └── PagesStaticPaths.graphql
        └── FooterQueryFragment.graphql
        └── PageContentQueryFragment.graphql
        └── ProductPage.graphql
```

# Next steps

- [Get started]() with GraphCommerce and begin building a custom storefront.
- You can explore the
  [GraphCommerce demo storefront](https://graphcommerce.vercel.app/)
