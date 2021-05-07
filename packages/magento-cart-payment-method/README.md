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
  PaymentToggle?: React.VFC<PaymentToggleProps>
  expandMethods?: ExpandPaymentMethods
}
```

As you can see, there is nothing required.
