---
'@graphcommerce/next-config': patch
---

Redirect the Magento frontend account URLs that end up in transactional emails to their GraphCommerce equivalents.

Magento renders links from `base_link_url`, which on a headless setup points at the GraphCommerce storefront. Every stock email template contains a `customer/account/` link ("Sign in to your account"), and gated Magento routes 302 to `customer/account/login` — none of which GraphCommerce serves, so customers landed on a 404.

`withGraphCommerce` now adds permanent redirects for `/customer/account`, `/customer/account/index`, `/customer/account/login`, `/customer/account/create` and `/sales/order/history`. They are exact matches on purpose: a redirect wins over a filesystem route, and `/customer/account/confirm` and `/customer/account/createPassword` are real pages in the examples — the two that carry Magento's confirmation `key` and reset `rp_token`. A `/customer/account/:path*` catch-all would make both unreachable.

This restores the `/customer/account` redirect that was dropped as collateral in "Remove redirects for `/product/$type/[url]` routes".
