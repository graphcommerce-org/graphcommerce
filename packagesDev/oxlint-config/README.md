# @graphcommerce/oxlint-config-pwa

The Oxlint configuration of GraphCommerce. Add `oxlint.config.mts` to the root
of the project:

```ts
export { default } from '@graphcommerce/oxlint-config-pwa'
```

```bash
oxlint --type-aware
```

[`plugin.mjs`](./plugin.mjs) adds the `graphcommerce/no-extraneous-dependencies`,
`graphcommerce/no-relative-packages` and `graphcommerce/no-restricted-syntax`
rules.
