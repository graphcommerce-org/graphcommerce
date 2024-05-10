# Upgrading from GraphCommerce 8 to 9

Depending on the amounts of customisations you've made, there are some manual
steps. Please follow the regular [upgrade steps first](./readme.md).

1. ReactPlugin TypeScript definition is removed.
2. Locales now require an explicit configuration.

## 1. ReactPlugin TypeScript definition is removed

The `ReactPlugin` TypeScript definition has been removed and only `PluginProps`
is available.

Replace

```tsx
const MyPlugin: ReactPlugin<typeof OriginalComponent> = (props) => {
  const { Prev, ...rest } = props
  return <Prev {...rest} />
}
export const Plugin = MyPlugin
```

Now becomes:

```tsx
const MyPlugin = (props: PluginProps<OriginalComponentProps>) => {
  const { Prev, ...rest } = props
  return <Prev {...rest} />
}
export const Plugin = MyPlugin
```

There is a new plugin configuration method by using
`export config: PluginConfig = {}`.

2. linguiLocale now requires an explicit configuration where they differ from
   the locale

> linguiLocale: Custom locale used to load the .po files. Must be a valid
> locale, also used for Intl functions.

In the example below, the linguiLocale is not required for `en` as `en.po`
exits, but it is required for `fr-be` as only `fr.po` exists. This thus also
allows you to create `fr-be.po` and use that.

```js
const config = {
  storefront: [
    { locale: 'en', magentoStoreCode: 'en_US', defaultLocale: true },
    { locale: 'fr-be', magentoStoreCode: 'nl_NL', linguiLocale: 'fr' },
  ],
}
```
