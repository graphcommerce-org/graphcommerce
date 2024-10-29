---
'@graphcommerce/react-hook-form': minor
---

`useFormGql` and it's derived hooks now have a new `skipUnchanged` prop. The form will only be submitted when there are fields dirty in a form. This reduces the amount of queries ran in the checkout greatly.
