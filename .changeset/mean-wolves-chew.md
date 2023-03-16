---
'@graphcommerce/magento-graphcms': major
'@graphcommerce/magento-product': major
'@graphcommerce/next-config': major
---

Created a completely new [GraphCommerce config system](https://www.graphcommerce.org/docs/framework/config) to allow for greater confiugration options and rely less on a .env file to configuration.

- GraphCommerce can be configured in the graphcommerce.config.js
- The configuration is automatically validated on startup.
- All configuration values can be overwritten by environment variables.
