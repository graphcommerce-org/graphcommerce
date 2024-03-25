# Plugins GraphCommerce

GraphCommerce's plugin system allows you to extend or replace GraphCommerce's
built-in components or functions with your own logic.

- No runtime overhead: The plugin system is fully implemented in webpack and
- Easy plugin creation: Configuration should happen in the plugin file, not a
  separate configuration file.
- Should be validated with TypeScript

## What is a plugin

A plugin is a way to modify React Components or a Function by wrapping them,
without having to modify the code directly.

> For the M2 people: Think of around plugins, but without configuration files
> and no performance penalty.

GraphCommerce has three kinds of plugins, component plugins, function plugins
and replacement plugins.

React Component plugins, which can be used to:

- Pass props to components
- Place your own components before the original component
- Place your own components after the original component
- Skip rendering of the original component conditionally

Function plugins, which can be used to:

- Call a function before the original function
- Call a function after the original function
- Modify the return value of a function
- Modify the arguments of a function
- Skip calling the original function conditionally

Replacement plugins, which can be used to:

- Replace any export with your own implementation
- Replace an internal component used by another internal component with your own
  implementation.

## How do I write a component plugin?

In this example we're going to add some text to list items, just like the text
‘BY GC’ that can seen in the demo on
[category pages](https://graphcommerce.vercel.app/en/women/business).

Create a new file in `/plugins/MyProductListItemPlugin.tsx` with the following
contents:

```tsx
import type { ProductListItemProps } from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { Typography } from '@mui/material'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
}

// Exported name should be the same as the function you want to create a plugin for
export const ProductListItem = (props: PluginProps<ProductListItemProps>) => {
  // Prev in this case is ProductListItem, you should be able to see this if you log it.
  // Prev needs to be rendered and {...rest} always needs to be passed.
  const { Prev, ...rest } = props
  return (
    <Prev
      {...rest}
      subTitle={
        <Typography component='span' variant='caption'>
          Plugin!
        </Typography>
      }
    />
  )
}
```

## How do I write a function plugin?

Create a new file in `/plugins/myFunctionPlugin.tsx` with the following
contents:

```tsx
import type { graphqlConfig as graphqlConfigType } from '@graphcommerce/graphql'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { createStoreLink } from '../link/createStoreLink'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/graphql',
}

// Exported name should be the same as the function you want to create a plugin for
export const graphqlConfig: FunctionPlugin<typeof graphqlConfigType> = (
  prev,
  conf,
) => {
  const results = prev(conf)
  return {
    ...results,
    links: [...results.links, createStoreLink(conf.storefront.locale)],
  }
}
```

## How do I write a replacement plugin?

```tsx
import { ProductCountProps } from '@graphcommerce/magento-product'
import { PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'replace',
  module: '@graphcommerce/magento-product',
}

export function ProductListCount(props: ProductCountProps) {
  const { total_count } = props
  return <div>{total_count}</div>
}
```

Note: The original component can not be used, because we completely rewrite the
export. If you want to do this, a component or function plugin is a better
choice.

## How do make sure my plugin is applied?

When creating the plugin for the first time you need to restart your dev server
once. After the first generation of the interceptor file, the file is watched
and changes will be picked up.

If everything went as expected you should see your plugin applied correct.

## How can I debug to see which plugins are applied?

You can enable debug mode in your graphcommerce.config.js:

```js
const config = {
  debug: { pluginStatus: true },
}
```

Or use `GC_DEBUG_PLUGIN_STATUS=true` in your environment variables.

### How are plugins loaded?

GraphCommerce uses a custom Webpack plugin to load the plugins. The plugin does
a glob search for plugin folders in each GraphCommerce related pacakge:
`${packageLocation}/plugins/**/*.{ts|tsx}`

Package locations are the root and all packages with `graphcommerce` in the name
(This means all `@graphcommerce/*` packages and
`@your-company/graphcommerce-plugin-name`)

The Webpack plugin statically analyses the plugin files to find any valid
configuration. This is then used to create the interceptors.

### Conditionally include a plugin

Provide an ifConfig in the plugin config to conditionally include a plugin if a
[configuration](./config.md) value is truthy:

```tsx
export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
  ifConfig: 'demoMode',
}
```

Or checking on a value:

```tsx
export const config: PluginConfig<'compareVariant'> = {
  type: 'component',
  module: '@graphcommerce/magento-product',
  ifConfig: ['compareVariant', 'CHECKBOX'],
}
```

### Plugin loading order

The plugin loading order is determined by the order of the dependencies defined
in the package.json. If the order isn't correct, make sure you've defined the
correct dependencies in your package.json.

Local plugins are closest to the original component, meaning that package
specific plugins have already been called before your plugin is called.

## How does it work?

After the creation of the plugin file GraphCommerce will create an 'interceptor'
for your file.

To see the the created plugin for ProductListItem, '_Go to Definition_'
(CMD/Ctrl+Click) on `<ProductListItem>` in
`components/ProductListItems/productListRenderer.tsx`. You should now go to the
`ProductListItem.interceptor.tsx` file.

In this file the original `ProductListItem` is replaced with
`PluginDemoProductListItemInterceptor`. The interceptor renders
`<PluginDemoProductListItemSource />` with a `Prev` prop which is the plugin.

The whole plugin 'chain' is constructed here and eventually ending up on
`ProductListItemOriginal` which is the original component (but renamed).

### Examples

In the examples above we've extended the product list items, but it should also
work for other things such as:

- [Update the gallery when a configurable is selected](https://github.com/graphcommerce-org/graphcommerce/blob/canary/packages/magento-product-configurable/plugins/ConfigurableProductPage/ConfigurableProductPageGallery.tsx)
- [Insert the Google Recaptcha Script](https://github.com/graphcommerce-org/graphcommerce/blob/canary/packages/googlerecaptcha/plugins/GrecaptchaGraphQLProvider.tsx)
- [Activate Google Recaptcha when a form is loaded](https://github.com/graphcommerce-org/graphcommerce/blob/canary/packages/googlerecaptcha/plugins/GrecaptchaApolloErrorSnackbar.tsx)
- [Add a compare icon next to the cart icon](https://github.com/graphcommerce-org/graphcommerce/blob/canary/packages/magento-compare/plugins/AddCompareFabNextToCart.tsx)
- [Add a compare icon to the ProductListItem](https://github.com/graphcommerce-org/graphcommerce/blob/canary/packages/magento-compare/plugins/CompareAbleProductListItem.tsx)
- etc.
