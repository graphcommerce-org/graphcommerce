---
'@graphcommerce/magento-store': minor
---

Added the ability to configure `defaultProps` for the <Money/> component.

```ts
// For example in examples/magento-graphcms/theme.ts

const createOverrides = (theme: Theme): Components => ({
  Money: {
    defaultProps: {
      round: true,
      formatOptions: {
        style: 'decimal',
      },
    },
  },
})
```
