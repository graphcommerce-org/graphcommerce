---
'@graphcommerce/next-config': minor
---

Big improvements to the plugin system: Typescript validated, deeper resolution, new configuration object, replace plugins, and more ifConfig options.

1. Plugins now use TypeScript's `"moduleSuffixes": [".interceptor", ""]` [functionality](https://www.typescriptlang.org/tsconfig#moduleSuffixes) which means that plugins now correctly resolve via TypeScript. So if you _go to reference_ in VSCode (or any other editor), you go to the interceptor directly and see which plugins are applied there. This also means that plugins are automatically checked during build (and will fail if there are errors).

2. The exported type of an _intercepted component_ now has the types of all plugins applied. This means that plugins can modify the props of components (and is still validated with TypeScript). To make this work a plugin must always forward props to the `<Prev>` to ensure that values are correctly passed on.

3. Plugins will now always be applied to deepest resolved path. This means that a plugin automatically applies to internal usages as well. This thus means that plugins do not need to be written with an internal path, but can keep the parent path. Istead of writing `@graphcommerce/magento-cart-items/components/RemoveItemFromCart/RemoveItemFromCartFab` you can now write `@graphcommerce/magento-cart-items`.

4. A new configuration object for plugins is created instead of separate exports (the legacy format is still supported though):

   ```tsx
   export const config: PluginConfig = {
     type: 'component'
     module: '@graphcommerce/magento-product',
     ifConfig: 'demoMode',
   }
   ```

   This also means that the _name of the export_ dictates the name of the component/function the plugin is applied.

5. We now support replace plugins (`type: 'replace'`), which allow you to replace the original component/function/const completely (and type checked of course).

   ```tsx
   import { ProductPageNameProps } from '@graphcommerce/magento-product'
   import { PluginConfig } from '@graphcommerce/next-config'

   export const config: PluginConfig = {
     type: 'replace',
     module: '@graphcommerce/magento-product',
   }

   export function ProductPageName(props: ProductPageNameProps) {
     const { product } = props
     return <div>REPLACEMENT {product.url_key}</div>
   }
   ```

   Plugin files can now have multiple exports for the same configuration. So next to the `ProductPageName` you can also have a `ProductPagePrice` export for example in the same file.

6. We now support `ifConfig` tuple which allows you to apply a plugin only if a certain configuration is set.

   ```tsx
   export const config: PluginConfig = {
     type: 'replace',
     module: '@graphcommerce/magento-product',
     ifConfig: ['theme', 'my-theme'],
   }
   ```

   This allows you to support multiple builds with different plugins applied. For example one build with `GC_THEME=my-theme` and another with `GC_THEME=my-other-theme`.
