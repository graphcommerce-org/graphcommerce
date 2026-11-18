---
'@graphcommerce/magento-fixed-product-taxes': minor
---

Add `@graphcommerce/magento-fixed-product-taxes` — a new package that renders
Magento's Fixed Product Taxes (FPT / WEEE / GreenTax) on product pages and
inside cart items. The store-config display setting drives the behaviour:
nothing is rendered when FPT is disabled or set to "without details"; per-tax
labels and amounts are shown for the "with details" modes; an extra "Final
price" line is appended when the price excludes FPT. Activate via
`PRIVATE_ADDITIONAL_DEPENDENCIES`.
