---
'@graphcommerce/demo-magento-graphcommerce': major
'@graphcommerce/ecommerce-ui': major
'@graphcommerce/framer-next-pages': major
'@graphcommerce/framer-scroller': major
'@graphcommerce/framer-utils': major
'@graphcommerce/magento-cart': major
'@graphcommerce/magento-cart-checkout': major
'@graphcommerce/magento-cart-coupon': major
'@graphcommerce/magento-cart-email': major
'@graphcommerce/magento-cart-items': major
'@graphcommerce/magento-cart-payment-method': major
'@graphcommerce/magento-cart-pickup': major
'@graphcommerce/magento-cart-shipping-address': major
'@graphcommerce/magento-cart-shipping-method': major
'@graphcommerce/magento-compare': major
'@graphcommerce/magento-customer': major
'@graphcommerce/magento-newsletter': major
'@graphcommerce/magento-payment-afterpay': major
'@graphcommerce/magento-payment-braintree': major
'@graphcommerce/magento-payment-included': major
'@graphcommerce/magento-payment-klarna': major
'@graphcommerce/magento-payment-paypal': major
'@graphcommerce/magento-payment-tokens': major
'@graphcommerce/magento-product': major
'@graphcommerce/magento-product-configurable': major
'@graphcommerce/magento-recently-viewed-products': major
'@graphcommerce/magento-search': major
'@graphcommerce/magento-search-overlay': major
'@graphcommerce/magento-wishlist': major
'@graphcommerce/next-ui': major
---

**Breaking change:** GraphCommerce imports `motion/react` and requires the `motion` package. In your project, replace the `framer-motion` dependency with `motion` 14 and change the imports from `framer-motion` to `motion/react`.
