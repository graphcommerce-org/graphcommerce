---
menu: Overview
order: create,start-building,header,pages,graphcms-component
metaTitle:
  Start your Reactjs Ecommerce project with the GraphCommerce React Magento 2
  Template
metaDescription:
  'Overview of the magento-graphcms example, the GraphCommerce reactjs ecommerce
  template for Magento storefronts'
metaUrl: getting-started/getting-started-with-magento-react-ecommerce
---

# GraphCommerce magento-graphcms example overview

GraphCommerce offers a magento-graphcms example that provides an approachable
path to building GraphCommerce custom Magento e-commerce storefront. This guide
describes what's included in the magento-graphcms example and how you can begin
exploring it.

## How it works

Most of the files that you'll work on within your GraphCommerce project are
located in the /components or /pages directories.

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
    └── GraphCMS
        └── Asset
        └── RowHeroBanner
        └── RowQuote
    └── theme.ts
    └── ...
├── graphql
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

## Components

The GraphCommerce magento-graphcms example provides a series of components that
you can use as a starting point for development. These components query the
Magento GraphQL API for efficient data-fetching. Most components have a .graphql
file that contains the GraphQL query fragment.

### Modifying components

By default, the components that you would most likely modify are located in the
`/components` directory. You can directly modify these components and customize
styles.

