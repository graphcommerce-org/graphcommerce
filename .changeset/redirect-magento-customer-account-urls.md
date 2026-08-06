---
'@graphcommerce/next-config': patch
---

Redirect the Magento frontend account URLs that end up in transactional emails to their GraphCommerce equivalents.

Magento renders links from `base_link_url`, which on a headless setup points at the GraphCommerce storefront. Every stock email template contains a `customer/account/` link ("Sign in to your account"), and gated Magento routes 302 to `customer/account/login` — none of which GraphCommerce serves, so customers landed on a 404.

`withGraphCommerce` now adds permanent redirects for `/customer/account`, `/customer/account/index`, `/customer/account/login`, `/customer/account/create`, `/customer/account/forgotpassword` and `/sales/order/history`. They are exact matches on purpose: redirects run before the filesystem routes, so a `/customer/account/:path*` catch-all would shadow the `pages/customer/account/{confirm,createPassword}` routes that `@graphcommerce/magento-customer` copies into the project.

This restores the `/customer/account` redirect that was dropped as collateral in "Remove redirects for `/product/$type/[url]` routes".
