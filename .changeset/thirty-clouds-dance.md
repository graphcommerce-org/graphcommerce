---
'@graphcommerce/magento-customer': minor
'@graphcommerce/magento-cart': minor
'@graphcommerce/graphql': minor
---

Faster page rendering on all pages that use Apollo Client: Revert to classical useEffect strategy for Apollo cache persist restore and remove custom hydration strategies from the cart/customer.

This comes with a caviat: When using `<Suspense>` to defer rendering you might run into hydration errors. In the case where the Suspense boundaries are used to improve performance, you are required to remove those. We have a follow-up [PR](https://github.com/graphcommerce-org/graphcommerce/pull/1878) in the works that allows getting the hydration performance improvement, but not have the hydration errors.