Others components are imported where needed, and can be recognized by their
namespace `@graphcommerce/`. There are different ways to
[customize styles ↗](https://mui.com/customization/how-to-customize/) of
importend components. The most common way is by adding an sx prop:
`sx={{color:'red'}}`.

If you want to extend a component's behavior or built your own, you can
duplicate a `@graphcommerce/` component to your /components directory. You'll
need to update all imports with the new location of your local component. This
also applies if you want to modify a component's or
[page's query](../getting-started/start-building.md).

### Component overview

| Local             |                                                                             |                 |
| ----------------- | --------------------------------------------------------------------------- | --------------- |
| /Asset            | [Source](../../../../examples/magento-graphcms/components/GraphCMS/Asset)   | [Documentation] |
| /Blog             | [Source](../../../../examples/magento-graphcms/components/Blog)             | [Documentation] |
| /Layout           | [Source](../../../../examples/magento-graphcms/components/Layout)           | [Documentation] |
| /ProductListItems | [Source](../../../../examples/magento-graphcms/components/ProductListItems) | [Documentation] |
| /Usps             | [Source](../../../../examples/magento-graphcms/components/Usps)             | [Documentation] |

| Packages (/node_modules directory/)          |                                                            |
| -------------------------------------------- | ---------------------------------------------------------- |
| @graphcommerce/address-fields-nl             | [Source](../../../packages/address-fields-nl/)             |
| @graphcommerce/cli                           | [Source](../../../packages/cli/)                           |
| @graphcommerce/framer-next-pages             | [Source](../../../packages/framer-next-pages/)             |
| @graphcommerce/googleanalytics               | [Source](../../../packages/googleanalytics/)               |
| @graphcommerce/googlerecaptcha               | [Source](../../../packages/googlerecaptcha/)               |
| @graphcommerce/googletagmanager              | [Source](../../../packages/googletagmanager/)              |
| @graphcommerce/graphcms-ui                   | [Source](../../../packages/graphcms-ui/)                   |
| @graphcommerce/graphql                       | [Source](../../../packages/graphql/)                       |
| @graphcommerce/graphql-mesh                  | [Source](../../../packages/graphql-mesh/)                  |
| @graphcommerce/image                         | [Source](../../../packages/image/)                         |
| @graphcommerce/lingui-next                   | [Source](../../../packages/lingui-next/)                   |
| @graphcommerce/magento-cart                  | [Source](../../../packages/magento-cart/)                  |
| @graphcommerce/magento-cart-billing-address  | [Source](../../../packages/magento-cart-billing-address/)  |
| @graphcommerce/magento-cart-checkout         | [Source](../../../packages/magento-cart-checkout/)         |
| @graphcommerce/magento-cart-coupon           | [Source](../../../packages/magento-cart-coupon/)           |
| @graphcommerce/magento-cart-email            | [Source](../../../packages/magento-cart-email/)            |
| @graphcommerce/magento-cart-items            | [Source](../../../packages/magento-cart-items/)            |
| @graphcommerce/magento-cart-payment-method   | [Source](../../../packages/magento-cart-payment-method/)   |
| @graphcommerce/magento-cart-shipping-address | [Source](../../../packages/magento-cart-shipping-address/) |
| @graphcommerce/magento-cart-shipping-method  | [Source](../../../packages/magento-cart-shipping-method/)  |
| @graphcommerce/magento-category              | [Source](../../../packages/magento-category/)              |
| @graphcommerce/magento-cms                   | [Source](../../../packages/magento-cms/)                   |
| @graphcommerce/magento-customer              | [Source](../../../packages/magento-customer/)              |
| @graphcommerce/magento-customer-account      | [Source](../../../packages/magento-customer-account/)      |
| @graphcommerce/magento-customer-order        | [Source](../../../packages/magento-customer-order/)        |
| @graphcommerce/magento-graphql               | [Source](../../../packages/magento-graphql/)               |
| @graphcommerce/magento-newsletter            | [Source](../../../packages/magento-newsletter/)            |
| @graphcommerce/magento-payment-included      | [Source](../../../packages/magento-payment-included/)      |
| @graphcommerce/magento-product               | [Source](../../../packages/magento-product/)               |
| @graphcommerce/magento-product-bundle        | [Source](../../../packages/magento-product-bundle/)        |
| @graphcommerce/magento-product-configurable  | [Source](../../../packages/magento-product-configurable/)  |
| @graphcommerce/magento-product-downloadable  | [Source](../../../packages/magento-product-downloadable/)  |
| @graphcommerce/magento-product-grouped       | [Source](../../../packages/magento-product-grouped/)       |
| @graphcommerce/magento-product-simple        | [Source](../../../packages/magento-product-simple/)        |
| @graphcommerce/magento-product-virtual       | [Source](../../../packages/magento-product-virtual/)       |
| @graphcommerce/magento-review                | [Source](../../../packages/magento-review/)                |
| @graphcommerce/magento-search                | [Source](../../../packages/magento-search/)                |
| @graphcommerce/magento-store                 | [Source](../../../packages/magento-store/)                 |
| @graphcommerce/browserslist-config-pwa       |                                                            |
| @graphcommerce/eslint-config-pwa             |                                                            |
| @graphcommerce/next-config                   |                                                            |
| @graphcommerce/next-ui                       |                                                            |
| @graphcommerce/prettier-config-pwa           |                                                            |
| @graphcommerce/react-hook-form               |                                                            |
| @graphcommerce/typescript-config-pwa         |                                                            |

## Hygraph

Hygraph is integrated as a Content Management System. It is used to store all
static content and provides a user-friendly interface for managing it.

The magento-graphcms example offers a number of components to render this
content in different ways, for example in the form of a page-wide hero banner, a
list of USPs or grid of text columns.

To [get started](../getting-started/create.md) with the magento-graphcms
example, cloning the demo Hygraph project GraphQL schema and its content is
recommended.

## Pages

GraphCommerce uses Next.js
[file-based routing ↗](https://nextjs.org/docs/routing/introduction), built on
the concept of pages. A page is a React Component exported from a `.tsx` file in
the /pages directory. When a file is added to the /pages directory, it's
automatically available as a route.

All routes of the app contain a URL segment that corresponds with a directory in
the /pages directory. Magento category routes are handled by the
`/pages/[...url].tsx` page and therefore do not contain a URL segment. As a
result, the category URL structure of the app matches your default Magento
frontend 1-on-1.

```txt
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

## GraphQL API

GraphCommerce is built and optimized to use data coming from Magento's GraphQL
API. GraphCommerce uses GraphQL Mesh, which adds the ability to add extra
(micro)services as data sources. In the magento-graphcms example, a headless CMS
called [Hygraph](../getting-started/../framework/graphcms.md) is integrated.

By default, the GraphQL Mesh endpoint runs on route /api/graphql. You can query
both the Magento GraphQL schema and the Hygraph GraphQL schema. Try out the
GraphCommerce demo
[GraphQL Explorer ↗](https://graphcommerce.vercel.app/api/graphql) with the
following example query:

```graphql
query {
  products(search: "sock", pageSize: 3) {
    items {
      url_key
    }
  }
  availableStores {
    store_name
    store_code
  }
}
```

### Query fragments

Every component that requires data from Magento or GraphCMS has its own
`.graphql` file, containing a GraphQL query fragment. GraphQL Code Generator
(codegen) is used to convert query fragments to both the GraphQL document (query
or mutation) and Typescript type definitions, both captured in `.gql(.ts)`
files. `.gql(.ts)` are generated at build time.

Pages run queries in the getStaticProps function and pass the response as props.
Pages have a single page query, that combines multiple query fragments from
components. These accumulating page queries are located in the
/components/GraphQL directory.

With the use of fragments and GraphQL Mesh, GraphCommerce retrieves all data
from both Magento and GraphCMS in a single GraphQL query. This improves
performance.

```txt
GraphQL queries in the graphcommerce-magento example

├── GraphQL
    └── CategoryPage.graphql
    └── DefaultPage.graphql
    └── PageLink.graphql
    └── DefaultPage.graphql
    └── PagesStaticPaths.graphql
    └── ProductPage.graphql
    └── ProductPage2.graphql
```

## FAQ

<div>
<details>
<summary>What are the benefits of choosing GraphCommerce for a react ecommerce project?</summary>

### What are the benefits of choosing GraphCommerce for a reactjs ecommerce project?

React is a very suitable framework for magento reactjs ecommerce projects.
Magento 2 is a well established, widely used open source e-commerce solution.
GraphCommerce brings the best of both, and includes the structure, components,
and tooling you need to get started with react ecommerce. Using GraphCommerce
minimizes the development effort required to launch a full featured reactjs
e-commerce storefront with features like cart, search, layered navigation and
category, product, account, checkout pages.

</details>

<details>
<summary> Why use the GraphCommerce magento reactjs ecommerce template</summary>

### Why use the GraphCommerce magento-graphcms reactjs ecommerce template

The GraphCommerce magento-graphcms template contains all needed components like
cart, search, and layered navigation for a full-featured e-commerce storefront.
It's easy to customize and includes the structure, components, and tooling you
need to get started. With the extensive documentation, it is more efficient to
understand and customize the template for your next react Magento 2 project,
than to start from scratch.

</details>
</div>

## Next steps

- [Get started](../getting-started/create.md) with GraphCommerce and begin
  building a custom storefront.
