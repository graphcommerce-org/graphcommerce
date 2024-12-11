---
'@graphcommerce/ecommerce-ui': patch
---

Make sure the `<TextFieldElement/>` doesn’t give a uncontrolled to controlled warning.  
Convert `<SelectElement/>` to `useController` instead of a separate Controller component.  
Make sure the original `endAdornment` is always shown only until the value is valid.
