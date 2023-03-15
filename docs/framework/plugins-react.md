# Plugins React

GraphCommerce's React plugin system allows you to extend GraphCommerce's build
in components with your own logic.

- No runtime overhead: The plugin system is fully implemented in webpack and
- Easy plugin creation: Configuration should happen in the plugin file, not a
  separate configuration file.
- Should be validated with TypeScript

## What is a plugin

A plugin is a way to modify React Components by wrapping them, without having to
modify the code directly.

For the M2 people: Think of around plugins, but without configuration files and
no performance penalty.

## How do I write a plugin?

In this example we're going to add a 'BY GC' text to list items, as can seen on
the demo on
[category pages](https://graphcommerce.vercel.app/nl/women/business).

1. Create a new file in `/plugins/ProductListItemByGC.tsx` with the following
   contents:

   ```tsx
   import type { ProductListItemProps } from '@graphcommerce/magento-product'
   import type { PluginProps } from '@graphcommerce/next-config'
   import { Typography } from '@mui/material'

   export const component = 'ProductListItem' // Component to extend, required
   export const exported = '@graphcommerce/magento-product' // Location where the component is exported, required

   function AwesomeProductListItem(props: PluginProps<ProductListItemProps>) {
     // Prev in this case is ProductListItem, you should be able to see this if you log it.
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
   export const Plugin = AwesomeProductListItem // An export with the name Plugin, required
   ```

2. Trigger the 'interceptor generation' so GraphCommerce knows of the existence
   of your plugin. To enable: Modify the page that you expect the plugin to
   occur on. In this case modify `pages/[...url].tsx` by adding a few linebreaks
   and save the file

   If everything went as expected you should see `Plugin!` below the product
   name.

3. Happy programming!

## How does it work?

After the creation of the plugin file GraphCommerce will create an interceptor
file to load you plugin. To see what has happened, open the
`node_modules/@graphcommerce/magento-product/index.interceptor.tsx` and you
should see something like:

```tsx
export * from '.'
import { Plugin as AwesomeProductListItem } from '../../examples/magento-graphcms/plugins/AwesomeProductListItem'
import { ComponentProps } from 'react'
import { ProductListItem as ProductListItemBase } from '.'

/**
 * Interceptor for `<ProductListItem/>` with these plugins:
 *
 * - `../../examples/magento-graphcms/plugins/AwesomeProductListItem`
 */
type ProductListItemProps = ComponentProps<typeof ProductListItemBase>

function AwesomeProductListItemInterceptor(props: ProductListItemProps) {
  return <AwesomeProductListItem {...props} Prev={ProductListItemBase} />
}
export const ProductListItem = AwesomeProductListItemInterceptor
```

If you read the interceptor file from the bottom up, you see:

- The original `ProductListItem` is replaced with
  `AwesomeProductListItemInterceptor`
- `AwesomeProductListItemInterceptor` is a react component which renders
  `AwesomeProductListItem` with a `Prev` prop.
- `AwesomeProductListItem` is the plugin you just created.
- `Prev` is the original `ProductListItem` (renamed to `ProductListItemBase`)
- `ProductListItemProps` are the props of the original `ProductListItem` and
  thus your plugin is automatically validated by TypeScript.

So in conclusion, a plugin is a react component that renders the original
component with a `Prev` prop. The `Prev` prop is the original component.

When opening the React debugger you can see the plugin wrapped.

<img width="263" alt="Scherm­afbeelding 2023-03-15 om 12 16 59" src="https://user-images.githubusercontent.com/1244416/225293707-1ce1cd87-108b-4f28-b9ee-0c5d68d9a886.png">

### How are plugins loaded?

GraphCommerce uses a custom Webpack plugin to load the plugins. The plugin does
a glob search for plugin folders in each GraphCommerce related pacakge:
`${packageLocation}/plugins/**/*.tsx`

Package locations are the root and all packages with `graphcommerce` in the name
(This means all `@graphcommerce/*` packages and
`@your-company/graphcommerce-plugin-name`)

The Webpack plugin statically analyses the plugin file to find `component`,
`exported` and `ifConfig` and extracts that information.

### Possible use cases

In the examples above we've extended the payment methods, but it should also
work for other things such as:

- Googletagmanager
- Googleanalytics
- Google recaptcha
- Compare functionality?
- Wishlist functionality?
- Abstraction between GraphCommerce and Backends? (Magento, BigCommerce,
  CommerceTools, etc.)

### Conditionally include a plugin

Provide an ifConfig export in the plugin that will only include the plugin if a
[configuration](./config.md) value is truety.

```tsx
import type { IfConfig } from '@graphcommerce/next-config'
export const ifConfig: IfConfig = 'googleAnalytics'
```

### Plugin loading order

A plugin is injected later than the dependencies of the package. So if a plugin
is loaded to early, make sure the package has a dependency on the other package.
