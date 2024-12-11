# Upgrading from GraphCommerce 8 to 9

Depending on the amounts of customisations you've made, there are some manual
steps. Please follow the regular [upgrade steps first](./readme.md).

1. ReactPlugin TypeScript definition is removed.
2. Locales now require an explicit configuration.
3. `@graphcommerce/graphcms-ui` is now `@graphcommerce/hygraph-ui`
4. `@ducanh2912/next-pwa` replaced by `serwist`
5. `next-sitemap` replaced by custom implementation

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

3. `@graphcommerce/graphcms-ui` is now `@graphcommerce/hygraph-ui`

Replace all `@graphcommerce/graphcms-ui` with `@graphcommerce/hygraph-ui`.

4. `@ducanh2912/next-pwa` replaced by `serwist`

Any customizations made to the service worker should

5. `next-sitemap` replaced by custom implementation.

- pages/robots.txt.tsx
- pages/sitemap/categories.xml.tsx
- pages/sitemap/content.xml.tsx
- pages/sitemap/products.xml.tsx
