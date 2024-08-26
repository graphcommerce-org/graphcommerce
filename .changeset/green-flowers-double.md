---
'@graphcommerce/react-hook-form': patch
---

When a useFormGql throws an error in the onBeforeSubmit method or onComplete method it will setError('root.thrown') with the message, allowing it to be displayed somewhere. PaymentMethodButton will now render this as an ErrorSnackbar.
