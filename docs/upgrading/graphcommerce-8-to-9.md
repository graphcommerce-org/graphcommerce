# Upgrading from GraphCommerce 7 to 8

Depending on the amounts of customisations you've made, there are some manual
steps. Please follow the regular [upgrade steps first](./readme.md).

1. ReactPlugin TypeScript definition is removed.

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
