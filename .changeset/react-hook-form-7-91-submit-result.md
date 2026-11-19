---
'@graphcommerce/react-hook-form': patch
'@graphcommerce/magento-product': patch
---

The `handleSubmit` of `useFormGql` returns the result of `onValid`, the same as `handleSubmit` of React Hook Form 7.91. `ProductFiltersProContext.submit` returns `Promise<unknown>`.
