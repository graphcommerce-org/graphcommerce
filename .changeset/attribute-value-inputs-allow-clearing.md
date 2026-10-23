---
'@graphcommerce/magento-store': patch
---

`CustomAttributesField_to_AttributeValueInputs` was filtering out any falsy form value (`if (!value) return`), so empty strings and `false` booleans never made it into the resulting `AttributeValueInput[]`. That meant a consumer who picked the empty-string option of a SELECT attribute (e.g. a "-- None --" option used to undo a previous choice) couldn't actually clear the attribute — the mutation simply omitted it and Magento kept the old value.

Skip only when the value is `undefined` (the attribute was never touched). Pass empty strings and `false` booleans through to the mutation so the backend can interpret them as "clear this attribute".
