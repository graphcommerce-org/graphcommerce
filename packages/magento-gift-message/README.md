# Magento Gift Message

Magento Open Source does not have access to setting the gift message on the cart
globally.

## Configuration of the Gift message on a cart item can be achieved with:

```graphql
mutation UpdateCartItem($cart_id: String!) {
  updateCartItems(
    input: {
      cart_id: $cart_id
      cart_items: [{ cart_item_uid: "string", gift_message: $gift_message }]
    }
  )
}
```
