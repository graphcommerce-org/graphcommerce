# Upgrading from GraphCommerce 9 to 10

Depending on the amounts of customisations you've made, there are some manual
steps.

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
