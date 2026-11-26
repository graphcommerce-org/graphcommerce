---
'@graphcommerce/framer-scroller': patch
---

`ScrollerButton` is not in the tab order and screen readers do not read it, because Tab already goes through the items of the scroller. Pass `tabIndex` and `aria-hidden` to put a `ScrollerButton` back.
