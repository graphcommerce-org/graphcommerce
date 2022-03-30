# Translations

GraphCommerces uses Linqui for interface translations. This guide provides an
introduction to how translations work in your graphCommerce app and how to add
support for a language of your choosing.

## How translations work

All available interface translations are stored as .po files in the /locales
directory.

```ts
Example of /locales/es.po

...

msgid "Your cart is empty"
msgstr "Su carrito está vacío"

msgid "Your session is expired"
msgstr "Su sesión ha caducado"

msgid "canceled"
msgstr "cancelado"
```

The msgid is the message being translated. In
/node_modules/@graphcommerce/magento-cart/components/EmptyCart/EmptyCart.tsx,
you can see a the first msgid is passed as a propped, wrapped in the `<Trans>`
component:

```ts
<FullPageMessage
  title={<Trans>Your cart is empty</Trans>}
  ...
>
```

## Customize translations

In /locales/en.po, find the msgid `Your cart is empty` and change the msgstr:

```ts
msgid "Your cart is empty"
msgstr "Empty cart!"
```

Refresh to see your changes updated

<figure>

![Make changes to translations](https://user-images.githubusercontent.com/1251986/157833515-c4637c6a-e406-4756-9e50-a6963b840abf.jpg)

 <figcaption>Make changes to translations. Refresh to see changes updated.</figcaption>
</figure>

## Adding translations to custom component

If you're building a component, you can wrap the strings you want to translate
in the `<Trans>` jsx macro:

```ts
<Typography variant='h3'>
  <Trans>Call us now</Trans>
</Typography>
```

Add Linqui to the component's imports:

```ts
import { t, Trans } from '@lingui/macro'
```

Run `yarn lingui`. All new (missing) translations will be added to translations
files:

```tsx
//Example terminal output

┌─────────────┬─────────────┬─────────┐
│ Language    │ Total count │ Missing │
├─────────────┼─────────────┼─────────┤
│ en (source) │     208     │    -    │
│ nl          │     208     │    1    │
│ es          │     208     │    1    │
└─────────────┴─────────────┴─────────┘
```

Edit the translations files to add your translation:

```ts
//Example from /locales/es.po

...

msgid "Call us now"
msgstr ""
```

## Passing `{values}` to translations

You can pass values in msgid's:

```tsx
<PageMeta
  title={t`Cart (${data?.cart?.total_quantity ?? 0})`}
  ...
/>
```

The syntax in the translation files:

```ts
//Example from /locales/en.po

...

msgid "Cart"
msgstr "Cart"

msgid "Cart ({0})"
msgstr "Cart ({0})"
```

## Next steps

- Learn more about
  [Linqui patterns in react ↗](https://lingui.js.org/tutorials/react-patterns.html)
  in the Linqui docs
