# Plugins

GraphCommerce plugin system allows you to extend GraphCommerce in a
plug-and-play manner. Install a new package and the code will be added at the
right places.

- Plug-and-play: It is be possible to install packages after which they
  immediately work.
- No runtime overhead: The plugin system is fully implemented in webpack and
- Easy plugin creation: Configuration should happen in the plugin file, not a
  separate configuration file.

## What problem are we solving?

Without plugins the only way to add new functionality is by modifying the code
of your project at multiple places. We often pass props to components to
customize them, but sometimes we also place hooks at multiple places.

For example, to add a new payment method it was necessary to modify the props of
`<PaymentMethodContextProvider methods={[...braintree]}>`

This causes problems:

- Upgrades: If GraphCommerce changes something somewhere in the code where you
  have already modified the code, you get an upgrade conflict which you have to
  manually resolve. By using plugins you can avoid this.
- New packages: When you install a complex new package, it can happen that you
  have to modify the code of your project at multiple places. This is not
  necessary with plugins.

## What is a plugin?

A plugin is a way to modify React Components by wrapping them, without having to
modify the code in `examples/magento-graphcms` or `your-project`.

For the M2 people: Think of around plugins, but without configuration files and
no performance penalty.

In the [PR](https://github.com/graphcommerce-org/graphcommerce/pull/1718) I have
made the
[`<PaymentMethodContextProvider />`](https://github.com/graphcommerce-org/graphcommerce/pull/1718/files#diff-d5b4da6c34d4b40dc8ac5d1c5967bc6f5aaa70d0d5ac79552f3a980b17a88ea9R115)
work with plugins.

The actual plugins are:

- [AddBraintreeMethods](https://github.com/graphcommerce-org/graphcommerce/pull/1718/files#diff-14391e8c8f598e720b3e99ece1248987d68eb6133d354a3a55ef82331905be5b)
- [AddIncludedMethods](https://github.com/graphcommerce-org/graphcommerce/pull/1718/files#diff-c3d57b802463ed40925b558049a56992202be975f3c86982e6a753e2830bdb9f)
- [AddPaypalMethods](https://github.com/graphcommerce-org/graphcommerce/pull/1718/files#diff-934d7a9d597b01b6da875f61ca1cdfd57e0e0817e7126ce6216fd82dc4b6f899)
- [AddMollieMethods](https://github.com/graphcommerce-org/graphcommerce/pull/1718/files#diff-76e6fc63dee67f55cbad4f13dc7b1b764da6235b88ed8d987c7044b7ef7fc942)

The result of this is that:

- The payment methods are added to the `<PaymentMethodContextProvider />` via
  plugins.
- These plugins are only applied if the relevant package is installed.

### How do I make a plugin?

A GraphCommerce plugin must contain the following to work:

```tsx
import {
  ComponentToExtend,
  ComponentToExtendProps,
} from '@graphcommerce/core-package/ComponentToExtend'

// Component to extend, required
export const component = 'ComponentToExtend'

// Exported location of the component that you are extending, required
export const exported = '@graphcommerce/core-package/ComponentToExtend'

// The actual plugin
export const plugin: Plugin<ComponentToExtendProps> = ({ Component }) =>
  function MyPlugin(props) {
    // Do stuff here like, wrapping, modifying props, etc.
    return <Component {...props} />
  }
```

All three exports are currently required (!), otherwise the plugin will not
work. `component` and `exported` are currently required.

### How does it work?

1. Generate a list of all packages with `graphcommerce` in the package `name`
   (for example `@graphcommerce/core-package` or
   `@my-company/graphcommerce-plugin-name`).
2. Search for plugins in the packages `plugins/**/*.tsx`.
3. Statically Analyse the plugins, check if the `component` and `exported`
   exports exist and generate the plugin configuration.
4. Generate `ComponentToExtend.interceptor.tsx` and place it next to the

The generated interceptor looks like this:

```tsx
import { plugin as MyPlugin } from '@my-company/graphcommerce-plugin-name/plugins/MyPlugin'
import { ComponentToExtend as ComponentToExtendBase } from './ComponentToExtend'

export * from './ComponentToExtend'

export const ComponentToExtend = [MyPlugin].reduce(
  (Component, plugin) => plugin({ Component }),
  ComponentToExtendBase,
)
```

### Possible use cases

In the PR I have used the payment gateways as an example, but it should also
work for other things such as:

- Googletagmanager
- Googleanalytics
- Google recaptcha
- Other payment gateways like we currently use with customers.
- Compare functionality?
- Wishlist functionality?
- Abstraction between GraphCommerce and Backends? (Magento, BigCommerce,
  CommerceTools, etc.)

### Limitations

- It is not possible to write a plugin in the root of a project. This means that
  this functionality (for now) only works to create plugins for GraphCommerce
  packages.
- It is currently is only possible to extend React Components. This however sets
  the foundation to allow for a more flexible plugin system in the future.
- It currently isn't possible to provide a plugin sort order. The sort order of
  the plugin isn't guaranteed at the moment. This effectively means that it
  isn't possible to override a plugin.
- It currently isn't possible to disable a single plugin, the only way is to
  remove the package from your package.json.
- There currently isn't a way for the plugin to determine if the plugin should
  be activated. For example, the code for Google Analytics should only be added
  if the user has configured it. This is currently not possible.
