---
'@graphcommerce/magento-customer': minor
---

`SignUpForm` now accepts `fieldsets` and `render` props (mirroring `CustomerUpdateForm`), so consumers can group dynamic customer attributes into custom labelled sections via `AttributesFormAutoLayout`. Defaults to the existing `[nameFieldset(attributes)]` / `CustomerAttributeField` behaviour, so unchanged for projects that don't supply the props.

This avoids the unstyled, untranslated `Other` fallback header that `AttributesFormAutoLayout` adds whenever attributes don't fit any registered fieldset — projects that extend the customer schema (e.g. with a `club` attribute) can now declare their own fieldset alongside `nameFieldset`.
