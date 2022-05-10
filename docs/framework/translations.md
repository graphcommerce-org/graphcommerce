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
you can see a the first msgid is passed as a the id prop to the `<Trans>`
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

If you need to have a string instead of a React component, you can use:

```tsx
<PageMeta title={i18n._(/* i18n */ `Blog`)} />
```

_The `/* i18n */` comment is required for `lingui extract` to work properly_

Add Linqui to the component's imports:

```tsx
import { Trans } from '@lingui/react'
import { i18n } from '@lingui/core'
```

## Automatically extracting all translations

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
2. In your .env file, add the desired route and store_code to the
   `NEXT_PUBLIC_LOCALE_STORES` environment variable. The route will be visible
   to the user (added to the url) when the user switches storeview.

   It's considered best practice to match the route with the locale code,
   replacing an underscore for a dash. For example, to add Swedish (Finland),
   which has locale code sv_FI, add the following:

```tsx
//Example from .env

NEXT_PUBLIC_LOCALE_STORES =
  '{"en-us":"default",sv-fi":"[store_code from desired storeview]"}'
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

5. Add your translations ins the newly created .po file. Run the app and use the
   store switcher to navigate to your new storeview.

> Tip: [Github copilot ↗](https://copilot.github.com/) provides very accurate
> suggestions in VS Code with the
> [Github copilot extention ↗](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot).

### Magento Locale codes

| Locale     | Language (country)                                  |
| ---------- | --------------------------------------------------- |
| af_ZA      | Afrikaans (South Africa)                            |
| sq_AL      | Albanian (Albania)                                  |
| ar_DZ      | Arabic (Algeria)                                    |
| ar_EG      | Arabic (Egypt)                                      |
| ar_KW      | Arabic (Kuwait)                                     |
| ar_MA      | Arabic (Morocco)                                    |
| ar_SA      | Arabic (Saudi Arabia)                               |
| az_Latn_AZ | Azerbaijani (Latijns, Azerbaijan)                   |
| bn_BD      | Bangla (Bangladesh)                                 |
| eu_ES      | Basque (Spain)                                      |
| be_BY      | Belarusian (Belarus)                                |
| bs_Latn_BA | Bosnian (Latijns, Bosnia & Herzegovina)             |
| bg_BG      | Bulgarian (Bulgaria)                                |
| ca_ES      | Catalan (Spain)                                     |
| zh_Hant_HK | Chinese (traditioneel Chinees, Hong Kong SAR China) |
| zh_Hant_TW | Chinese (traditioneel Chinees, Taiwan)              |
| zh_Hans_CN | Chinese (vereenvoudigd Chinees, China)              |
| hr_HR      | Croatian (Croatia)                                  |
| cs_CZ      | Czech (Czechia)                                     |
| da_DK      | Danish (Denmark)                                    |
| nl_BE      | Dutch (Belgium)                                     |
| nl_NL      | Dutch (Netherlands)                                 |
| en_AU      | English (Australia)                                 |
| en_CA      | English (Canada)                                    |
| en_IE      | English (Ireland)                                   |
| en_NZ      | English (New Zealand)                               |
| en_GB      | English (United Kingdom)                            |
| en_US      | English (United States)                             |
| et_EE      | Estonian (Estonia)                                  |
| fil_PH     | Filipino (Philippines)                              |
| fi_FI      | Finnish (Finland)                                   |
| fr_BE      | French (Belgium)                                    |
| fr_CA      | French (Canada)                                     |
| fr_FR      | French (France)                                     |
| fr_LU      | French (Luxembourg)                                 |
| fr_CH      | French (Switzerland)                                |
| gl_ES      | Galician (Spain)                                    |
| ka_GE      | Georgian (Georgia)                                  |
| de_AT      | German (Austria)                                    |
| de_DE      | German (Germany)                                    |
| de_LU      | German (Luxembourg)                                 |
| de_CH      | German (Switzerland)                                |
| el_GR      | Greek (Greece)                                      |
| gu_IN      | Gujarati (India)                                    |
| he_IL      | Hebrew (Israel)                                     |
| hi_IN      | Hindi (India)                                       |
| hu_HU      | Hungarian (Hungary)                                 |
| is_IS      | Icelandic (Iceland)                                 |
| id_ID      | Indonesian (Indonesia)                              |
| it_IT      | Italian (Italy)                                     |
| it_CH      | Italian (Switzerland)                               |
| ja_JP      | Japanese (Japan)                                    |
| km_KH      | Khmer (Cambodia)                                    |
| ko_KR      | Korean (South Korea)                                |
| lo_LA      | Lao (Laos)                                          |
| lv_LV      | Latvian (Latvia)                                    |
| lt_LT      | Lithuanian (Lithuania)                              |
| mk_MK      | Macedonian (North Macedonia)                        |
| ms_MY      | Malay (Malaysia)                                    |
| nb_NO      | Norwegian Bokmål (Norway)                           |
| nn_NO      | Norwegian Nynorsk (Norway)                          |
| fa_IR      | Persian (Iran)                                      |
| pl_PL      | Polish (Poland)                                     |
| pt_BR      | Portuguese (Brazil)                                 |
| pt_PT      | Portuguese (Portugal)                               |
| ro_RO      | Romanian (Romania)                                  |
| ru_RU      | Russian (Russia)                                    |
| sr_Cyrl_RS | Serbian (Cyrillisch, Serbia)                        |
| sr_Latn_RS | Serbian (Latijns, Serbia)                           |
| sk_SK      | Slovak (Slovakia)                                   |
| sl_SI      | Slovenian (Slovenia)                                |
| es_AR      | Spanish (Argentina)                                 |
| es_BO      | Spanish (Bolivia)                                   |
| es_CL      | Spanish (Chile)                                     |
| es_CO      | Spanish (Colombia)                                  |
| es_CR      | Spanish (Costa Rica)                                |
| es_MX      | Spanish (Mexico)                                    |
| es_PA      | Spanish (Panama)                                    |
| es_PE      | Spanish (Peru)                                      |
| es_ES      | Spanish (Spain)                                     |
| es_US      | Spanish (United States)                             |
| es_VE      | Spanish (Venezuela)                                 |
| sw_KE      | Swahili (Kenya)                                     |
| sv_FI      | Swedish (Finland)                                   |
| sv_SE      | Swedish (Sweden)                                    |
| th_TH      | Thai (Thailand)                                     |
| tr_TR      | Turkish (Turkey)                                    |
| uk_UA      | Ukrainian (Ukraine)                                 |
| vi_VN      | Vietnamese (Vietnam)                                |
| cy_GB      | Welsh (United Kingdom)                              |

## Next steps

- Learn more about
  [Linqui patterns in react ↗](https://lingui.js.org/tutorials/react-patterns.html)
  in the Linqui docs
