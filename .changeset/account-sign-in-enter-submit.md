---
'@graphcommerce/magento-customer': patch
---

`useAccountSignInUpForm` goes to the password step after an email submitted with Enter. React Hook Form 7.67 updates `isValid` of an `onBlur` form on blur only, so the form stayed in the email step.
