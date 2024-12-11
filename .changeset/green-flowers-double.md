---
'@graphcommerce/react-hook-form': patch
---

When a `useFormGql` throws an error in the `onBeforeSubmit` method or `onComplete` method it will be set as an ApolloError with the message, allowing it to be displayed somewhere. The `<PaymentMethodButton />` will now render this as an `<ErrorSnackbar />`.
