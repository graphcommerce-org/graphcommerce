---
'@graphcommerce/react-hook-form': minor
---

When a ComposedSubmit is triggered it will now only submit forms that are dirty and skip all forms without dirty fields. This greatly reduces the amount of queries ran in the checkout.
