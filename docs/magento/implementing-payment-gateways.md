---
menu: Payment methods
---

# Magento Payment methods

Currently supported methods:

- [PayPal](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-paypal)
- [Mollie](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/mollie-magento-payment)
- [Braintree](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-braintree)
- [Adyen](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-adyen)
- [MultiSafePay](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-multisafepay)
- [Klarna](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-klarna)

## Creating a Magento compatible payment gateway

Payment gateways are the most important part of any e-commerce store. In this
section, we will discuss the requirements for implementing a payment gateway in
Magento 2 that is compatible with GraphCommerce.

There are multiple flows to handle payments.

### Redirecting payment gateway

The first step is to call `setPaymentMethodOnCart` and `placeOrder`.

```ts
const variables = {
  cartId: 'currentCartId',
  paymentMethod: {
    code: 'my_payment_method',
    my_gateway: {
      return_url: 'https://my-site.com/checkout/billing?token=$TOKEN',
      custom_field: 'blabla',
    },
  },
}
```

```graphql
mutation MyGatewayPaymentOptions(
  $cartId: String!
  $paymentMethod: PaymentMethodInput!
) {
  setPaymentMethodOnCart(
    input: { cart_id: $cartId, payment_method: $paymentMethod }
  ) {
    cart {
      ...PaymentMethodUpdated
    }
  }
}
```

```graphql
mutation MyGatewayPaymentOptionsAndPlaceOrder($cartId: String!) {
  placeOrder(input: { cart_id: $cartId }) {
    order {
      order_number
      my_gateway_status {
        token
        status # Will probably be REDIRECT_SHOPPER
        redirect_url
      }
    }
  }
}
```

When the query succeeds the GraphCommerce payment module will redirect to the
`payment_url`. The customer handles it's payment on the payment gateway's
website. One of the following things can happen:

- **Result 1:** The customer has successfully paid and the customer is
  redirected back to the `return_url` with the `$TOKEN` injected.

- **Result 2:** The customer has failed their payment and the customer is
  redirected back to the `return_url` with the `$TOKEN` injected.

- **Result 3:** The customer presses back in their browser and we still get the
  token from the `placeOrder` mutation.

GraphCommerce now needs to check if the payment has indeed succeeded by calling
the payment gateway's custom endpoint:

```graphql
mutation MyGatewayProcessPayment($cartId: String!, $token: String!) {
  myGatewayPaymentStatus(input: { cartId: $cartId, token: $string }) {
    status
    error_message
    cart {
      # it will optionally return the cart if it hasn't succeeded yet and is recovered.
      id
    }
  }
}
```

After that GraphCommerce can either:

- Redirect to the success page
- Restore the cart, show the error message and let the customer checkout again.

### The GraphQL Schema for the above example looks something like this:

```graphql
input PaymentMethodInput {
  my_gateway: MyGatewayPaymentInput
}

input MyGatewayPaymentInput {
  """
  The URL to which the customer should be redirected, after the payment has been processed.

  This should be a fully qualified URL: https://mydomain.com/checkout/payment?token=$TOKEN, where $TOKEN will be replaced with the payment gateway token.

  This information should be stored in the database (encrypted if required)
  """
  return_url: String!
  """
  Payment gateway can accept any custom field, for example an issuer or any additional information that can be configured in the checkout.

  This information should be stored in the database (encrypted if required)
  """
  custom_field: String
}

type Order {
  my_gateway_status: MyGatewayStatus
}

type Mutation {
  myGatewayPaymentStatus: MyGatewayStatus
}

type MyGatewayStatus {
  """
  Returns the secret token that is used to check the payment status and is understood by the external payment gateway.
  """
  token: String!
  """
  Status of the current payment.
  """
  status: MyGatewayStatusEnum!
  """
  Returned when status ERROR and there is a message to show to the customer from the gateway
  """
  error_message: String
  """
  Returned when the status is REDIRECT_SHOPPER
  """
  redirect_url: String
  """
  Retuned when when the cart has been restored on status CANCELLED, ERROR, REFUSED
  """
  cart: Cart
}

"""
StatusEnum of the payment gateway.
Should probably look something like the following but can be extended / reduced according payment gateway's requirements.
"""
enum MyGatewayStatusEnum {
  """
  Will be returned when the order is placed.
  """
  REDIRECT_SHOPPER
  """
  Will be returned when the customer has cancelled the payment on the external site.
  Will be returned if the customer has pressed back in their browser.
  """
  CANCELLED
  """
  Will be returned if the payment hasn't succeeded, to be used in tandem with error_message
  """
  ERROR
  """
  Will be returned if the payment was rejected by the payment gateway.
  """
  REFUSED
  """
  Payment has succeeded
  """
  SUCCESS
}
```

## Next steps

- [Overview](./readme)
