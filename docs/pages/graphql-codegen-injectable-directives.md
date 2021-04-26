# GraphQL Codegen Injectable directives

It introduces two new directives (`@injectable` and `@inject`) that allow us to
have achieve dependency inversion.

## `@injectable`

Define a fragment that can be extended

```graphql
fragment InjectableFragment on StoreConfig @injectable {
  store_code
}
```

### `@inject(into: ["Model"])`

Define where a fragment should be injected into

```graphql
fragment Frag on StoreConfig @inject(into: ["InjectableFragment"]) {
  base_url
}
```

## Output

When the GraphQL Codegen has ran, it outputs the following:

```
fragment InjectableFragment on StoreConfig {
  store_code
  ...Frag
}

fragment Frag on StoreConfig {
  base_url
}
```

### What problem are we solving?

Given we have the following structure:

Say we have the following to Fragments that request data:

```graphql
# packages/magento-cart
fragment CartCount on Cart {
  total_quantity
}
```

```graphql
# @my/custom-totals
fragment MyTotals on Cart {
  prices {
    grand_total {
      value
    }
  }
}
```

And given we have the following mutations:

```graphql
# packages/magento-product-simple
mutation AddSimple($cartId: String!, $sku: String!) {
  addProductsToCart(cartId: $cartId, cartItems: [{ quantity: 1, sku: $sku }]) {
    cart {
      id
      # ???
    }
  }
}
```

```graphql
# packages/magento-product-configurable
mutation AddConfigurable(
  $cartId: String!
  $sku: String!
  $selectedOptions: [ID!]!
) {
  addProductsToCart(
    cartId: $cartId
    cartItems: [{ quantity: 1, sku: $sku, selected_options: $selectedOptions }]
  ) {
    cart {
      id
      # ???
    }
  }
}
```

## Now what should go at the `???`?

The answer is easy:

```graphql
...MyTotals
...CartCount
```

If we take look however at the packages where the fields are defined we run into
a problem:

- CartCount: `packages/magento-cart`
- MyTotals:`@my/custom-totals`
- AddSimple: `packages/magento-product-simple`
- AddConfigurable: `packages/magento-product-configurable`

`AddConfigurable` isn't supposed to know about `CartCount`, although there is an
argument to be made that `magento-product-configurable` can be allowed to
depended on `packages/magento-cart`.

`AddConfigurable` _certainly_ can't know about `MyTotals`, as that code doesn't
even exist.

### Doesn't Fragments solve this issue?

Alright, lets introduce a `CartItemChangeFragment` to consolidate the
modification areas to _one_:

```graphql
# packages/magento-cart
fragment CartItemChangeFragment on Cart {
  ...CartCount
  ...MyTotals #??? can't do this
}
```

We can't add `MyTotals` here, as the `packages/magento-cart` doesn't know
MyTotals exists and never will.

```graphql
# packages/magento-product-simple
mutation AddSimple {
  addProductsToCart(...bla) {
    cart {
      ...CartItemChangeFragment
    }
  }
}
```

```graphql
# packages/magento-product-configurable
mutation AddConfigurable {
  addProductsToCart(...bla) {
    cart {
      ...CartItemChangeFragment
    }
  }
}
```

### How can it be done then? Injectables

We add the `@injectable` directive to `CartItemChangeFragment`;

```graphql
# packages/magento-cart
fragment CartItemChangeFragment on Cart @injectable {
  ...CartCount # is also in packages/magento-cart
}
```

We add the `@inject(into: ["FragmentToInjectInto"])` directive to `MyTotals`

```graphql
fragment MyTotals on Cart @inject(into: ["CartItemChangeFragment"]) {
  prices {
    grand_total {
      value
    }
  }
}
```

After compilation the result will now be:

```graphql
fragment CartItemChangeFragment on Cart @injectable {
  ...CartCount
  ...MyTotals # 🎉 We've magically inserted some other fragment here!
}
```
