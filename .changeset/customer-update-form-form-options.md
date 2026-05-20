---
'@graphcommerce/magento-customer': minor
---

`CustomerUpdateForm` now accepts `useFormGqlOptions` and `mutationOptions` props that get forwarded to its underlying `useCustomerUpdateForm` hook. Lets consumers attach an `onComplete` (e.g. to close an overlay and navigate back on a successful save), an `onBeforeSubmit` (to amend or veto the variables), or any other option already supported by `useFormGqlMutation`/`useMutation` — without having to drop down and rebuild the form from scratch.

Defaults preserve existing behaviour, so the change is backwards compatible.
