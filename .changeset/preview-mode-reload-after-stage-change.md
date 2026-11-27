---
'@graphcommerce/ecommerce-ui': patch
---

The preview mode toolbar sends `previewData` only after a change by the user. `FormPersist` restores `previewData` after each page load, and `FormAutoSubmit` sent that restore as an `update` again: the page reloaded in a loop after a change of the Hygraph stage.
