# Upgrading from GraphCommerce 9 to 10

Depending on the amounts of customisations you've made, there are some manual
steps.

## Theme: Replace theme.palette with theme.vars.palette

To support CSS variables properly, replace `theme.palette` with
`theme.vars.palette` in your theme customizations:

```diff
- color: theme.palette.primary.main,
+ color: theme.vars.palette.primary.main,
```

## Theme: Replace dark mode checks with theme.applyStyles

Replace conditional dark mode checks with `theme.applyStyles('dark', ...)`:

```diff
- background: theme.palette.mode === 'dark'
-   ? lighten(theme.palette.background.default, 0.15)
-   : theme.palette.background.default,
+ background: theme.vars.palette.background.default,
+ ...theme.applyStyles('dark', {
+   background: theme.lighten(theme.vars.palette.background.default, 0.15),
+ }),
```

## Trans and t import replacements

```tsx
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
```

Becomes

```tsx
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
```

And

```tsx
import { t, Trans } from '@lingui/macro'
```

Becomes

```tsx
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
```

## Translations

After changing all the imports in the step above. Please remove all occurences
of `#. js-lingui-generated-id` in the .po files.

Run `yarn lingui` again to extract all the new translations.

## import.meta.graphCommerce replaced by '@graphcommerce/next-config/config'

```tsx
const jaja = import.meta.graphCommerce.cartDisplayPricesInclTax
```

becomes

```tsx
import { cartDisplayPricesInclTax } from '@graphcommerce/next-config/config'

const jaja = cartDisplayPricesInclTax
```
