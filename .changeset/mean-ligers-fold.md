---
'@graphcommerce/googlerecaptcha': patch
---

Solve an issue where the `grecaptcha.execute` method would throw `null` causing the checkout to break in unexpected ways.
