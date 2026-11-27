# @graphcommerce/magento-fixed-product-taxes

Renders Magento's **Fixed Product Taxes** (FPT, also known as WEEE / GreenTax)
on product pages and inside cart items.

## Activate

Add to `PRIVATE_ADDITIONAL_DEPENDENCIES` in `.env`:

```bash
PRIVATE_ADDITIONAL_DEPENDENCIES="@graphcommerce/magento-fixed-product-taxes"
```

## Behaviour

Display is driven by Magento's `StoreConfig.product_fixed_product_tax_display_setting`:

| Setting                                | Effect                                                                       |
| -------------------------------------- | ---------------------------------------------------------------------------- |
| `FPT_DISABLED`                         | No FPT rendering.                                                            |
| `INCLUDE_FPT_WITHOUT_DETAILS`          | Tax is already in the price; nothing extra is rendered.                      |
| `INCLUDE_FPT_WITH_DETAILS`             | Show each FPT label + amount next to the price.                              |
| `EXCLUDE_FPT_WITHOUT_DETAILS`          | Price excludes FPT; nothing extra is rendered.                               |
| `EXCLUDE_FPT_AND_INCLUDE_WITH_DETAILS` | Price excludes FPT and the FPT lines are rendered. A final price is shown.   |
