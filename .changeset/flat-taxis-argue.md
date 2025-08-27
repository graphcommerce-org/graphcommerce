---
'@graphcommerce/react-hook-form': patch
---

Solve an issue where the false value of the useFormGql was incorrectly interpreted as an error while it was a SKIP. Fixes an issue where the CustomerAddressForm is not submitting properly when the user is adding a new address.
