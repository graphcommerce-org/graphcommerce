---
'@graphcommerce/magento-cart': patch
---

After a user just logged in the checkout, the useFormGqlMutationCart would still run even though the cart was locked.
