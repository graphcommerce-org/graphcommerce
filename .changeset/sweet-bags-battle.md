---
'@graphcommerce/magento-cart': minor
'@graphcommerce/magento-customer': minor
---

Bug fix that replaces the currentCartId when an error occures in the useCartQuery hook. Also added a SessionDebugger component that could be usefull when trying to debug usersession logic. This component is able to modify the current authentication token and thus will be able to destroy your current session.
