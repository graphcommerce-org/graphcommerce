---
'@graphcommerce/magento-cart-shipping-method': patch
'@graphcommerce/react-hook-form': patch
---

Created a new experimental mutation abort feature inside `useFormGql`. This will allow redundant mutations to be canceled. This is enabled when the `experimental_useV2` prop on the `useFormGql` hook is used.
