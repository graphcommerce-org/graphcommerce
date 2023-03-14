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
you can see that the first msgid is passed as a the id prop to the `<Trans>`
component:

```tsx
<FullPageMessage
  title={<Trans id="Your cart is empty" />}
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
in the `<Trans>` component:

```tsx
<Typography variant='h3'>
  <Trans id='Call us now' />
</Typography>
```

To translate a string:

```tsx
<PageMeta title={i18n._(/* i18n */ `Blog`)} />
```

_The `/* i18n */` comment is required for `lingui extract` to work properly_

Add Linqui to the component's imports:

```tsx
import { Trans } from '@lingui/react'
import { i18n } from '@lingui/core'
```

## Generating translation files with all translations

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

## Adding a new language

1. Create a new storeview and configure the locale,
   `Admin > Store > Configuration > General > General > Locale`. Choose one of
   the options from the Magento Locale codes (below).
2. In your graphcommerce.config.js file, add the desired `locale` and
   `magentoStoreCode` to the
   [i18n config](./config.md#GraphCommerceStorefrontConfig) environment
   variable. The route will be visible to the user (added to the url) when the
   user switches storeview.

   It's considered best practice to match the route with the store code,
   replacing an underscore for a dash. For example, to add Swedish (Finland),
   which has store code sv_FI, add the following:

```tsx
//Example from graphcommerce.config.js

/**
 * Docs: https://graphcommerce.org/docs/framework/config
 *
 * @type {import('@graphcommerce/next-config/src/generated/config').GraphCommerceConfig}
 */
const config = {
  i18n: [
    {
      locale: 'sv-fi',
      magentoStoreCode: 'sv_FI',
    },
  ],
}
```

3. Run `yarn lingui`:

```tsx
//Example terminal output

┌─────────────┬─────────────┬─────────┐
│ Language    │ Total count │ Missing │
├─────────────┼─────────────┼─────────┤
│ en (source) │     208     │    -    │
│ sv          │     208     │   208   │
└─────────────┴─────────────┴─────────┘
```

4. A new .po translation file will be generated in the /locales directory, the
   filename matching the object key or, in case a locale code is used, matching
   the charactes before the dash (which represent the language).

   In the example above, the filename would result in `sv.po`:

```tsx
//Example from /locales/sv.po

msgid ""
msgstr ""
"POT-Creation-Date: 2022-03-30 14:45+0200\n"
"MIME-Version: 1.0\n"
"Content-Type: text/plain; charset=utf-8\n"
"Content-Transfer-Encoding: 8bit\n"
"X-Generator: @lingui/cli\n"
"Language: sv\n"

msgid "<0>{name}</0> has been added to your shopping cart!"
msgstr ""

msgid "Above <0/>"
msgstr ""

msgid "Account"
msgstr ""

```

5. Add your translations in the newly created .po file. Run the app and use the
   store switcher to navigate to your new storeview.

> Tip: [Github copilot ↗](https://copilot.github.com/) provides very accurate
> suggestions in VS Code with the
> [Github copilot extention ↗](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot).

## Next steps

- Learn more about
  [Linqui patterns in react ↗](https://lingui.js.org/tutorials/react-patterns.html)
  in the Linqui docs
