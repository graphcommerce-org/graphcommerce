---
'@graphcommerce/react-hook-form': patch
---

Solve an issue where the payment submission would remain in a spinning state when placing an order failed: `useFormGql` will now set `root` error on the form when there is an error response on the GraphQL operation, an error is thrown in onBeforeSubmit and in onSuccess.
