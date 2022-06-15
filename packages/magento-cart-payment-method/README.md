# Magento Payment

Defines the API's and building blocks to create payment methods in the checkout.

## Flow

## Payment Method module

A Magento Payment Method module must implement
[`PaymentModule`]('./PaymentMethods')

```tsx
export interface PaymentModule {
  PaymentOptions: React.VFC<PaymentOptionsProps>
  PaymentButton?: React.VFC<PaymentButtonProps>
  expandMethods?: ExpandPaymentMethods
}
```

## Creating a payment method

If a payment method is not implemented it will show a console error
`No PaymentModule found for method ${code}`

### 1. Create the module

```tsx
import {
  PaymentMethodOptionsNoop,
  PaymentMethodPlaceOrderNoop,
  PaymentModule,
} from '@graphcommerce/magento-cart-payment-method'

// This is the internal code of the payment method provided by Magento
export const braintree_local_payment = {
  PaymentOptions: PaymentMethodOptionsNoop,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
} as PaymentModule
```

### 2. Register the module

On your payment page (`pages/checkout/payment.tsx` by default) pass in the
payment method into the PaymentMethodContextProvider:

```tsx
<PaymentMethodContextProvider
  modules={{ ...included_methods, braintree_local_payment }}
>
```

### 3. Customize setPaymentMethodOnCart

Open `PaymentMethodOptionsNoop` and `PaymentMethodPlaceOrderNoop` for details
how it is used.
