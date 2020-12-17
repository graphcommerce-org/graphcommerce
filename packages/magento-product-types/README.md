# @reachdigital/magento-product-types

This package is considered a customization entrypoint. The goal is that these
components are as lightweight as possible while offering all the customization
features that a frontend developer would like to customize product rendering

- @reachdigital/magento-product is product type agnostic
- @reachdigital/magento-product-{type} is only type specific data
- @reachdigtial/magento-product-types glues these together

## What does this package contain:

See the ProductListItems and ProductPage renderers for examples that can be
included in your project.

## How to customize:

1. Styling: use the classes props
2. Renderer: copy `ComponentToCustomze/index.tsx` to the project and change the
   renderers.
   [example of ProductListItems](../../examples/soxbase/components/ProductListItem/ProductListItems.tsx)
3. Customize data: Copy the `ComponentToCustomze/index.tsx` as well as
   `ComponentToCustomze/ComponentToCustomze.graphql` to the project and change
   the fragment.
4. Copy the GraphQL query and modify the fetched data **todo: example/details
   missing**
