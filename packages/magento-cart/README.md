# Magento Cart

## How to build a proper checkout flow

- Fragment: GraphQL Fragment
- Query: GraphQL Query
- Mutation: GraphQL Mutation
- FormComponent: GraphQL Form Component
  - Contains a Mutation
  - Contains a useGqlMutationForm
- FragmentComponent: GraphQL Fragment Component
  - Renders a Fragment

There is no such thing:

- QueryComponent

## Cart Story

We might have the following setup:

- ProductPage
  - GraphQL Fragment Components:
    - CartCount
      - CartCountFragment.graphql
    - MyCustomInlineCart
      - MyCustomInlineCartFragment.graphql
  - GraphQL Form Components:
    - AddToCartForm
      - AddToCartFormMutation.graphql
    - AddConfigurableToCartForm
      - AddConfigurableToCartFormMutation.graphql
- CartPage
  - GraphQL Fragment Components
    - CartItems
      - CartItemsFragment.graphql
    - CartTotals
      - CartTotalsFragment.graphql
    - MyCustomCartThingy
      - MyCustomCartThingyFragment.graphql
  - GraphQL Form Components:
    - CartDiscount
      - CartDiscountFragment.graphql
      - CartDiscountMutation.graphql
- ShippingPage
  - GraphQL Form Components:
    - ShippingAddressForm
      - ShippingAddressFormFragment.graphql
      - ShippingAddressFormMutation.graphql

What do we want:

When calling `AddToCartFormMutation` or `AddConfigurableToCartForm` I want the
`CartCountFragment` and `MyCustomInlineCartFragment` to update.

- A Mutation **must not** request fields outside of the scope of the package it
  retains in.

## Colocation of fragments

Apollo suggests to use the colocation of Fragments
https://www.apollographql.com/docs/react/data/fragments/#creating-colocated-fragments

This creates a top-down dependency burden while generating components. On the
top level, you need to know all Fragments that are going to be used. This
requires deep knowledge of the whole data tree.

We'd like to be able to follow Depency Inversion principle "Depend upon
abstractions, not concretions."

## Fragment interfaces

By introducing the concept of interfaces for fragments we can merge multiple
fragments into one:

```graphql
@extend()
fragment AllPages on Cart {}

@extend()
fragment CartPage on Cart {}

@extend()
fragment ShippingPage on Cart {}

@extend()
fragment PaymentPage on Cart {}
```

On the CartHeader

```graphql

@extend('AllPages')
fragment CartHeaderFragment on Cart {}
```

We create 'mergeable fragments', when multiple fragments with the same name are
encountered, we merge those fragments into one.

Since the Fragments that are rendered differ based on a specific page we in
theory can't fetch the absolute minimal.
