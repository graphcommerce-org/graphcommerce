# Cart

We developed a new cart which uses ActionCards. This new cart is available from
Graphcommerce version 6.2. Users who are still using Graphcommerce version 6.1
or lower are still required to use the old cart. Examples of the new and old
cart are displayed below.

# CartItemsActionCards

To use the new cart use CartItemsActionCards. ONLY IF USING VERSION 6.2 OR
HIGHER!

```tsx
<CartItemsActionCards
  cart={data.cart}
  itemProps={{
    variant: 'default',
  }}
/>
```

# Legacy CartItems

To use the old cart use this component.

```tsx
<CartItems
  items={data?.cart?.items}
  id={data?.cart?.id ?? ''}
  key='cart'
  renderer={{
    BundleCartItem: CartItem,
    ConfigurableCartItem,
    DownloadableCartItem: CartItem,
    SimpleCartItem: CartItem,
    VirtualCartItem: CartItem,
    GiftCardCartItem: CartItem,
  }}
/>
```
