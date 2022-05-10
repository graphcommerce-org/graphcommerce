---
'@graphcommerce/docs': patch
'@graphcommerce/magento-graphcms': patch
'@graphcommerce/ecommerce-ui': patch
'@graphcommerce/framer-scroller': patch
'@graphcommerce/lingui-next': patch
'@graphcommerce/magento-cart': patch
'@graphcommerce/magento-cart-billing-address': patch
'@graphcommerce/magento-cart-checkout': patch
'@graphcommerce/magento-cart-coupon': patch
'@graphcommerce/magento-cart-email': patch
'@graphcommerce/magento-cart-items': patch
'@graphcommerce/magento-cart-payment-method': patch
'@graphcommerce/magento-cart-pickup': patch
'@graphcommerce/magento-cart-shipping-address': patch
'@graphcommerce/magento-cart-shipping-method': patch
'@graphcommerce/magento-category': patch
'@graphcommerce/magento-cms': patch
'@graphcommerce/magento-customer': patch
'@graphcommerce/magento-customer-account': patch
'@graphcommerce/magento-customer-order': patch
'@graphcommerce/magento-newsletter': patch
'@graphcommerce/magento-pagebuilder': patch
'@graphcommerce/magento-payment-braintree': patch
'@graphcommerce/magento-payment-included': patch
'@graphcommerce/magento-payment-klarna': patch
'@graphcommerce/magento-product': patch
'@graphcommerce/magento-product-bundle': patch
'@graphcommerce/magento-product-configurable': patch
'@graphcommerce/magento-product-downloadable': patch
'@graphcommerce/magento-product-grouped': patch
'@graphcommerce/magento-product-simple': patch
'@graphcommerce/magento-product-virtual': patch
'@graphcommerce/magento-review': patch
'@graphcommerce/magento-search': patch
'@graphcommerce/magento-store': patch
'@graphcommerce/magento-wishlist': patch
'@graphcommerce/mollie-magento-payment': patch
'@graphcommerce/next-ui': patch
---

Removed all occurences of @lingui/macro and moved to @lingui/macro / @lingui/core in preparation to move to swc.

Since we've removed @lingui/macro, all occurences need to be replaced with @lingui/core and @lingui/react.

All occurences of `<Trans>` and `t` need to be replaced:

```tsx
import { Trans, t } from '@lingui/macro'

function MyComponent() {
  const foo = 'bar'
  return (
    <div aria-label={t`Account ${foo}`}>
      <Trans>My Translation {foo}</Trans>
    </div>
  )
}
```

Needs to be replaced with:

```tsx
import { Trans } from '@lingui/react'
import { i18n } from '@lingui/core'

function MyComponent() {
  const foo = 'bar'
  return (
    <div aria-label={i18n._(/* i18n */ `Account {foo}`, { foo })}>
      <Trans key='My Translation {foo}' values={{ foo }}></Trans>
    </div>
  )
}
```

[More examples for Trans](https://lingui.js.org/ref/macro.html#examples-of-jsx-macros) and [more examples for `t`](https://lingui.js.org/ref/macro.html#examples-of-js-macros)
